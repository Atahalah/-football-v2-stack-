import React, { useState } from 'react';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { 
  Cloud, 
  Activity, 
  TrendingUp, 
  AlertTriangle,
  Thermometer,
  Droplets,
  Wind,
  Eye,
  DollarSign,
  Users,
  BarChart3
} from 'lucide-react';
import { WeatherModel, WeatherConditions } from '../models/WeatherModel';
import { InjuryModel } from '../models/InjuryModel';
import { MarketModel } from '../models/MarketModel';
import { Match } from '../types';

interface AdvancedAnalyticsProps {
  match: Match;
}

export const AdvancedAnalytics: React.FC<AdvancedAnalyticsProps> = ({ match }) => {
  const [weatherModel] = useState(() => new WeatherModel());
  const [injuryModel] = useState(() => new InjuryModel());
  const [marketModel] = useState(() => new MarketModel());

  // Simulate weather conditions
  const weatherConditions: WeatherConditions = {
    temperature: 15 + Math.random() * 15,
    humidity: 40 + Math.random() * 40,
    windSpeed: Math.random() * 30,
    precipitation: Math.random() * 10,
    condition: ['clear', 'cloudy', 'rain'][Math.floor(Math.random() * 3)] as any,
    visibility: 8 + Math.random() * 7
  };

  const weatherPrediction = weatherModel.predict(match, weatherConditions);
  const injuryPrediction = injuryModel.predict(match);
  const marketPrediction = marketModel.predict(match);

  const homeInjuries = injuryModel.getInjuryReport(match.homeTeam);
  const awayInjuries = injuryModel.getInjuryReport(match.awayTeam);
  const marketInsights = marketModel.getMarketInsights(match);

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'clear': return '☀️';
      case 'cloudy': return '☁️';
      case 'rain': return '🌧️';
      case 'snow': return '❄️';
      case 'fog': return '🌫️';
      default: return '🌤️';
    }
  };

  const getInjurySeverityColor = (type: string) => {
    switch (type) {
      case 'major': return 'bg-red-100 text-red-800';
      case 'moderate': return 'bg-orange-100 text-orange-800';
      case 'minor': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Weather Analysis */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Cloud className="w-5 h-5" />
          Weather Impact Analysis
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium">Current Conditions</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{getWeatherIcon(weatherConditions.condition)}</span>
                <span className="capitalize">{weatherConditions.condition}</span>
              </div>
              <div className="flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-red-500" />
                <span>{Math.round(weatherConditions.temperature)}°C</span>
              </div>
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-blue-500" />
                <span>{Math.round(weatherConditions.humidity)}% humidity</span>
              </div>
              <div className="flex items-center gap-2">
                <Wind className="w-4 h-4 text-gray-500" />
                <span>{Math.round(weatherConditions.windSpeed)} km/h</span>
              </div>
              <div className="flex items-center gap-2">
                <Cloud className="w-4 h-4 text-gray-500" />
                <span>{weatherConditions.precipitation.toFixed(1)}mm rain</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-gray-500" />
                <span>{weatherConditions.visibility.toFixed(1)}km visibility</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium">Weather-Adjusted Prediction</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">{match.homeTeam} Win</span>
                <span className="font-medium">{(weatherPrediction.homeWin * 100).toFixed(1)}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Draw</span>
                <span className="font-medium">{(weatherPrediction.draw * 100).toFixed(1)}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">{match.awayTeam} Win</span>
                <span className="font-medium">{(weatherPrediction.awayWin * 100).toFixed(1)}%</span>
              </div>
            </div>
            <div className="pt-2 border-t">
              <div className="flex justify-between items-center text-sm">
                <span>Confidence</span>
                <Badge variant="outline">{(weatherPrediction.confidence * 100).toFixed(0)}%</Badge>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Injury Analysis */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Injury Impact Analysis
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              {match.homeTeam}
            </h4>
            {homeInjuries.injuries.length > 0 ? (
              <div className="space-y-2">
                {homeInjuries.injuries.map((injury, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div>
                      <div className="font-medium text-sm">{injury.playerName}</div>
                      <div className="text-xs text-gray-600">{injury.position}</div>
                    </div>
                    <Badge className={getInjurySeverityColor(injury.injuryType)} size="sm">
                      {injury.injuryType}
                    </Badge>
                  </div>
                ))}
                <div className="pt-2 border-t text-sm">
                  <div className="flex justify-between">
                    <span>Total Impact:</span>
                    <span className="font-medium">{homeInjuries.totalImpact.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Key Players Out:</span>
                    <span className="font-medium">{homeInjuries.keyPlayersOut}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-sm text-gray-600 bg-green-50 p-3 rounded">
                ✅ No significant injuries reported
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h4 className="font-medium flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              {match.awayTeam}
            </h4>
            {awayInjuries.injuries.length > 0 ? (
              <div className="space-y-2">
                {awayInjuries.injuries.map((injury, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div>
                      <div className="font-medium text-sm">{injury.playerName}</div>
                      <div className="text-xs text-gray-600">{injury.position}</div>
                    </div>
                    <Badge className={getInjurySeverityColor(injury.injuryType)} size="sm">
                      {injury.injuryType}
                    </Badge>
                  </div>
                ))}
                <div className="pt-2 border-t text-sm">
                  <div className="flex justify-between">
                    <span>Total Impact:</span>
                    <span className="font-medium">{awayInjuries.totalImpact.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Key Players Out:</span>
                    <span className="font-medium">{awayInjuries.keyPlayersOut}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-sm text-gray-600 bg-green-50 p-3 rounded">
                ✅ No significant injuries reported
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Market Analysis */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Betting Market Analysis
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium">Market Data</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">{match.homeTeam} Odds</span>
                <Badge variant="outline">{marketInsights.marketData.homeOdds.toFixed(2)}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Draw Odds</span>
                <Badge variant="outline">{marketInsights.marketData.drawOdds.toFixed(2)}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">{match.awayTeam} Odds</span>
                <Badge variant="outline">{marketInsights.marketData.awayOdds.toFixed(2)}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Market Movement</span>
                <Badge className={
                  marketInsights.marketData.movement === 'rising' ? 'bg-green-100 text-green-800' :
                  marketInsights.marketData.movement === 'falling' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }>
                  {marketInsights.marketData.movement}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Market Efficiency</span>
                <span className="font-medium">{(marketInsights.efficiency * 100).toFixed(1)}%</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium">Market-Adjusted Prediction</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">{match.homeTeam} Win</span>
                <span className="font-medium">{(marketPrediction.homeWin * 100).toFixed(1)}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Draw</span>
                <span className="font-medium">{(marketPrediction.draw * 100).toFixed(1)}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">{match.awayTeam} Win</span>
                <span className="font-medium">{(marketPrediction.awayWin * 100).toFixed(1)}%</span>
              </div>
            </div>
            
            {marketInsights.recommendations.length > 0 && (
              <div className="pt-3 border-t">
                <h5 className="text-sm font-medium mb-2">Market Insights</h5>
                <div className="space-y-1">
                  {marketInsights.recommendations.map((rec: string, index: number) => (
                    <div key={index} className="text-xs text-gray-600 flex items-start gap-1">
                      <div className="w-1 h-1 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};