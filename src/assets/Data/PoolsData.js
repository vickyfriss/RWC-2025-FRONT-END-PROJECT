export const groups = [
  {
    name: "Pool A",
    teams: [
      { name: "England", stage: "SF", flag: "https://upload.wikimedia.org/wikipedia/en/b/be/Flag_of_England.svg", wins: 3, losses: 0, pointsFor: 208, pointsAgainst: 17, diff: 191, triesFor: 32, bonus: 3, points: 15 },
      { name: "Australia", stage: "QF", flag: "https://upload.wikimedia.org/wikipedia/en/b/b9/Flag_of_Australia.svg", wins: 1, losses: 1, pointsFor: 111, pointsAgainst: 78, diff: 33, triesFor: 17, bonus: 2, points: 8 },
      { name: "USA", stage: "none", flag: "https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg", wins: 1, losses: 1, pointsFor: 98, pointsAgainst: 100, diff: -2, triesFor: 16, bonus: 2, points: 8 },
      { name: "Samoa", stage: "none", flag: "https://upload.wikimedia.org/wikipedia/commons/3/31/Flag_of_Samoa.svg", wins: 0, losses: 3, pointsFor: 3, pointsAgainst: 225, diff: -222, triesFor: 0, bonus: 0, points: 0 },
    ],
    matches: [
      { id: 1, teamA: "England", scoreA: 69, scoreB: 7, teamB: "USA", date: "22 August 2025", stadium: "Stadium of Light, Sunderland" },
      { id: 2, teamA: "Australia", scoreA: 73, scoreB: 0, teamB: "Samoa", date: "23 August 2025", stadium: "Salford Community Stadium, Manchester" },
      { id: 3, teamA: "England", scoreA: 92, scoreB: 3, teamB: "Samoa", date: "30 August 2025", stadium: "Franklin's Gardens, Northampton" },
      { id: 4, teamA: "USA", scoreA: 31, scoreB: 31, teamB: "Australia", date: "30 August 2025", stadium: "York Community Stadium, York" },
      { id: 5, teamA: "England", scoreA: 47, scoreB: 7, teamB: "Australia", date: "6 September 2025", stadium: "Brighton & Hove Albion Stadium, Brighton & Hove" },
      { id: 6, teamA: "USA", scoreA: 60, scoreB: 0, teamB: "Samoa", date: "6 September 2025", stadium: "York Community Stadium, York" },
    ]
  },
  {
    name: "Pool B",
    teams: [
      { name: "Canada", stage: "SF", flag: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Flag_of_Canada.svg", wins: 3, losses: 0, pointsFor: 147, pointsAgainst: 26, diff: 121, triesFor: 23, bonus: 3, points: 15 },
      { name: "Scotland", stage: "QF", flag: "https://upload.wikimedia.org/wikipedia/commons/1/10/Flag_of_Scotland.svg", wins: 2, losses: 1, pointsFor: 86, pointsAgainst: 63, diff: 23, triesFor: 14, bonus: 2, points: 10 },
      { name: "Fiji", stage: "none", flag: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Fiji.svg", wins: 1, losses: 2, pointsFor: 50, pointsAgainst: 119, diff: -69, triesFor: 8, bonus: 1, points: 5 },
      { name: "Wales", stage: "none", flag: "https://upload.wikimedia.org/wikipedia/commons/d/dc/Flag_of_Wales.svg", wins: 0, losses: 3, pointsFor: 33, pointsAgainst: 108, diff: -75, triesFor: 6, bonus: 2, points: 2 },
     ],
    matches: [
      { id: 1, teamA: "Scotland", scoreA: 38, scoreB: 8, teamB: "Wales", date: "23 August 2025", stadium: "Salford Community Stadium, Manchester" },
      { id: 2, teamA: "Canada", scoreA: 65, scoreB: 7, teamB: "Fiji", date: "23 August 2025", stadium: "York Community Stadium, York" },
      { id: 3, teamA: "Canada", scoreA: 42, scoreB: 0, teamB: "Wales", date: "30 August 2025", stadium: "Salford Community Stadium, Manchester" },
      { id: 4, teamA: "Scotland", scoreA: 29, scoreB: 15, teamB: "Fiji", date: "30 August 2025", stadium: "Salford Community Stadium, Manchester" },
      { id: 5, teamA: "Canada", scoreA: 40, scoreB: 19, teamB: "Scotland", date: "6 September 2025", stadium: "Sandy Park, Exeter" },
      { id: 6, teamA: "Wales", scoreA: 25, scoreB: 28, teamB: "Fiji", date: "6 September 2025", stadium: "Sandy Park, Exeter" },
    ]
  },
  {
    name: "Pool C",
    teams: [
      { name: "New Zealand", stage: "SF", flag: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Flag_of_New_Zealand.svg", wins: 3, losses: 0, pointsFor: 156, pointsAgainst: 27, diff: 129, triesFor: 24, bonus: 3, points: 15 },
      { name: "Ireland", stage: "QF", flag: "https://upload.wikimedia.org/wikipedia/commons/4/45/Flag_of_Ireland.svg", wins: 2, losses: 1, pointsFor: 85, pointsAgainst: 81, diff: 4, triesFor: 13, bonus: 2, points: 10 },
      { name: "Japan", stage: "none", flag: "https://upload.wikimedia.org/wikipedia/en/9/9e/Flag_of_Japan.svg", wins: 1, losses: 2, pointsFor: 62, pointsAgainst: 125, diff: -63, triesFor: 10, bonus: 1, points: 5 },
      { name: "Spain", stage: "none", flag: "https://upload.wikimedia.org/wikipedia/en/9/9a/Flag_of_Spain.svg", wins: 0, losses: 3, pointsFor: 56, pointsAgainst: 126, diff: -70, triesFor: 9, bonus: 1, points: 1 },
    ],
    matches: [
      { id: 1, teamA: "Ireland", scoreA: 42, scoreB: 14, teamB: "Japan", date: "24 August 2025", stadium: "Franklin's Gardens, Northampton" },
      { id: 2, teamA: "New Zealand", scoreA: 54, scoreB: 8, teamB: "Spain", date: "24 August 2025", stadium: "York Community Stadium, York" },
      { id: 3, teamA: "Ireland", scoreA: 43, scoreB: 27, teamB: "Spain", date: "31 August 2025", stadium: "Franklin's Gardens, Northampton" },
      { id: 4, teamA: "New Zealand", scoreA: 62, scoreB: 19, teamB: "Japan", date: "31 August 2025", stadium: "Sandy Park, Exeter" },
      { id: 5, teamA: "Japan", scoreA: 29, scoreB: 21, teamB: "Spain", date: "7 September 2025", stadium: "York Community Stadium, York" },
      { id: 6, teamA: "New Zealand", scoreA: 40, scoreB: 0, teamB: "Ireland", date: "7 September 2025", stadium: "Brighton & Hove Albion Stadium, Brighton & Hove" },
    ]
  },
  {
    name: "Pool D",
    teams: [
      { name: "France", stage: "SF", flag: "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg", wins: 3, losses: 0, pointsFor: 165, pointsAgainst: 15, diff: 150, triesFor: 26, bonus: 2, points: 14 },
      { name: "South Africa", stage: "QF", flag: "https://upload.wikimedia.org/wikipedia/commons/a/af/Flag_of_South_Africa.svg", wins: 2, losses: 1, pointsFor: 105, pointsAgainst: 87, diff: 18, triesFor: 16, bonus: 2, points: 10 },
      { name: "Italy", stage: "none", flag: "https://upload.wikimedia.org/wikipedia/en/0/03/Flag_of_Italy.svg", wins: 1, losses: 2, pointsFor: 88, pointsAgainst: 56, diff: 32, triesFor: 16, bonus: 3, points: 7 },
      { name: "Brazil", stage: "none", flag: "https://upload.wikimedia.org/wikipedia/en/0/05/Flag_of_Brazil.svg", wins: 0, losses: 3, pointsFor: 14, pointsAgainst: 214, diff: -200, triesFor: 1, bonus: 0, points: 0 },
    ],
    matches: [
      { id: 1, teamA: "France", scoreA: 24, scoreB: 0, teamB: "Italy", date: "23 August 2025", stadium: "Sandy Park, Exeter" },
      { id: 2, teamA: "South Africa", scoreA: 66, scoreB: 6, teamB: "Brazil", date: "24 August 2025", stadium: "Franklin's Gardens, Northampton" },
      { id: 3, teamA: "Italy", scoreA: 24, scoreB: 29, teamB: "South Africa", date: "31 August 2025", stadium: "York Community Stadium, York" },
      { id: 4, teamA: "France", scoreA: 84, scoreB: 5, teamB: "Brazil", date: "31 August 2025", stadium: "Sandy Park, Exeter" },
      { id: 5, teamA: "France", scoreA: 57, scoreB: 10, teamB: "South Africa", date: "7 September 2025", stadium: "Franklin's Gardens, Northampton" },
      { id: 6, teamA: "Italy", scoreA: 64, scoreB: 3, teamB: "Brazil", date: "7 September 2025", stadium: "Franklin's Gardens, Northampton" },
    ]
  },
];
