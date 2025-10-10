export interface LiveMatch {
  id: number;
  date: string;
  time: string;
  homeTeam: {
    id: number;
    name: string;
    logo: string;
  };
  awayTeam: {
    id: number;
    name: string;
    logo: string;
  };
  league: {
    id: number;
    name: string;
    country: string;
    logo: string;
    season: number;
  };
  venue: {
    name: string;
    city: string;
  };
  status: {
    long: string;
    short: string;
    elapsed: number | null;
  };
  score: {
    home: number | null;
    away: number | null;
  };
  odds?: {
    home: number;
    draw: number;
    away: number;
  };
}

export interface TeamStats {
  team: {
    id: number;
    name: string;
  };
  form: string;
  fixtures: {
    played: { home: number; away: number; total: number };
    wins: { home: number; away: number; total: number };
    draws: { home: number; away: number; total: number };
    loses: { home: number; away: number; total: number };
  };
  goals: {
    for: { total: { home: number; away: number; total: number } };
    against: { total: { home: number; away: number; total: number } };
  };
}

export interface LeagueStandings {
  league: {
    id: number;
    name: string;
    country: string;
    logo: string;
    season: number;
    standings: Array<Array<{
      rank: number;
      team: {
        id: number;
        name: string;
        logo: string;
      };
      points: number;
      goalsDiff: number;
      group: string;
      form: string;
      status: string;
      description: string;
      all: {
        played: number;
        win: number;
        draw: number;
        lose: number;
        goals: { for: number; against: number };
      };
      home: {
        played: number;
        win: number;
        draw: number;
        lose: number;
        goals: { for: number; against: number };
      };
      away: {
        played: number;
        win: number;
        draw: number;
        lose: number;
        goals: { for: number; against: number };
      };
    }>>;
  };
}

class FootballApiService {
  private apiKey: string;
  private baseUrl: string;
  private dailyRequestCount: number = 0;
  private lastResetDate: string = '';

  constructor() {
    this.apiKey = import.meta.env.VITE_FOOTBALL_API_KEY || '1c0ac3cb86d40ea471d4d603d1b676d1';
    this.baseUrl = 'https://v3.football.api-sports.io';
    this.checkDailyLimit();
  }

  private checkDailyLimit(): void {
    const today = new Date().toDateString();
    const stored = localStorage.getItem('footballApiUsage');
    
    if (stored) {
      const usage = JSON.parse(stored);
      if (usage.date === today) {
        this.dailyRequestCount = usage.count;
      } else {
        this.dailyRequestCount = 0;
        this.lastResetDate = today;
      }
    }
  }

  private updateRequestCount(): void {
    this.dailyRequestCount++;
    const today = new Date().toDateString();
    localStorage.setItem('footballApiUsage', JSON.stringify({
      date: today,
      count: this.dailyRequestCount
    }));
  }

  private async makeRequest(endpoint: string, params: Record<string, any> = {}): Promise<any> {
    if (this.dailyRequestCount >= 100) {
      throw new Error('Daily API limit reached (100 requests). Please try again tomorrow.');
    }

    const url = new URL(`${this.baseUrl}${endpoint}`);
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, value.toString());
      }
    });

    try {
      const response = await fetch(url.toString(), {
        headers: {
          'X-RapidAPI-Key': this.apiKey,
          'X-RapidAPI-Host': 'v3.football.api-sports.io'
        }
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      this.updateRequestCount();
      
      return data;
    } catch (error) {
      console.error('Football API request failed:', error);
      throw error;
    }
  }

  async getTodaysMatches(): Promise<LiveMatch[]> {
    const today = new Date().toISOString().split('T')[0];
    
    try {
      const response = await this.makeRequest('/fixtures', {
        date: today,
        status: 'NS-1H-HT-2H-ET-BT-P-SUSP-INT-FT'
      });

      return response.response.map((fixture: any) => ({
        id: fixture.fixture.id,
        date: fixture.fixture.date.split('T')[0],
        time: fixture.fixture.date.split('T')[1].substring(0, 5),
        homeTeam: {
          id: fixture.teams.home.id,
          name: fixture.teams.home.name,
          logo: fixture.teams.home.logo
        },
        awayTeam: {
          id: fixture.teams.away.id,
          name: fixture.teams.away.name,
          logo: fixture.teams.away.logo
        },
        league: {
          id: fixture.league.id,
          name: fixture.league.name,
          country: fixture.league.country,
          logo: fixture.league.logo,
          season: fixture.league.season
        },
        venue: {
          name: fixture.fixture.venue.name || 'Unknown',
          city: fixture.fixture.venue.city || 'Unknown'
        },
        status: {
          long: fixture.fixture.status.long,
          short: fixture.fixture.status.short,
          elapsed: fixture.fixture.status.elapsed
        },
        score: {
          home: fixture.goals.home,
          away: fixture.goals.away
        }
      }));
    } catch (error) {
      console.error('Error fetching today\'s matches:', error);
      return [];
    }
  }

  async getMatchOdds(fixtureId: number): Promise<any> {
    try {
      const response = await this.makeRequest('/odds', {
        fixture: fixtureId,
        bet: 1 // Match Winner
      });

      if (response.response.length > 0) {
        const bookmaker = response.response[0].bookmakers[0];
        const outcomes = bookmaker.bets[0].values;
        
        return {
          home: parseFloat(outcomes.find((o: any) => o.value === 'Home')?.odd || '0'),
          draw: parseFloat(outcomes.find((o: any) => o.value === 'Draw')?.odd || '0'),
          away: parseFloat(outcomes.find((o: any) => o.value === 'Away')?.odd || '0')
        };
      }
      return null;
    } catch (error) {
      console.error('Error fetching match odds:', error);
      return null;
    }
  }

  async getTeamStats(teamId: number, season: number, leagueId: number): Promise<TeamStats | null> {
    try {
      const response = await this.makeRequest('/teams/statistics', {
        team: teamId,
        season: season,
        league: leagueId
      });

      if (response.response) {
        return response.response;
      }
      return null;
    } catch (error) {
      console.error('Error fetching team stats:', error);
      return null;
    }
  }

  async getLeagueStandings(leagueId: number, season: number): Promise<LeagueStandings | null> {
    try {
      const response = await this.makeRequest('/standings', {
        league: leagueId,
        season: season
      });

      if (response.response.length > 0) {
        return response.response[0];
      }
      return null;
    } catch (error) {
      console.error('Error fetching league standings:', error);
      return null;
    }
  }

  async getUpcomingMatches(days: number = 7): Promise<LiveMatch[]> {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + days);

    try {
      const response = await this.makeRequest('/fixtures', {
        from: startDate.toISOString().split('T')[0],
        to: endDate.toISOString().split('T')[0],
        status: 'NS'
      });

      return response.response.slice(0, 50).map((fixture: any) => ({
        id: fixture.fixture.id,
        date: fixture.fixture.date.split('T')[0],
        time: fixture.fixture.date.split('T')[1].substring(0, 5),
        homeTeam: {
          id: fixture.teams.home.id,
          name: fixture.teams.home.name,
          logo: fixture.teams.home.logo
        },
        awayTeam: {
          id: fixture.teams.away.id,
          name: fixture.teams.away.name,
          logo: fixture.teams.away.logo
        },
        league: {
          id: fixture.league.id,
          name: fixture.league.name,
          country: fixture.league.country,
          logo: fixture.league.logo,
          season: fixture.league.season
        },
        venue: {
          name: fixture.fixture.venue.name || 'Unknown',
          city: fixture.fixture.venue.city || 'Unknown'
        },
        status: {
          long: fixture.fixture.status.long,
          short: fixture.fixture.status.short,
          elapsed: fixture.fixture.status.elapsed
        },
        score: {
          home: fixture.goals.home,
          away: fixture.goals.away
        }
      }));
    } catch (error) {
      console.error('Error fetching upcoming matches:', error);
      return [];
    }
  }

  getRemainingRequests(): number {
    return Math.max(0, 100 - this.dailyRequestCount);
  }

  getUsageStats(): { used: number; remaining: number; resetTime: string } {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    return {
      used: this.dailyRequestCount,
      remaining: this.getRemainingRequests(),
      resetTime: tomorrow.toLocaleString()
    };
  }
}

export const footballApiService = new FootballApiService();