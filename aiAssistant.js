// Football Stats AI Assistant Chatbot Engine

import { players, teams, nationalTeams, leagues } from './statsData.js';

// Clean input string
function cleanText(text) {
  return text.toLowerCase().trim().replace(/[?.,!]/g, '');
}

// Parse user message and return custom bot HTML response
export function generateAIResponse(userMessage) {
  const query = cleanText(userMessage);

  // 1. MATCH PLAYER COMPARISON
  if (query.includes('compare')) {
    // Try to extract two players from the query
    const keys = Object.keys(players);
    const found = [];
    keys.forEach(k => {
      if (query.includes(k) || query.includes(players[k].name.toLowerCase()) || (k === 'r9' && query.includes('ronaldo nazario'))) {
        found.push(k);
      }
    });

    // Special checks for names like "messi", "ronaldo", "r9"
    if (found.length < 2) {
      if (query.includes('messi') && !found.includes('messi')) found.push('messi');
      if (query.includes('ronaldo') && !found.includes('ronaldo') && !query.includes('nazario') && !query.includes('r9')) found.push('ronaldo');
      if ((query.includes('r9') || query.includes('phenomenon') || query.includes('nazario')) && !found.includes('r9')) found.push('r9');
      if (query.includes('pele') && !found.includes('pele')) found.push('pele');
      if (query.includes('maradona') && !found.includes('maradona')) found.push('maradona');
      if (query.includes('haaland') && !found.includes('haaland')) found.push('haaland');
      if (query.includes('mbappe') && !found.includes('mbappe')) found.push('mbappe');
      if (query.includes('salah') && !found.includes('salah')) found.push('salah');
      if (query.includes('zidane') && !found.includes('zidane')) found.push('zidane');
      if (query.includes('cruyff') && !found.includes('cruyff')) found.push('cruyff');
      if (query.includes('ronaldinho') && !found.includes('ronaldinho')) found.push('ronaldinho');
      if (query.includes('de bruyne') && !found.includes('debruyne')) found.push('debruyne');
    }

    if (found.length >= 2) {
      const p1 = players[found[0]];
      const p2 = players[found[1]];
      return buildComparisonResponse(p1, p2);
    }
  }

  // 2. MATCH STANDINGS / LEAGUE TABLE
  if (query.includes('table') || query.includes('standing') || query.includes('standings')) {
    if (query.includes('premier') || query.includes('pl') || query.includes('english')) {
      return buildStandingsResponse('premier_league');
    }
    if (query.includes('la liga') || query.includes('spanish') || query.includes('la_liga')) {
      return buildStandingsResponse('la_liga');
    }
  }

  // 3. MATCH LEADERS (TOP SCORERS / ASSISTERS)
  if (query.includes('scorer') || query.includes('scorers') || query.includes('goals')) {
    if (query.includes('premier') || query.includes('pl')) {
      return buildLeadersResponse('premier_league', 'scorers');
    }
    if (query.includes('la liga') || query.includes('la_liga')) {
      return buildLeadersResponse('la_liga', 'scorers');
    }
  }
  if (query.includes('assist') || query.includes('assists') || query.includes('assisters')) {
    if (query.includes('premier') || query.includes('pl')) {
      return buildLeadersResponse('premier_league', 'assists');
    }
    if (query.includes('la liga') || query.includes('la_liga')) {
      return buildLeadersResponse('la_liga', 'assists');
    }
  }

  // 4. MATCH TROPHIES FOR TEAM
  if (query.includes('trophy') || query.includes('trophies') || query.includes('champions league') || query.includes('title') || query.includes('titles')) {
    // Search teams database
    const tKeys = Object.keys(teams);
    let matchedTeam = null;
    tKeys.forEach(tk => {
      if (query.includes(tk.replace('_', ' ')) || query.includes(teams[tk].name.toLowerCase()) || query.includes(teams[tk].shortName.toLowerCase())) {
        matchedTeam = teams[tk];
      }
    });

    const ntKeys = Object.keys(nationalTeams);
    let matchedNatTeam = null;
    ntKeys.forEach(ntk => {
      if (query.includes(ntk) || query.includes(nationalTeams[ntk].name.toLowerCase())) {
        matchedNatTeam = nationalTeams[ntk];
      }
    });

    if (matchedTeam) {
      return buildTeamTrophiesResponse(matchedTeam);
    }
    if (matchedNatTeam) {
      return buildNatTeamTrophiesResponse(matchedNatTeam);
    }
  }

  // 5. MATCH INDIVIDUAL PLAYER SEARCH
  const pKeys = Object.keys(players);
  let matchedPlayer = null;
  pKeys.forEach(pk => {
    if (query.includes(pk) || query.includes(players[pk].name.toLowerCase()) || (pk === 'debruyne' && query.includes('de bruyne')) || (pk === 'r9' && query.includes('ronaldo nazario'))) {
      matchedPlayer = players[pk];
    }
  });
  if (matchedPlayer) {
    return buildPlayerStatsResponse(matchedPlayer);
  }

  // 6. DEFAULT FALLBACK
  return `
    <p>I couldn't resolve specific records for that query. My database holds information on: </p>
    <ul style="margin-top: 0.5rem; margin-left: 1.25rem;">
      <li><strong>Players:</strong> Messi, Ronaldo, Haaland, Mbappé, De Bruyne, Salah, Pelé, Maradona, Zidane, Ronaldinho, Cruyff, R9.</li>
      <li><strong>Teams:</strong> Real Madrid, Barcelona, Man City, Liverpool, Arsenal, Bayern Munich, PSG, Juventus, Argentina, France, Brazil, Portugal, Spain, England.</li>
      <li><strong>Leagues:</strong> Premier League, La Liga standings and goal leaders.</li>
    </ul>
    <p style="margin-top: 0.5rem;">Try asking: <em>"Compare Zidane and De Bruyne"</em> or <em>"Show Premier League standings"</em>.</p>
  `;
}

// HTML Builder Helpers

function buildComparisonResponse(p1, p2) {
  return `
    <p><strong>Ball Knowledge AI Analysis:</strong> Here is a quick comparison table between <strong>${p1.name}</strong> and <strong>${p2.name}</strong>:</p>
    <table class="chat-table">
      <thead>
        <tr>
          <th>Metric</th>
          <th>${p1.name}</th>
          <th>${p2.name}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Appearances</td>
          <td>${p1.stats.apps}</td>
          <td>${p2.stats.apps}</td>
        </tr>
        <tr>
          <td>Goals</td>
          <td style="color: ${parseInt(p1.stats.goals) > parseInt(p2.stats.goals) ? '#00ff87' : 'inherit'}">${p1.stats.goals}</td>
          <td style="color: parseInt(p2.stats.goals) > parseInt(p1.stats.goals) ? '#00ff87' : 'inherit'}">${p2.stats.goals}</td>
        </tr>
        <tr>
          <td>Assists</td>
          <td style="color: ${parseInt(p1.stats.assists) > parseInt(p2.stats.assists) ? '#00ff87' : 'inherit'}">${p1.stats.assists}</td>
          <td style="color: ${parseInt(p2.stats.assists) > parseInt(p1.stats.assists) ? '#00ff87' : 'inherit'}">${p2.stats.assists}</td>
        </tr>
        <tr>
          <td>Ballon d'Ors</td>
          <td>${p1.stats.ballonDor}</td>
          <td>${p2.stats.ballonDor}</td>
        </tr>
        <tr>
          <td>Trophies</td>
          <td>${p1.stats.trophies}</td>
          <td>${p2.stats.trophies}</td>
        </tr>
      </tbody>
    </table>
    <p style="margin-top: 0.75rem;"><strong>Summary:</strong> ${p1.name} has a goal-per-game ratio of <strong>${(p1.stats.goals / p1.stats.apps).toFixed(2)}</strong>, while ${p2.name} is averaging <strong>${(p2.stats.goals / p2.stats.apps).toFixed(2)}</strong>. You can view their full attribute charts in the <strong>Player Compare</strong> tab!</p>
  `;
}

function buildStandingsResponse(leagueKey) {
  const league = leagues[leagueKey];
  let rows = '';
  league.table.forEach(t => {
    rows += `
      <tr>
        <td>${t.rank}</td>
        <td style="text-align: left;">${t.team}</td>
        <td>${t.mp}</td>
        <td>${t.gd}</td>
        <td style="font-weight: 700; color: #00ff87;">${t.pts}</td>
      </tr>
    `;
  });

  return `
    <p>Here are the active standings for the <strong>${league.name}</strong>:</p>
    <table class="chat-table">
      <thead>
        <tr>
          <th>Rank</th>
          <th style="text-align: left;">Club</th>
          <th>Played</th>
          <th>GD</th>
          <th>Pts</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
    <p style="margin-top: 0.5rem; font-size: 0.8rem; color: #9ca3af;">Navigate to the <strong>Stats Hub</strong> tab to view team forms and visual tables.</p>
  `;
}

function buildLeadersResponse(leagueKey, type) {
  const league = leagues[leagueKey];
  const list = league[type];
  const label = type === 'scorers' ? 'Goals' : 'Assists';
  
  let rows = '';
  list.forEach((player, i) => {
    const val = type === 'scorers' ? player.goals : player.assists;
    rows += `
      <tr>
        <td>${i+1}</td>
        <td style="text-align: left;">${player.name}</td>
        <td>${player.team}</td>
        <td style="font-weight: 700; color: #00ff87;">${val}</td>
      </tr>
    `;
  });

  return `
    <p>Top 5 <strong>${type === 'scorers' ? 'Goalscorers' : 'Playmakers'}</strong> in the <strong>${league.name}</strong>:</p>
    <table class="chat-table">
      <thead>
        <tr>
          <th>Rank</th>
          <th style="text-align: left;">Player</th>
          <th>Club</th>
          <th>${label}</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  `;
}

function buildTeamTrophiesResponse(team) {
  return `
    <p>Trophy cabinet breakdown for <strong>${team.name}</strong>:</p>
    <ul style="margin-top: 0.5rem; margin-left: 1.25rem;">
      <li>🏆 <strong>UEFA Champions Leagues:</strong> ${team.trophies.ucl}</li>
      <li>🛡️ <strong>Domestic League Titles:</strong> ${team.trophies.league}</li>
      <li>🍷 <strong>Domestic Cups:</strong> ${team.trophies.domesticCup}</li>
      <li>🌍 <strong>FIFA Club World Cups:</strong> ${team.trophies.clubWorldCup}</li>
    </ul>
    <p style="margin-top: 0.5rem;">Their current manager is <strong>${team.manager}</strong> playing in the historic <strong>${team.stadium}</strong>.</p>
  `;
}

function buildNatTeamTrophiesResponse(nt) {
  return `
    <p>Trophy cabinet breakdown for the National Team of <strong>${nt.name}</strong> (Rank #${nt.ranking}):</p>
    <ul style="margin-top: 0.5rem; margin-left: 1.25rem;">
      <li>🌍 <strong>FIFA World Cups:</strong> ${nt.trophies.worldCup}</li>
      <li>🏆 <strong>Continental Cups (Euros/Copa):</strong> ${nt.trophies.continental}</li>
      <li>✨ <strong>Confederations/Nations Leagues:</strong> ${nt.trophies.confederations}</li>
    </ul>
    <p style="margin-top: 0.5rem;">They are currently managed by <strong>${nt.manager}</strong> with key stars like <em>${nt.keyPlayers.join(', ')}</em>.</p>
  `;
}

function buildPlayerStatsResponse(p) {
  return `
    <p><strong>${p.name}</strong> (${p.role}) stats profile:</p>
    <ul style="margin-top: 0.5rem; margin-left: 1.25rem; font-size: 0.85rem;">
      <li>🏟️ <strong>Appearances:</strong> ${p.stats.apps}</li>
      <li>⚽ <strong>Goals:</strong> ${p.stats.goals} (ratio: ${(p.stats.goals / p.stats.apps).toFixed(2)} per game)</li>
      <li>🎯 <strong>Assists:</strong> ${p.stats.assists}</li>
      <li>⭐️ <strong>Ballon d'Ors:</strong> ${p.stats.ballonDor}</li>
      <li>🏆 <strong>Trophies Won:</strong> ${p.stats.trophies}</li>
      <li>📈 <strong>Passing Accuracy:</strong> ${p.stats.passAccuracy}</li>
      <li>👟 <strong>Completed Dribbles / 90:</strong> ${p.stats.dribbles}</li>
    </ul>
    <p style="margin-top: 0.5rem; font-style: italic; font-size: 0.85rem; color: #9ca3af;">"${p.info}"</p>
  `;
}

// Append new message to chat thread
export function appendChatMessage(sender, text, isHtml = false) {
  const container = document.getElementById('chat-messages');
  const msgDiv = document.createElement('div');
  msgDiv.className = `message ${sender === 'user' ? 'user-msg' : 'bot-msg'}`;

  const avatar = sender === 'user' 
    ? '<i class="fa-solid fa-user-astronaut"></i>' 
    : '<i class="fa-solid fa-robot"></i>';

  msgDiv.innerHTML = `
    <div class="msg-avatar">${avatar}</div>
    <div class="msg-text">${isHtml ? text : escapeHtml(text)}</div>
  `;

  container.appendChild(msgDiv);
  container.scrollTop = container.scrollHeight;
}

// Show animated typing bubbles
let typingIndicator = null;

export function showTypingIndicator() {
  const container = document.getElementById('chat-messages');
  
  if (typingIndicator) return;

  typingIndicator = document.createElement('div');
  typingIndicator.className = 'message bot-msg typing-msg';
  typingIndicator.innerHTML = `
    <div class="msg-avatar"><i class="fa-solid fa-robot"></i></div>
    <div class="msg-text"><i class="fa-solid fa-ellipsis fa-fade"></i> AI is thinking...</div>
  `;
  container.appendChild(typingIndicator);
  container.scrollTop = container.scrollHeight;
}

export function removeTypingIndicator() {
  if (typingIndicator) {
    typingIndicator.remove();
    typingIndicator = null;
  }
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

// Bind event listeners
export function initChatbot() {
  const input = document.getElementById('chat-input');
  const sendBtn = document.getElementById('btn-send-chat');
  const clearBtn = document.getElementById('btn-clear-chat');
  const suggestions = document.querySelectorAll('.suggestion-pill');

  function handleSend() {
    const text = input.value.trim();
    if (!text) return;

    // Send user message
    appendChatMessage('user', text);
    input.value = '';

    // Show typing, resolve answer
    showTypingIndicator();

    setTimeout(() => {
      removeTypingIndicator();
      const botResponse = generateAIResponse(text);
      appendChatMessage('bot', botResponse, true);
    }, 800 + Math.random() * 600); // realistic thinking jitter
  }

  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
  });

  sendBtn.addEventListener('click', handleSend);

  clearBtn.addEventListener('click', () => {
    const container = document.getElementById('chat-messages');
    container.innerHTML = `
      <div class="message system-msg">
        <i class="fa-solid fa-shield-halved text-accent"></i>
        <span>Chat thread cleared. Ask new questions about football stats.</span>
      </div>
    `;
  });

  suggestions.forEach(pill => {
    pill.addEventListener('click', () => {
      const text = pill.innerText;
      input.value = text;
      handleSend();
    });
  });
}
