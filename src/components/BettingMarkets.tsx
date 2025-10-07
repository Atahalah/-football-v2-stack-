import React, { useState } from 'react';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { 
  TrendingUp, 
  Target, 
  DollarSign,
  BarChart3,
  Zap,
  Calculator,
  Trophy,
  Clock
} from 'lucide-react';
import { Match, Prediction, BettingMarketPrediction } from '../types';
import { BettingMarketsModel } from '../models/BettingMarketsModel';

interface BettingMarketsProps {
  match: Match;
  basePrediction: Prediction;
}

export const BettingMarkets: React.FC<BettingMarketsProps> = ({
  match,
  basePrediction
}) => {
  const [selectedMarket, setSelectedMarket] = useState<string>('double-chance');
  const [bettingModel] = useState(() => new BettingMarketsModel());
  
  const marketPredictions = bettingModel.predict(match, basePrediction);

  const getOdds = (probability: number): number => {
    return Math.max(1.01, 1 / Math.max(0.01, Math.min(0.99, probability)));
  };

  const getProbabilityColor = (prob: number) => {
    if (prob > 0.6) return 'text-green-600 font-bold';
    if (prob > 0.4) return 'text-blue-600 font-medium';
    return 'text-gray-600';
  };

  const formatPercentage = (value: number) => (value * 100).toFixed(1) + '%';

  const markets = {
    'double-chance': {
      name: 'Double Chance',
      icon: <Target className="w-4 h-4" />,
      predictions: [
        { name: '1X (Home or Draw)', code: '1X', probability: marketPredictions.homeOrDraw },
        { name: '2X (Away or Draw)', code: '2X', probability: marketPredictions.awayOrDraw },
        { name: '12 (Home or Away)', code: '12', probability: marketPredictions.homeOrAway }
      ]
    },
    'over-under': {
      name: 'Over/Under Goals',
      icon: <BarChart3 className="w-4 h-4" />,
      predictions: [
        { name: 'Over 1.5 Goals', code: 'O1.5', probability: marketPredictions.over15Goals },
        { name: 'Under 1.5 Goals', code: 'U1.5', probability: marketPredictions.under15Goals },
        { name: 'Over 2.5 Goals', code: 'O2.5', probability: marketPredictions.over25Goals },
        { name: 'Under 2.5 Goals', code: 'U2.5', probability: marketPredictions.under25Goals },
        { name: 'Over 3.5 Goals', code: 'O3.5', probability: marketPredictions.over35Goals },
        { name: 'Under 3.5 Goals', code: 'U3.5', probability: marketPredictions.under35Goals }
      ]
    },
    'btts': {
      name: 'Both Teams to Score',
      icon: <Zap className="w-4 h-4" />,
      predictions: [
        { name: 'Both Teams Score', code: 'BTTS', probability: marketPredictions.bothTeamsScore },
        { name: 'Both Teams No Score', code: 'BTTS-NO', probability: marketPredictions.bothTeamsNoScore }
      ]
    },
    'half-time': {
      name: 'Half Time Result',
      icon: <Clock className="w-4 h-4" />,
      predictions: [
        { name: 'HT Home Win', code: 'HT-1', probability: marketPredictions.halfTime.homeWin },
        { name: 'HT Draw', code: 'HT-X', probability: marketPredictions.halfTime.draw },
        { name: 'HT Away Win', code: 'HT-2', probability: marketPredictions.halfTime.awayWin }
      ]
    },
    'asian-handicap': {
      name: 'Asian Handicap',
      icon: <Calculator className="w-4 h-4" />,
      predictions: Object.entries(marketPredictions.homeHandicap).map(([handicap, prob]) => ({
        name: `${match.homeTeam} ${handicap}`,
        code: `AH${handicap}`,
        probability: prob
      }))
    },
    'correct-score': {
      name: 'Correct Score',
      icon: <Trophy className="w-4 h-4" />,
      predictions: Object.entries(marketPredictions.correctScoreProbabilities)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 8)
        .map(([score, prob]) => ({
          name: score,
          code: score,
          probability: prob
        }))
    }
  };

  return (
    <div className="space-y-6">
      {/* Market Selection */}
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <DollarSign className="w-5 h-5" />
          Betting Markets Analysis
        </h3>
        <div className="flex flex-wrap gap-2">
          {Object.entries(markets).map(([key, market]) => (
            <Button
              key={key}
              variant={selectedMarket === key ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedMarket(key)}
              className="flex items-center gap-2"
            >
              {market.icon}
              {market.name}
            </Button>
          ))}
        </div>
      </Card>

      {/* Selected Market Predictions */}
      <Card className="p-6">
        <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
          {markets[selectedMarket as keyof typeof markets].icon}
          {markets[selectedMarket as keyof typeof markets].name}
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {markets[selectedMarket as keyof typeof markets].predictions.map((prediction, index) => (
            <Card key={index} className="p-4 hover:shadow-md transition-shadow">
              <div className="text-center">
                <div className="font-medium text-sm mb-2">{prediction.name}</div>
                <div className={`text-2xl font-bold mb-1 ${getProbabilityColor(prediction.probability)}`}>
                  {formatPercentage(prediction.probability)}
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  Odds: {getOdds(prediction.probability).toFixed(2)}
                </div>
                <Badge 
                  className={
                    prediction.probability > 0.6 ? 'bg-green-100 text-green-800' :
                    prediction.probability > 0.4 ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }
                >
                  {prediction.code}
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* Double Result Matrix */}
      {selectedMarket === 'double-chance' && (
        <Card className="p-6">
          <h4 className="text-lg font-semibold mb-4">Double Result (HT/FT)</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">HT/FT</th>
                  <th className="text-center p-2">Home</th>
                  <th className="text-center p-2">Draw</th>
                  <th className="text-center p-2">Away</th>
                </tr>
              </thead>
              <tbody>
                {['Home', 'Draw', 'Away'].map(htResult => (
                  <tr key={htResult} className="border-b">
                    <td className="font-medium p-2">{htResult}</td>
                    {['H', 'D', 'A'].map(ftResult => {
                      const key = `${htResult[0]}${ftResult}`;
                      const prob = marketPredictions.doubleResult[key] || 0;
                      return (
                        <td key={ftResult} className="text-center p-2">
                          <div className={getProbabilityColor(prob)}>
                            {formatPercentage(prob)}
                          </div>
                          <div className="text-xs text-gray-500">
                            {getOdds(prob).toFixed(1)}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Value Bets Alert */}
      <Card className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          Best Value Predictions
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="text-center p-3 bg-white rounded-lg">
            <div className="font-bold text-green-600">1X</div>
            <div className="text-sm">{formatPercentage(marketPredictions.homeOrDraw)}</div>
            <div className="text-xs text-gray-600">Odds: {getOdds(marketPredictions.homeOrDraw).toFixed(2)}</div>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <div className="font-bold text-blue-600">O2.5</div>
            <div className="text-sm">{formatPercentage(marketPredictions.over25Goals)}</div>
            <div className="text-xs text-gray-600">Odds: {getOdds(marketPredictions.over25Goals).toFixed(2)}</div>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <div className="font-bold text-purple-600">BTTS</div>
            <div className="text-sm">{formatPercentage(marketPredictions.bothTeamsScore)}</div>
            <div className="text-xs text-gray-600">Odds: {getOdds(marketPredictions.bothTeamsScore).toFixed(2)}</div>
          </div>
        </div>
      </Card>
    </div>
  );
};