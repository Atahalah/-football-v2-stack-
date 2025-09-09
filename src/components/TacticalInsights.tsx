import React from 'react';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { Target, Shield, Zap, Users } from 'lucide-react';

interface TacticalInsightsProps {
  homeTeam: string;
  awayTeam: string;
  insights: any;
}

export const TacticalInsights: React.FC<TacticalInsightsProps> = ({
  homeTeam,
  awayTeam,
  insights
}) => {
  if (!insights) return null;

  const { homeTeamTactics, awayTeamTactics, keyMatchups, recommendations } = insights;

  const getFormationColor = (formation: string) => {
    const colors: Record<string, string> = {
      '4-3-3': 'bg-blue-100 text-blue-800',
      '4-4-2': 'bg-green-100 text-green-800',
      '3-5-2': 'bg-purple-100 text-purple-800',
      '4-2-3-1': 'bg-orange-100 text-orange-800',
      '3-4-3': 'bg-red-100 text-red-800'
    };
    return colors[formation] || 'bg-gray-100 text-gray-800';
  };

  const getStyleIcon = (style: string) => {
    switch (style) {
      case 'possession': return <Users className="w-4 h-4" />;
      case 'counter': return <Zap className="w-4 h-4" />;
      case 'pressing': return <Target className="w-4 h-4" />;
      case 'direct': return <Shield className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  const formatAdvantage = (value: number) => {
    if (value > 0.05) return { text: 'Strong Advantage', color: 'text-green-600' };
    if (value > 0.02) return { text: 'Slight Advantage', color: 'text-green-500' };
    if (value < -0.05) return { text: 'Strong Disadvantage', color: 'text-red-600' };
    if (value < -0.02) return { text: 'Slight Disadvantage', color: 'text-red-500' };
    return { text: 'Neutral', color: 'text-gray-600' };
  };

  return (
    <div className="space-y-6">
      {/* Team Formations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            {homeTeam}
          </h3>
          {homeTeamTactics && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge className={getFormationColor(homeTeamTactics.formation)}>
                  {homeTeamTactics.formation}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2">
                  {getStyleIcon(homeTeamTactics.attackingStyle)}
                  <span className="capitalize">{homeTeamTactics.attackingStyle}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span className="capitalize">{homeTeamTactics.defensiveStyle}</span>
                </div>
                <div className="text-gray-600">
                  Tempo: <span className="capitalize font-medium">{homeTeamTactics.tempo}</span>
                </div>
                <div className="text-gray-600">
                  Width: <span className="capitalize font-medium">{homeTeamTactics.width}</span>
                </div>
              </div>
            </div>
          )}
        </Card>

        <Card className="p-4">
          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            {awayTeam}
          </h3>
          {awayTeamTactics && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge className={getFormationColor(awayTeamTactics.formation)}>
                  {awayTeamTactics.formation}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2">
                  {getStyleIcon(awayTeamTactics.attackingStyle)}
                  <span className="capitalize">{awayTeamTactics.attackingStyle}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span className="capitalize">{awayTeamTactics.defensiveStyle}</span>
                </div>
                <div className="text-gray-600">
                  Tempo: <span className="capitalize font-medium">{awayTeamTactics.tempo}</span>
                </div>
                <div className="text-gray-600">
                  Width: <span className="capitalize font-medium">{awayTeamTactics.width}</span>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Key Matchups */}
      <Card className="p-4">
        <h3 className="font-semibold text-lg mb-4">Tactical Matchups</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold mb-1">
              <span className={formatAdvantage(keyMatchups.styleClash).color}>
                {formatAdvantage(keyMatchups.styleClash).text}
              </span>
            </div>
            <div className="text-sm text-gray-600">Style Clash</div>
            <div className="text-xs text-gray-500 mt-1">
              {(keyMatchups.styleClash * 100).toFixed(1)}% advantage
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold mb-1">
              <span className={formatAdvantage(keyMatchups.formationEffectiveness).color}>
                {formatAdvantage(keyMatchups.formationEffectiveness).text}
              </span>
            </div>
            <div className="text-sm text-gray-600">Formation</div>
            <div className="text-xs text-gray-500 mt-1">
              {(keyMatchups.formationEffectiveness * 100).toFixed(1)}% advantage
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold mb-1">
              <span className="text-blue-600">
                +{(keyMatchups.homeAdvantage * 100).toFixed(1)}%
              </span>
            </div>
            <div className="text-sm text-gray-600">Home Advantage</div>
            <div className="text-xs text-gray-500 mt-1">
              Tactical home boost
            </div>
          </div>
        </div>
      </Card>

      {/* Recommendations */}
      {recommendations && recommendations.length > 0 && (
        <Card className="p-4">
          <h3 className="font-semibold text-lg mb-4">Tactical Recommendations</h3>
          <div className="space-y-2">
            {recommendations.map((rec: string, index: number) => (
              <div key={index} className="flex items-start gap-2 p-2 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm text-gray-700">{rec}</span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};