// test-game.js — Automated playthrough simulation of Stellar Virtue
// Run with: node test-game.js

const SAINT_NAMES = [
  'St. Peter', 'St. Paul', 'St. Augustine', 'St. Thomas Aquinas',
  'St. Francis', 'St. Teresa of Avila', 'St. Ignatius', 'St. Catherine',
  'St. Joan of Arc', 'St. Therese', 'St. John Paul II', 'St. Mother Teresa'
];
const TURNS = ['Lauds', 'Prime', 'Terce', 'Sext', 'None', 'Vespers', 'Compline'];
const PLAYER_BASES = [1, 5, 9];
const ENEMY_SPAWNS = [4, 8, 12];
const MAX_DAYS = 9;

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
    result: null
  };
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

// AI Strategy: aggressive — move toward enemies and attack
function aiPlayerTurn(state) {
  const turn = TURNS[state.turnIndex];
  const aliveShips = state.playerShips.filter(s => !s.destroyed);

  aliveShips.forEach(ship => {
    if (state.sunday) {
      state.virtuePoints++;
      ship.acted = true;
      return;
    }

    switch (turn) {
      case 'Lauds':
        state.virtuePoints++;
        break;
      case 'Prime':
        state.virtuePoints++; // simplified: gain VP instead of drawing card
        break;
      case 'Terce':
      case 'Vespers': {
        const enemiesHere = state.enemyShips.filter(e => e.sector === ship.sector && e.deployed && !e.destroyed);
        if (enemiesHere.length > 0) {
          // Attack
          const dmg = Math.max(1, ship.charge);
          const target = enemiesHere[0];
          target.health -= dmg;
          ship.charge = 0;
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
        if (ship.health < ship.maxHealth) ship.health++;
        break;
    }
    ship.acted = true;
  });
}

function simulateGame(playerCount, label) {
  const state = newState(playerCount);
  const log = [];
  let totalTurns = 0;

  while (state.day <= MAX_DAYS && !state.result) {
    const turn = TURNS[state.turnIndex];
    aiPlayerTurn(state);
    totalTurns++;

    // Enemy turn (not on Lauds, Compline, or Sundays)
    if (!state.sunday && turn !== 'Lauds' && turn !== 'Compline') {
      const action = enemyTurn(state);
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
    totalVictory: allEnemies && state.result === 'victory'
  };
}

// ===== Run Simulations =====
console.log('=== Stellar Virtue — Automated Playtest ===\n');

const configs = [
  { count: 1, label: 'Solo (1 player)' },
  { count: 2, label: '2 Players' },
  { count: 4, label: '4 Players' },
];

const GAMES_PER_CONFIG = 20;

configs.forEach(cfg => {
  console.log(`--- ${cfg.label} (${GAMES_PER_CONFIG} games) ---`);
  let wins = 0, losses = 0, totalDays = 0, totalEnemies = 0, totalVP = 0, totalShips = 0;

  for (let g = 0; g < GAMES_PER_CONFIG; g++) {
    const r = simulateGame(cfg.count, `${cfg.label} #${g + 1}`);
    if (r.result === 'victory') wins++;
    else losses++;
    totalDays += r.day;
    totalEnemies += r.enemiesDefeated;
    totalVP += r.totalVirtue;
    totalShips += r.shipsAlive;

    if (g < 3) {
      console.log(`  Game ${g + 1}: ${r.result.toUpperCase()} | Day ${r.day} | Ships: ${r.shipsAlive}/12 | Bases: ${r.basesLeft}/3 | Enemies: ${r.enemiesDefeated}/24 | VP: ${r.totalVirtue}${r.totalVictory ? ' *** TOTAL VICTORY ***' : ''}`);
    }
  }

  console.log(`  ...`);
  console.log(`  Results: ${wins}W / ${losses}L (${Math.round(wins/GAMES_PER_CONFIG*100)}% win rate)`);
  console.log(`  Avg days survived: ${(totalDays/GAMES_PER_CONFIG).toFixed(1)}`);
  console.log(`  Avg enemies killed: ${(totalEnemies/GAMES_PER_CONFIG).toFixed(1)}/24`);
  console.log(`  Avg ships alive: ${(totalShips/GAMES_PER_CONFIG).toFixed(1)}/12`);
  console.log(`  Avg virtue points: ${(totalVP/GAMES_PER_CONFIG).toFixed(1)}`);
  console.log('');
});

console.log('=== All simulations complete ===');
