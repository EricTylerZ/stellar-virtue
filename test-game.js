// test-game.js — Automated playthrough simulation of Stellar Virtue
// Run with: node test-game.js
// Tests combat, virtue system (cardinal/theological), moral choices, and Sunday rest

const SAINT_NAMES = [
  'St. Peter', 'St. Paul', 'St. Augustine', 'St. Thomas Aquinas',
  'St. Francis', 'St. Teresa of Avila', 'St. Ignatius', 'St. Catherine',
  'St. Joan of Arc', 'St. Therese', 'St. John Paul II', 'St. Mother Teresa'
];
const TURNS = ['Lauds', 'Prime', 'Terce', 'Sext', 'None', 'Vespers', 'Compline'];
const PLAYER_BASES = [1, 5, 9];
const ENEMY_SPAWNS = [4, 8, 12];
const MAX_DAYS = 9;

const CARDINAL_VIRTUES = {
  prudence: { subVirtues: ['memory', 'understanding', 'docility', 'shrewdness', 'reason', 'foresight', 'circumspection', 'caution'] },
  justice: { subVirtues: ['religion', 'piety', 'observance', 'obedience', 'gratitude', 'vindication', 'truthfulness', 'friendship', 'affability', 'liberality', 'equity', 'fairness', 'epikeia'] },
  fortitude: { subVirtues: ['magnanimity', 'magnificence', 'patience', 'perseverance', 'longanimity', 'constancy'] },
  temperance: { subVirtues: ['abstinence', 'sobriety', 'chastity', 'modesty', 'humility', 'studiousness', 'clemency', 'meekness'] }
};
const THEOLOGICAL_NAMES = ['faith', 'hope', 'charity'];
const GIFTS = ['wisdom', 'understanding', 'counsel', 'fortitude', 'knowledge', 'piety', 'fear_of_lord'];

const ADJACENCY = {};
for (let i = 1; i <= 12; i++) {
  const adj = [];
  if (i > 1) adj.push(i - 1);
  if (i < 12) adj.push(i + 1);
  if (i === 1) adj.push(12);
  if (i === 12) adj.push(1);
  const opp = ((i - 1 + 6) % 12) + 1;
  adj.push(opp);
  ADJACENCY[i] = [...new Set(adj)];
}

function sectorDistance(a, b) {
  const diff = Math.abs(a - b);
  return Math.min(diff, 12 - diff);
}
function findNearestBase(sector, basesIntact) {
  let best = null, bestDist = Infinity;
  PLAYER_BASES.forEach(b => {
    if (!basesIntact[b]) return;
    const d = sectorDistance(sector, b);
    if (d < bestDist) { bestDist = d; best = b; }
  });
  return best || PLAYER_BASES[0];
}
function findPathToward(from, to) {
  if (from === to) return from;
  let best = from, bestDist = sectorDistance(from, to);
  ADJACENCY[from].forEach(s => {
    const d = sectorDistance(s, to);
    if (d < bestDist) { bestDist = d; best = s; }
  });
  return best;
}

function newState(playerCount) {
  // Build cardinal virtue progress tracker
  const cardinalProgress = {};
  Object.keys(CARDINAL_VIRTUES).forEach(v => {
    cardinalProgress[v] = {};
    CARDINAL_VIRTUES[v].subVirtues.forEach(s => { cardinalProgress[v][s] = 0; });
  });

  return {
    playerCount,
    day: 1,
    turnIndex: 0,
    playerShips: SAINT_NAMES.map((name, i) => ({
      id: i, name, health: 3, maxHealth: 3, charge: 0, maxCharge: 3,
      sector: PLAYER_BASES[i % 3], player: i % playerCount,
      acted: false, destroyed: false, charge: 1
    })),
    enemyShips: Array.from({ length: 24 }, (_, i) => ({
      id: i, name: `Enemy Ship ${i + 1}`, health: 2, maxHealth: 2,
      sector: ENEMY_SPAWNS[i % 3], deployed: i < 6, destroyed: false
    })),
    virtuePoints: 0,
    enemiesDefeated: 0,
    totalEnemySpawned: 6,
    basesIntact: { 1: true, 5: true, 9: true },
    baseHealth: { 1: 3, 5: 3, 9: 3 },
    sunday: false,
    // Cardinal virtues (acquired through practice)
    cardinalProgress,
    cardinalsMastered: [],
    // Theological virtues (infused through grace on Sundays)
    theologicalLevels: { faith: 0, hope: 0, charity: 0 },
    // Gifts and fruits
    giftsReceived: [],
    fruitsUnlocked: [],
    // Grace system
    graceMeter: 0,
    fidelity: 1.0,
    merit: 0,
    prayedThisDay: false,
    result: null
  };
}

function isCardinalMastered(state, virtue) {
  const prog = state.cardinalProgress[virtue];
  return CARDINAL_VIRTUES[virtue].subVirtues.every(s => prog[s] >= 2);
}

function spawnEnemies(state, count) {
  let spawned = 0;
  for (let i = 0; i < state.enemyShips.length && spawned < count; i++) {
    if (!state.enemyShips[i].deployed && !state.enemyShips[i].destroyed) {
      state.enemyShips[i].deployed = true;
      state.totalEnemySpawned++;
      spawned++;
    }
  }
}

function enemyTurn(state) {
  const deployed = state.enemyShips.filter(e => e.deployed && !e.destroyed);
  const roll = Math.floor(Math.random() * 6);
  const actions = ['Advance', 'Assault', 'Flank', 'Regroup', 'Ambush', 'Reinforce'];
  const action = actions[roll];

  switch (action) {
    case 'Advance':
      deployed.forEach(e => {
        const nearest = findNearestBase(e.sector, state.basesIntact);
        e.sector = findPathToward(e.sector, nearest);
      });
      break;
    case 'Assault':
      deployed.forEach(e => {
        const targets = state.playerShips.filter(s => s.sector === e.sector && !s.destroyed);
        if (targets.length > 0) {
          const t = targets[Math.floor(Math.random() * targets.length)];
          t.health--;
          if (t.health <= 0) t.destroyed = true;
        }
      });
      spawnEnemies(state, 1);
      break;
    case 'Flank':
      deployed.slice(0, Math.ceil(deployed.length / 2)).forEach(e => {
        const nearest = findNearestBase(e.sector, state.basesIntact);
        e.sector = findPathToward(findPathToward(e.sector, nearest), nearest);
      });
      break;
    case 'Regroup':
      break;
    case 'Ambush':
      deployed.forEach(e => {
        state.playerShips.filter(s => s.sector === e.sector && !s.destroyed).forEach(t => {
          t.health -= 2;
          if (t.health <= 0) { t.health = 0; t.destroyed = true; }
        });
      });
      break;
    case 'Reinforce':
      spawnEnemies(state, 2);
      break;
  }
  return action;
}

function checkBases(state) {
  PLAYER_BASES.forEach(base => {
    if (!state.basesIntact[base]) return;
    const enemies = state.enemyShips.filter(e => e.sector === base && e.deployed && !e.destroyed);
    const defenders = state.playerShips.filter(s => s.sector === base && !s.destroyed);
    if (enemies.length > 0 && defenders.length === 0) {
      state.baseHealth[base] -= enemies.length;
      if (state.baseHealth[base] <= 0) {
        state.basesIntact[base] = false;
      }
    }
  });
  if (PLAYER_BASES.every(b => !state.basesIntact[b])) {
    state.result = 'defeat';
  }
}

// Simulate a prayer virtue question (50% chance correct in AI sim)
function simulatePrayer(state) {
  state.prayedThisDay = true;
  state.graceMeter = Math.min(10, state.graceMeter + 1);

  const correct = Math.random() < 0.5;
  if (correct) {
    // Progress a random cardinal sub-virtue
    const cardinals = Object.keys(CARDINAL_VIRTUES);
    const virtue = cardinals[Math.floor(Math.random() * cardinals.length)];
    const subs = CARDINAL_VIRTUES[virtue].subVirtues;
    const sub = subs[Math.floor(Math.random() * subs.length)];
    if (state.cardinalProgress[virtue][sub] < 2) {
      state.cardinalProgress[virtue][sub]++;
      // Check mastery
      if (isCardinalMastered(state, virtue) && !state.cardinalsMastered.includes(virtue)) {
        state.cardinalsMastered.push(virtue);
      }
    }
    state.virtuePoints += 2;
    state.merit++;
  } else {
    state.virtuePoints++;
  }
}

// Simulate a moral choice during attack (70% choose greater good)
function simulateMoralChoice(state) {
  const choseGreater = Math.random() < 0.7;
  let bonusDmg = 0;
  if (choseGreater) {
    bonusDmg = 1;
    state.merit++;
    // Progress a random cardinal sub-virtue
    const cardinals = Object.keys(CARDINAL_VIRTUES);
    const virtue = cardinals[Math.floor(Math.random() * cardinals.length)];
    const subs = CARDINAL_VIRTUES[virtue].subVirtues;
    const sub = subs[Math.floor(Math.random() * subs.length)];
    if (state.cardinalProgress[virtue][sub] < 2) {
      state.cardinalProgress[virtue][sub]++;
      if (isCardinalMastered(state, virtue) && !state.cardinalsMastered.includes(virtue)) {
        state.cardinalsMastered.push(virtue);
      }
    }
  }
  return bonusDmg;
}

// Simulate Sunday rest
function doSundayRest(state) {
  // Heal all ships +2
  state.playerShips.filter(s => !s.destroyed).forEach(s => {
    s.health = Math.min(s.maxHealth, s.health + 2);
  });

  // Grow a theological virtue (rotating)
  const order = THEOLOGICAL_NAMES;
  const which = order[state.day % 3];
  const fidelityBonus = state.fidelity >= 0.8 ? 1 : 0;
  state.theologicalLevels[which] = Math.min(3, state.theologicalLevels[which] + 1 + fidelityBonus);

  // Grace
  state.graceMeter = Math.min(10, state.graceMeter + 2);

  // Check for gifts (theological virtue reaches 3)
  if (state.theologicalLevels.faith >= 3 && !state.giftsReceived.includes('wisdom')) {
    state.giftsReceived.push('wisdom');
  }
  if (state.theologicalLevels.hope >= 3 && !state.giftsReceived.includes('counsel')) {
    state.giftsReceived.push('counsel');
  }
  if (state.theologicalLevels.charity >= 3 && !state.giftsReceived.includes('knowledge')) {
    state.giftsReceived.push('knowledge');
  }
}

// AI Strategy: aggressive — move toward enemies and attack
function aiPlayerTurn(state) {
  const turn = TURNS[state.turnIndex];
  const aliveShips = state.playerShips.filter(s => !s.destroyed);

  // Sunday: rest only
  if (state.sunday) {
    doSundayRest(state);
    return;
  }

  aliveShips.forEach(ship => {
    switch (turn) {
      case 'Lauds':
        // Prayer turn
        simulatePrayer(state);
        break;
      case 'Prime':
        state.virtuePoints++;
        break;
      case 'Terce':
      case 'Vespers': {
        const enemiesHere = state.enemyShips.filter(e => e.sector === ship.sector && e.deployed && !e.destroyed);
        if (enemiesHere.length > 0) {
          // Moral choice during attack
          const bonusDmg = simulateMoralChoice(state);
          const baseDmg = Math.max(1, ship.charge);
          const totalDmg = baseDmg + bonusDmg;

          // Justice mastery bonus
          const justiceMastered = state.cardinalsMastered.includes('justice');
          const dmg = totalDmg + (justiceMastered ? 1 : 0);

          const target = enemiesHere[0];
          target.health -= dmg;

          // Temperance mastery: keep charge
          if (!state.cardinalsMastered.includes('temperance')) {
            ship.charge = 0;
          }

          if (target.health <= 0) { target.destroyed = true; state.enemiesDefeated++; }
        } else {
          // Move toward nearest enemy
          const deployed = state.enemyShips.filter(e => e.deployed && !e.destroyed);
          if (deployed.length > 0) {
            let nearest = deployed[0], nearDist = sectorDistance(ship.sector, deployed[0].sector);
            deployed.forEach(e => {
              const d = sectorDistance(ship.sector, e.sector);
              if (d < nearDist) { nearDist = d; nearest = e; }
            });
            ship.sector = findPathToward(ship.sector, nearest.sector);
          }
        }
        break;
      }
      case 'Sext':
        if (ship.health < ship.maxHealth) ship.health++;
        else if (ship.charge < ship.maxCharge) ship.charge++;
        break;
      case 'None':
        if (state.virtuePoints >= 2 && ship.health <= 1) {
          state.virtuePoints -= 2;
          ship.health = Math.min(ship.maxHealth, ship.health + 2);
        } else {
          state.virtuePoints++;
        }
        break;
      case 'Compline':
        // Fortitude mastery: reduce damage taken (passive, handled elsewhere)
        if (ship.health < ship.maxHealth) ship.health++;
        break;
    }
    ship.acted = true;
  });
}

function simulateGame(playerCount, label) {
  const state = newState(playerCount);
  let totalTurns = 0;

  while (state.day <= MAX_DAYS && !state.result) {
    const turn = TURNS[state.turnIndex];
    aiPlayerTurn(state);
    totalTurns++;

    // Enemy turn (not on Lauds, Compline, or Sundays)
    if (!state.sunday && turn !== 'Lauds' && turn !== 'Compline') {
      enemyTurn(state);
      checkBases(state);
    }

    if (state.result) break;

    // Reset acted
    state.playerShips.forEach(s => s.acted = false);

    // Advance turn
    state.turnIndex++;
    if (state.turnIndex >= TURNS.length) {
      state.turnIndex = 0;
      state.day++;
      state.sunday = (state.day % 7 === 0);

      // Fidelity decay if didn't pray
      if (!state.prayedThisDay) {
        state.fidelity = Math.max(0, state.fidelity - 0.2);
      }
      state.prayedThisDay = false;
    }
  }

  if (!state.result) state.result = 'victory';
  const alive = state.playerShips.filter(s => !s.destroyed).length;
  const basesLeft = PLAYER_BASES.filter(b => state.basesIntact[b]).length;
  const allEnemies = state.enemyShips.every(e => e.destroyed);

  return {
    label,
    result: state.result,
    day: Math.min(state.day, MAX_DAYS),
    turns: totalTurns,
    shipsAlive: alive,
    basesLeft,
    enemiesDefeated: state.enemiesDefeated,
    totalVirtue: state.virtuePoints,
    totalVictory: allEnemies && state.result === 'victory',
    // New virtue stats
    cardinalsMastered: state.cardinalsMastered.length,
    theologicalLevels: { ...state.theologicalLevels },
    giftsReceived: state.giftsReceived.length,
    merit: state.merit,
    fidelity: state.fidelity
  };
}

// ===== Run Simulations =====
console.log('=== Stellar Virtue — Automated Playtest ===');
console.log('=== With Cardinal/Theological Virtue System ===\n');

const configs = [
  { count: 1, label: 'Solo (1 player)' },
  { count: 2, label: '2 Players' },
  { count: 4, label: '4 Players' },
];

const GAMES_PER_CONFIG = 20;

configs.forEach(cfg => {
  console.log(`--- ${cfg.label} (${GAMES_PER_CONFIG} games) ---`);
  let wins = 0, losses = 0, totalDays = 0, totalEnemies = 0, totalVP = 0, totalShips = 0;
  let totalCardinals = 0, totalGifts = 0, totalMerit = 0;
  let avgTheological = { faith: 0, hope: 0, charity: 0 };

  for (let g = 0; g < GAMES_PER_CONFIG; g++) {
    const r = simulateGame(cfg.count, `${cfg.label} #${g + 1}`);
    if (r.result === 'victory') wins++;
    else losses++;
    totalDays += r.day;
    totalEnemies += r.enemiesDefeated;
    totalVP += r.totalVirtue;
    totalShips += r.shipsAlive;
    totalCardinals += r.cardinalsMastered;
    totalGifts += r.giftsReceived;
    totalMerit += r.merit;
    avgTheological.faith += r.theologicalLevels.faith;
    avgTheological.hope += r.theologicalLevels.hope;
    avgTheological.charity += r.theologicalLevels.charity;

    if (g < 3) {
      console.log(`  Game ${g + 1}: ${r.result.toUpperCase()} | Day ${r.day} | Ships: ${r.shipsAlive}/12 | Bases: ${r.basesLeft}/3 | Enemies: ${r.enemiesDefeated}/24 | VP: ${r.totalVirtue} | Cardinals: ${r.cardinalsMastered}/4 | Merit: ${r.merit}${r.totalVictory ? ' *** TOTAL VICTORY ***' : ''}`);
    }
  }

  const n = GAMES_PER_CONFIG;
  console.log(`  ...`);
  console.log(`  Results: ${wins}W / ${losses}L (${Math.round(wins/n*100)}% win rate)`);
  console.log(`  Avg days survived: ${(totalDays/n).toFixed(1)}`);
  console.log(`  Avg enemies killed: ${(totalEnemies/n).toFixed(1)}/24`);
  console.log(`  Avg ships alive: ${(totalShips/n).toFixed(1)}/12`);
  console.log(`  Avg virtue points: ${(totalVP/n).toFixed(1)}`);
  console.log(`  --- Virtue System ---`);
  console.log(`  Avg cardinals mastered: ${(totalCardinals/n).toFixed(1)}/4`);
  console.log(`  Avg theological: Faith ${(avgTheological.faith/n).toFixed(1)}/3, Hope ${(avgTheological.hope/n).toFixed(1)}/3, Charity ${(avgTheological.charity/n).toFixed(1)}/3`);
  console.log(`  Avg gifts received: ${(totalGifts/n).toFixed(1)}/7`);
  console.log(`  Avg merit: ${(totalMerit/n).toFixed(1)}`);
  console.log('');
});

console.log('=== All simulations complete ===');
