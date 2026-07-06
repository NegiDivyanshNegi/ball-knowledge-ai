// Player Comparison Engine and AI Debate Judge

import { players } from './statsData.js';

let radarChartInstance = null;

// Initialize dropdown selectors
export function initPlayerSelectors(onChangeCallback) {
  const p1Select = document.getElementById('select-player-1');
  const p2Select = document.getElementById('select-player-2');

  p1Select.addEventListener('change', (e) => {
    const p1 = e.target.value;
    const p2 = p2Select.value;
    if (p1 === p2) {
      // Prevent selecting the same player
      const nextSiblingOption = Array.from(p2Select.options).find(opt => opt.value !== p1);
      p2Select.value = nextSiblingOption.value;
    }
    onChangeCallback(p1Select.value, p2Select.value);
  });

  p2Select.addEventListener('change', (e) => {
    const p2 = e.target.value;
    const p1 = p1Select.value;
    if (p1 === p2) {
      const nextSiblingOption = Array.from(p1Select.options).find(opt => opt.value !== p2);
      p1Select.value = nextSiblingOption.value;
    }
    onChangeCallback(p1Select.value, p2Select.value);
  });
}

// Map zones to highlight on pitch
const playerHeatmaps = {
  messi: {
    cells1: [10, 11, 7, 8], // Right side & half space, attacking
    cells2: [4, 5]
  },
  ronaldo: {
    cells1: [9, 10, 6, 7], // Left side & center striker, attacking
    cells2: [3, 4]
  },
  haaland: {
    cells1: [10, 7], // Central spearhead, deep inside box
    cells2: [9, 11]
  },
  mbappe: {
    cells1: [9, 6, 10], // Left wing and channel
    cells2: [3]
  },
  debruyne: {
    cells1: [7, 8, 4, 5], // Midfield controller, right-half channel
    cells2: [1, 2]
  },
  salah: {
    cells1: [11, 8], // Right winger, cutting inside
    cells2: [7]
  },
  pele: {
    cells1: [10, 7, 8], // Center striker, flexible inside forward
    cells2: [4]
  },
  maradona: {
    cells1: [7, 8, 4], // Deep playmaker, free role
    cells2: [5, 10]
  },
  zidane: {
    cells1: [6, 7, 3, 4], // Left-center midfield artist
    cells2: [5]
  },
  cruyff: {
    cells1: [7, 10, 6], // Dynamic total-football floating zones
    cells2: [4, 9, 11]
  },
  ronaldinho: {
    cells1: [9, 6, 7], // Left winger, trickster zone
    cells2: [3, 4]
  },
  r9: {
    cells1: [10, 7], // Central striker, explosive runs
    cells2: [9, 11, 4]
  }
};

// Heatmap draw
function updateHeatmap(playerKey, pitchElementId) {
  const pitch = document.getElementById(pitchElementId);
  const cells = pitch.querySelectorAll('.grid-cell');
  
  // Reset all cells
  cells.forEach(cell => {
    cell.classList.remove('heatmap-high', 'heatmap-mid');
  });

  const heatmap = playerHeatmaps[playerKey];
  if (!heatmap) return;

  // Apply indices
  heatmap.cells1.forEach(idx => {
    if (cells[idx]) cells[idx].classList.add('heatmap-high');
  });
  heatmap.cells2.forEach(idx => {
    if (cells[idx]) cells[idx].classList.add('heatmap-mid');
  });
}

// Compare stats values to decide winner class
function parseStatValue(val, key) {
  if (typeof val === 'string') {
    if (val.includes('%')) {
      return parseFloat(val.replace('%', ''));
    }
    if (val.includes('/')) {
      // Penalty ratio e.g., "109/140"
      const parts = val.split('/');
      return parseFloat(parts[0]); // Compare by successful penalties
    }
    return parseFloat(val);
  }
  return val;
}

// Render player data
export function renderPlayerComparison(p1Id, p2Id) {
  const p1 = players[p1Id];
  const p2 = players[p2Id];

  // 1. Profile bios
  document.getElementById('p1-name').innerText = p1.name;
  document.getElementById('p1-club').innerText = p1.club;
  document.getElementById('p1-country').innerText = p1.country;
  document.getElementById('p1-desc').innerText = p1.info;

  document.getElementById('p2-name').innerText = p2.name;
  document.getElementById('p2-club').innerText = p2.club;
  document.getElementById('p2-country').innerText = p2.country;
  document.getElementById('p2-desc').innerText = p2.info;

  // Header updates
  document.getElementById('table-p1-header').innerText = p1.name;
  document.getElementById('table-p2-header').innerText = p2.name;
  document.getElementById('pitch-p1-label').innerText = p1.name;
  document.getElementById('pitch-p2-label').innerText = p2.name;

  // 2. Heatmaps
  updateHeatmap(p1Id, 'pitch-p1');
  updateHeatmap(p2Id, 'pitch-p2');

  // 3. Stats Table Row Population
  const tableBody = document.getElementById('compare-table-body');
  tableBody.innerHTML = '';

  const metrics = [
    { key: 'apps', name: 'Appearances', higherBetter: true },
    { key: 'goals', name: 'Total Goals', higherBetter: true },
    { key: 'assists', name: 'Total Assists', higherBetter: true },
    { key: 'uclGoals', name: 'Champions League Goals', higherBetter: true },
    { key: 'worldCupGoals', name: 'World Cup Goals', higherBetter: true },
    { key: 'ballonDor', name: "Ballon d'Ors", higherBetter: true },
    { key: 'goldenBoots', name: 'Golden Boots', higherBetter: true },
    { key: 'trophies', name: 'Total Trophies', higherBetter: true },
    { key: 'passAccuracy', name: 'Passing Accuracy', higherBetter: true },
    { key: 'keyPasses', name: 'Key Passes per 90', higherBetter: true },
    { key: 'dribbles', name: 'Completed Dribbles per 90', higherBetter: true },
    { key: 'defActions', name: 'Defensive Actions per 90', higherBetter: true },
    { key: 'penalties', name: 'Penalties (Scored/Taken)', higherBetter: true }
  ];

  metrics.forEach(m => {
    const val1 = p1.stats[m.key];
    const val2 = p2.stats[m.key];

    const num1 = parseStatValue(val1, m.key);
    const num2 = parseStatValue(val2, m.key);

    let class1 = '';
    let class2 = '';

    if (num1 > num2 && m.higherBetter) {
      class1 = p1.type === 'legend' ? 'legend-winner' : 'winner';
    } else if (num2 > num1 && m.higherBetter) {
      class2 = p2.type === 'legend' ? 'legend-winner' : 'winner';
    }

    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="${class1}">${val1}</td>
      <td class="metric-name">${m.name}</td>
      <td class="${class2}">${val2}</td>
    `;
    tableBody.appendChild(row);
  });

  // 4. Radar Chart rendering
  renderRadarChart(p1, p2);

  // 5. Run AI Debate Judge
  triggerAIDebateJudge(p1, p2);
}

// Chart.js Radar Render
function renderRadarChart(p1, p2) {
  const ctx = document.getElementById('radarChart').getContext('2d');
  
  if (radarChartInstance) {
    radarChartInstance.destroy();
  }

  const p1Color = p1.type === 'legend' ? '#fbbf24' : '#10b981';
  const p1Glow = p1.type === 'legend' ? 'rgba(251, 191, 36, 0.2)' : 'rgba(16, 185, 129, 0.2)';
  
  const p2Color = p2.type === 'legend' ? '#fbbf24' : '#3b82f6';
  const p2Glow = p2.type === 'legend' ? 'rgba(251, 191, 36, 0.2)' : 'rgba(59, 130, 246, 0.2)';

  radarChartInstance = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['Pace', 'Shooting', 'Passing', 'Dribbling', 'Defending', 'Physicality'],
      datasets: [
        {
          label: p1.name,
          data: [
            p1.attributes.pace,
            p1.attributes.shooting,
            p1.attributes.passing,
            p1.attributes.dribbling,
            p1.attributes.defending,
            p1.attributes.physicality
          ],
          backgroundColor: p1Glow,
          borderColor: p1Color,
          borderWidth: 2,
          pointBackgroundColor: p1Color
        },
        {
          label: p2.name,
          data: [
            p2.attributes.pace,
            p2.attributes.shooting,
            p2.attributes.passing,
            p2.attributes.dribbling,
            p2.attributes.defending,
            p2.attributes.physicality
          ],
          backgroundColor: p2Glow,
          borderColor: p2Color,
          borderWidth: 2,
          pointBackgroundColor: p2Color
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: '#f3f4f6',
            font: {
              family: 'Outfit',
              size: 11
            }
          }
        }
      },
      scales: {
        r: {
          grid: {
            color: 'rgba(16, 185, 129, 0.15)'
          },
          angleLines: {
            color: 'rgba(16, 185, 129, 0.15)'
          },
          pointLabels: {
            color: '#9ca3af',
            font: {
              family: 'Outfit',
              size: 11
            }
          },
          ticks: {
            display: false,
            max: 100,
            min: 0,
            stepSize: 20
          }
        }
      }
    }
  });
}

// Simulated Typewriter effect
let typewriterTimeout = null;

function typeWriterEffect(element, htmlContent, speed = 8) {
  if (typewriterTimeout) {
    clearTimeout(typewriterTimeout);
  }
  
  element.innerHTML = '';
  let i = 0;
  
  function type() {
    if (i < htmlContent.length) {
      // If we encounter a tag, append it instantly to prevent showing raw tag characters
      if (htmlContent[i] === '<') {
        const tagEndIndex = htmlContent.indexOf('>', i);
        if (tagEndIndex !== -1) {
          element.innerHTML += htmlContent.substring(i, tagEndIndex + 1);
          i = tagEndIndex + 1;
        } else {
          element.innerHTML += htmlContent[i];
          i++;
        }
      } else {
        element.innerHTML += htmlContent[i];
        i++;
      }
      typewriterTimeout = setTimeout(type, speed);
    }
  }
  type();
}

// Generate heuristic analysis text for AI Debate Judge
function triggerAIDebateJudge(p1, p2) {
  const outputDiv = document.getElementById('ai-judge-output');
  const statusPill = document.getElementById('judge-status');
  
  // Set status to busy/thinking
  statusPill.className = "status-pill status-busy";
  statusPill.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> CALCULATING`;
  outputDiv.innerHTML = `<span class="empty-feed-msg">Processing statistics database...</span>`;

  // Simulate thinking delays
  setTimeout(() => {
    statusPill.className = "status-pill status-ready";
    statusPill.innerHTML = `<span class="pulse-dot"></span> ANALYZING`;

    // Construct the text analysis
    let analysis = '';
    
    // Overview paragraph
    analysis += `<p><strong>DEBATE BREAKDOWN:</strong> Comparing <strong>${p1.name}</strong> (${p1.role}) vs <strong>${p2.name}</strong> (${p2.role}). `;
    analysis += `This is a matchup of contrasting philosophies. ${p1.name} operates primarily as a <em>${p1.role}</em>, whereas ${p2.name} is classified as a <em>${p2.role}</em>.</p>`;

    // Stat-based points
    analysis += `<p><strong>STATISTICAL COMPARISON:</strong> `;
    
    // Goals comparison
    if (p1.stats.goals > p2.stats.goals) {
      analysis += `In terms of sheer output, <strong>${p1.name}</strong> leads the goalscoring charts with ${p1.stats.goals} goals in ${p1.stats.apps} apps, establishing a high-volume peak. `;
    } else if (p2.stats.goals > p1.stats.goals) {
      analysis += `In terms of sheer output, <strong>${p2.name}</strong> leads the goalscoring charts with ${p2.stats.goals} goals in ${p2.stats.apps} apps, showing extreme longevity. `;
    } else {
      analysis += `Both players are deadlocked in career goals scored, showing equal offensive volume. `;
    }

    // Playmaking comparison
    const assists1 = p1.stats.assists;
    const assists2 = p2.stats.assists;
    if (assists1 > assists2) {
      analysis += `However, <strong>${p1.name}</strong> displays superior playmaking capacity, racking up ${assists1} assists with a key passing average of ${p1.stats.keyPasses} per game. `;
    } else if (assists2 > assists1) {
      analysis += `However, <strong>${p2.name}</strong> displays superior playmaking capacity, racking up ${assists2} assists with a key passing average of ${p2.stats.keyPasses} per game. `;
    }

    // Radar Attributes Analysis
    analysis += `Looking at the physical attributes, ${p1.name} excels in <strong>${getHighestAttribute(p1)}</strong> (${p1.attributes[getHighestAttribute(p1).toLowerCase()]}/100) and ${p2.name} counters with elite ratings in <strong>${getHighestAttribute(p2)}</strong> (${p2.attributes[getHighestAttribute(p2).toLowerCase()]}/100).</p>`;

    // Trophy breakdown
    analysis += `<p><strong>HONORS & HARDWARE:</strong> `;
    analysis += `${p1.name} holds ${p1.stats.trophies} team trophies and ${p1.stats.ballonDor} Ballon d'Or awards. `;
    analysis += `Conversely, ${p2.name} responds with ${p2.stats.trophies} team trophies and ${p2.stats.ballonDor} Ballon d'Or awards. `;
    
    if (p1.stats.worldCupGoals > 0 && p1.stats.worldCupGoals > p2.stats.worldCupGoals) {
      analysis += `${p1.name} has a superior World Cup pedigree, scoring ${p1.stats.worldCupGoals} World Cup goals. `;
    } else if (p2.stats.worldCupGoals > 0 && p2.stats.worldCupGoals > p1.stats.worldCupGoals) {
      analysis += `${p2.name} has a superior World Cup pedigree, scoring ${p2.stats.worldCupGoals} World Cup goals. `;
    }
    analysis += `</p>`;

    // Verdict paragraph
    analysis += `<div class="ai-verdict"><strong>AI VERDICT:</strong> `;
    
    // Custom verdicts for classic pairs
    if (p1.id === 'messi' && p2.id === 'ronaldo') {
      analysis += `Messi represents the pinnacle of playmaking efficiency, dribbling gravity, and creative volume, while Ronaldo is the ultimate athletic athlete, goal machine, and UCL legend. Statistically, Messi's efficiency metrics (assists, key passes, dribbles, trophies) give him a slight edge in total pitch influence, but Ronaldo's pure goal volume and physical attributes remain historically unparalleled.`;
    } else if (p1.id === 'pele' && p2.id === 'maradona') {
      analysis += `A clash of South American icons. Pelé represents the absolute gold standard of World Cup execution (3 trophies) and goals volume. Maradona represents absolute dribbling magic and single-handed team transformation (Napoli, 1986). Pelé has the numbers, but Maradona possesses the mythological gravity.`;
    } else if (p1.id === 'haaland' && p2.id === 'mbappe') {
      analysis += `Haaland is the archetype of the modern box striker - minimal touches, maximal goals. Mbappé is a dynamic ball-carrier with blistering speed. Mbappé offers more creative adaptability, while Haaland dominates inside the 18-yard box.`;
    } else {
      // General verdict fallback
      if (p1.stats.ballonDor > p2.stats.ballonDor) {
        analysis += `Based on career metrics, individual awards, and stats, <strong>${p1.name}</strong> holds a statistical advantage. However, <strong>${p2.name}</strong> plays a role that excels in distinct physical or tactical departments.`;
      } else if (p2.stats.ballonDor > p1.stats.ballonDor) {
        analysis += `Based on career metrics, individual awards, and stats, <strong>${p2.name}</strong> holds a statistical advantage. However, <strong>${p1.name}</strong> plays a role that excels in distinct physical or tactical departments.`;
      } else {
        analysis += `A razor-thin comparison. There is no clear statistical separation between them; choice rests on tactical preference (creative orchestrator vs physical finisher).`;
      }
    }
    analysis += `</div>`;

    // Trigger typewriter
    typeWriterEffect(outputDiv, analysis, 6);
  }, 1200);
}

function getHighestAttribute(player) {
  const attrs = player.attributes;
  let maxAttr = 'Pace';
  let maxVal = attrs.pace;

  if (attrs.shooting > maxVal) { maxAttr = 'Shooting'; maxVal = attrs.shooting; }
  if (attrs.passing > maxVal) { maxAttr = 'Passing'; maxVal = attrs.passing; }
  if (attrs.dribbling > maxVal) { maxAttr = 'Dribbling'; maxVal = attrs.dribbling; }
  if (attrs.defending > maxVal) { maxAttr = 'Defending'; maxVal = attrs.defending; }
  if (attrs.physicality > maxVal) { maxAttr = 'Physicality'; maxVal = attrs.physicality; }

  return maxAttr;
}
