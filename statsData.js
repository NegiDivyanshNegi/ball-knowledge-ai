// Centralized Football Stats Database for Ball Knowledge

export const players = {
  messi: {
    id: "messi",
    name: "Lionel Messi",
    type: "active",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=200", // Placeholder but stylized
    club: "Inter Miami (ex-Barcelona)",
    country: "Argentina",
    role: "Forward / Playmaker",
    age: 39,
    stats: {
      apps: 1065,
      goals: 838,
      assists: 374,
      uclGoals: 129,
      worldCupGoals: 13,
      ballonDor: 8,
      goldenBoots: 6,
      trophies: 44,
      passAccuracy: "88.5%",
      keyPasses: "2.9",
      dribbles: "4.6",
      defActions: "1.1",
      penalties: "109/140"
    },
    attributes: {
      pace: 84,
      shooting: 92,
      passing: 95,
      dribbling: 98,
      defending: 39,
      physicality: 68
    },
    info: "Widely regarded as one of the greatest players of all time. Messi combines extraterrestrial dribbling, vision, passing, and elite finishing. He achieved his ultimate dream by winning the 2022 FIFA World Cup, cementing his legacy with 44 career trophies."
  },
  ronaldo: {
    id: "ronaldo",
    name: "Cristiano Ronaldo",
    type: "active",
    image: "https://images.unsplash.com/photo-1518063319789-7217e6706b04?auto=format&fit=crop&q=80&w=200",
    club: "Al Nassr (ex-Real Madrid, Man Utd)",
    country: "Portugal",
    role: "Striker / Forward",
    age: 41,
    stats: {
      apps: 1220,
      goals: 895,
      assists: 251,
      uclGoals: 140,
      worldCupGoals: 8,
      ballonDor: 5,
      goldenBoots: 4,
      trophies: 33,
      passAccuracy: "82.1%",
      keyPasses: "1.5",
      dribbles: "2.3",
      defActions: "0.7",
      penalties: "165/193"
    },
    attributes: {
      pace: 86,
      shooting: 94,
      passing: 80,
      dribbling: 84,
      defending: 35,
      physicality: 88
    },
    info: "An athletic specimen and the highest official goalscorer in football history. Ronaldo's career is marked by relentless dedication, winning 5 UEFA Champions Leagues, and holding the record for the most goals in UCL history (140) and international football."
  },
  haaland: {
    id: "haaland",
    name: "Erling Haaland",
    type: "active",
    image: "https://images.unsplash.com/photo-1544698310-74ea9d1c8258?auto=format&fit=crop&q=80&w=200",
    club: "Manchester City",
    country: "Norway",
    role: "Striker (Target Man)",
    age: 25,
    stats: {
      apps: 310,
      goals: 262,
      assists: 48,
      uclGoals: 41,
      worldCupGoals: 0,
      ballonDor: 0,
      goldenBoots: 2,
      trophies: 7,
      passAccuracy: "74.8%",
      keyPasses: "0.9",
      dribbles: "0.9",
      defActions: "0.4",
      penalties: "39/43"
    },
    attributes: {
      pace: 89,
      shooting: 93,
      passing: 66,
      dribbling: 77,
      defending: 43,
      physicality: 88
    },
    info: "A physical powerhouse and goalscoring machine. Haaland's positioning, explosive speed, and lethal finishing inside the box make him the premier striker of his generation. He shattered the Premier League single-season scoring record in his debut year."
  },
  mbappe: {
    id: "mbappe",
    name: "Kylian Mbappé",
    type: "active",
    image: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&q=80&w=200",
    club: "Real Madrid (ex-PSG)",
    country: "France",
    role: "Forward / Winger",
    age: 27,
    stats: {
      apps: 452,
      goals: 334,
      assists: 152,
      uclGoals: 48,
      worldCupGoals: 12,
      ballonDor: 0,
      goldenBoots: 0,
      trophies: 17,
      passAccuracy: "83.6%",
      keyPasses: "2.1",
      dribbles: "3.9",
      defActions: "0.6",
      penalties: "32/38"
    },
    attributes: {
      pace: 97,
      shooting: 89,
      passing: 81,
      dribbling: 92,
      defending: 36,
      physicality: 78
    },
    info: "Blessed with blistering acceleration and deadly composition. Mbappé rose to global stardom during the 2018 World Cup which France won. In the 2022 World Cup final, he scored a historic hat-trick, demonstrating his big-game pedigree."
  },
  debruyne: {
    id: "debruyne",
    name: "Kevin De Bruyne",
    type: "active",
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=200",
    club: "Manchester City",
    country: "Belgium",
    role: "Central Midfielder",
    age: 35,
    stats: {
      apps: 712,
      goals: 172,
      assists: 310,
      uclGoals: 25,
      worldCupGoals: 2,
      ballonDor: 0,
      goldenBoots: 0,
      trophies: 21,
      passAccuracy: "91.2%",
      keyPasses: "3.6",
      dribbles: "1.8",
      defActions: "3.2",
      penalties: "11/15"
    },
    attributes: {
      pace: 72,
      shooting: 83,
      passing: 97,
      dribbling: 87,
      defending: 64,
      physicality: 75
    },
    info: "The ultimate midfielder of the modern era. De Bruyne has unparalleled vision, crossing ability, and mid-range shooting. He has been the heartbeat of Pep Guardiola's historic Manchester City team, achieving multiple Premier League titles and a continental treble."
  },
  salah: {
    id: "salah",
    name: "Mohamed Salah",
    type: "active",
    image: "https://images.unsplash.com/photo-1544698310-74ea9d1c8258?auto=format&fit=crop&q=80&w=200",
    club: "Liverpool",
    country: "Egypt",
    role: "Winger",
    age: 34,
    stats: {
      apps: 610,
      goals: 322,
      assists: 145,
      uclGoals: 44,
      worldCupGoals: 2,
      ballonDor: 0,
      goldenBoots: 1,
      trophies: 10,
      passAccuracy: "80.4%",
      keyPasses: "2.3",
      dribbles: "2.6",
      defActions: "1.2",
      penalties: "38/45"
    },
    attributes: {
      pace: 89,
      shooting: 87,
      passing: 82,
      dribbling: 88,
      defending: 45,
      physicality: 76
    },
    info: "Known as the Egyptian King, Salah is one of the most prolific wingers in Premier League history. His combination of speed, dribbling cuts inside, and clinical finishing transformed Liverpool into Champions League and Premier League winners under Jurgen Klopp."
  },
  
  // LEGENDS
  pele: {
    id: "pele",
    name: "Pelé (Edson Arantes)",
    type: "legend",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=200",
    club: "Santos / NY Cosmos",
    country: "Brazil",
    role: "Inside Forward / Striker",
    age: 82, // Age at death
    stats: {
      apps: 831,
      goals: 757, // Official goals (over 1280 including friendlies)
      assists: 360,
      uclGoals: 0, // Copa Libertadores instead: 16 goals
      worldCupGoals: 12,
      ballonDor: 7, // Honorary Ballon d'Ors
      goldenBoots: 0,
      trophies: 37,
      passAccuracy: "86.0%",
      keyPasses: "2.8",
      dribbles: "4.5",
      defActions: "1.4",
      penalties: "72/80"
    },
    attributes: {
      pace: 93,
      shooting: 95,
      passing: 89,
      dribbling: 96,
      defending: 44,
      physicality: 83
    },
    info: "The King of Football. Pelé is the only player in history to win 3 FIFA World Cups (1958, 1962, 1970). A global icon, his explosive pace, acrobatic finishing, and spectacular creativity popularized the term 'The Beautiful Game'."
  },
  maradona: {
    id: "maradona",
    name: "Diego Maradona",
    type: "legend",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=200",
    club: "Napoli / Barcelona / Boca Juniors",
    country: "Argentina",
    role: "Attacking Midfielder",
    age: 60, // Age at death
    stats: {
      apps: 680,
      goals: 345,
      assists: 240,
      uclGoals: 2,
      worldCupGoals: 8,
      ballonDor: 2, // Honorary
      goldenBoots: 0,
      trophies: 12,
      passAccuracy: "91.0%",
      keyPasses: "3.9",
      dribbles: "5.7",
      defActions: "1.9",
      penalties: "49/58"
    },
    attributes: {
      pace: 86,
      shooting: 87,
      passing: 94,
      dribbling: 98,
      defending: 42,
      physicality: 79
    },
    info: "A genius on the ball with magical dribbling and personality. Maradona single-handedly inspired Argentina to their 1986 World Cup triumph, scoring the 'Goal of the Century' and the 'Hand of God' against England. He is an eternal legacy at Napoli, leading them to their first Scudetti."
  },
  zidane: {
    id: "zidane",
    name: "Zinedine Zidane",
    type: "legend",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=200",
    club: "Real Madrid / Juventus / Bordeaux",
    country: "France",
    role: "Attacking Midfielder",
    age: 54,
    stats: {
      apps: 790,
      goals: 156,
      assists: 180,
      uclGoals: 14,
      worldCupGoals: 5,
      ballonDor: 1,
      goldenBoots: 0,
      trophies: 15,
      passAccuracy: "92.5%",
      keyPasses: "2.8",
      dribbles: "3.4",
      defActions: "3.9",
      penalties: "20/24"
    },
    attributes: {
      pace: 74,
      shooting: 81,
      passing: 95,
      dribbling: 94,
      defending: 59,
      physicality: 82
    },
    info: "Elegant and masterfully technical. 'Zizou' was famous for his close control, ball rolls, and big-game performances. He scored twice in the 1998 World Cup Final to win France the cup and hit a legendary volley in the 2002 UCL Final."
  },
  cruyff: {
    id: "cruyff",
    name: "Johan Cruyff",
    type: "legend",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=200",
    club: "Ajax / Barcelona",
    country: "Netherlands",
    role: "Attacking Forward / Playmaker",
    age: 68, // Age at death
    stats: {
      apps: 752,
      goals: 425,
      assists: 290,
      uclGoals: 19, // European Cup
      worldCupGoals: 3,
      ballonDor: 3,
      goldenBoots: 0,
      trophies: 22,
      passAccuracy: "89.5%",
      keyPasses: "3.2",
      dribbles: "4.7",
      defActions: "2.2",
      penalties: "28/32"
    },
    attributes: {
      pace: 88,
      shooting: 86,
      passing: 92,
      dribbling: 96,
      defending: 45,
      physicality: 73
    },
    info: "The architect of 'Total Football'. Cruyff was a visionary player and manager who revolutionized modern football tactics. He won 3 consecutive European Cups with Ajax, 3 Ballon d'Ors, and brought structural philosophy to Ajax and Barcelona."
  },
  ronaldinho: {
    id: "ronaldinho",
    name: "Ronaldinho Gaúcho",
    type: "legend",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=200",
    club: "Barcelona / AC Milan / PSG",
    country: "Brazil",
    role: "Attacking Midfielder / Winger",
    age: 46,
    stats: {
      apps: 640,
      goals: 229,
      assists: 187,
      uclGoals: 18,
      worldCupGoals: 4,
      ballonDor: 1,
      goldenBoots: 0,
      trophies: 14,
      passAccuracy: "85.2%",
      keyPasses: "3.0",
      dribbles: "5.4",
      defActions: "1.0",
      penalties: "42/50"
    },
    attributes: {
      pace: 89,
      shooting: 83,
      passing: 91,
      dribbling: 97,
      defending: 37,
      physicality: 79
    },
    info: "The ultimate entertainer. Ronaldinho played football with a constant smile, mesmerizing fans with elasticos, no-look passes, and incredible free-kicks. He won the 2002 World Cup, the 2006 Champions League, and received a rare standing ovation from Real Madrid fans at the Bernabeu."
  },
  r9: {
    id: "r9",
    name: "Ronaldo Nazário (R9)",
    type: "legend",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=200",
    club: "Inter Milan / Real Madrid / PSV / Barcelona",
    country: "Brazil",
    role: "Striker (The Phenomenon)",
    age: 49,
    stats: {
      apps: 616,
      goals: 414,
      assists: 110,
      uclGoals: 14,
      worldCupGoals: 15,
      ballonDor: 2,
      goldenBoots: 1,
      trophies: 18,
      passAccuracy: "81.5%",
      keyPasses: "1.3",
      dribbles: "5.1",
      defActions: "0.6",
      penalties: "45/52"
    },
    attributes: {
      pace: 97,
      shooting: 95,
      passing: 81,
      dribbling: 96,
      defending: 30,
      physicality: 86
    },
    info: "Nicknamed 'O Fenômeno'. A perfect combination of raw power, supersonic speed, and jaw-dropping skill. Ronaldo redefined the striker position. Despite career-threatening knee injuries, he won 2 World Cups, including scoring 8 goals in the 2002 edition."
  }
};

export const teams = {
  real_madrid: {
    id: "real_madrid",
    name: "Real Madrid CF",
    shortName: "R. Madrid",
    logo: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=50",
    league: "La Liga",
    stats: { wins: 29, draws: 8, losses: 1, gf: 87, ga: 26, pts: 95, form: ["W", "W", "D", "W", "W"] },
    trophies: { ucl: 15, league: 36, domesticCup: 20, clubWorldCup: 5 },
    stadium: "Santiago Bernabéu",
    manager: "Carlo Ancelotti",
    keyPlayers: ["Kylian Mbappé", "Vinicius Jr", "Jude Bellingham"]
  },
  barcelona: {
    id: "barcelona",
    name: "FC Barcelona",
    shortName: "Barcelona",
    logo: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=50",
    league: "La Liga",
    stats: { wins: 26, draws: 7, losses: 5, gf: 79, ga: 34, pts: 85, form: ["W", "L", "W", "W", "D"] },
    trophies: { ucl: 5, league: 27, domesticCup: 31, clubWorldCup: 3 },
    stadium: "Spotify Camp Nou",
    manager: "Hansi Flick",
    keyPlayers: ["Robert Lewandowski", "Lamine Yamal", "Pedri"]
  },
  man_city: {
    id: "man_city",
    name: "Manchester City FC",
    shortName: "Man City",
    logo: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=50",
    league: "Premier League",
    stats: { wins: 28, draws: 7, losses: 3, gf: 96, ga: 34, pts: 91, form: ["W", "W", "W", "W", "W"] },
    trophies: { ucl: 1, league: 10, domesticCup: 7, clubWorldCup: 1 },
    stadium: "Etihad Stadium",
    manager: "Pep Guardiola",
    keyPlayers: ["Erling Haaland", "Kevin De Bruyne", "Rodri"]
  },
  liverpool: {
    id: "liverpool",
    name: "Liverpool FC",
    shortName: "Liverpool",
    logo: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=50",
    league: "Premier League",
    stats: { wins: 24, draws: 10, losses: 4, gf: 86, ga: 41, pts: 82, form: ["D", "W", "L", "W", "W"] },
    trophies: { ucl: 6, league: 19, domesticCup: 8, clubWorldCup: 1 },
    stadium: "Anfield",
    manager: "Arne Slot",
    keyPlayers: ["Mohamed Salah", "Virgil van Dijk", "Alexis Mac Allister"]
  },
  bayern_munich: {
    id: "bayern_munich",
    name: "FC Bayern München",
    shortName: "Bayern M.",
    logo: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=50",
    league: "Bundesliga",
    stats: { wins: 23, draws: 3, losses: 8, gf: 94, ga: 45, pts: 72, form: ["W", "L", "W", "L", "W"] },
    trophies: { ucl: 6, league: 33, domesticCup: 20, clubWorldCup: 2 },
    stadium: "Allianz Arena",
    manager: "Vincent Kompany",
    keyPlayers: ["Harry Kane", "Jamal Musiala", "Leroy Sané"]
  },
  psg: {
    id: "psg",
    name: "Paris Saint-Germain FC",
    shortName: "PSG",
    logo: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=50",
    league: "Ligue 1",
    stats: { wins: 22, draws: 10, losses: 2, gf: 81, ga: 33, pts: 76, form: ["D", "W", "W", "W", "D"] },
    trophies: { ucl: 0, league: 12, domesticCup: 15, clubWorldCup: 0 },
    stadium: "Parc des Princes",
    manager: "Luis Enrique",
    keyPlayers: ["Ousmane Dembélé", "Vitinha", "Bradley Barcola"]
  },
  arsenal: {
    id: "arsenal",
    name: "Arsenal FC",
    shortName: "Arsenal",
    logo: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=50",
    league: "Premier League",
    stats: { wins: 28, draws: 5, losses: 5, gf: 91, ga: 29, pts: 89, form: ["W", "W", "W", "D", "W"] },
    trophies: { ucl: 0, league: 13, domesticCup: 14, clubWorldCup: 0 },
    stadium: "Emirates Stadium",
    manager: "Mikel Arteta",
    keyPlayers: ["Bukayo Saka", "Martin Ødegaard", "Declan Rice"]
  },
  juventus: {
    id: "juventus",
    name: "Juventus FC",
    shortName: "Juventus",
    logo: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=50",
    league: "Serie A",
    stats: { wins: 19, draws: 14, losses: 5, gf: 54, ga: 31, pts: 71, form: ["W", "D", "D", "W", "D"] },
    trophies: { ucl: 2, league: 36, domesticCup: 15, clubWorldCup: 2 },
    stadium: "Allianz Stadium",
    manager: "Thiago Motta",
    keyPlayers: ["Dušan Vlahović", "Kenan Yildiz", "Gleison Bremer"]
  }
};

export const nationalTeams = {
  argentina: {
    id: "argentina",
    name: "Argentina",
    shortName: "ARG",
    ranking: 1,
    trophies: { worldCup: 3, continental: 16, confederations: 1 },
    stats: { wins: 11, draws: 2, losses: 1, gf: 32, ga: 8, pts: 35, form: ["W", "W", "D", "W", "W"] },
    manager: "Lionel Scaloni",
    keyPlayers: ["Lionel Messi", "Lautaro Martínez", "Rodrigo De Paul"]
  },
  france: {
    id: "france",
    name: "France",
    shortName: "FRA",
    ranking: 2,
    trophies: { worldCup: 2, continental: 2, confederations: 2 },
    stats: { wins: 10, draws: 3, losses: 1, gf: 29, ga: 9, pts: 33, form: ["W", "D", "W", "W", "L"] },
    manager: "Didier Deschamps",
    keyPlayers: ["Kylian Mbappé", "Antoine Griezmann", "William Saliba"]
  },
  brazil: {
    id: "brazil",
    name: "Brazil",
    shortName: "BRA",
    ranking: 5,
    trophies: { worldCup: 5, continental: 9, confederations: 4 },
    stats: { wins: 8, draws: 4, losses: 2, gf: 26, ga: 11, pts: 28, form: ["L", "W", "D", "W", "D"] },
    manager: "Dorival Júnior",
    keyPlayers: ["Vinicius Jr", "Rodrygo", "Bruno Guimarães"]
  },
  portugal: {
    id: "portugal",
    name: "Portugal",
    shortName: "POR",
    ranking: 6,
    trophies: { worldCup: 0, continental: 1, confederations: 1 },
    stats: { wins: 11, draws: 1, losses: 2, gf: 36, ga: 10, pts: 34, form: ["W", "W", "W", "L", "W"] },
    manager: "Roberto Martínez",
    keyPlayers: ["Cristiano Ronaldo", "Bruno Fernandes", "Bernardo Silva"]
  },
  spain: {
    id: "spain",
    name: "Spain",
    shortName: "ESP",
    ranking: 3,
    trophies: { worldCup: 1, continental: 4, confederations: 0 },
    stats: { wins: 12, draws: 1, losses: 1, gf: 34, ga: 7, pts: 37, form: ["W", "W", "W", "W", "W"] },
    manager: "Luis de la Fuente",
    keyPlayers: ["Lamine Yamal", "Rodri", "Nico Williams"]
  },
  england: {
    id: "england",
    name: "England",
    shortName: "ENG",
    ranking: 4,
    trophies: { worldCup: 1, continental: 0, confederations: 0 },
    stats: { wins: 9, draws: 4, losses: 1, gf: 28, ga: 8, pts: 31, form: ["W", "D", "W", "W", "D"] },
    manager: "Thomas Tuchel",
    keyPlayers: ["Harry Kane", "Jude Bellingham", "Bukayo Saka"]
  },
  germany: {
    id: "germany",
    name: "Germany",
    shortName: "GER",
    ranking: 11,
    trophies: { worldCup: 4, continental: 3, confederations: 1 },
    stats: { wins: 8, draws: 4, losses: 2, gf: 27, ga: 12, pts: 28, form: ["W", "D", "W", "W", "D"] },
    manager: "Julian Nagelsmann",
    keyPlayers: ["Jamal Musiala", "Florian Wirtz", "Joshua Kimmich"]
  },
  italy: {
    id: "italy",
    name: "Italy",
    shortName: "ITA",
    ranking: 10,
    trophies: { worldCup: 4, continental: 2, confederations: 0 },
    stats: { wins: 7, draws: 5, losses: 2, gf: 19, ga: 11, pts: 26, form: ["D", "W", "D", "W", "L"] },
    manager: "Luciano Spalletti",
    keyPlayers: ["Nicolò Barella", "Federico Chiesa", "Gianluigi Donnarumma"]
  }
};

export const leagues = {
  premier_league: {
    name: "Premier League",
    country: "England",
    table: [
      { rank: 1, team: "Manchester City", mp: 38, w: 28, d: 7, l: 3, gf: 96, ga: 34, gd: 62, pts: 91, form: ["W", "W", "W", "W", "W"] },
      { rank: 2, team: "Arsenal", mp: 38, w: 28, d: 5, l: 5, gf: 91, ga: 29, gd: 62, pts: 89, form: ["W", "W", "W", "D", "W"] },
      { rank: 3, team: "Liverpool", mp: 38, w: 24, d: 10, l: 4, gf: 86, ga: 41, gd: 45, pts: 82, form: ["D", "W", "L", "W", "W"] },
      { rank: 4, team: "Aston Villa", mp: 38, w: 20, d: 8, l: 10, gf: 76, ga: 61, gd: 15, pts: 68, form: ["L", "D", "L", "W", "D"] },
      { rank: 5, team: "Tottenham Hotspur", mp: 38, w: 20, d: 6, l: 12, gf: 74, ga: 61, gd: 13, pts: 66, form: ["W", "L", "W", "L", "L"] },
      { rank: 6, team: "Chelsea", mp: 38, w: 18, d: 9, l: 11, gf: 77, ga: 63, gd: 14, pts: 63, form: ["W", "W", "W", "W", "W"] }
    ],
    scorers: [
      { name: "Erling Haaland", team: "Man City", goals: 27 },
      { name: "Cole Palmer", team: "Chelsea", goals: 22 },
      { name: "Alexander Isak", team: "Newcastle", goals: 21 },
      { name: "Phil Foden", team: "Man City", goals: 19 },
      { name: "Dominic Solanke", team: "Bournemouth", goals: 19 }
    ],
    assists: [
      { name: "Ollie Watkins", team: "Aston Villa", assists: 13 },
      { name: "Cole Palmer", team: "Chelsea", assists: 11 },
      { name: "Kevin De Bruyne", team: "Man City", assists: 10 },
      { name: "Mohamed Salah", team: "Liverpool", assists: 10 },
      { name: "Kieran Trippier", team: "Newcastle", assists: 10 }
    ]
  },
  la_liga: {
    name: "La Liga",
    country: "Spain",
    table: [
      { rank: 1, team: "Real Madrid", mp: 38, w: 29, d: 8, l: 1, gf: 87, ga: 26, gd: 61, pts: 95, form: ["W", "W", "D", "W", "W"] },
      { rank: 2, team: "Barcelona", mp: 38, w: 26, d: 7, l: 5, gf: 79, ga: 34, gd: 45, pts: 85, form: ["W", "L", "W", "W", "D"] },
      { rank: 3, team: "Girona", mp: 38, w: 25, d: 6, l: 7, gf: 85, ga: 46, gd: 39, pts: 81, form: ["W", "W", "L", "D", "W"] },
      { rank: 4, team: "Atlético Madrid", mp: 38, w: 24, d: 4, l: 10, gf: 70, ga: 43, gd: 27, pts: 76, form: ["W", "W", "W", "W", "L"] },
      { rank: 5, team: "Athletic Club", mp: 38, w: 19, d: 11, l: 8, gf: 61, ga: 37, gd: 24, pts: 68, form: ["W", "D", "W", "L", "D"] }
    ],
    scorers: [
      { name: "Artem Dovbyk", team: "Girona", goals: 24 },
      { name: "Alexander Sørloth", team: "Villarreal", goals: 23 },
      { name: "Robert Lewandowski", team: "Barcelona", goals: 19 },
      { name: "Jude Bellingham", team: "Real Madrid", goals: 19 },
      { name: "Ante Budimir", team: "Osasuna", goals: 17 }
    ],
    assists: [
      { name: "Alex Baena", team: "Villarreal", assists: 14 },
      { name: "Nico Williams", team: "Athletic Club", assists: 11 },
      { name: "Sávio", team: "Girona", assists: 10 },
      { name: "Ikay Gündogan", team: "Barcelona", assists: 9 },
      { name: "Robert Lewandowski", team: "Barcelona", assists: 8 }
    ]
  }
};

export const matches = {
  club_match: {
    home: "real_madrid",
    away: "barcelona",
    title: "El Clásico - La Liga Showdown",
    commentaryPool: [
      { time: 0, text: "Welcome to the Santiago Bernabéu! It's El Clásico time. The atmosphere is electric as both sets of players emerge from the tunnel." },
      { time: 3, text: "An early push from Barcelona. Lewandowski drops deep, feeding Lamine Yamal on the wing. Yamal crosses, but Rüdiger clears." },
      { time: 8, text: "CHANCE! Jude Bellingham drives forward, shifts the ball past Pedri, and unleashes a low strike. Just wide of the far post!" },
      { time: 14, text: "Yellow Card. Christensen clips Vinicius Jr. who was bursting through on a counter-attack. The Bernabéu roars for more, but referee plays it firm." },
      { time: 21, text: "Mbappé gets his first clean run! A sublime lob from Valverde finds him behind Koundé, but ter Stegen comes out quickly to smother the ball." },
      { time: 27, text: "Stunning link play. Lamine Yamal turns Mendy inside out and floats a delightful cross to the back post. Raphinha hits it on the volley—BLOCKED by Carvajal!" },
      { time: 32, text: "A physical battle in the midfield. Casadó and Tchouaméni clash. The referee awards a free-kick to Real Madrid near the halfway line." },
      { time: 39, text: "GOAL! Real Madrid opens the scoring! Bellingham retrieves a loose ball, passes it into the channel for Vinicius Jr., who cuts it back. Jude Bellingham slides in to poke it home! 1-0." },
      { time: 45, text: "Half Time. Real Madrid lead 1-0 in a blistering first half. Barcelona will need more creativity in the final third to break down Ancelotti's defense." },
      { time: 48, text: "The second half is underway. No changes for either side during the break." },
      { time: 54, text: "Save! Lewandowski heads a corner towards the top corner, but Courtois rises high and tips it over the crossbar with a sensational hand." },
      { time: 61, text: "Tactical change: Gavi is preparing to enter for Barcelona, replacing Casadó. A burst of energy for the Blaugrana." },
      { time: 68, text: "GOAL! Barcelona equalizes! Lamine Yamal receives the ball wide, runs at Mendy, cuts onto his left foot, and curls an absolute peach into the top corner. Unstoppable! 1-1." },
      { time: 74, text: "Yellow card. Bellingham reacts angrily to a challenge from Gavi. Both players are warned by the referee. The tension is boil-over!" },
      { time: 80, text: "PENALTY REAL MADRID! Mbappé gets clipped in the penalty area by Cubarsí. The referee points straight to the spot! The Barca players protest, but VAR confirms." },
      { time: 82, text: "GOAL! Kylian Mbappé steps up... and hammers it into the top left corner! Ter Stegen guessed the right way but the power was too much. 2-1 to Real Madrid!" },
      { time: 88, text: "Desperate times. Barcelona throw bodies forward. Araujo is playing as an auxiliary striker now." },
      { time: 90, text: "4 minutes of added time announced. Can Barcelona pull off another El Clásico miracle?" },
      { time: 92, text: "What a save! Yamal finds Lewandowski in the box. He shoots from point-blank range, but Courtois makes himself massive and blocks it with his legs!" },
      { time: 94, text: "Full Time! Real Madrid wins El Clásico 2-1! An unbelievable match ending in high drama. Jude Bellingham and Kylian Mbappé the heroes for Los Blancos." }
    ]
  },
  national_match: {
    home: "argentina",
    away: "france",
    title: "World Cup Rematch",
    commentaryPool: [
      { time: 0, text: "A rematch of the epic 2022 World Cup Final! Argentina vs France live from a packed stadium. Messi and Mbappé face off once again." },
      { time: 4, text: "Argentina dominate early possession. Enzo Fernández dictate play in the middle, looking for Messi's runs." },
      { time: 10, text: "CHANCE! Messi slips a magical pass to Lautaro Martínez, who beats the offside trap, but fires his shot straight into Maignan!" },
      { time: 17, text: "France respond. Mbappé uses his electric pace to leave Molina behind, cuts inside, but Otamendi makes a crucial sliding block." },
      { time: 24, text: "Foul. Tchouaméni brings down De Paul. Free-kick for Argentina in Messi territory, 25 yards out." },
      { time: 26, text: "Messi takes... curling over the wall... and it clips the crossbar! Maignan was beaten, so close for Argentina!" },
      { time: 33, text: "Griezmann drops deep to collect the ball. He lofts a beauty over the top for Dembélé, who squares it. Romero intercepts just in time." },
      { time: 41, text: "GOAL! France takes the lead! A swift counter-attack. Griezmann feeds Mbappé, who drives at the heart of the defense, cuts right, and drills a low effort past E. Martínez! 0-1." },
      { time: 45, text: "Half Time. France lead 1-0. A classic game of tactical margins. Argentina have possession, but France's transition has been lethal." },
      { time: 47, text: "Second half starts. Argentina looking to get Messi more involved in the central zones." },
      { time: 53, text: "Yellow Card. Rabiot cautions for pulling back Messi by the shirt." },
      { time: 59, text: "Sub. Julián Álvarez comes on for Mac Allister as Scaloni opts for a double-striker system to apply pressure." },
      { time: 66, text: "GOAL! Argentina equalizes! And who else? Lionel Messi plays a quick one-two with Álvarez, creates half a yard of space at the edge of the box, and bends a signature low curler into the bottom corner! 1-1." },
      { time: 72, text: "The crowd goes wild! The stadium is echoing with 'Messi, Messi!'. The momentum has shifted completely." },
      { time: 78, text: "Save! Mbappé launches a thunderbolt from distance. Dibu Martínez flies to his left and makes a spectacular fingertip save." },
      { time: 84, text: "GOAL! France regains the lead! Shock silence in the Argentine end. A corner is not cleared properly, Saliba nods it back into the danger area, and Giroud heads it in! 1-2." },
      { time: 88, text: "Penalty appeal! Lautaro falls under a challenge from Upamecano. The referee says play on, VAR agrees. The Argentine bench is furious." },
      { time: 90, text: "5 minutes of stoppage time. Argentina is throwing everything at the French wall." },
      { time: 93, text: "GOAL! DRAMA AT THE DEATH! ARGENTINA EQUALIZES! A cross from De Paul finds Julián Álvarez. His header is parried by Maignan, but Lautaro Martínez pounces on the rebound and smashes it in! 2-2!" },
      { time: 95, text: "Full Time! An incredible 2-2 draw. True to their history, these two titans cannot be separated after 95 minutes of pure footballing drama." }
    ]
  }
};

export const upcomingMatches = [
  { id: 1, home: "man_city", away: "liverpool", time: "Tomorrow, 20:00", comp: "Premier League", countdown: "1 Day 8 Hours" },
  { id: 2, home: "real_madrid", away: "bayern_munich", time: "Wednesday, 21:00", comp: "Champions League", countdown: "2 Days 9 Hours" },
  { id: 3, home: "arsenal", away: "psg", time: "Thursday, 21:00", comp: "Champions League", countdown: "3 Days 9 Hours" },
  { id: 4, home: "juventus", away: "barcelona", time: "Saturday, 18:30", comp: "Europe Club Friendlies", countdown: "5 Days 6 Hours" }
];

export const recentResults = [
  { home: "france", away: "portugal", score: "2 - 1", comp: "UEFA Nations League" },
  { home: "liverpool", away: "arsenal", score: "1 - 1", comp: "Premier League" },
  { home: "barcelona", away: "bayern_munich", score: "3 - 0", comp: "Champions League" },
  { home: "argentina", away: "brazil", score: "1 - 0", comp: "WC Qualification" }
];
