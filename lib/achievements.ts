export interface StatsForAchievements {
  gamesPlayed: number;
  gamesWon: number;
  gamesLost: number;
  currentWinStreak?: number;
  maxWinStreak?: number;
  highestScore: number;
  generalaServed: number;
  doubleGeneralas?: number;
  straights: number;
  fullHouses: number;
  pokers: number;
  generalas: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  check: (stats: StatsForAchievements) => boolean;
  progress?: (stats: StatsForAchievements) => { current: number; target: number };
}

export const ACHIEVEMENTS: Achievement[] = [
  // Partidas y victorias
  {
    id: "first_game",
    name: "Primera partida",
    description: "Jugá tu primera partida",
    check: (s) => s.gamesPlayed >= 1,
    progress: (s) => ({ current: Math.min(s.gamesPlayed, 1), target: 1 }),
  },
  {
    id: "games_10",
    name: "En marcha",
    description: "Jugá 10 partidas",
    check: (s) => s.gamesPlayed >= 10,
    progress: (s) => ({ current: Math.min(s.gamesPlayed, 10), target: 10 }),
  },
  {
    id: "games_50",
    name: "Veterano",
    description: "Jugá 50 partidas",
    check: (s) => s.gamesPlayed >= 50,
    progress: (s) => ({ current: Math.min(s.gamesPlayed, 50), target: 50 }),
  },
  {
    id: "games_100",
    name: "Adicto",
    description: "Jugá 100 partidas",
    check: (s) => s.gamesPlayed >= 100,
    progress: (s) => ({ current: Math.min(s.gamesPlayed, 100), target: 100 }),
  },
  {
    id: "first_win",
    name: "Primera victoria",
    description: "Ganá tu primera partida",
    check: (s) => s.gamesWon >= 1,
    progress: (s) => ({ current: Math.min(s.gamesWon, 1), target: 1 }),
  },
  {
    id: "wins_5",
    name: "Ganador",
    description: "Ganá 5 partidas",
    check: (s) => s.gamesWon >= 5,
    progress: (s) => ({ current: Math.min(s.gamesWon, 5), target: 5 }),
  },
  {
    id: "wins_25",
    name: "Dominador",
    description: "Ganá 25 partidas",
    check: (s) => s.gamesWon >= 25,
    progress: (s) => ({ current: Math.min(s.gamesWon, 25), target: 25 }),
  },
  {
    id: "wins_50",
    name: "Campeón",
    description: "Ganá 50 partidas",
    check: (s) => s.gamesWon >= 50,
    progress: (s) => ({ current: Math.min(s.gamesWon, 50), target: 50 }),
  },
  {
    id: "streak_3",
    name: "Racha",
    description: "Ganá 3 partidas seguidas",
    check: (s) => (s.maxWinStreak ?? 0) >= 3,
    progress: (s) => ({
      current: Math.min(s.maxWinStreak ?? 0, 3),
      target: 3,
    }),
  },
  // Puntaje
  {
    id: "score_200",
    name: "Rompe 200",
    description: "Superá 200 puntos en una partida",
    check: (s) => s.highestScore >= 200,
    progress: (s) => ({ current: Math.min(s.highestScore, 200), target: 200 }),
  },
  {
    id: "score_250",
    name: "Rompe 250",
    description: "Superá 250 puntos en una partida",
    check: (s) => s.highestScore >= 250,
    progress: (s) => ({ current: Math.min(s.highestScore, 250), target: 250 }),
  },
  {
    id: "score_300",
    name: "Maestro del puntaje",
    description: "Superá 300 puntos en una partida",
    check: (s) => s.highestScore >= 300,
    progress: (s) => ({ current: Math.min(s.highestScore, 300), target: 300 }),
  },
  // Generala
  {
    id: "first_generala",
    name: "Primera generala",
    description: "Anotá una generala",
    check: (s) => s.generalas >= 1,
    progress: (s) => ({ current: Math.min(s.generalas, 1), target: 1 }),
  },
  {
    id: "generala_servida",
    name: "Generala servida",
    description: "Hacé generala de una (en la primera tirada)",
    check: (s) => s.generalaServed >= 1,
    progress: (s) => ({ current: Math.min(s.generalaServed, 1), target: 1 }),
  },
  {
    id: "double_generala",
    name: "Doble generala",
    description: "Anotá una doble generala (100 puntos)",
    check: (s) => (s.doubleGeneralas ?? 0) >= 1,
    progress: (s) => ({
      current: Math.min(s.doubleGeneralas ?? 0, 1),
      target: 1,
    }),
  },
  {
    id: "generala_5",
    name: "Generala x5",
    description: "Anotá 5 generalas en total",
    check: (s) => s.generalas >= 5,
    progress: (s) => ({ current: Math.min(s.generalas, 5), target: 5 }),
  },
  {
    id: "generala_10",
    name: "Generala x10",
    description: "Anotá 10 generalas en total",
    check: (s) => s.generalas >= 10,
    progress: (s) => ({ current: Math.min(s.generalas, 10), target: 10 }),
  },
  // Escalera, full, poker
  {
    id: "first_straight",
    name: "Primera escalera",
    description: "Anotá una escalera",
    check: (s) => s.straights >= 1,
    progress: (s) => ({ current: Math.min(s.straights, 1), target: 1 }),
  },
  {
    id: "straights_10",
    name: "Escaleras x10",
    description: "Anotá 10 escaleras",
    check: (s) => s.straights >= 10,
    progress: (s) => ({ current: Math.min(s.straights, 10), target: 10 }),
  },
  {
    id: "first_full",
    name: "Primer full",
    description: "Anotá un full",
    check: (s) => s.fullHouses >= 1,
    progress: (s) => ({ current: Math.min(s.fullHouses, 1), target: 1 }),
  },
  {
    id: "fulls_10",
    name: "Full x10",
    description: "Anotá 10 fulls",
    check: (s) => s.fullHouses >= 10,
    progress: (s) => ({ current: Math.min(s.fullHouses, 10), target: 10 }),
  },
  {
    id: "first_poker",
    name: "Primer poker",
    description: "Anotá un poker",
    check: (s) => s.pokers >= 1,
    progress: (s) => ({ current: Math.min(s.pokers, 1), target: 1 }),
  },
  {
    id: "pokers_10",
    name: "Poker x10",
    description: "Anotá 10 pokers",
    check: (s) => s.pokers >= 10,
    progress: (s) => ({ current: Math.min(s.pokers, 10), target: 10 }),
  },
];

export function getUnlockedAchievementIds(stats: StatsForAchievements): string[] {
  return ACHIEVEMENTS.filter((a) => a.check(stats)).map((a) => a.id);
}

export function getAchievementById(id: string): Achievement | undefined {
  return ACHIEVEMENTS.find((a) => a.id === id);
}
