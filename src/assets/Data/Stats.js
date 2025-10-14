// stats.js

// Player Statistics with updated Tries
const playerStats = [
    { name: 'Braxton Sorensen-McGee', team: 'NZL', points: 69, tries: 11, runs: 55, conversions: 0, offloads: 12, tackles: 82, cleanBreaks: 0, matches: 5, yellowCards: 0, redCards: 0 },
    { name: 'Renee Holmes', team: 'NZL', points: 64, tries: 0, runs: 46, conversions: 0, offloads: 0, tackles: 0, cleanBreaks: 0, matches: 5, yellowCards: 0, redCards: 0 },
    { name: 'Sophie de Goede', team: 'CAN', points: 61, tries: 3, runs: 106, conversions: 0, offloads: 0, tackles: 82, cleanBreaks: 0, matches: 5, yellowCards: 0, redCards: 0 },
    { name: 'Zoe Harrison', team: 'ENG', points: 42, tries: 0, runs: 0, conversions: 0, offloads: 0, tackles: 0, cleanBreaks: 0, matches: 5, yellowCards: 0, redCards: 0 },
    { name: 'Julia Schell', team: 'CAN', points: 30, tries: 6, runs: 53, conversions: 0, offloads: 0, tackles: 0, cleanBreaks: 0, matches: 5, yellowCards: 0, redCards: 0 },
    { name: 'Jess Breach', team: 'ENG', points: 30, tries: 6, runs: 0, conversions: 0, offloads: 0, tackles: 0, cleanBreaks: 0, matches: 5, yellowCards: 0, redCards: 0 },
    { name: 'Desiree Miller', team: 'AUS', points: 30, tries: 6, runs: 0, conversions: 0, offloads: 0, tackles: 0, cleanBreaks: 0, matches: 5, yellowCards: 0, redCards: 0 },
    { name: 'Freda Tafuna', team: 'USA', points: 30, tries: 6, runs: 0, conversions: 0, offloads: 0, tackles: 0, cleanBreaks: 0, matches: 5, yellowCards: 0, redCards: 0 },
    { name: 'Francesca McGhie', team: 'SCO', points: 30, tries: 6, runs: 34, conversions: 0, offloads: 0, tackles: 0, cleanBreaks: 0, matches: 5, yellowCards: 0, redCards: 0 },
    { name: 'Morgane Bourgeois', team: 'FRA', points: 27, tries: 0, runs: 0, conversions: 0, offloads: 0, tackles: 0, cleanBreaks: 0, matches: 5, yellowCards: 0, redCards: 0 },
    { name: 'Helena Rowland', team: 'ENG', points: 27, tries: 0, runs: 0, conversions: 0, offloads: 0, tackles: 0, cleanBreaks: 0, matches: 5, yellowCards: 0, redCards: 0 },
    { name: 'Byrhandre Dolf', team: 'RSA', points: 27, tries: 0, runs: 39, conversions: 0, offloads: 0, tackles: 0, cleanBreaks: 0, matches: 5, yellowCards: 0, redCards: 0 },
    { name: "Dannah O'Brien", team: 'IRE', points: 26, tries: 0, runs: 47, conversions: 0, offloads: 0, tackles: 0, cleanBreaks: 0, matches: 5, yellowCards: 0, redCards: 0 },
    { name: 'Kelsey Clifford', team: 'ENG', points: 25, tries: 5, runs: 0, conversions: 0, offloads: 0, tackles: 0, cleanBreaks: 0, matches: 5, yellowCards: 0, redCards: 0 },
    { name: 'Emilie Boulard', team: 'FRA', points: 25, tries: 5, runs: 38, conversions: 0, offloads: 0, tackles: 0, cleanBreaks: 0, matches: 5, yellowCards: 0, redCards: 0 },
    { name: 'Asia Hogan-Rochester', team: 'CAN', points: 0, tries: 5, runs: 46, conversions: 0, offloads: 0, tackles: 0, cleanBreaks: 0, matches: 5, yellowCards: 0, redCards: 0 },
    { name: 'Ellie Kildunne', team: 'ENG', points: 0, tries: 5, runs: 48, conversions: 0, offloads: 0, tackles: 0, cleanBreaks: 0, matches: 5, yellowCards: 0, redCards: 0 },
    { name: 'Caitlyn Halse', team: 'AUS', points: 0, tries: 4, runs: 0, conversions: 0, offloads: 0, tackles: 0, cleanBreaks: 0, matches: 5, yellowCards: 0, redCards: 0 },
    { name: 'Jorja Miller', team: 'NZL', points: 0, tries: 4, runs: 42, conversions: 0, offloads: 0, tackles: 0, cleanBreaks: 0, matches: 5, yellowCards: 0, redCards: 0 },
    { name: 'McKinley Hunt', team: 'CAN', points: 0, tries: 4, runs: 47, conversions: 0, offloads: 0, tackles: 0, cleanBreaks: 0, matches: 5, yellowCards: 0, redCards: 0 },
    { name: 'Amy Cokayne', team: 'ENG', points: 0, tries: 4, runs: 0, conversions: 0, offloads: 0, tackles: 0, cleanBreaks: 0, matches: 5, yellowCards: 0, redCards: 0 },
    { name: 'Rhona Lloyd', team: 'SCO', points: 0, tries: 4, runs: 30, conversions: 0, offloads: 0, tackles: 0, cleanBreaks: 0, matches: 5, yellowCards: 0, redCards: 0 }
    // continue adding other players if desired...
  ];
  
  // Team Statistics (unchanged)
  const teamStats = [
    { name: 'England', tries: 48, points: 316, tackles: 1096, lineoutsStolen: 17 },
    { name: 'New Zealand', tries: 41, points: 240, tackles: 879, lineoutsStolen: 12 },
    { name: 'Canada', tries: 37, points: 214, tackles: 859, lineoutsStolen: 10 },
    { name: 'Australia', tries: 0, points: 0, tackles: 0, lineoutsStolen: 0 },
    { name: 'France', tries: 0, points: 0, tackles: 0, lineoutsStolen: 0 },
    { name: 'South Africa', tries: 0, points: 0, tackles: 0, lineoutsStolen: 0 },
    { name: 'Ireland', tries: 0, points: 0, tackles: 0, lineoutsStolen: 0 },
    { name: 'Scotland', tries: 0, points: 0, tackles: 0, lineoutsStolen: 0 },
    { name: 'Japan', tries: 0, points: 0, tackles: 0, lineoutsStolen: 0 },
    { name: 'Spain', tries: 0, points: 0, tackles: 0, lineoutsStolen: 0 },
    { name: 'Wales', tries: 0, points: 0, tackles: 0, lineoutsStolen: 0 },
    { name: 'Fiji', tries: 0, points: 0, tackles: 0, lineoutsStolen: 0 },
    { name: 'Brazil', tries: 0, points: 0, tackles: 0, lineoutsStolen: 0 },
    { name: 'USA', tries: 0, points: 0, tackles: 0, lineoutsStolen: 0 },
    { name: 'Samoa', tries: 0, points: 0, tackles: 0, lineoutsStolen: 0 }
  ];
  
  export { playerStats, teamStats };
  