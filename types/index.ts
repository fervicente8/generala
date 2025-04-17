export interface UserStats {
    id: string;
    userId: string;
    gamesPlayed: number;
    gamesWon: number;
    gamesLost: number;
    highestScore: number;
    generalaServed: number;
    straights: number;
    fullHouses: number;
    pokers: number;
    generalas: number;
    averageScore: number;
    winRate: number;
    totalTimePlayed: number;
    lastGameDate?: string;
    elo: number;
    eloChange: number;
}

export interface User {
    id: string;
    googleId: string;
    name: string;
    email: string;
    password?: string;
    image?: string;
    stats?: UserStats;
    games: Game[];
    friendships: UserFriendship[]; 
    friendOf: UserFriendship[]; 
    sentInvitations: GameInvitation[];
    receivedInvitations: GameInvitation[];
}

export interface UserFriendship {
    id: string;
    requesterId: string;
    receiverId: string;
    status: "PENDING" | "ACCEPTED" | "REJECTED";
    createdAt: string; 
    updatedAt: string;
    requester: User; 
    receiver: User; 
}

export interface Game {
    id: string;
    createdAt: string;
    status: "waiting" | "in progress" | "finished";
    name: string;
    players: GameUser[];
    winnerId?: string;
    maxPlayers: number;
    minPlayers: number;
    turnTimeout?: number | null;
    password?: string;
    owner: User;
    ownerId: string; 
    invitations: GameInvitation[];
    currentTurnId?: string;
    diceValues: number[];
    rollCount: number;
}

export interface GameUser {
    id: string;
    user: User;  
    userId: string;
    game: Game;  
    gameId: string;
    ones?: number;
    twos?: number;
    threes?: number;
    fours?: number;
    fives?: number;
    sixes?: number;
    straight?: number;
    fullHouse?: number;
    poker?: number;
    generala?: number;
    double?: number;
    totalScore?: number;
}

export interface GameInvitation {
    id: string;
    gameId: string;
    game: Game;
    senderId: string;
    sender: User;
    receiverId: string;
    receiver: User;
    createdAt: string;
  }