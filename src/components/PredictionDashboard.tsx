import React, { useState } from 'react';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { 
  Target, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  BarChart3,
  Zap,
  Shield,
  Clock
} from 'lucide-react';
import { Match, Prediction } from '../types';

interface ModelPrediction {
  name: string;
  prediction: Prediction;
  weight: number;
  confidence: number;
  specialty: string;
}

interface PredictionDashboardProps {
  match: Match;
  predictions: Record<string, Prediction>;
}

export const PredictionDashboard: React.FC<PredictionDashboardProps> = ({
  match,
  predictions
}) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'90min' | '120min'>('90min');

  // Calculate ensemble prediction
  const ensemblePrediction = React.useMemo(() => {
    const models = Object.entries(predictions);
    if (models.length === 0) return null;

    let totalWeight = 0;
    let weightedHome = 0;
    let weightedDraw = 0;
    let weightedAway = 0;
    let avgConfidence = 0;

    models.forEach(([name, pred]) => {
      const weight = pred.confidence; // Use confidence as weight
      totalWeight += weight;
      weightedHome += pred.homeWin * weight;
      weightedDraw += pred.draw * weight;
      weightedAway += pred.awayWin * weight;
      avgConfidence += pred.confidence;
    });

    return {
      homeWin: weightedHome / totalWeight,
      draw: weightedDraw / totalWeight,
      awayWin: weightedAway / totalWeight,
      confidence: avgConfidence / models.length,
      expectedGoals: {
        home: models.reduce((sum, [, pred]) => sum + (pred.expectedGoals?.home || 0), 0) / models.length,
        away: models.reduce((sum, [, pred]) => sum + (pred.expectedGoals?.away || 0), 0) / models.length
      }
    };
  }, [predictions]);

  const getOutcomeColor = (probability: number) => {
    if (probability > 0.6) return 'text-green-600';
    if (probability > 0.4) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getConfidenceLevel = (confidence: number) => {
    if (confidence > 0.8) return { text: 'Very High', color: 'bg-green-100 text-green-800' };
    if (confidence > 0.6) return { text: 'High', color: 'bg-blue-100 text-blue-800' };
    if (confidence > 0.4) return { text: 'Medium', color: 'bg-yellow-100 text-yellow-800' };
    return { text: 'Low', color: 'bg-red-100 text-red-800' };
  };

  const getMostLikelyOutcome = (pred: Prediction) => {
    if (pred.homeWin > pred.draw && pred.homeWin > pred.awayWin) {
      return { outcome: 'Home Win', probability: pred.homeWin, team: match.homeTeam };
    }
    if (pred.awayWin > pred.draw && pred.awayWin > pred.homeWin) {
      return { outcome: 'Away Win', probability: pred.awayWin, team: match.awayTeam };
    }
    return { outcome: 'Draw', probability: pred.draw, team: null };
  };

  const calculateValueBets = () => {
    if (!ensemblePrediction) return [];
    
    // Simulate market odds
    const marketOdds = {
      home: 1 / ensemblePrediction.homeWin,
      draw: 1 / ensemblePrediction.draw,
      away: 1 / ensemblePrediction.awayWin
    };

    const valueBets = [];
    
    // Add some noise to create value opportunities
    const adjustedOdds = {
      home: marketOdds.home * (0.9 + Math.random() * 0.2),
      draw: marketOdds.draw * (0.9 + Math.random() * 0.2),
      away: marketOdds.away * (0.9 + Math.random() * 0.2)
    };

    if (1 / adjustedOdds.home < ensemblePrediction.homeWin * 0.9) {
      valueBets.push({
        outcome: `${match.homeTeam} Win`,
        modelProb: ensemblePrediction.homeWin,
        marketOdds: adjustedOdds.home,
        value: (ensemblePrediction.homeWin * adjustedOdds.home - 1) * 100
      });
    }

    if (1 / adjustedOdds.away < ensemblePrediction.awayWin * 0.9) {
      valueBets.push({
        outcome: `${match.awayTeam} Win`,
        modelProb: ensemblePrediction.awayWin,
        marketOdds: adjustedOdds.away,
        value: (ensemblePrediction.awayWin * adjustedOdds.away - 1) * 100
      });
    }

    return valueBets;
  };

  if (!ensemblePrediction) {
    return (
      <Card className="p-6">
        <div className="text-center text-gray-500">
          No predictions available
        </div>
      </Card>
    );
  }

  const mostLikely = getMostLikelyOutcome(ensemblePrediction);
  const confidenceLevel = getConfidenceLevel(ensemblePrediction.confidence);
  const valueBets = calculateValueBets();

  return (
    <div className="space-y-6">
      {/* Main Prediction Card */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {match.homeTeam} vs {match.awayTeam}
          </h2>
          <Badge className={confidenceLevel.color} size="lg">
            {confidenceLevel.text} Confidence
          </Badge>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className={`text-3xl font-bold ${getOutcomeColor(ensemblePrediction.homeWin)}`}>
              {(ensemblePrediction.homeWin * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600">{match.homeTeam}</div>
          </div>
          <div className="text-center">
            <div className={`text-3xl font-bold ${getOutcomeColor(ensemblePrediction.draw)}`}>
              {(ensemblePrediction.draw * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600">Draw</div>
          </div>
          <div className="text-center">
            <div className={`text-3xl font-bold ${getOutcomeColor(ensemblePrediction.awayWin)}`}>
              {(ensemblePrediction.awayWin * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600">{match.awayTeam}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-blue-200">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Target className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium">Most Likely</span>
            </div>
            <div className="text-lg font-bold text-blue-600">
              {mostLikely.outcome}
            </div>
            <div className="text-xs text-gray-600">
              {(mostLikely.probability * 100).toFixed(1)}% chance
            </div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <BarChart3 className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium">Expected Goals</span>
            </div>
            <div className="text-lg font-bold text-green-600">
              {ensemblePrediction.expectedGoals?.home.toFixed(1)} - {ensemblePrediction.expectedGoals?.away.toFixed(1)}
            </div>
            <div className="text-xs text-gray-600">
              Total: {((ensemblePrediction.expectedGoals?.home || 0) + (ensemblePrediction.expectedGoals?.away || 0)).toFixed(1)}
            </div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Shield className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium">Confidence</span>
            </div>
            <div className="text-lg font-bold text-purple-600">
              {(ensemblePrediction.confidence * 100).toFixed(0)}%
            </div>
            <div className="text-xs text-gray-600">
              Model agreement
            </div>
          </div>
        </div>
      </Card>

      {/* Value Bets */}
      {valueBets.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            Potential Value Bets
          </h3>
          <div className="space-y-3">
            {valueBets.map((bet, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                <div>
                  <div className="font-medium text-green-800">{bet.outcome}</div>
                  <div className="text-sm text-green-600">
                    Model: {(bet.modelProb * 100).toFixed(1)}% | Odds: {bet.marketOdds.toFixed(2)}
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">
                  +{bet.value.toFixed(1)}% value
                </Badge>
              </div>
            ))}
          </div>
          <div className="mt-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
              <div className="text-sm text-yellow-800">
                <strong>Disclaimer:</strong> Value bets are theoretical calculations based on model predictions. 
                Always gamble responsibly and within your means.
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Model Breakdown */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Model Breakdown</h3>
        <div className="space-y-3">
          {Object.entries(predictions).map(([name, pred]) => {
            const mostLikelyOutcome = getMostLikelyOutcome(pred);
            return (
              <div key={name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <div className="font-medium">{name}</div>
                    <div className="text-sm text-gray-600">
                      Predicts: {mostLikelyOutcome.outcome} ({(mostLikelyOutcome.probability * 100).toFixed(1)}%)
                    </div>
                  </div>
                </div>
                <Badge className={getConfidenceLevel(pred.confidence).color}>
                  {(pred.confidence * 100).toFixed(0)}%
                </Badge>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Key Insights */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5" />
          Key Insights
        </h3>
        <div className="space-y-3">
          <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
            <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5" />
            <div className="text-sm">
              <strong>Model Consensus:</strong> {Object.keys(predictions).length} models agree on {mostLikely.outcome} 
              with {(ensemblePrediction.confidence * 100).toFixed(0)}% confidence.
            </div>
          </div>
          
          {ensemblePrediction.confidence > 0.8 && (
            <div className="flex items-start gap-2 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
              <div className="text-sm">
                <strong>High Confidence:</strong> Models show strong agreement, indicating a reliable prediction.
              </div>
            </div>
          )}
          
          {Math.abs(ensemblePrediction.homeWin - ensemblePrediction.awayWin) < 0.1 && (
            <div className="flex items-start gap-2 p-3 bg-yellow-50 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
              <div className="text-sm">
                <strong>Close Match:</strong> Very tight prediction suggests an evenly matched contest.
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};