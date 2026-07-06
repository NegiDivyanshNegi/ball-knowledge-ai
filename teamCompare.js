// Team Comparison Engine

import { teams, nationalTeams } from './statsData.js';

// Get team (checks clubs and national teams)
function getTeamData(id) {
  return teams[id] || nationalTeams[id];
}

export function initTeamSelectors(onChangeCallback) {
  const t1Select = document.getElementById('select-team-1');
  const t2Select = document.getElementById('select-team-2');

  t1Select.addEventListener('change', (e) => {
    const t1 = e.target.value;
    const t2 = t2Select.value;
    if (t1 === t2) {
      const nextOpt = Array.from(t2Select.options).find(opt => opt.value !== t1);
      t2Select.value = nextOpt.value;
    }
    onChangeCallback(t1Select.value, t2Select.value);
  });

  t2Select.addEventListener('change', (e) => {
    const t2 = e.target.value;
    const t1 = t1Select.value;
    if (t1 === t2) {
      const nextOpt = Array.from(t1Select.options).find(opt => opt.value !== t2);
      t1Select.value = nextOpt.value;
    }
    onChangeCallback(t1Select.value, t2Select.value);
  });
}

export function renderTeamComparison(t1Id, t2Id) {
  const t1 = getTeamData(t1Id);
  const t2 = getTeamData(t2Id);

  // 1. Update text metadata labels
  document.getElementById('t1-name').innerText = t1.name;
  document.getElementById('t2-name').innerText = t2.name;

  document.getElementById('t1-manager').innerText = t1.manager;
  document.getElementById('t2-manager').innerText = t2.manager;

  // If national team, show FIFA Rank instead of Stadium
  const t1VenueLabel = t1.stadium ? 'Stadium' : 'FIFA Rank';
  const t1VenueVal = t1.stadium ? t1.stadium : `#${t1.ranking}`;
  document.getElementById('t1-stadium').parentElement.innerHTML = `${t1VenueLabel}: <strong>${t1VenueVal}</strong>`;

  const t2VenueLabel = t2.stadium ? 'Stadium' : 'FIFA Rank';
  const t2VenueVal = t2.stadium ? t2.stadium : `#${t2.ranking}`;
  document.getElementById('t2-stadium').parentElement.innerHTML = `${t2VenueLabel}: <strong>${t2VenueVal}</strong>`;

  // Headers for comparison tables
  document.getElementById('table-t1-header').innerText = t1.name;
  document.getElementById('table-t2-header').innerText = t2.name;

  // 2. Populate star player list bullets
  const t1PlayersUl = document.getElementById('t1-key-players');
  t1PlayersUl.innerHTML = '';
  t1.keyPlayers.forEach(p => {
    const li = document.createElement('li');
    li.innerText = p;
    t1PlayersUl.appendChild(li);
  });

  const t2PlayersUl = document.getElementById('t2-key-players');
  t2PlayersUl.innerHTML = '';
  t2.keyPlayers.forEach(p => {
    const li = document.createElement('li');
    li.innerText = p;
    t2PlayersUl.appendChild(li);
  });

  // 3. Populate Trophy comparison table
  const tbody = document.getElementById('team-compare-body');
  tbody.innerHTML = '';

  // Determine compare metrics depending on whether we have club/national team
  const isClub1 = !!teams[t1Id];
  const isClub2 = !!teams[t2Id];

  let rowsHtml = '';

  // H2H stats (Wins, Draws, Losses, Points)
  rowsHtml += `
    <tr>
      <td>${t1.stats.wins}</td>
      <td class="metric-name">Form Wins</td>
      <td class="${t2.stats.wins > t1.stats.wins ? 'winner' : ''}">${t2.stats.wins}</td>
    </tr>
    <tr>
      <td>${t1.stats.gf}</td>
      <td class="metric-name">Form Goals Scored</td>
      <td class="${t2.stats.gf > t1.stats.gf ? 'winner' : ''}">${t2.stats.gf}</td>
    </tr>
    <tr>
      <td>${t1.stats.ga}</td>
      <td class="metric-name">Form Goals Conceded</td>
      <td class="${t2.stats.ga < t1.stats.ga ? 'winner' : ''}">${t2.stats.ga}</td>
    </tr>
  `;

  // Trophy list metrics
  if (isClub1 && isClub2) {
    // Both are clubs
    rowsHtml += `
      <tr>
        <td class="${t1.trophies.ucl > t2.trophies.ucl ? 'winner' : ''}">${t1.trophies.ucl}</td>
        <td class="metric-name">Champions Leagues</td>
        <td class="${t2.trophies.ucl > t1.trophies.ucl ? 'winner' : ''}">${t2.trophies.ucl}</td>
      </tr>
      <tr>
        <td class="${t1.trophies.league > t2.trophies.league ? 'winner' : ''}">${t1.trophies.league}</td>
        <td class="metric-name">League Titles</td>
        <td class="${t2.trophies.league > t1.trophies.league ? 'winner' : ''}">${t2.trophies.league}</td>
      </tr>
      <tr>
        <td class="${t1.trophies.domesticCup > t2.trophies.domesticCup ? 'winner' : ''}">${t1.trophies.domesticCup}</td>
        <td class="metric-name">Domestic Cups</td>
        <td class="${t2.trophies.domesticCup > t1.trophies.domesticCup ? 'winner' : ''}">${t2.trophies.domesticCup}</td>
      </tr>
    `;
  } else if (!isClub1 && !isClub2) {
    // Both are national teams
    rowsHtml += `
      <tr>
        <td class="${t1.trophies.worldCup > t2.trophies.worldCup ? 'winner' : ''}">${t1.trophies.worldCup}</td>
        <td class="metric-name">World Cups</td>
        <td class="${t2.trophies.worldCup > t1.trophies.worldCup ? 'winner' : ''}">${t2.trophies.worldCup}</td>
      </tr>
      <tr>
        <td class="${t1.trophies.continental > t2.trophies.continental ? 'winner' : ''}">${t1.trophies.continental}</td>
        <td class="metric-name">Continental Trophies</td>
        <td class="${t2.trophies.continental > t1.trophies.continental ? 'winner' : ''}">${t2.trophies.continental}</td>
      </tr>
      <tr>
        <td class="${t1.trophies.confederations > t2.trophies.confederations ? 'winner' : ''}">${t1.trophies.confederations}</td>
        <td class="metric-name">Confed. / Nations League</td>
        <td class="${t2.trophies.confederations > t1.trophies.confederations ? 'winner' : ''}">${t2.trophies.confederations}</td>
      </tr>
    `;
  } else {
    // Mixed compare (Club vs National)
    const t1TrophiesCount = t1.trophies.ucl !== undefined ? t1.trophies.ucl : t1.trophies.worldCup;
    const t2TrophiesCount = t2.trophies.ucl !== undefined ? t2.trophies.ucl : t2.trophies.worldCup;
    const t1Label = t1.trophies.ucl !== undefined ? 'UCL Cups' : 'World Cups';
    const t2Label = t2.trophies.ucl !== undefined ? 'UCL Cups' : 'World Cups';

    rowsHtml += `
      <tr>
        <td>${t1TrophiesCount} (${t1Label})</td>
        <td class="metric-name">Premier Honors</td>
        <td>${t2TrophiesCount} (${t2Label})</td>
      </tr>
    `;
  }

  tbody.innerHTML = rowsHtml;

  // 4. Update Graphic Trophy Shelf comparison
  const shelf = document.getElementById('trophy-shelf-compare');
  shelf.innerHTML = '';

  const mainT1Count = t1.trophies.ucl !== undefined ? t1.trophies.ucl : t1.trophies.worldCup;
  const mainT2Count = t2.trophies.ucl !== undefined ? t2.trophies.ucl : t2.trophies.worldCup;
  const mainLabel = t1.trophies.ucl !== undefined ? 'UCL' : 'World Cup';

  shelf.innerHTML = `
    <div class="trophy-visual-item">
      <i class="fa-solid fa-trophy trophy-icon"></i>
      <div class="trophy-count-bar">${t1.name}: ${mainT1Count} ${mainLabel}</div>
    </div>
    <div class="trophy-visual-item">
      <i class="fa-solid fa-trophy trophy-icon" style="color: #fbbf24"></i>
      <div class="trophy-count-bar">${t2.name}: ${mainT2Count} ${mainLabel}</div>
    </div>
  `;
}
