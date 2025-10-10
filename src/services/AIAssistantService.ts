import { PredictionService } from './PredictionService';
import { footballApiService, TeamStats } from './FootballApiService';
import { Match, Prediction } from '../types';
import { teams } from '../data/globalTeams';
import { leagues } from '../data/leagues';

export class AIAssistantService {
  private predictionService: PredictionService;

  constructor(predictionService: PredictionService) {
    this.predictionService = predictionService;
  }

  async getResponse(message: string, match: Match): Promise<string> {
    const lowerCaseMessage = message.toLowerCase();

    if (lowerCaseMessage.includes('prediction')) {
      const predictions = this.predictionService.getModelPredictions(match);
      const predictionText = Object.entries(predictions)
        .map(([model, pred]) => `${model}: Home Win: ${(pred.homeWin * 100).toFixed(0)}%, Draw: ${(pred.draw * 100).toFixed(0)}%, Away Win: ${(pred.awayWin * 100).toFixed(0)}%`)
        .join('\n');
      return `Here are the predictions for ${match.homeTeam} vs ${match.awayTeam}:\n${predictionText}`;
    }

    if (lowerCaseMessage.includes('stats')) {
      return this.getMatchStats(match);
    }

    if (lowerCaseMessage.includes('standings')) {
      return this.getLeagueStandings(match.league);
    }

    return "I can provide predictions, team stats, and league standings. What would you like to know?";
  }

  private async getMatchStats(match: Match): Promise<string> {
    const homeTeam = teams.find(t => t.name === match.homeTeam);
    const awayTeam = teams.find(t => t.name === match.awayTeam);
    const league = leagues.find(l => l.name === match.league);

    if (!homeTeam || !awayTeam || !league) {
      return "I'm sorry, I couldn't find the necessary information for that match.";
    }

    try {
      const [homeStats, awayStats] = await Promise.all([
        footballApiService.getTeamStats(homeTeam.id, league.season, league.id),
        footballApiService.getTeamStats(awayTeam.id, league.season, league.id)
      ]);

      if (!homeStats || !awayStats) {
        return "I'm sorry, I couldn't retrieve the stats for one or both of the teams.";
      }

      const formatStats = (stats: TeamStats) => {
        return `${stats.team.name}:\n` +
               `  - Form: ${stats.form}\n` +
               `  - Goals For: ${stats.goals.for.total.total}\n` +
               `  - Goals Against: ${stats.goals.against.total.total}`;
      };

      return `Here are the stats for the match:\n${formatStats(homeStats)}\n${formatStats(awayStats)}`;
    } catch (error) {
      console.error("Error fetching match stats:", error);
      return "There was an error fetching the match stats. Please try again later.";
    }
  }

  private async getLeagueStandings(leagueName: string): Promise<string> {
    const league = leagues.find(l => l.name === leagueName);

    if (!league) {
      return "I'm sorry, I couldn't find that league.";
    }

    try {
      const standingsData = await footballApiService.getLeagueStandings(league.id, league.season);

      if (!standingsData) {
        return "I'm sorry, I couldn't retrieve the league standings.";
      }

      const standingsText = standingsData.league.standings[0]
        .slice(0, 10) // Top 10
        .map(s => `${s.rank}. ${s.team.name} - Points: ${s.points}, GD: ${s.goalsDiff}`)
        .join('\n');

      return `Here are the current top 10 standings for the ${leagueName}:\n${standingsText}`;
    } catch (error) {
      console.error("Error fetching league standings:", error);
      return "There was an error fetching the league standings. Please try again later.";
    }
  }
}