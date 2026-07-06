// Main Application Bootstrapper and Tab Controller

import { initPlayerSelectors, renderPlayerComparison } from './compare.js';
import { initTeamSelectors, renderTeamComparison } from './teamCompare.js';
import { initMatchCenter, toggleSimulation, resetSimulation } from './matchCenter.js';
import { initChatbot } from './aiAssistant.js';
import { leagues, teams } from './statsData.js';

// Application State
let activeTab = 'dashboard';
let player1Selected = 'messi';
let player2Selected = 'ronaldo';
let currentHubLeague = 'premier_league';

// Tab switcher logic
function setupTabNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  const panels = document.querySelectorAll('.tab-panel');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetTab = item.getAttribute('data-tab');
      switchTab(targetTab);
    });
  });
}

export function switchTab(tabId) {
  const navItems = document.querySelectorAll('.nav-item');
  const panels = document.querySelectorAll('.tab-panel');

  // Deactivate current
  navItems.forEach(nav => nav.classList.remove('active'));
  panels.forEach(panel => panel.classList.remove('active'));

  // Activate target
  const targetNav = Array.from(navItems).find(nav => nav.getAttribute('data-tab') === tabId);
  const targetPanel = document.getElementById(tabId);

  if (targetNav && targetPanel) {
    targetNav.classList.add('active');
    targetPanel.classList.add('active');
    activeTab = tabId;

    // Trigger tab-specific entry routines
    if (tabId === 'player-compare') {
      // Re-trigger render to verify canvas sizes match layouts
      renderPlayerComparison(player1Selected, player2Selected);
    }
  }
}

// Bind dashboard featured debate and trending links
function setupDashboardBindings() {
  // Featured hero
  const heroBtn = document.getElementById('btn-hero-compare');
  heroBtn.addEventListener('click', () => {
    setPlayerSelectors('messi', 'ronaldo');
    switchTab('player-compare');
  });

  // Trending links
  const quickLinks = document.querySelectorAll('.quick-link-item');
  quickLinks.forEach(link => {
    link.addEventListener('click', () => {
      const p1 = link.getAttribute('data-p1');
      const p2 = link.getAttribute('data-p2');
      setPlayerSelectors(p1, p2);
      switchTab('player-compare');
    });
  });
}

function setPlayerSelectors(p1, p2) {
  player1Selected = p1;
  player2Selected = p2;
  
  document.getElementById('select-player-1').value = p1;
  document.getElementById('select-player-2').value = p2;
  
  renderPlayerComparison(p1, p2);
}

// Render Standings and leaders tables in Stats Hub
function renderStatsHub(leagueKey) {
  const data = leagues[leagueKey];
  if (!data) return;

  // Title
  document.getElementById('league-title').innerText = `${data.name} Standings`;

  // Populate standings
  const tbody = document.getElementById('league-standing-body');
  tbody.innerHTML = '';

  data.table.forEach(row => {
    // Generate form dots HTML
    let formDots = '';
    row.form.forEach(f => {
      const letter = f.toLowerCase();
      formDots += `<span class="form-dot form-${letter}" title="${f}"></span>`;
    });

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${row.rank}</td>
      <td><strong>${row.team}</strong></td>
      <td>${row.mp}</td>
      <td>${row.w}</td>
      <td>${row.d}</td>
      <td>${row.l}</td>
      <td>${row.gd > 0 ? '+' + row.gd : row.gd}</td>
      <td style="font-weight: 700; color: #10b981;">${row.pts}</td>
      <td class="hide-mobile">${formDots}</td>
    `;
    tbody.appendChild(tr);
  });

  // Populate Scorers leaderboard
  const scorersList = document.getElementById('top-scorers-list');
  scorersList.innerHTML = '';
  data.scorers.forEach(s => {
    const item = document.createElement('div');
    item.className = 'leaderboard-item';
    item.innerHTML = `
      <div>
        <div class="leader-name">${s.name}</div>
        <div class="leader-team">${s.team}</div>
      </div>
      <div class="leader-val">${s.goals} G</div>
    `;
    scorersList.appendChild(item);
  });

  // Populate Assisters leaderboard
  const assistsList = document.getElementById('top-assisters-list');
  assistsList.innerHTML = '';
  data.assists.forEach(a => {
    const item = document.createElement('div');
    item.className = 'leaderboard-item';
    item.innerHTML = `
      <div>
        <div class="leader-name">${a.name}</div>
        <div class="leader-team">${a.team}</div>
      </div>
      <div class="leader-val">${a.assists} A</div>
    `;
    assistsList.appendChild(item);
  });
}

// Bind Stats Hub internal sub-tabs
function initStatsHubTabs() {
  const buttons = document.querySelectorAll('.hub-tab-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentHubLeague = btn.getAttribute('data-league');
      renderStatsHub(currentHubLeague);
    });
  });

  renderStatsHub(currentHubLeague);
}

// Bind Match center simulation buttons
function setupMatchSimulatorBindings() {
  document.getElementById('btn-start-sim').addEventListener('click', toggleSimulation);
  document.getElementById('btn-reset-sim').addEventListener('click', resetSimulation);
}

// Bootstrapper
document.addEventListener('DOMContentLoaded', () => {
  // 1. Setup Tab Navigation
  setupTabNavigation();

  // 2. Setup Dashboard Featured link listeners
  setupDashboardBindings();

  // 3. Initialize Player selector dropdowns
  initPlayerSelectors((p1, p2) => {
    player1Selected = p1;
    player2Selected = p2;
    renderPlayerComparison(p1, p2);
  });

  // 4. Run initial player comparison render
  renderPlayerComparison(player1Selected, player2Selected);

  // 5. Initialize match simulator presets
  initMatchCenter();
  setupMatchSimulatorBindings();

  // 6. Initialize stats hub tables
  initStatsHubTabs();

  // 7. Initialize Chatbot
  initChatbot();

  // 8. Initialize Team Comparison
  initTeamSelectors((t1, t2) => {
    renderTeamComparison(t1, t2);
  });
  renderTeamComparison('real_madrid', 'barcelona');
});
