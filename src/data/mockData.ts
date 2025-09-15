import { footballApiService } from '../services/FootballApiService';

// Enhanced mock data with real API integration capability
export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  league: string;
  venue: string;
  apiId?: number; // For linking with real API data
  odds?: {
    home: number;
    draw: number;
    away: number;
  };
}

export const mockMatches: Match[] = [
  {
    id: '1',
    homeTeam: 'Manchester City',
    awayTeam: 'Arsenal',
    date: '2024-01-15',
    time: '16:30',
    league: 'Premier League',
    venue: 'Etihad Stadium',
    odds: { home: 1.85, draw: 3.40, away: 4.20 }
  },
  {
    id: '2',
    homeTeam: 'Liverpool',
    awayTeam: 'Chelsea',
    date: '2024-01-15',
    time: '14:00',
    league: 'Premier League',
    venue: 'Anfield',
    odds: { home: 2.10, draw: 3.20, away: 3.80 }
  },
  {
    id: '3',
    homeTeam: 'Real Madrid',
    awayTeam: 'Barcelona',
    date: '2024-01-16',
    time: '21:00',
    league: 'La Liga',
    venue: 'Santiago Bernabéu',
    odds: { home: 2.25, draw: 3.10, away: 3.40 }
  },
  {
    id: '4',
    homeTeam: 'Bayern Munich',
    awayTeam: 'Borussia Dortmund',
    date: '2024-01-16',
    time: '18:30',
    league: 'Bundesliga',
    venue: 'Allianz Arena',
    odds: { home: 1.95, draw: 3.60, away: 4.00 }
  },
  {
    id: '5',
    homeTeam: 'Juventus',
    awayTeam: 'Inter Milan',
    date: '2024-01-17',
    time: '20:45',
    league: 'Serie A',
    venue: 'Allianz Stadium',
    odds: { home: 2.40, draw: 3.00, away: 3.20 }
  }
];