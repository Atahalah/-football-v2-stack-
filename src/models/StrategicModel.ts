import { BaseModel } from './BaseModel';
import { Match, Prediction, TeamStats } from '../types';

export interface StrategicContext {
  leaguePosition: number;
  pointsGap: number;
  matchImportance: 'low' | 'medium' | 'high' | 'critical';
  seasonPhase: 'early' | 'mid' | 'late' | 'final';
  competitionPressure: number;
  managerialStability: number;
}

export interface TeamObjectives {
  primary: 'title' | 'top4' | 'europa' | 'survival' | 'midtable';
  secondary: 'cup' | 'development' | 'stability';
  urgency: number; // 0-1 scale
  riskTolerance: number; // 0-1 scale
}

export class StrategicModel extends BaseModel {
  private teamObjectives: Map<string, TeamObjectives> = new Map();
  private managerialData: Map<string, any> = new Map();
  private seasonContext: Map<string, StrategicContext> = new Map();

  constructor() {
    super('Strategic Analysis');
    this.initializeStrategicData();
  }

  private initializeStrategicData(): void {
    // Premier League team objectives
    this.teamObjectives.set('Manchester City', {
      primary: 'title',
      secondary: 'cup',
      urgency: 0.9,
      riskTolerance: 0.7
    });

    this.teamObjectives.set('Arsenal', {
      primary: 'title',
      secondary: 'development',
      urgency: 0.8,
      riskTolerance: 0.6
    });

    this.teamObjectives.set('Liverpool', {
      primary: 'top4',
      secondary: 'cup',
      urgency: 0.7,
      riskTolerance: 0.8
    });

    this.teamObjectives.set('Chelsea', {
      primary: 'top4',
      secondary: 'stability',
      urgency: 0.6,
      riskTolerance: 0.5
    });

    this.teamObjectives.set('Manchester United', {
      primary: 'top4',
      secondary: 'development',
      urgency: 0.7,
      riskTolerance: 0.6
    });

    this.teamObjectives.set('Newcastle', {
      primary: 'europa',
      secondary: 'development',
      urgency: 0.5,
      riskTolerance: 0.4
    });

    this.teamObjectives.set('Brighton', {
      primary: 'midtable',
      secondary: 'development',
      urgency: 0.3,
      riskTolerance: 0.6
    });

    this.teamObjectives.set('Luton Town', {
      primary: 'survival',
      secondary: 'stability',
      urgency: 0.9,
      riskTolerance: 0.9
    });

    // Managerial data
    this.managerialData.set('Manchester City', {
      experience: 0.95,
      stability: 0.9,
      tacticalFlexibility: 0.9,
      pressureHandling: 0.85
    });

    this.managerialData.set('Arsenal', {
      experience: 0.7,
      stability: 0.8,
      tacticalFlexibility: 0.8,
      pressureHandling: 0.7
    });

    this.managerialData.set('Liverpool', {
      experience: 0.9,
      stability: 0.85,
      tacticalFlexibility: 0.75,
      pressureHandling: 0.9
    });
  }

  private analyzeStrategicContext(team: string, matchday: number = 20): StrategicContext {
    const objectives = this.teamObjectives.get(team);
    
    // Simulate league position and context
    const leaguePosition = this.simulateLeaguePosition(team);
    const seasonPhase = this.getSeasonPhase(matchday);
    const matchImportance = this.calculateMatchImportance(team, leaguePosition, seasonPhase);
    
    return {
      leaguePosition,
      pointsGap: this.calculatePointsGap(team, leaguePosition),
      matchImportance,
      seasonPhase,
      competitionPressure: this.calculateCompetitionPressure(team, leaguePosition, seasonPhase),
      managerialStability: this.managerialData.get(team)?.stability || 0.5
    };
  }

  private simulateLeaguePosition(team: string): number {
    const objectives = this.teamObjectives.get(team);
    if (!objectives) return 10;

    switch (objectives.primary) {
      case 'title': return Math.floor(Math.random() * 3) + 1;
      case 'top4': return Math.floor(Math.random() * 6) + 3;
      case 'europa': return Math.floor(Math.random() * 5) + 6;
      case 'midtable': return Math.floor(Math.random() * 6) + 8;
      case 'survival': return Math.floor(Math.random() * 5) + 16;
      default: return 10;
    }
  }

  private getSeasonPhase(matchday: number): 'early' | 'mid' | 'late' | 'final' {
    if (matchday <= 10) return 'early';
    if (matchday <= 25) return 'mid';
    if (matchday <= 35) return 'late';
    return 'final';
  }

  private calculateMatchImportance(
    team: string, 
    position: number, 
    phase: 'early' | 'mid' | 'late' | 'final'
  ): 'low' | 'medium' | 'high' | 'critical' {
    const objectives = this.teamObjectives.get(team);
    if (!objectives) return 'medium';

    let importance = 0;

    // Position-based importance
    if (objectives.primary === 'title' && position > 3) importance += 0.3;
    if (objectives.primary === 'top4' && position > 6) importance += 0.4;
    if (objectives.primary === 'survival' && position > 17) importance += 0.5;

    // Phase-based importance
    const phaseMultiplier = {
      'early': 0.5,
      'mid': 0.7,
      'late': 0.9,
      'final': 1.2
    };
    importance *= phaseMultiplier[phase];

    if (importance < 0.3) return 'low';
    if (importance < 0.6) return 'medium';
    if (importance < 0.9) return 'high';
    return 'critical';
  }

  private calculatePointsGap(team: string, position: number): number {
    const objectives = this.teamObjectives.get(team);
    if (!objectives) return 0;

    // Simulate points gap based on objectives and position
    switch (objectives.primary) {
      case 'title':
        return position === 1 ? 0 : Math.floor(Math.random() * 8) + 1;
      case 'top4':
        return position <= 4 ? 0 : Math.floor(Math.random() * 6) + 1;
      case 'survival':
        return position >= 18 ? -(Math.floor(Math.random() * 5) + 1) : Math.floor(Math.random() * 8) + 3;
      default:
        return Math.floor(Math.random() * 5);
    }
  }

  private calculateCompetitionPressure(
    team: string, 
    position: number, 
    phase: 'early' | 'mid' | 'late' | 'final'
  ): number {
    const objectives = this.teamObjectives.get(team);
    if (!objectives) return 0.5;

    let pressure = 0.3; // Base pressure

    // Objective-based pressure
    if (objectives.primary === 'title' && position > 2) pressure += 0.3;
    if (objectives.primary === 'top4' && position > 5) pressure += 0.4;
    if (objectives.primary === 'survival' && position > 17) pressure += 0.5;

    // Phase multiplier
    const phaseMultiplier = {
      'early': 0.6,
      'mid': 0.8,
      'late': 1.1,
      'final': 1.4
    };
    pressure *= phaseMultiplier[phase];

    // Urgency factor
    pressure += objectives.urgency * 0.2;

    return Math.min(1.0, pressure);
  }

  predict(match: Match): Prediction {
    const homeContext = this.analyzeStrategicContext(match.homeTeam);
    const awayContext = this.analyzeStrategicContext(match.awayTeam);
    
    // Base probabilities
    let homeWin = 0.45;
    let draw = 0.27;
    let awayWin = 0.28;

    // Strategic adjustments
    const homeAdvantage = this.calculateStrategicAdvantage(homeContext, awayContext);
    const motivationFactor = this.calculateMotivationFactor(homeContext, awayContext);
    const pressureFactor = this.calculatePressureFactor(homeContext, awayContext);

    // Apply adjustments
    const totalHomeAdvantage = homeAdvantage + motivationFactor - pressureFactor;
    
    homeWin += totalHomeAdvantage * 0.8;
    awayWin -= totalHomeAdvantage * 0.6;
    draw -= totalHomeAdvantage * 0.2;

    // Normalize probabilities
    const total = homeWin + draw + awayWin;
    homeWin /= total;
    draw /= total;
    awayWin /= total;

    // Calculate confidence based on strategic clarity
    const strategicClarity = Math.abs(totalHomeAdvantage) + 
                           (homeContext.matchImportance === awayContext.matchImportance ? 0 : 0.1);
    const confidence = 0.65 + strategicClarity * 1.5;

    return {
      homeWin: Math.max(0.05, Math.min(0.9, homeWin)),
      draw: Math.max(0.05, Math.min(0.5, draw)),
      awayWin: Math.max(0.05, Math.min(0.9, awayWin)),
      confidence: Math.min(0.95, confidence),
      expectedGoals: {
        home: 1.2 + totalHomeAdvantage * 1.8,
        away: 1.0 - totalHomeAdvantage * 1.2
      }
    };
  }

  private calculateStrategicAdvantage(home: StrategicContext, away: StrategicContext): number {
    let advantage = 0;

    // Match importance differential
    const importanceValues = { low: 1, medium: 2, high: 3, critical: 4 };
    const importanceDiff = importanceValues[home.matchImportance] - importanceValues[away.matchImportance];
    advantage += importanceDiff * 0.03;

    // Managerial stability
    advantage += (home.managerialStability - away.managerialStability) * 0.1;

    // League position context
    if (home.leaguePosition < away.leaguePosition) {
      advantage += 0.05; // Better positioned team slight advantage
    }

    return advantage;
  }

  private calculateMotivationFactor(home: StrategicContext, away: StrategicContext): number {
    let motivation = 0;

    // Points gap urgency
    if (home.pointsGap < 0 && home.matchImportance === 'critical') {
      motivation += 0.08; // Desperate for points
    }
    if (away.pointsGap < 0 && away.matchImportance === 'critical') {
      motivation -= 0.06; // Away team desperate
    }

    // Season phase motivation
    if (home.seasonPhase === 'final' && home.matchImportance === 'critical') {
      motivation += 0.06; // Final push at home
    }

    return motivation;
  }

  private calculatePressureFactor(home: StrategicContext, away: StrategicContext): number {
    let pressure = 0;

    // High pressure can be negative
    if (home.competitionPressure > 0.8) {
      pressure += 0.05; // Pressure affects home team negatively
    }
    if (away.competitionPressure > 0.8) {
      pressure -= 0.03; // Away team also affected but less
    }

    return pressure;
  }

  getStrategicInsights(homeTeam: string, awayTeam: string): any {
    const homeContext = this.analyzeStrategicContext(homeTeam);
    const awayContext = this.analyzeStrategicContext(awayTeam);
    const homeObjectives = this.teamObjectives.get(homeTeam);
    const awayObjectives = this.teamObjectives.get(awayTeam);

    return {
      homeTeamContext: {
        ...homeContext,
        objectives: homeObjectives
      },
      awayTeamContext: {
        ...awayContext,
        objectives: awayObjectives
      },
      keyFactors: {
        matchImportance: {
          home: homeContext.matchImportance,
          away: awayContext.matchImportance
        },
        pressure: {
          home: homeContext.competitionPressure,
          away: awayContext.competitionPressure
        },
        motivation: this.calculateMotivationFactor(homeContext, awayContext)
      },
      strategicRecommendations: this.generateStrategicRecommendations(homeContext, awayContext)
    };
  }

  private generateStrategicRecommendations(home: StrategicContext, away: StrategicContext): string[] {
    const recommendations: string[] = [];

    if (home.matchImportance === 'critical' && away.matchImportance === 'low') {
      recommendations.push('Home team has significantly more to play for');
      recommendations.push('Expect aggressive home team approach');
    }

    if (home.competitionPressure > 0.8) {
      recommendations.push('High pressure on home team may lead to nervous start');
      recommendations.push('Away team could benefit from early pressure');
    }

    if (home.seasonPhase === 'final' && home.pointsGap < 0) {
      recommendations.push('Desperate home team in final phase - expect all-out attack');
      recommendations.push('High-risk, high-reward approach likely');
    }

    if (away.managerialStability < 0.5) {
      recommendations.push('Away team manager under pressure - tactical changes likely');
      recommendations.push('Team cohesion may be affected');
    }

    return recommendations;
  }
}