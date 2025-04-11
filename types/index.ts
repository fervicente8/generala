export interface UserStats {
    gamesPlayed: number;
    gamesWon: number;
    gamesLost: number;
    highestScore: number;
    generalaServida: number;
    escaleras: number;
    fulls: number;
    pokers: number;
    generalas: number;
    averageScore: number;
    winRate: number;
    totalTimePlayed: number;
    lastGameDate: string; 
}
  
export interface User {
    name: string;
    email: string;
    image?: string;
    stats: UserStats;
}