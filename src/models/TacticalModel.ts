import { BaseModel } from './BaseModel';
import { Match, Prediction, TeamStats } from '../types';

export interface TacticalFormation {
  formation: string;
  attackingStyle: 'possession' | 'counter' | 'direct' | 'pressing';
  defensiveStyle: 'high-line' | 'deep-block' | 'pressing' | 'compact';
  tempo: 'slow' | 'medium' | 'fast';
  width: 'narrow' | 'balanced' | 'wide';
}

export interface TacticalMatchup {
  homeAdvantage: number;
  styleClash: number;
  formationEffectiveness: number;
  tacticalFamiliarity: number;
}

export class TacticalModel extends BaseModel {
  private tacticalDatabase: Map<string, TacticalFormation> = new Map();
  private matchupHistory: Map<string, TacticalMatchup[]> = new Map();

  constructor() {
    super('Tactical Analysis');
    this.initializeTacticalDatabase();
  }

  private initializeTacticalDatabase(): void {
    // Premier League tactical profiles
    this.tacticalDatabase.set('Manchester City', {
      formation: '4-3-3',
      attackingStyle: 'possession',
      defensiveStyle: 'high-line',
      tempo: 'medium',
      width: 'wide'
    });

    this.tacticalDatabase.set('Liverpool', {
      formation: '4-3-3',
      attackingStyle: 'pressing',
      defensiveStyle: 'pressing',
      tempo: 'fast',
      width: 'wide'
    });

    this.tacticalDatabase.set('Arsenal', {
      formation: '4-2-3-1',
      attackingStyle: 'possession',
      defensiveStyle: 'high-line',
      tempo: 'medium',
      width: 'balanced'
    });

    this.tacticalDatabase.set('Chelsea', {
      formation: '3-4-3',
      attackingStyle: 'counter',
      defensiveStyle: 'compact',
      tempo: 'medium',
      width: 'wide'
    });

    this.tacticalDatabase.set('Manchester United', {
      formation: '4-2-3-1',
      attackingStyle: 'counter',
      defensiveStyle: 'deep-block',
      tempo: 'medium',
      width: 'balanced'
    });

    this.tacticalDatabase.set('Tottenham', {
      formation: '3-5-2',
      attackingStyle: 'direct',
      defensiveStyle: 'pressing',
      tempo: 'fast',
      width: 'wide'
    });
  }

  private analyzeTacticalMatchup(homeTeam: string, awayTeam: string): TacticalMatchup {
    const homeTactics = this.tacticalDatabase.get(homeTeam);
    const awayTactics = this.tacticalDatabase.get(awayTeam);

    if (!homeTactics || !awayTactics) {
      return {
        homeAdvantage: 0.1,
        styleClash: 0,
        formationEffectiveness: 0,
        tacticalFamiliarity: 0
      };
    }

    // Analyze style matchups
    const styleClash = this.calculateStyleClash(homeTactics, awayTactics);
    const formationEffectiveness = this.calculateFormationEffectiveness(
      homeTactics.formation,
      awayTactics.formation
    );

    // Home advantage based on tactical style
    let homeAdvantage = 0.1; // Base home advantage
    if (homeTactics.attackingStyle === 'possession' && homeTactics.tempo === 'slow') {
      homeAdvantage += 0.05; // Possession teams benefit more at home
    }
    if (awayTactics.defensiveStyle === 'deep-block') {
      homeAdvantage += 0.03; // Harder to break down defensive teams away
    }

    return {
      homeAdvantage,
      styleClash,
      formationEffectiveness,
      tacticalFamiliarity: this.getTacticalFamiliarity(homeTeam, awayTeam)
    };
  }

  private calculateStyleClash(home: TacticalFormation, away: TacticalFormation): number {
    let advantage = 0;

    // Attacking vs Defensive style matchups
    if (home.attackingStyle === 'possession' && away.defensiveStyle === 'deep-block') {
      advantage -= 0.1; // Possession struggles against deep blocks
    }
    if (home.attackingStyle === 'counter' && away.defensiveStyle === 'high-line') {
      advantage += 0.15; // Counter-attacking thrives against high lines
    }
    if (home.attackingStyle === 'pressing' && away.attackingStyle === 'possession') {
      advantage += 0.1; // Pressing disrupts possession
    }
    if (home.attackingStyle === 'direct' && away.defensiveStyle === 'compact') {
      advantage -= 0.05; // Direct play struggles against compact defenses
    }

    // Tempo matchups
    if (home.tempo === 'fast' && away.tempo === 'slow') {
      advantage += 0.08; // Fast tempo can overwhelm slow teams
    }
    if (home.tempo === 'slow' && away.attackingStyle === 'pressing') {
      advantage -= 0.12; // Slow tempo vulnerable to pressing
    }

    return advantage;
  }

  private calculateFormationEffectiveness(homeFormation: string, awayFormation: string): number {
    const formationMatchups: Record<string, Record<string, number>> = {
      '4-3-3': {
        '4-4-2': 0.1,
        '3-5-2': -0.05,
        '4-2-3-1': 0.05,
        '3-4-3': 0,
        '4-3-3': 0
      },
      '4-4-2': {
        '4-3-3': -0.1,
        '3-5-2': 0.05,
        '4-2-3-1': -0.05,
        '3-4-3': -0.08,
        '4-4-2': 0
      },
      '3-5-2': {
        '4-3-3': 0.05,
        '4-4-2': -0.05,
        '4-2-3-1': 0.08,
        '3-4-3': 0.03,
        '3-5-2': 0
      },
      '4-2-3-1': {
        '4-3-3': -0.05,
        '4-4-2': 0.05,
        '3-5-2': -0.08,
        '3-4-3': 0.02,
        '4-2-3-1': 0
      },
      '3-4-3': {
        '4-3-3': 0,
        '4-4-2': 0.08,
        '3-5-2': -0.03,
        '4-2-3-1': -0.02,
        '3-4-3': 0
      }
    };

    return formationMatchups[homeFormation]?.[awayFormation] || 0;
  }

  private getTacticalFamiliarity(homeTeam: string, awayTeam: string): number {
    const matchupKey = `${homeTeam}-${awayTeam}`;
    const history = this.matchupHistory.get(matchupKey) || [];
    
    // More familiar matchups have less tactical surprise
    return Math.min(history.length * 0.02, 0.1);
  }

  predict(match: Match): Prediction {
    const tacticalAnalysis = this.analyzeTacticalMatchup(match.homeTeam, match.awayTeam);
    
    // Base probabilities
    let homeWin = 0.45;
    let draw = 0.27;
    let awayWin = 0.28;

    // Apply tactical adjustments
    const totalAdvantage = tacticalAnalysis.homeAdvantage + 
                          tacticalAnalysis.styleClash + 
                          tacticalAnalysis.formationEffectiveness;

    homeWin += totalAdvantage;
    awayWin -= totalAdvantage * 0.7;
    draw -= totalAdvantage * 0.3;

    // Normalize probabilities
    const total = homeWin + draw + awayWin;
    homeWin /= total;
    draw /= total;
    awayWin /= total;

    // Calculate confidence based on tactical clarity
    const confidence = 0.6 + Math.abs(totalAdvantage) * 2;

    return {
      homeWin: Math.max(0.05, Math.min(0.9, homeWin)),
      draw: Math.max(0.05, Math.min(0.5, draw)),
      awayWin: Math.max(0.05, Math.min(0.9, awayWin)),
      confidence: Math.min(0.95, confidence),
      expectedGoals: {
        home: 1.3 + totalAdvantage * 2,
        away: 1.1 - totalAdvantage * 1.5
      }
    };
  }

  getTacticalInsights(homeTeam: string, awayTeam: string): any {
    const homeTactics = this.tacticalDatabase.get(homeTeam);
    const awayTactics = this.tacticalDatabase.get(awayTeam);
    const matchup = this.analyzeTacticalMatchup(homeTeam, awayTeam);

    return {
      homeTeamTactics: homeTactics,
      awayTeamTactics: awayTactics,
      keyMatchups: {
        styleClash: matchup.styleClash,
        formationEffectiveness: matchup.formationEffectiveness,
        homeAdvantage: matchup.homeAdvantage
      },
      recommendations: this.generateTacticalRecommendations(homeTactics, awayTactics)
    };
  }

  private generateTacticalRecommendations(home?: TacticalFormation, away?: TacticalFormation): string[] {
    if (!home || !away) return [];

    const recommendations: string[] = [];

    if (home.attackingStyle === 'possession' && away.defensiveStyle === 'deep-block') {
      recommendations.push('Home team may struggle to break down compact defense');
      recommendations.push('Look for set-piece opportunities and wide play');
    }

    if (home.attackingStyle === 'counter' && away.defensiveStyle === 'high-line') {
      recommendations.push('Home team well-positioned to exploit space behind defense');
      recommendations.push('Expect fast transitions and through balls');
    }

    if (away.attackingStyle === 'pressing' && home.tempo === 'slow') {
      recommendations.push('Away team pressing could disrupt home team rhythm');
      recommendations.push('Early goals crucial for away team momentum');
    }

    return recommendations;
  }
}