import React from 'react';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { Trophy, Target, AlertTriangle, TrendingUp, Calendar, Users2 } from 'lucide-react';

interface StrategicInsightsProps {
  homeTeam: string;
  awayTeam: string;
  insights: any;
}

export const StrategicInsights: React.FC<StrategicInsightsProps> = ({
  homeTeam,
  awayTeam,
  insights
}) => {
  if (!insights) return null;

  const { homeTeamContext, awayTeamContext, keyFactors, strategicRecommendations } = insights;

  const getObjectiveIcon = (objective: string) => {
    switch (objective) {
      case 'title': return <Trophy className="w-4 h-4" />;
      case 'top4': return <Target className="w-4 h-4" />;
      case 'europa': return <TrendingUp className="w-4 h-4" />;
      case 'survival': return <AlertTriangle className="w-4 h-4" />;
      default: return <Users2 className="w-4 h-4" />;
    }
  };

  const getObjectiveColor = (objective: string) => {
    const colors: Record<string, string> = {
      'title': 'bg-yellow-100 text-yellow-800',
      'top4': 'bg-green-100 text-green-800',
      'europa': 'bg-blue-100 text-blue-800',
      'survival': 'bg-red-100 text-red-800',
      'midtable': 'bg-gray-100 text-gray-800'
    };
    return colors[objective] || 'bg-gray-100 text-gray-800';
  };

  const getImportanceColor = (importance: string) => {
    const colors: Record<string, string> = {
      'critical': 'bg-red-100 text-red-800',
      'high': 'bg-orange-100 text-orange-800',
      'medium': 'bg-yellow-100 text-yellow-800',
      'low': 'bg-green-100 text-green-800'
    };
    return colors[importance] || 'bg-gray-100 text-gray-800';
  };

  const getPressureLevel = (pressure: number) => {
    if (pressure > 0.8) return { text: 'Extreme', color: 'text-red-600' };
    if (pressure > 0.6) return { text: 'High', color: 'text-orange-600' };
    if (pressure > 0.4) return { text: 'Moderate', color: 'text-yellow-600' };
    return { text: 'Low', color: 'text-green-600' };
  };

  const formatPosition = (position: number) => {
    const suffix = position === 1 ? 'st' : position === 2 ? 'nd' : position === 3 ? 'rd' : 'th';
    return `${position}${suffix}`;
  };

  return (
    <div className="space-y-6">
      {/* Team Contexts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            {homeTeam}
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">League Position</span>
              <Badge variant="outline">{formatPosition(homeTeamContext.leaguePosition)}</Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Primary Objective</span>
              <Badge className={getObjectiveColor(homeTeamContext.objectives?.primary || 'midtable')}>
                <div className="flex items-center gap-1">
                  {getObjectiveIcon(homeTeamContext.objectives?.primary || 'midtable')}
                  <span className="capitalize">{homeTeamContext.objectives?.primary || 'midtable'}</span>
                </div>
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Match Importance</span>
              <Badge className={getImportanceColor(homeTeamContext.matchImportance)}>
                <span className="capitalize">{homeTeamContext.matchImportance}</span>
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Season Phase</span>
              <Badge variant="outline">
                <Calendar className="w-3 h-3 mr-1" />
                <span className="capitalize">{homeTeamContext.seasonPhase}</span>
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Pressure Level</span>
              <span className={`font-medium ${getPressureLevel(homeTeamContext.competitionPressure).color}`}>
                {getPressureLevel(homeTeamContext.competitionPressure).text}
              </span>
            </div>

            {homeTeamContext.pointsGap !== 0 && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Points Gap</span>
                <span className={`font-medium ${homeTeamContext.pointsGap < 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {homeTeamContext.pointsGap > 0 ? '+' : ''}{homeTeamContext.pointsGap}
                </span>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            {awayTeam}
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">League Position</span>
              <Badge variant="outline">{formatPosition(awayTeamContext.leaguePosition)}</Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Primary Objective</span>
              <Badge className={getObjectiveColor(awayTeamContext.objectives?.primary || 'midtable')}>
                <div className="flex items-center gap-1">
                  {getObjectiveIcon(awayTeamContext.objectives?.primary || 'midtable')}
                  <span className="capitalize">{awayTeamContext.objectives?.primary || 'midtable'}</span>
                </div>
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Match Importance</span>
              <Badge className={getImportanceColor(awayTeamContext.matchImportance)}>
                <span className="capitalize">{awayTeamContext.matchImportance}</span>
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Season Phase</span>
              <Badge variant="outline">
                <Calendar className="w-3 h-3 mr-1" />
                <span className="capitalize">{awayTeamContext.seasonPhase}</span>
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Pressure Level</span>
              <span className={`font-medium ${getPressureLevel(awayTeamContext.competitionPressure).color}`}>
                {getPressureLevel(awayTeamContext.competitionPressure).text}
              </span>
            </div>

            {awayTeamContext.pointsGap !== 0 && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Points Gap</span>
                <span className={`font-medium ${awayTeamContext.pointsGap < 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {awayTeamContext.pointsGap > 0 ? '+' : ''}{awayTeamContext.pointsGap}
                </span>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Key Strategic Factors */}
      <Card className="p-4">
        <h3 className="font-semibold text-lg mb-4">Strategic Factors</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-lg font-semibold mb-1 flex items-center justify-center gap-2">
              <Badge className={getImportanceColor(keyFactors.matchImportance.home)}>
                {keyFactors.matchImportance.home}
              </Badge>
              <span className="text-gray-400">vs</span>
              <Badge className={getImportanceColor(keyFactors.matchImportance.away)}>
                {keyFactors.matchImportance.away}
              </Badge>
            </div>
            <div className="text-sm text-gray-600">Match Importance</div>
          </div>
          
          <div className="text-center">
            <div className="text-lg font-semibold mb-1">
              <span className={getPressureLevel(keyFactors.pressure.home).color}>
                {getPressureLevel(keyFactors.pressure.home).text}
              </span>
              <span className="text-gray-400 mx-2">vs</span>
              <span className={getPressureLevel(keyFactors.pressure.away).color}>
                {getPressureLevel(keyFactors.pressure.away).text}
              </span>
            </div>
            <div className="text-sm text-gray-600">Pressure Levels</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold mb-1">
              <span className={keyFactors.motivation > 0 ? 'text-blue-600' : keyFactors.motivation < 0 ? 'text-red-600' : 'text-gray-600'}>
                {keyFactors.motivation > 0 ? '+' : ''}{(keyFactors.motivation * 100).toFixed(1)}%
              </span>
            </div>
            <div className="text-sm text-gray-600">Motivation Edge</div>
            <div className="text-xs text-gray-500 mt-1">
              {keyFactors.motivation > 0 ? 'Home advantage' : keyFactors.motivation < 0 ? 'Away advantage' : 'Neutral'}
            </div>
          </div>
        </div>
      </Card>

      {/* Strategic Recommendations */}
      {strategicRecommendations && strategicRecommendations.length > 0 && (
        <Card className="p-4">
          <h3 className="font-semibold text-lg mb-4">Strategic Analysis</h3>
          <div className="space-y-2">
            {strategicRecommendations.map((rec: string, index: number) => (
              <div key={index} className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
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