import { BaseModel } from './BaseModel';
import { Match, Prediction } from '../types';

export interface WeatherConditions {
  temperature: number; // Celsius
  humidity: number; // Percentage
  windSpeed: number; // km/h
  precipitation: number; // mm
  condition: 'clear' | 'cloudy' | 'rain' | 'snow' | 'fog';
  visibility: number; // km
}

export class WeatherModel extends BaseModel {
  constructor() {
    super('Weather Impact Analysis');
  }

  private getWeatherImpact(weather: WeatherConditions): {
    goalScoring: number;
    homeAdvantage: number;
    playingStyle: number;
  } {
    let goalScoring = 0;
    let homeAdvantage = 0;
    let playingStyle = 0;

    // Temperature effects
    if (weather.temperature < 5) {
      goalScoring -= 0.15; // Cold reduces scoring
      homeAdvantage += 0.05; // Home team more adapted
    } else if (weather.temperature > 30) {
      goalScoring -= 0.1; // Heat reduces intensity
      playingStyle -= 0.1; // Slower tempo
    }

    // Precipitation effects
    if (weather.precipitation > 5) {
      goalScoring += 0.1; // More mistakes, more goals
      playingStyle -= 0.15; // Favors direct play
      homeAdvantage += 0.08; // Home team knows pitch better
    }

    // Wind effects
    if (weather.windSpeed > 25) {
      goalScoring -= 0.05; // Affects passing accuracy
      playingStyle -= 0.1; // Favors ground play
    }

    // Visibility effects
    if (weather.visibility < 5 || weather.condition === 'fog') {
      goalScoring -= 0.08; // Reduced visibility affects play
      homeAdvantage += 0.12; // Home team advantage increases
    }

    return { goalScoring, homeAdvantage, playingStyle };
  }

  predict(match: Match, weather?: WeatherConditions): Prediction {
    // Base probabilities
    let homeWin = 0.45;
    let draw = 0.27;
    let awayWin = 0.28;

    if (weather) {
      const impact = this.getWeatherImpact(weather);
      
      homeWin += impact.homeAdvantage + impact.goalScoring * 0.3;
      awayWin -= impact.homeAdvantage * 0.7;
      draw -= impact.goalScoring * 0.2;

      // Normalize
      const total = homeWin + draw + awayWin;
      homeWin /= total;
      draw /= total;
      awayWin /= total;
    }

    return {
      homeWin: Math.max(0.05, Math.min(0.9, homeWin)),
      draw: Math.max(0.05, Math.min(0.5, draw)),
      awayWin: Math.max(0.05, Math.min(0.9, awayWin)),
      confidence: weather ? 0.75 : 0.5,
      expectedGoals: {
        home: 1.3 + (weather ? this.getWeatherImpact(weather).goalScoring : 0),
        away: 1.1 - (weather ? this.getWeatherImpact(weather).homeAdvantage : 0)
      }
    };
  }
}