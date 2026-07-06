// Match Center: Live Simulator and Commentary Engine

import { matches, upcomingMatches, recentResults, teams, nationalTeams } from './statsData.js';

let simInterval = null;
let currentMinute = 0;
let matchActive = false;
let selectedMatchId = 'club_match';
let currentCommentaryIndex = 0;

// Stats state
let simStats = {
  homeGoals: 0,
  awayGoals: 0,
  homePoss: 50,
  awayPoss: 50,
  homeShots: 0,
  awayShots: 0,
  homeCorners: 0,
  awayCorners: 0,
  homeFouls: 0,
  awayFouls: 0
};

// Generic commentary lines to fill the gaps
const genericCommentary = [
  "A battle of tactics in the middle third. Neither team wants to commit too many bodies forward.",
  "Excellent pressing from the home side, recovering the ball quickly.",
  "A long ball forward is easily collected by the goalkeeper.",
  "The manager is gesturing frantically on the touchline, demanding more intensity.",
  "Neat triangular passing sequence in the midfield.",
  "The referee calls a player over for a verbal warning. No card issued.",
  "An offside flag goes up. Frustration for the forward who timed his run slightly early.",
  "Stoppage in play as a player receives quick treatment on the pitch.",
  "The crowd is chanting loudly, creating a wall of sound in the stadium.",
  "A speculative cross is floated in, but it sailed harmlessly out for a goal kick."
];

// Get team name from ID (works for both clubs and national teams)
function getTeamName(teamId) {
  if (teams[teamId]) return teams[teamId].name;
  if (nationalTeams[teamId]) return nationalTeams[teamId].name;
  return teamId;
}

// Render fixture lists
export function initSchedules() {
  const upcomingList = document.getElementById('upcoming-fixtures-list');
  const recentList = document.getElementById('recent-results-list');

  // 1. Upcoming
  upcomingList.innerHTML = '';
  upcomingMatches.forEach(f => {
    const homeName = getTeamName(f.home);
    const awayName = getTeamName(f.away);
    const div = document.createElement('div');
    div.className = 'fixture-item';
    div.innerHTML = `
      <div class="sched-left">
        <span class="sched-comp">${f.comp}</span>
        <span class="sched-teams">${homeName} vs. ${awayName}</span>
      </div>
      <div class="sched-right">
        <span class="sched-time">${f.time}</span>
        <div class="sched-countdown"><i class="fa-regular fa-clock"></i> ${f.countdown}</div>
      </div>
    `;
    upcomingList.appendChild(div);
  });

  // 2. Recent
  recentList.innerHTML = '';
  recentResults.forEach(r => {
    const homeName = getTeamName(r.home);
    const awayName = getTeamName(r.away);
    const div = document.createElement('div');
    div.className = 'result-item';
    div.innerHTML = `
      <div class="sched-left">
        <span class="sched-comp">${r.comp}</span>
        <span class="sched-teams">${homeName} vs. ${awayName}</span>
      </div>
      <div class="result-score">${r.score}</div>
    `;
    recentList.appendChild(div);
  });
}

// Update HUD & Stats UI
function updateSimUI(match) {
  const homeName = getTeamName(match.home);
  const awayName = getTeamName(match.away);

  // Home / Away HUD
  document.getElementById('hud-match-title').innerText = match.title;
  document.getElementById('hud-home-name').innerText = homeName;
  document.getElementById('hud-away-name').innerText = awayName;
  document.getElementById('hud-score').innerText = `${simStats.homeGoals} - ${simStats.awayGoals}`;
  
  // Time
  let timeStr = `${currentMinute}'`;
  if (currentMinute === 45) timeStr = "45' (HT)";
  if (currentMinute >= 90 && currentCommentaryIndex >= match.commentaryPool.length - 1) {
    timeStr = "90' (FT)";
    document.getElementById('hud-time').classList.remove('pulse-on');
  } else {
    document.getElementById('hud-time').classList.add('pulse-on');
  }
  document.getElementById('hud-time').innerText = timeStr;

  // Stat progress bars
  document.getElementById('stat-home-poss').innerText = `${simStats.homePoss}%`;
  document.getElementById('stat-away-poss').innerText = `${simStats.awayPoss}%`;
  document.getElementById('bar-home-poss').style.width = `${simStats.homePoss}%`;
  document.getElementById('bar-away-poss').style.width = `${simStats.awayPoss}%`;

  document.getElementById('stat-home-shots').innerText = simStats.homeShots;
  document.getElementById('stat-away-shots').innerText = simStats.awayShots;
  const totalShots = Math.max(simStats.homeShots + simStats.awayShots, 1);
  document.getElementById('bar-home-shots').style.width = `${(simStats.homeShots / totalShots) * 100}%`;
  document.getElementById('bar-away-shots').style.width = `${(simStats.awayShots / totalShots) * 100}%`;

  document.getElementById('stat-home-corners').innerText = simStats.homeCorners;
  document.getElementById('stat-away-corners').innerText = simStats.awayCorners;
  const totalCorners = Math.max(simStats.homeCorners + simStats.awayCorners, 1);
  document.getElementById('bar-home-corners').style.width = `${(simStats.homeCorners / totalCorners) * 100}%`;
  document.getElementById('bar-away-corners').style.width = `${(simStats.awayCorners / totalCorners) * 100}%`;

  document.getElementById('stat-home-fouls').innerText = simStats.homeFouls;
  document.getElementById('stat-away-fouls').innerText = simStats.awayFouls;
  const totalFouls = Math.max(simStats.homeFouls + simStats.awayFouls, 1);
  document.getElementById('bar-home-fouls').style.width = `${(simStats.homeFouls / totalFouls) * 100}%`;
  document.getElementById('bar-away-fouls').style.width = `${(simStats.awayFouls / totalFouls) * 100}%`;
}

// Reset stats
export function resetSimulation() {
  if (simInterval) clearInterval(simInterval);
  matchActive = false;
  currentMinute = 0;
  currentCommentaryIndex = 0;
  
  simStats = {
    homeGoals: 0,
    awayGoals: 0,
    homePoss: 50,
    awayPoss: 50,
    homeShots: 0,
    awayShots: 0,
    homeCorners: 0,
    awayCorners: 0,
    homeFouls: 0,
    awayFouls: 0
  };

  const startBtn = document.getElementById('btn-start-sim');
  startBtn.innerHTML = `<i class="fa-solid fa-play"></i> Start Match`;
  startBtn.classList.remove('btn-secondary');
  startBtn.classList.add('btn-primary');

  // Clear display
  const match = matches[selectedMatchId];
  updateSimUI(match);
  document.getElementById('commentary-list').innerHTML = `<p class="empty-feed-msg">Simulator idle. Choose a match and click "Start Match" to simulate the action.</p>`;
  document.getElementById('hud-events').innerHTML = '';
}

// Run single simulation tick
function simTick(match) {
  currentMinute++;

  // Stat Jitter
  // Randomly sway possession slightly
  const sway = Math.floor(Math.random() * 3) - 1; // -1, 0, 1
  simStats.homePoss = Math.min(Math.max(simStats.homePoss + sway, 35), 65);
  simStats.awayPoss = 100 - simStats.homePoss;

  // Occasional random generic shot/foul increases in between commentaries
  if (Math.random() < 0.04) {
    if (Math.random() < 0.5) simStats.homeFouls++; else simStats.awayFouls++;
  }
  if (Math.random() < 0.03) {
    if (Math.random() < 0.5) { simStats.homeShots++; simStats.homeCorners += (Math.random() < 0.4 ? 1 : 0); }
    else { simStats.awayShots++; simStats.awayCorners += (Math.random() < 0.4 ? 1 : 0); }
  }

  const commentaryList = document.getElementById('commentary-list');
  const pool = match.commentaryPool;

  // Check if there is an event matching this minute
  const nextEvent = pool[currentCommentaryIndex];
  
  if (nextEvent && currentMinute >= nextEvent.time) {
    const isGoal = nextEvent.text.includes("GOAL!");
    const isRed = nextEvent.text.includes("Red Card") || nextEvent.text.includes("dismissed");
    const isYellow = nextEvent.text.includes("Yellow Card") || nextEvent.text.includes("cautions");
    
    // Parse who it was for
    // A simplified keyword search to allocate goals
    const isHomeAction = checkHomeKeywords(nextEvent.text, match.home);

    // Apply main match events
    if (isGoal) {
      if (isHomeAction) {
        simStats.homeGoals++;
        simStats.homeShots++;
      } else {
        simStats.awayGoals++;
        simStats.awayShots++;
      }
      
      // Goal alert on UI
      flashScoreHUD();
      addEventBadge('goal', nextEvent.time, nextEvent.text);
    } else if (isYellow) {
      if (isHomeAction) simStats.homeFouls++; else simStats.awayFouls++;
      addEventBadge('yellow', nextEvent.time, nextEvent.text);
    } else if (isRed) {
      if (isHomeAction) simStats.homeFouls++; else simStats.awayFouls++;
      addEventBadge('red', nextEvent.time, nextEvent.text);
    }

    // Append commentary
    appendCommentary(nextEvent.time, nextEvent.text, isGoal);
    currentCommentaryIndex++;
  } else {
    // Fill the empty minute gap occasionally (15% chance)
    if (Math.random() < 0.15 && currentMinute < 90) {
      const idx = Math.floor(Math.random() * genericCommentary.length);
      appendCommentary(currentMinute, genericCommentary[idx], false);
    }
  }

  updateSimUI(match);

  // Match end condition
  if (currentMinute >= 95 || currentCommentaryIndex >= pool.length) {
    clearInterval(simInterval);
    matchActive = false;
    const startBtn = document.getElementById('btn-start-sim');
    startBtn.innerHTML = `<i class="fa-solid fa-flag-checkered"></i> Match Ended`;
    startBtn.disabled = true;
  }
}

// Utility keyword search
function checkHomeKeywords(text, homeTeamId) {
  const homeTeam = teams[homeTeamId] || nationalTeams[homeTeamId];
  const keys = [homeTeamId, homeTeam.name, homeTeam.shortName];
  
  if (homeTeamId === 'real_madrid') keys.push("Bellingham", "Mbappé", "Vinicius", "Los Blancos", "Valverde", "Courtois");
  if (homeTeamId === 'argentina') keys.push("Messi", "Martínez", "Lautaro", "Álvarez", "De Paul", "Enzo");

  return keys.some(k => text.toLowerCase().includes(k.toLowerCase()));
}

// Visual alerts
function flashScoreHUD() {
  const display = document.getElementById('hud-score');
  display.style.animation = 'none';
  setTimeout(() => {
    display.style.animation = 'logoPulse 0.5s 3 ease-in-out';
  }, 10);
}

function appendCommentary(time, text, isGoal) {
  const list = document.getElementById('commentary-list');
  
  // Remove idle msg
  const idle = list.querySelector('.empty-feed-msg');
  if (idle) idle.remove();

  const p = document.createElement('div');
  p.className = `commentary-row ${isGoal ? 'event-goal' : ''}`;
  p.innerHTML = `<span class="comm-time">${time}'</span> <span class="comm-text">${text}</span>`;
  
  list.insertBefore(p, list.firstChild); // Prepend new comments
}

function addEventBadge(type, time, text) {
  const bar = document.getElementById('hud-events');
  let icon = 'fa-futbol';
  let label = 'GOAL';
  let cls = 'badge-accent';

  if (type === 'yellow') {
    icon = 'fa-copy text-accent';
    label = 'YC';
    cls = 'event-ticker';
  } else if (type === 'red') {
    icon = 'fa-copy text-danger';
    label = 'RC';
    cls = 'event-ticker';
  }

  // Parse scorer or carded player
  let player = '';
  const match = text.match(/([A-Z][a-z]+(\s[A-Z][a-z]+)?)/);
  if (match) player = match[1];

  const badge = document.createElement('span');
  badge.className = cls;
  badge.innerHTML = `<i class="fa-solid ${icon}"></i> ${time}' ${player}`;
  bar.appendChild(badge);
}

// Start/Pause Toggle
export function toggleSimulation() {
  const match = matches[selectedMatchId];
  const startBtn = document.getElementById('btn-start-sim');

  if (matchActive) {
    // Pause
    clearInterval(simInterval);
    matchActive = false;
    startBtn.innerHTML = `<i class="fa-solid fa-play"></i> Resume`;
  } else {
    // Start
    matchActive = true;
    startBtn.innerHTML = `<i class="fa-solid fa-pause"></i> Pause`;
    startBtn.classList.remove('btn-primary');
    startBtn.classList.add('btn-secondary');

    const speed = parseInt(document.getElementById('sim-speed').value);
    
    // If it's a completely fresh run
    const list = document.getElementById('commentary-list');
    if (currentMinute === 0 && list.querySelector('.empty-feed-msg')) {
      list.innerHTML = '';
      // Pre-push the 0' kickoff comment
      const kickoff = match.commentaryPool[0];
      appendCommentary(kickoff.time, kickoff.text, false);
      currentCommentaryIndex = 1;
    }

    simInterval = setInterval(() => {
      simTick(match);
    }, speed);
  }
}

// Initialize Preset Selector
export function initMatchCenter() {
  const matchSelect = document.getElementById('select-match');
  const speedSelect = document.getElementById('sim-speed');

  matchSelect.addEventListener('change', (e) => {
    selectedMatchId = e.target.value;
    resetSimulation();
  });

  speedSelect.addEventListener('change', () => {
    if (matchActive) {
      // Re-initialize timer with new speed
      clearInterval(simInterval);
      const match = matches[selectedMatchId];
      const speed = parseInt(speedSelect.value);
      simInterval = setInterval(() => {
        simTick(match);
      }, speed);
    }
  });

  // Load presets
  resetSimulation();
  initSchedules();
}
