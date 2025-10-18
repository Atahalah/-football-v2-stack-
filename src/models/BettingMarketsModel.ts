import { BaseModel } from './BaseModel';
import { Match, Prediction, BettingMarketPrediction } from '../types';

export class BettingMarketsModel extends BaseModel {
  constructor() {
    super('Betting Markets Analysis');
  }

  predict(match: Match): Prediction {
    return {
      homeWin: 0.4,
      draw: 0.25,
      awayWin: 0.35,
      confidence: 0.7,
      expectedGoals: { home: 1.3, away: 1.1 }
    };
  }

  predictMarkets(match: Match, basePrediction: Prediction): BettingMarketPrediction {
    const { homeWin, draw, awayWin, expectedGoals } = basePrediction;
    const homeGoals = expectedGoals?.home || 1.3;
    const awayGoals = expectedGoals?.away || 1.1;
    const totalGoals = homeGoals + awayGoals;

    return {
      // Double Chance Markets
      homeOrDraw: homeWin + draw,        // 1X
      awayOrDraw: awayWin + draw,        // 2X
      homeOrAway: homeWin + awayWin,     // 12

      // Over/Under Goals
      over15Goals: this.calculateOverGoals(totalGoals, 1.5),
      over25Goals: this.calculateOverGoals(totalGoals, 2.5),
      over35Goals: this.calculateOverGoals(totalGoals, 3.5),
      under15Goals: 1 - this.calculateOverGoals(totalGoals, 1.5),
      under25Goals: 1 - this.calculateOverGoals(totalGoals, 2.5),
      under35Goals: 1 - this.calculateOverGoals(totalGoals, 3.5),

      // Both Teams to Score
      bothTeamsScore: this.calculateBothTeamsScore(homeGoals, awayGoals),
      bothTeamsNoScore: 1 - this.calculateBothTeamsScore(homeGoals, awayGoals),

      // Correct Score
      correctScoreProbabilities: this.calculateCorrectScores(homeGoals, awayGoals),

      // Asian Handicap
      homeHandicap: this.calculateAsianHandicap(basePrediction, 'home'),
      awayHandicap: this.calculateAsianHandicap(basePrediction, 'away'),

      // Half Time
      halfTime: this.calculateHalfTimePrediction(basePrediction),

      // Double Result (HT/FT)
      doubleResult: this.calculateDoubleResult(basePrediction)
    };
  }

  private calculateOverGoals(expectedTotal: number, line: number): number {
    // Using Poisson distribution approximation
    const lambda = expectedTotal;
    let probability = 0;
    
    for (let goals = Math.floor(line) + 1; goals <= 10; goals++) {
      probability += this.poissonProbability(goals, lambda);
    }
    
    return Math.min(0.95, Math.max(0.05, probability));
  }

  private calculateBothTeamsScore(homeGoals: number, awayGoals: number): number {
    // Probability both teams score at least 1
    const homeNoScore = this.poissonProbability(0, homeGoals);
    const awayNoScore = this.poissonProbability(0, awayGoals);
    
    return 1 - (homeNoScore + awayNoScore - homeNoScore * awayNoScore);
  }

  private calculateCorrectScores(homeGoals: number, awayGoals: number): Record<string, number> {
    const scores: Record<string, number> = {};
    
    // Calculate probabilities for common scores
    for (let h = 0; h <= 5; h++) {
      for (let a = 0; a <= 5; a++) {
        const homeProb = this.poissonProbability(h, homeGoals);
        const awayProb = this.poissonProbability(a, awayGoals);
        const scoreProb = homeProb * awayProb;
        
        if (scoreProb > 0.005) { // Only include scores with >0.5% probability
          scores[`${h}-${a}`] = scoreProb;
        }
      }
    }
    
    return scores;
  }

  private calculateAsianHandicap(prediction: Prediction, team: 'home' | 'away'): Record<string, number> {
    const handicaps = ['-2', '-1.5', '-1', '-0.5', '0', '+0.5', '+1', '+1.5', '+2'];
    const result: Record<string, number> = {};
    
    handicaps.forEach(handicap => {
      const line = parseFloat(handicap);
      result[handicap] = this.calculateHandicapProbability(prediction, team, line);
    });
    
    return result;
  }

  private calculateHandicapProbability(prediction: Prediction, team: 'home' | 'away', line: number): number {
    const { homeWin, draw, awayWin } = prediction;
    
    if (team === 'home') {
      if (line === 0) return homeWin + draw * 0.5; // Asian Handicap 0
      if (line === -0.5) return homeWin;
      if (line === -1) return homeWin * 0.9; // Approximate adjustment
      if (line === -1.5) return homeWin * 0.7;
      if (line === -2) return homeWin * 0.5;
      if (line === 0.5) return homeWin + draw;
      if (line === 1) return homeWin + draw + awayWin * 0.1;
      if (line === 1.5) return homeWin + draw + awayWin * 0.3;
      if (line === 2) return homeWin + draw + awayWin * 0.5;
    } else {
      if (line === 0) return awayWin + draw * 0.5;
      if (line === -0.5) return awayWin;
      if (line === -1) return awayWin * 0.9;
      if (line === -1.5) return awayWin * 0.7;
      if (line === -2) return awayWin * 0.5;
      if (line === 0.5) return awayWin + draw;
      if (line === 1) return awayWin + draw + homeWin * 0.1;
      if (line === 1.5) return awayWin + draw + homeWin * 0.3;
      if (line === 2) return awayWin + draw + homeWin * 0.5;
    }
    
    return 0.5; // Default fallback
  }

  private calculateHalfTimePrediction(prediction: Prediction): { homeWin: number; draw: number; awayWin: number } {
    // Half-time typically has more draws and fewer goals
    return {
      homeWin: prediction.homeWin * 0.7,
      draw: prediction.draw * 1.4 + 0.1, // More draws at half-time
      awayWin: prediction.awayWin * 0.7
    };
  }

  private calculateDoubleResult(prediction: Prediction): Record<string, number> {
    const ht = this.calculateHalfTimePrediction(prediction);
    const ft = prediction;
    
    return {
      'HH': ht.homeWin * ft.homeWin,           // Home/Home
      'HD': ht.homeWin * ft.draw,              // Home/Draw
      'HA': ht.homeWin * ft.awayWin,           // Home/Away
      'DH': ht.draw * ft.homeWin,              // Draw/Home
      'DD': ht.draw * ft.draw,                 // Draw/Draw
      'DA': ht.draw * ft.awayWin,              // Draw/Away
      'AH': ht.awayWin * ft.homeWin,           // Away/Home
      'AD': ht.awayWin * ft.draw,              // Away/Draw
      'AA': ht.awayWin * ft.awayWin            // Away/Away
    };
  }

  private poissonProbability(k: number, lambda: number): number {
    return (Math.pow(lambda, k) * Math.exp(-lambda)) / this.factorial(k);
  }

  private factorial(n: number): number {
    if (n <= 1) return 1;
    return n * this.factorial(n - 1);
  }
}