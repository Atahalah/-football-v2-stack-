export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  league: string;
  venue: string;
  apiId?: number;
  odds?: {
    home: number;
    draw: number;
    away: number;
  };
}

export interface Prediction {
  homeWin: number;
  draw: number;
  awayWin: number;
  confidence: number;
  expectedGoals?: {
    home: number;
    away: number;
  };
}

export interface BettingMarketPrediction {
  // Double Chance Markets
  homeOrDraw: number;    // 1X
  awayOrDraw: number;    // 2X  
  homeOrAway: number;    // 12
  
  // Over/Under Markets
  over15Goals: number;
  over25Goals: number;
  over35Goals: number;
  under15Goals: number;
  under25Goals: number;
  under35Goals: number;
  
  // Both Teams to Score
  bothTeamsScore: number;
  bothTeamsNoScore: number;
  
  // Correct Score Predictions
  correctScoreProbabilities: Record<string, number>;
  
  // Asian Handicap
  homeHandicap: Record<string, number>; // -1.5, -1, -0.5, 0, +0.5, +1, +1.5
  awayHandicap: Record<string, number>;
  
  // Half Time Markets
  halfTime: {
    homeWin: number;
    draw: number;
    awayWin: number;
  };
  
  // Full Time + Half Time
  doubleResult: Record<string, number>; // HH, HD, HA, DH, DD, DA, AH, AD, AA
}

export interface TeamStats {
  team: string;
  league: string;
  season: string;
  matches: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  homeRecord: {
    wins: number;
    draws: number;
    losses: number;
    goalsFor: number;
    goalsAgainst: number;
  };
  awayRecord: {
    wins: number;
    draws: number;
    losses: number;
    goalsFor: number;
    goalsAgainst: number;
  };
  form: string[];
  avgGoalsScored: number;
  avgGoalsConceded: number;
  cleanSheets: number;
  failedToScore: number;
}

export interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}