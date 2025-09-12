import { BaseModel } from './BaseModel';
import { Match, Prediction } from '../types';

export interface PlayerInjury {
  playerId: string;
  playerName: string;
  position: 'GK' | 'DEF' | 'MID' | 'FWD';
  importance: number; // 0-1 scale
  injuryType: 'minor' | 'moderate' | 'major';
  expectedReturn?: string;
}

export interface TeamInjuries {
  team: string;
  injuries: PlayerInjury[];
  totalImpact: number;
  keyPlayersOut: number;
}

export class InjuryModel extends BaseModel {
  private keyPlayers: Map<string, PlayerInjury[]> = new Map();

  constructor() {
    super('Injury Impact Analysis');
    this.initializeKeyPlayers();
  }

  private initializeKeyPlayers(): void {
    // Sample key players for major teams
    this.keyPlayers.set('Manchester City', [
      { playerId: 'haaland', playerName: 'Erling Haaland', position: 'FWD', importance: 0.9, injuryType: 'minor' },
      { playerId: 'debruyne', playerName: 'Kevin De Bruyne', position: 'MID', importance: 0.85, injuryType: 'minor' },
      { playerId: 'rodri', playerName: 'Rodri', position: 'MID', importance: 0.8, injuryType: 'minor' }
    ]);

    this.keyPlayers.set('Arsenal', [
      { playerId: 'saka', playerName: 'Bukayo Saka', position: 'FWD', importance: 0.85, injuryType: 'minor' },
      { playerId: 'odegaard', playerName: 'Martin Ødegaard', position: 'MID', importance: 0.8, injuryType: 'minor' },
      { playerId: 'saliba', playerName: 'William Saliba', position: 'DEF', importance: 0.75, injuryType: 'minor' }
    ]);

    this.keyPlayers.set('Liverpool', [
      { playerId: 'salah', playerName: 'Mohamed Salah', position: 'FWD', importance: 0.9, injuryType: 'minor' },
      { playerId: 'vanDijk', playerName: 'Virgil van Dijk', position: 'DEF', importance: 0.85, injuryType: 'minor' },
      { playerId: 'alisson', playerName: 'Alisson', position: 'GK', importance: 0.8, injuryType: 'minor' }
    ]);
  }

  private calculateInjuryImpact(injuries: PlayerInjury[]): number {
    return injuries.reduce((total, injury) => {
      let impact = injury.importance;
      
      // Multiply by injury severity
      switch (injury.injuryType) {
        case 'major': impact *= 1.0; break;
        case 'moderate': impact *= 0.7; break;
        case 'minor': impact *= 0.3; break;
      }

      // Position-specific impact
      switch (injury.position) {
        case 'GK': impact *= 1.2; break; // Goalkeepers are crucial
        case 'FWD': impact *= 1.1; break; // Forwards affect scoring
        case 'MID': impact *= 1.0; break; // Midfielders are balanced
        case 'DEF': impact *= 0.9; break; // Defenders are more replaceable
      }

      return total + impact;
    }, 0);
  }

  private simulateInjuries(team: string): PlayerInjury[] {
    const players = this.keyPlayers.get(team) || [];
    const injuries: PlayerInjury[] = [];

    // Simulate random injuries (10% chance per key player)
    players.forEach(player => {
      if (Math.random() < 0.1) {
        const injuryTypes: ('minor' | 'moderate' | 'major')[] = ['minor', 'moderate', 'major'];
        const randomType = injuryTypes[Math.floor(Math.random() * injuryTypes.length)];
        
        injuries.push({
          ...player,
          injuryType: randomType
        });
      }
    });

    return injuries;
  }

  predict(match: Match): Prediction {
    const homeInjuries = this.simulateInjuries(match.homeTeam);
    const awayInjuries = this.simulateInjuries(match.awayTeam);

    const homeImpact = this.calculateInjuryImpact(homeInjuries);
    const awayImpact = this.calculateInjuryImpact(awayInjuries);

    // Base probabilities
    let homeWin = 0.45;
    let draw = 0.27;
    let awayWin = 0.28;

    // Apply injury impacts
    const netImpact = awayImpact - homeImpact; // Positive favors home team
    
    homeWin += netImpact * 0.15;
    awayWin -= netImpact * 0.12;
    draw -= netImpact * 0.03;

    // Normalize probabilities
    const total = homeWin + draw + awayWin;
    homeWin /= total;
    draw /= total;
    awayWin /= total;

    const confidence = 0.6 + Math.abs(netImpact) * 0.3;

    return {
      homeWin: Math.max(0.05, Math.min(0.9, homeWin)),
      draw: Math.max(0.05, Math.min(0.5, draw)),
      awayWin: Math.max(0.05, Math.min(0.9, awayWin)),
      confidence: Math.min(0.95, confidence),
      expectedGoals: {
        home: 1.3 - homeImpact * 0.5,
        away: 1.1 - awayImpact * 0.5
      }
    };
  }

  getInjuryReport(team: string): TeamInjuries {
    const injuries = this.simulateInjuries(team);
    const totalImpact = this.calculateInjuryImpact(injuries);
    const keyPlayersOut = injuries.filter(i => i.importance > 0.7).length;

    return {
      team,
      injuries,
      totalImpact,
      keyPlayersOut
    };
  }
}