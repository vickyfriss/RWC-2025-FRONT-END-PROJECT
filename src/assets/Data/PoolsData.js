export const groups = [
  {
    name: "Pool A",
    teams: [
      { name: "England", stage: "SF", flag: "https://upload.wikimedia.org/wikipedia/en/b/be/Flag_of_England.svg", wins: 3, losses: 0, pointsFor: 172, pointsAgainst: 51, diff: 121, triesFor: 24, bonus: 3, points: 15 },
      { name: "Australia", stage: "QF", flag: "https://upload.wikimedia.org/wikipedia/en/b/b9/Flag_of_Australia.svg", wins: 2, losses: 1, pointsFor: 140, pointsAgainst: 70, diff: 70, triesFor: 18, bonus: 2, points: 10 },
      { name: "USA", stage: "none", flag: "https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg", wins: 1, losses: 2, pointsFor: 80, pointsAgainst: 130, diff: -50, triesFor: 10, bonus: 1, points: 5 },
      { name: "Samoa", stage: "none", flag: "https://upload.wikimedia.org/wikipedia/commons/3/31/Flag_of_Samoa.svg", wins: 0, losses: 3, pointsFor: 55, pointsAgainst: 157, diff: -102, triesFor: 8, bonus: 0, points: 0 },
    ],
    matches: [
      { id: 1, teamA: "England", scoreA: 69, scoreB: 7, teamB: "USA", date: "22 August 2025", stadium: "Stadium of Light, Sunderland" },
      { id: 2, teamA: "Australia", scoreA: 73, scoreB: 0, teamB: "Samoa", date: "23 August 2025", stadium: "Salford Community Stadium, Manchester" },
      { id: 3, teamA: "England", scoreA: 92, scoreB: 3, teamB: "Samoa", date: "30 August 2025", stadium: "Franklin's Gardens, Northampton" },
      { id: 4, teamA: "USA", scoreA: 31, scoreB: 31, teamB: "Australia", date: "30 August 2025", stadium: "York Community Stadium, York" },
      { id: 5, teamA: "England", scoreA: 47, scoreB: 7, teamB: "Australia", date: "6 September 2025", stadium: "Brighton & Hove Albion Stadium, Brighton" },
      { id: 6, teamA: "USA", scoreA: 60, scoreB: 0, teamB: "Samoa", date: "6 September 2025", stadium: "York Community Stadium, York" },
    ]
  },
  {
    name: "Pool B",
    teams: [
      { name: "Canada", stage: "SF", flag: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Flag_of_Canada.svg", wins: 3, losses: 0, pointsFor: 160, pointsAgainst: 60, diff: 100, triesFor: 20, bonus: 3, points: 15 },
      { name: "Wales", stage: "QF", flag: "https://upload.wikimedia.org/wikipedia/commons/d/dc/Flag_of_Wales.svg", wins: 2, losses: 1, pointsFor: 140, pointsAgainst: 80, diff: 60, triesFor: 18, bonus: 2, points: 10 },
      { name: "Scotland", stage: "none", flag: "https://upload.wikimedia.org/wikipedia/commons/1/10/Flag_of_Scotland.svg", wins: 1, losses: 2, pointsFor: 90, pointsAgainst: 140, diff: -50, triesFor: 10, bonus: 1, points: 5 },
      { name: "Fiji", stage: "none", flag: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Fiji.svg", wins: 0, losses: 3, pointsFor: 55, pointsAgainst: 145, diff: -90, triesFor: 7, bonus: 0, points: 0 },
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
      { name: "New Zealand", stage: "SF", flag: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Flag_of_New_Zealand.svg", wins: 3, losses: 0, pointsFor: 180, pointsAgainst: 50, diff: 130, triesFor: 25, bonus: 3, points: 15 },
      { name: "Ireland", stage: "QF", flag: "https://upload.wikimedia.org/wikipedia/commons/4/45/Flag_of_Ireland.svg", wins: 2, losses: 1, pointsFor: 145, pointsAgainst: 75, diff: 70, triesFor: 19, bonus: 2, points: 10 },
      { name: "Japan", stage: "none", flag: "https://upload.wikimedia.org/wikipedia/en/9/9e/Flag_of_Japan.svg", wins: 1, losses: 2, pointsFor: 85, pointsAgainst: 130, diff: -45, triesFor: 11, bonus: 1, points: 5 },
      { name: "Spain", stage: "none", flag: "https://upload.wikimedia.org/wikipedia/en/9/9a/Flag_of_Spain.svg", wins: 0, losses: 3, pointsFor: 60, pointsAgainst: 187, diff: -127, triesFor: 8, bonus: 0, points: 0 },
    ],
    matches: [
      { id: 1, teamA: "Ireland", scoreA: 42, scoreB: 14, teamB: "Japan", date: "24 August 2025", stadium: "Franklin's Gardens, Northampton" },
      { id: 2, teamA: "New Zealand", scoreA: 54, scoreB: 8, teamB: "Spain", date: "24 August 2025", stadium: "York Community Stadium, York" },
      { id: 3, teamA: "Ireland", scoreA: 43, scoreB: 27, teamB: "Spain", date: "31 August 2025", stadium: "Franklin's Gardens, Northampton" },
      { id: 4, teamA: "New Zealand", scoreA: 62, scoreB: 19, teamB: "Japan", date: "31 August 2025", stadium: "Sandy Park, Exeter" },
      { id: 5, teamA: "Japan", scoreA: 29, scoreB: 21, teamB: "Spain", date: "7 September 2025", stadium: "York Community Stadium, York" },
      { id: 6, teamA: "New Zealand", scoreA: 40, scoreB: 0, teamB: "Ireland", date: "7 September 2025", stadium: "Brighton & Hove Albion Stadium, Brighton" },
    ]
  },
  {
    name: "Pool D",
    teams: [
      { name: "France", stage: "SF", flag: "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg", wins: 3, losses: 0, pointsFor: 170, pointsAgainst: 60, diff: 110, triesFor: 23, bonus: 3, points: 15 },
      { name: "South Africa", stage: "QF", flag: "https://upload.wikimedia.org/wikipedia/commons/a/af/Flag_of_South_Africa.svg", wins: 2, losses: 1, pointsFor: 150, pointsAgainst: 80, diff: 70, triesFor: 19, bonus: 2, points: 10 },
      { name: "Italy", stage: "none", flag: "https://upload.wikimedia.org/wikipedia/en/0/03/Flag_of_Italy.svg", wins: 1, losses: 2, pointsFor: 85, pointsAgainst: 140, diff: -55, triesFor: 10, bonus: 1, points: 5 },
      { name: "Brazil", stage: "none", flag: "https://upload.wikimedia.org/wikipedia/en/0/05/Flag_of_Brazil.svg", wins: 0, losses: 3, pointsFor: 50, pointsAgainst: 155, diff: -105, triesFor: 6, bonus: 0, points: 0 },
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
