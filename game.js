// Stellar Virtue - Game Engine
// A cooperative board game about virtuous AI spaceships

(function () {
  'use strict';

  // ===== Game Data =====
  const SAINT_NAMES = [
    'St. Peter', 'St. Paul', 'St. Augustine', 'St. Thomas Aquinas',
    'St. Francis', 'St. Teresa of Avila', 'St. Ignatius', 'St. Catherine',
    'St. Joan of Arc', 'St. Therese', 'St. John Paul II', 'St. Mother Teresa'
  ];

  const TURNS = ['Lauds', 'Prime', 'Terce', 'Sext', 'None', 'Vespers', 'Compline'];

  const CATHOLIC_ACTIONS = [
    { name: 'Pray the Rosary', text: 'Gain 2 virtue points.', effect: 'virtue2' },
    { name: 'Act of Charity', text: 'Heal all ships in one sector by 1 health.', effect: 'healSector' },
    { name: 'Confession', text: 'Remove one enemy ship from the board.', effect: 'removeEnemy' },
    { name: 'Fast', text: 'Skip a turn to gain 3 virtue points.', effect: 'virtue3' },
    { name: 'Almsgiving', text: 'Heal all player ships by 1 health.', effect: 'healAll' },
    { name: 'Lectio Divina', text: 'Gain 1 virtue point and draw another card.', effect: 'virtue1draw' }
  ];

  const ENEMY_ACTIONS = [
    { name: 'Advance', text: 'All enemy ships move one sector toward the nearest base.' },
    { name: 'Assault', text: 'All enemy ships attack; spawn 1 new ship.' },
    { name: 'Flank', text: 'Half the enemy ships move two sectors toward a base.' },
    { name: 'Regroup', text: 'All enemy ships move one sector away from bases.' },
    { name: 'Ambush', text: 'Enemy ships in player sectors deal double damage.' },
    { name: 'Reinforce', text: 'Spawn 2 new enemy ships in a spawn sector.' }
  ];

  const PLAYER_BASES = [1, 5, 9];
  const ENEMY_SPAWNS = [4, 8, 12];
  const TOTAL_SECTORS = 12;
  const MAX_DAYS = 9;

  // Sector adjacency (1-indexed, circular + connections)
  const ADJACENCY = {};
  for (let i = 1; i <= 12; i++) {
    const adj = [];
    if (i > 1) adj.push(i - 1);
    if (i < 12) adj.push(i + 1);
    if (i === 1) adj.push(12);
    if (i === 12) adj.push(1);
    // Cross-connections through Earth: opposite sectors
    const opp = ((i - 1 + 6) % 12) + 1;
    adj.push(opp);
    ADJACENCY[i] = [...new Set(adj)];
  }

  // ===== Game State =====
  let state = null;

  function newState(playerCount) {
    const shipsPerPlayer = Math.floor(12 / playerCount);
    const playerShips = SAINT_NAMES.map((name, i) => ({
      id: i,
      name,
      health: 3,
      maxHealth: 3,
      charge: 0,
      maxCharge: 3,
      sector: PLAYER_BASES[i % 3],
      player: i % playerCount,
      acted: false,
      destroyed: false
    }));

    const enemyShips = [];
    for (let i = 0; i < 24; i++) {
      enemyShips.push({
        id: i,
        name: `Enemy Ship ${i + 1}`,
        health: 2,
        maxHealth: 2,
        sector: ENEMY_SPAWNS[i % 3],
        deployed: i < 6,
        destroyed: false
      });
    }

    return {
      playerCount,
      day: 1,
      turnIndex: 0,
      playerShips,
      enemyShips,
      virtuePoints: 0,
      selectedShip: null,
      enemiesDefeated: 0,
      totalEnemySpawned: 6,
      phase: 'play', // play, selectTarget, selectSector, gameOver
      message: null,
      basesIntact: { 1: true, 5: true, 9: true },
      sunday: false
    };
  }

  // ===== Board Rendering =====
  const canvas = document.getElementById('game-board');
  const ctx = canvas.getContext('2d');
  let boardLayout = []; // {sector, x, y, r}

  function resizeCanvas() {
    const container = document.getElementById('board-container');
    canvas.width = container.clientWidth * devicePixelRatio;
    canvas.height = container.clientHeight * devicePixelRatio;
    canvas.style.width = container.clientWidth + 'px';
    canvas.style.height = container.clientHeight + 'px';
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    computeLayout();
    drawBoard();
  }

  function computeLayout() {
    const w = canvas.width / devicePixelRatio;
    const h = canvas.height / devicePixelRatio;
    const cx = w / 2;
    const cy = h / 2;
    const radius = Math.min(w, h) * 0.38;
    const sectorR = Math.min(w, h) * 0.07;

    boardLayout = [];
    // Earth at center
    boardLayout.push({ sector: 0, x: cx, y: cy, r: sectorR * 0.9, label: 'Earth' });

    // 12 sectors in a circle
    for (let i = 0; i < 12; i++) {
      const angle = (i * Math.PI * 2) / 12 - Math.PI / 2;
      boardLayout.push({
        sector: i + 1,
        x: cx + Math.cos(angle) * radius,
        y: cy + Math.sin(angle) * radius,
        r: sectorR,
        label: `${i + 1}`
      });
    }
  }

  function drawBoard() {
    if (!state) return;
    const w = canvas.width / devicePixelRatio;
    const h = canvas.height / devicePixelRatio;
    ctx.clearRect(0, 0, w, h);

    // Draw connections
    ctx.strokeStyle = '#1e2a3f';
    ctx.lineWidth = 1;
    for (let i = 1; i <= 12; i++) {
      const a = boardLayout[i];
      // Connection to next sector
      const next = (i % 12) + 1;
      const b = boardLayout[next];
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
      // Connection through Earth
      const opp = ((i - 1 + 6) % 12) + 1;
      if (opp > i) {
        const c = boardLayout[opp];
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(boardLayout[0].x, boardLayout[0].y);
        ctx.lineTo(c.x, c.y);
        ctx.stroke();
      }
    }

    // Draw sectors
    boardLayout.forEach((s) => {
      const isBase = PLAYER_BASES.includes(s.sector);
      const isSpawn = ENEMY_SPAWNS.includes(s.sector);
      const isEarth = s.sector === 0;

      // Fill
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      if (isEarth) {
        ctx.fillStyle = '#0d2137';
      } else if (isBase) {
        ctx.fillStyle = state.basesIntact[s.sector] ? '#0a1e2e' : '#2e0a0a';
      } else if (isSpawn) {
        ctx.fillStyle = '#1e0a0a';
      } else {
        ctx.fillStyle = '#0e1524';
      }
      ctx.fill();

      // Border
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      if (isBase) {
        ctx.strokeStyle = state.basesIntact[s.sector] ? '#00918B' : '#c0392b';
      } else if (isSpawn) {
        ctx.strokeStyle = '#8B0000';
      } else if (isEarth) {
        ctx.strokeStyle = '#00B5AD';
      } else {
        ctx.strokeStyle = '#2a3548';
      }
      ctx.lineWidth = isEarth ? 2 : 1.5;
      ctx.stroke();

      // Label
      ctx.fillStyle = isEarth ? '#00B5AD' : '#556677';
      ctx.font = `${isEarth ? 'bold ' : ''}${s.r * 0.45}px -apple-system, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(s.label, s.x, s.y - s.r * 0.45);

      if (isBase && s.sector !== 0) {
        ctx.fillStyle = '#00918B';
        ctx.font = `${s.r * 0.25}px -apple-system, sans-serif`;
        ctx.fillText('BASE', s.x, s.y - s.r * 0.15);
      }
      if (isSpawn) {
        ctx.fillStyle = '#8B0000';
        ctx.font = `${s.r * 0.25}px -apple-system, sans-serif`;
        ctx.fillText('SPAWN', s.x, s.y - s.r * 0.15);
      }

      // Ship indicators in sector
      if (s.sector > 0) {
        const pShips = state.playerShips.filter(sh => sh.sector === s.sector && !sh.destroyed);
        const eShips = state.enemyShips.filter(sh => sh.sector === s.sector && sh.deployed && !sh.destroyed);

        // Player ship dots
        if (pShips.length > 0) {
          const dotR = s.r * 0.1;
          const startX = s.x - (pShips.length - 1) * dotR * 1.5;
          pShips.forEach((sh, idx) => {
            ctx.beginPath();
            ctx.arc(startX + idx * dotR * 3, s.y + s.r * 0.2, dotR, 0, Math.PI * 2);
            ctx.fillStyle = state.selectedShip === sh.id ? '#00FFE5' : '#00B5AD';
            ctx.fill();
          });
          ctx.fillStyle = '#00B5AD';
          ctx.font = `${s.r * 0.22}px -apple-system, sans-serif`;
          ctx.fillText(`${pShips.length} ship${pShips.length > 1 ? 's' : ''}`, s.x, s.y + s.r * 0.55);
        }

        // Enemy ship indicators
        if (eShips.length > 0) {
          ctx.fillStyle = '#e74c3c';
          ctx.font = `bold ${s.r * 0.25}px -apple-system, sans-serif`;
          ctx.fillText(`${eShips.length}`, s.x, s.y + s.r * 0.75);
          // small skull-ish indicator
          ctx.font = `${s.r * 0.18}px -apple-system, sans-serif`;
          ctx.fillText('enemy', s.x, s.y + s.r * 0.55);
        }
      }
    });

    // Highlight selectable sectors if in selectSector phase
    if (state.phase === 'selectSector' && state.selectableSectors) {
      state.selectableSectors.forEach(sectorNum => {
        const s = boardLayout[sectorNum];
        if (!s) return;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r + 3, 0, Math.PI * 2);
        ctx.strokeStyle = '#00FFE5';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
      });
    }
  }

  // ===== Ship Tray =====
  function renderShipTray() {
    const list = document.getElementById('ship-list');
    list.innerHTML = '';

    const myShips = state.playerShips;
    myShips.forEach(ship => {
      const card = document.createElement('div');
      card.className = 'ship-card' +
        (state.selectedShip === ship.id ? ' selected' : '') +
        (ship.destroyed ? ' destroyed' : '');

      let healthPips = '';
      for (let i = 0; i < ship.maxHealth; i++) {
        healthPips += `<span class="stat-pip health ${i < ship.health ? 'filled' : ''}"></span>`;
      }
      let chargePips = '';
      for (let i = 0; i < ship.maxCharge; i++) {
        chargePips += `<span class="stat-pip charge ${i < ship.charge ? 'filled' : ''}"></span>`;
      }

      card.innerHTML = `
        <div class="ship-name">${ship.name}</div>
        <div class="ship-stat">HP <span class="stat-bar">${healthPips}</span></div>
        <div class="ship-stat">CHG <span class="stat-bar">${chargePips}</span></div>
        <div class="ship-sector">Sector ${ship.sector}${ship.acted ? ' (acted)' : ''}</div>
      `;

      card.addEventListener('click', () => {
        if (ship.destroyed) return;
        state.selectedShip = state.selectedShip === ship.id ? null : ship.id;
        renderShipTray();
        drawBoard();
        if (state.selectedShip !== null) showActionPanel();
        else hideActionPanel();
      });

      list.appendChild(card);
    });
  }

  // ===== Actions =====
  function showActionPanel() {
    const panel = document.getElementById('action-panel');
    const btnContainer = document.getElementById('action-buttons');
    const title = document.getElementById('action-title');
    panel.classList.remove('hidden');

    const ship = state.playerShips[state.selectedShip];
    if (!ship) { hideActionPanel(); return; }

    title.textContent = ship.name + (ship.acted ? ' (already acted)' : '');

    const turn = TURNS[state.turnIndex];
    const isSunday = state.sunday;

    // Determine available actions based on turn
    const actions = [];

    if (isSunday) {
      actions.push({ label: 'Pray', id: 'pray', enabled: !ship.acted });
    } else {
      if (turn === 'Lauds') {
        actions.push({ label: 'Pray (+1 VP)', id: 'pray', enabled: !ship.acted });
      } else if (turn === 'Prime') {
        actions.push({ label: 'Draw Card', id: 'drawCard', enabled: !ship.acted });
      } else if (turn === 'Terce' || turn === 'Vespers') {
        actions.push({ label: 'Move', id: 'move', enabled: !ship.acted });
        const enemiesHere = state.enemyShips.filter(e => e.sector === ship.sector && e.deployed && !e.destroyed);
        actions.push({ label: `Attack (${Math.max(1, ship.charge)} dmg)`, id: 'attack', enabled: !ship.acted && enemiesHere.length > 0 });
      } else if (turn === 'Sext') {
        actions.push({ label: 'Charge', id: 'charge', enabled: !ship.acted && ship.charge < ship.maxCharge });
        actions.push({ label: 'Repair', id: 'repair', enabled: !ship.acted && ship.health < ship.maxHealth });
      } else if (turn === 'None') {
        actions.push({ label: 'Pray (+1 VP)', id: 'pray', enabled: !ship.acted });
        actions.push({ label: 'Virtue Heal', id: 'virtueHeal', enabled: !ship.acted && state.virtuePoints >= 2 });
      } else if (turn === 'Compline') {
        actions.push({ label: 'Rest (auto-heal)', id: 'rest', enabled: !ship.acted });
      }
    }

    btnContainer.innerHTML = '';
    actions.forEach(a => {
      const btn = document.createElement('button');
      btn.className = 'action-btn';
      btn.textContent = a.label;
      btn.disabled = !a.enabled;
      btn.addEventListener('click', () => performAction(a.id));
      btnContainer.appendChild(btn);
    });
  }

  function hideActionPanel() {
    document.getElementById('action-panel').classList.add('hidden');
  }

  function performAction(actionId) {
    const ship = state.playerShips[state.selectedShip];
    if (!ship || ship.acted) return;

    switch (actionId) {
      case 'pray':
        state.virtuePoints++;
        ship.acted = true;
        showMessage(`${ship.name} prays. +1 Virtue Point.`);
        break;

      case 'drawCard':
        ship.acted = true;
        drawCatholicCard();
        break;

      case 'move':
        state.phase = 'selectSector';
        state.selectableSectors = ADJACENCY[ship.sector];
        hideActionPanel();
        drawBoard();
        showMessage('Tap a highlighted sector to move.');
        return;

      case 'attack': {
        const enemies = state.enemyShips.filter(e => e.sector === ship.sector && e.deployed && !e.destroyed);
        if (enemies.length === 0) return;
        const dmg = Math.max(1, ship.charge);
        const target = enemies[0];
        target.health -= dmg;
        ship.charge = 0;
        ship.acted = true;
        if (target.health <= 0) {
          target.destroyed = true;
          state.enemiesDefeated++;
          showMessage(`${ship.name} destroys ${target.name}! (${dmg} dmg)`);
        } else {
          showMessage(`${ship.name} hits ${target.name} for ${dmg} dmg. (${target.health} HP left)`);
        }
        break;
      }

      case 'charge':
        if (ship.charge < ship.maxCharge) {
          ship.charge++;
          ship.acted = true;
          showMessage(`${ship.name} charges up! (${ship.charge}/${ship.maxCharge})`);
        }
        break;

      case 'repair':
        if (ship.health < ship.maxHealth) {
          ship.health++;
          ship.acted = true;
          showMessage(`${ship.name} repairs. (${ship.health}/${ship.maxHealth} HP)`);
        }
        break;

      case 'rest':
        if (ship.health < ship.maxHealth) ship.health++;
        ship.acted = true;
        showMessage(`${ship.name} rests. Healed to ${ship.health}/${ship.maxHealth} HP.`);
        break;

      case 'virtueHeal':
        if (state.virtuePoints >= 2) {
          state.virtuePoints -= 2;
          ship.health = Math.min(ship.maxHealth, ship.health + 2);
          ship.acted = true;
          showMessage(`${ship.name} uses virtue to heal! (-2 VP, ${ship.health}/${ship.maxHealth} HP)`);
        }
        break;
    }

    updateUI();
  }

  function drawCatholicCard() {
    const card = CATHOLIC_ACTIONS[Math.floor(Math.random() * CATHOLIC_ACTIONS.length)];
    showCard('Catholic Action', `${card.name}: ${card.text}`);
    applyCatholicCard(card);
  }

  function applyCatholicCard(card) {
    switch (card.effect) {
      case 'virtue2':
        state.virtuePoints += 2;
        break;
      case 'healSector': {
        const ship = state.playerShips[state.selectedShip];
        if (ship) {
          state.playerShips.filter(s => s.sector === ship.sector && !s.destroyed).forEach(s => {
            s.health = Math.min(s.maxHealth, s.health + 1);
          });
        }
        break;
      }
      case 'removeEnemy': {
        const deployed = state.enemyShips.filter(e => e.deployed && !e.destroyed);
        if (deployed.length > 0) {
          const target = deployed[Math.floor(Math.random() * deployed.length)];
          target.destroyed = true;
          state.enemiesDefeated++;
        }
        break;
      }
      case 'virtue3':
        state.virtuePoints += 3;
        break;
      case 'healAll':
        state.playerShips.filter(s => !s.destroyed).forEach(s => {
          s.health = Math.min(s.maxHealth, s.health + 1);
        });
        break;
      case 'virtue1draw':
        state.virtuePoints += 1;
        // Draw another card after dismissing this one
        setTimeout(() => drawCatholicCard(), 500);
        break;
    }
  }

  // ===== Enemy Turn =====
  function enemyTurn() {
    const card = ENEMY_ACTIONS[Math.floor(Math.random() * ENEMY_ACTIONS.length)];
    showCard('Enemy Action', `${card.name}: ${card.text}`);

    const deployed = state.enemyShips.filter(e => e.deployed && !e.destroyed);

    switch (card.name) {
      case 'Advance':
        deployed.forEach(e => {
          const nearest = findNearestBase(e.sector);
          const path = findPathToward(e.sector, nearest);
          if (path !== e.sector) e.sector = path;
        });
        break;

      case 'Assault':
        // Each enemy attacks a player ship in their sector
        deployed.forEach(e => {
          const targets = state.playerShips.filter(s => s.sector === e.sector && !s.destroyed);
          if (targets.length > 0) {
            const t = targets[Math.floor(Math.random() * targets.length)];
            t.health--;
            if (t.health <= 0) t.destroyed = true;
          }
        });
        spawnEnemies(1);
        break;

      case 'Flank':
        const half = deployed.slice(0, Math.ceil(deployed.length / 2));
        half.forEach(e => {
          const nearest = findNearestBase(e.sector);
          let s = findPathToward(e.sector, nearest);
          s = findPathToward(s, nearest);
          e.sector = s;
        });
        break;

      case 'Regroup':
        deployed.forEach(e => {
          const nearest = findNearestBase(e.sector);
          const path = findPathAway(e.sector, nearest);
          if (path !== e.sector) e.sector = path;
        });
        break;

      case 'Ambush':
        deployed.forEach(e => {
          const targets = state.playerShips.filter(s => s.sector === e.sector && !s.destroyed);
          targets.forEach(t => {
            t.health -= 2;
            if (t.health <= 0) { t.health = 0; t.destroyed = true; }
          });
        });
        break;

      case 'Reinforce':
        spawnEnemies(2);
        break;
    }

    // Check if enemy ships are on bases
    checkBases();
  }

  function findNearestBase(sector) {
    let best = null;
    let bestDist = Infinity;
    PLAYER_BASES.forEach(b => {
      if (!state.basesIntact[b]) return;
      const d = sectorDistance(sector, b);
      if (d < bestDist) { bestDist = d; best = b; }
    });
    return best || PLAYER_BASES[0];
  }

  function sectorDistance(a, b) {
    const diff = Math.abs(a - b);
    return Math.min(diff, 12 - diff);
  }

  function findPathToward(from, to) {
    if (from === to) return from;
    const adj = ADJACENCY[from];
    let best = from;
    let bestDist = sectorDistance(from, to);
    adj.forEach(s => {
      const d = sectorDistance(s, to);
      if (d < bestDist) { bestDist = d; best = s; }
    });
    return best;
  }

  function findPathAway(from, to) {
    const adj = ADJACENCY[from];
    let best = from;
    let bestDist = sectorDistance(from, to);
    adj.forEach(s => {
      const d = sectorDistance(s, to);
      if (d > bestDist) { bestDist = d; best = s; }
    });
    return best;
  }

  function spawnEnemies(count) {
    let spawned = 0;
    for (let i = 0; i < state.enemyShips.length && spawned < count; i++) {
      if (!state.enemyShips[i].deployed && !state.enemyShips[i].destroyed) {
        state.enemyShips[i].deployed = true;
        state.totalEnemySpawned++;
        spawned++;
      }
    }
  }

  function checkBases() {
    PLAYER_BASES.forEach(base => {
      if (!state.basesIntact[base]) return;
      const enemies = state.enemyShips.filter(e => e.sector === base && e.deployed && !e.destroyed);
      const defenders = state.playerShips.filter(s => s.sector === base && !s.destroyed);
      // Base falls if enemies present and no defenders
      if (enemies.length > 0 && defenders.length === 0) {
        state.basesIntact[base] = false;
      }
    });

    // Check lose condition
    const allBasesLost = PLAYER_BASES.every(b => !state.basesIntact[b]);
    if (allBasesLost) {
      endGame(false);
    }
  }

  // ===== Turn / Day Management =====
  function endTurn() {
    // Reset acted flags
    state.playerShips.forEach(s => s.acted = false);

    // Enemy phase (after player acts, except Lauds and Compline)
    const turn = TURNS[state.turnIndex];
    if (!state.sunday && turn !== 'Lauds' && turn !== 'Compline') {
      enemyTurn();
    }

    // Advance turn
    state.turnIndex++;
    if (state.turnIndex >= TURNS.length) {
      state.turnIndex = 0;
      state.day++;
      state.sunday = (state.day % 7 === 0);

      if (state.day > MAX_DAYS) {
        endGame(true);
        return;
      }
    }

    state.selectedShip = null;
    state.phase = 'play';
    hideActionPanel();
    updateUI();
  }

  function endGame(won) {
    state.phase = 'gameOver';
    const allDefeated = state.enemyShips.every(e => e.destroyed);

    document.getElementById('gameover-title').textContent = won ? 'Victory!' : 'Defeat';
    document.getElementById('gameover-title').style.color = won ? '#00B5AD' : '#c0392b';
    document.getElementById('gameover-message').textContent = won
      ? (allDefeated ? 'Total Victory! You defeated all enemy ships and protected every colony!' : 'You survived 9 days and defended the colonies!')
      : 'All bases have fallen. The colonies are lost.';
    document.getElementById('gameover-stats').textContent =
      `Day ${Math.min(state.day, MAX_DAYS)} | Enemies Defeated: ${state.enemiesDefeated}/24 | Virtue Points: ${state.virtuePoints}`;

    showScreen('gameover-screen');
  }

  // ===== UI Helpers =====
  function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    if (id === 'game-screen') {
      setTimeout(resizeCanvas, 50);
    }
  }

  function updateUI() {
    document.getElementById('day-display').textContent =
      `Day ${state.day}${state.sunday ? ' (Sunday)' : ''}`;
    document.getElementById('turn-display').textContent = TURNS[state.turnIndex];
    document.getElementById('virtue-display').textContent = `VP: ${state.virtuePoints}`;
    renderShipTray();
    drawBoard();
    if (state.selectedShip !== null) showActionPanel();
  }

  function showMessage(text) {
    // Brief toast-style message in the action title
    const title = document.getElementById('action-title');
    title.textContent = text;
  }

  function showCard(type, text) {
    const overlay = document.getElementById('card-overlay');
    document.getElementById('card-type').textContent = type;
    document.getElementById('card-text').textContent = text;
    overlay.classList.remove('hidden');
  }

  function showStatus() {
    const overlay = document.getElementById('status-overlay');
    const details = document.getElementById('status-details');

    let html = '<div class="status-section"><h4>Player Ships</h4>';
    state.playerShips.forEach(s => {
      html += `<div class="status-ship player">
        <span>${s.name}${s.destroyed ? ' (destroyed)' : ''}</span>
        <span>S${s.sector} | HP ${s.health}/${s.maxHealth} | CHG ${s.charge}</span>
      </div>`;
    });
    html += '</div>';

    html += '<div class="status-section"><h4>Enemy Ships</h4>';
    const deployed = state.enemyShips.filter(e => e.deployed && !e.destroyed);
    if (deployed.length === 0) {
      html += '<div class="status-ship enemy"><span>No enemies deployed</span></div>';
    }
    deployed.forEach(e => {
      html += `<div class="status-ship enemy">
        <span>${e.name}</span>
        <span>S${e.sector} | HP ${e.health}/${e.maxHealth}</span>
      </div>`;
    });
    html += '</div>';

    html += '<div class="status-section"><h4>Bases</h4>';
    PLAYER_BASES.forEach(b => {
      html += `<div class="status-ship ${state.basesIntact[b] ? 'player' : 'enemy'}">
        <span>Sector ${b}</span>
        <span>${state.basesIntact[b] ? 'Intact' : 'Fallen'}</span>
      </div>`;
    });
    html += '</div>';

    html += `<div class="status-section"><h4>Stats</h4>
      <div class="status-ship player"><span>Enemies Defeated</span><span>${state.enemiesDefeated}/24</span></div>
      <div class="status-ship player"><span>Virtue Points</span><span>${state.virtuePoints}</span></div>
      <div class="status-ship player"><span>Day</span><span>${state.day} of ${MAX_DAYS}</span></div>
    </div>`;

    details.innerHTML = html;
    overlay.classList.remove('hidden');
  }

  // ===== Board Click Handling =====
  canvas.addEventListener('click', (e) => {
    if (!state) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Find clicked sector
    for (let i = 1; i < boardLayout.length; i++) {
      const s = boardLayout[i];
      const dx = x - s.x;
      const dy = y - s.y;
      if (dx * dx + dy * dy <= s.r * s.r) {
        handleSectorClick(s.sector);
        return;
      }
    }
  });

  function handleSectorClick(sector) {
    if (state.phase === 'selectSector') {
      const ship = state.playerShips[state.selectedShip];
      if (state.selectableSectors && state.selectableSectors.includes(sector)) {
        ship.sector = sector;
        ship.acted = true;
        state.phase = 'play';
        state.selectableSectors = null;
        showMessage(`${ship.name} moves to sector ${sector}.`);
        updateUI();
      }
    }
  }

  // ===== Event Listeners =====
  function init() {
    // Player count selection
    document.querySelectorAll('.player-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.player-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
      });
    });

    // Start game
    document.getElementById('start-btn').addEventListener('click', () => {
      const count = parseInt(document.querySelector('.player-btn.selected').dataset.count);
      state = newState(count);
      showScreen('game-screen');
      updateUI();
    });

    // Rules
    document.getElementById('rules-btn').addEventListener('click', () => showScreen('rules-screen'));

    // Back buttons
    document.querySelectorAll('.back-btn').forEach(btn => {
      btn.addEventListener('click', () => showScreen(btn.dataset.target));
    });

    // End turn
    document.getElementById('end-turn-btn').addEventListener('click', endTurn);

    // Cancel action
    document.getElementById('cancel-action').addEventListener('click', () => {
      state.selectedShip = null;
      state.phase = 'play';
      state.selectableSectors = null;
      hideActionPanel();
      renderShipTray();
      drawBoard();
    });

    // Card dismiss
    document.getElementById('card-dismiss').addEventListener('click', () => {
      document.getElementById('card-overlay').classList.add('hidden');
      updateUI();
    });

    // Toggle ship tray
    document.getElementById('toggle-tray').addEventListener('click', () => {
      document.getElementById('ship-tray').classList.toggle('collapsed');
    });

    // Menu
    document.getElementById('menu-btn').addEventListener('click', () => {
      document.getElementById('game-menu').classList.remove('hidden');
    });
    document.getElementById('menu-close').addEventListener('click', () => {
      document.getElementById('game-menu').classList.add('hidden');
    });
    document.getElementById('menu-rules').addEventListener('click', () => {
      document.getElementById('game-menu').classList.add('hidden');
      showScreen('rules-screen');
      document.querySelector('#rules-screen .back-btn').dataset.target = 'game-screen';
    });
    document.getElementById('menu-status').addEventListener('click', () => {
      document.getElementById('game-menu').classList.add('hidden');
      showStatus();
    });
    document.getElementById('menu-quit').addEventListener('click', () => {
      document.getElementById('game-menu').classList.add('hidden');
      state = null;
      showScreen('title-screen');
      document.querySelector('#rules-screen .back-btn').dataset.target = 'title-screen';
    });
    document.getElementById('close-status').addEventListener('click', () => {
      document.getElementById('status-overlay').classList.add('hidden');
    });

    // Play again
    document.getElementById('play-again-btn').addEventListener('click', () => {
      state = null;
      showScreen('title-screen');
    });

    // Resize
    window.addEventListener('resize', () => {
      if (state && document.getElementById('game-screen').classList.contains('active')) {
        resizeCanvas();
      }
    });

    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('sw.js').catch(() => {});
    }
  }

  init();
})();
