import React, { useState } from 'react';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { 
  Trophy, 
  TrendingUp, 
  Target, 
  Users,
  Calendar,
  MapPin,
  BarChart3,
  Award,
  Zap,
  Shield
} from 'lucide-react';
import { League } from '../data/leagues';
import { getTeamsByLeague } from '../data/globalTeams';

interface LeagueStatsProps {
  selectedLeague?: League;
}

export const LeagueStats: React.FC<LeagueStatsProps> = ({ selectedLeague }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'teams' | 'stats' | 'predictions'>('overview');

  if (!selectedLeague) {
    return (
      <Card className="p-8 text-center">
        <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No League Selected</h3>
        <p className="text-gray-600">
          Select a league from the League Selector to view detailed statistics and analysis
        </p>
      </Card>
    );
  }

  const teams = getTeamsByLeague(selectedLeague.id);
  
  // Generate realistic league statistics
  const leagueStats = {
    totalMatches: Math.floor(selectedLeague.teams * (selectedLeague.teams - 1)),
    matchesPlayed: Math.floor(Math.random() * 200) + 100,
    totalGoals: Math.floor(Math.random() * 500) + 300,
    avgGoalsPerMatch: 2.3 + Math.random() * 1.2,
    homeWinRate: 0.42 + Math.random() * 0.15,
    drawRate: 0.25 + Math.random() * 0.1,
    awayWinRate: 0.33 + Math.random() * 0.15,
    topScorer: teams[Math.floor(Math.random() * teams.length)]?.name || 'Unknown',
    topScorerGoals: Math.floor(Math.random() * 15) + 10,
    cleanSheets: Math.floor(Math.random() * 50) + 30,
    redCards: Math.floor(Math.random() * 30) + 20,
    yellowCards: Math.floor(Math.random() * 200) + 150
  };

  const getTierColor = (tier: number) => {
    const colors = {
      1: 'bg-yellow-100 text-yellow-800',
      2: 'bg-gray-100 text-gray-800',
      3: 'bg-orange-100 text-orange-800',
      4: 'bg-blue-100 text-blue-800'
    };
    return colors[tier as keyof typeof colors] || 'bg-purple-100 text-purple-800';
  };

  const generateTeamStats = () => {
    return teams.slice(0, 10).map((team, index) => ({
      ...team,
      position: index + 1,
      points: Math.floor(Math.random() * 30) + 40 - (index * 3),
      played: Math.floor(Math.random() * 5) + 15,
      wins: Math.floor(Math.random() * 8) + 5 - index,
      draws: Math.floor(Math.random() * 5) + 2,
      losses: Math.floor(Math.random() * 6) + index,
      goalsFor: Math.floor(Math.random() * 20) + 15,
      goalsAgainst: Math.floor(Math.random() * 15) + 8 + index,
      form: ['W', 'L', 'D', 'W', 'L'][Math.floor(Math.random() * 5)]
    }));
  };

  const teamStats = generateTeamStats();

  return (
    <div className="space-y-6">
      {/* League Header */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedLeague.name}</h2>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{selectedLeague.country}, {selectedLeague.continent}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>Season {selectedLeague.season}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{selectedLeague.teams} teams</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <Badge className={getTierColor(selectedLeague.tier)} size="lg">
              Tier {selectedLeague.tier}
            </Badge>
            <div className="text-sm text-gray-600 mt-2">
              Founded: {selectedLeague.founded}
            </div>
          </div>
        </div>
      </Card>

      {/* Navigation Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        {[
          { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-4 h-4" /> },
          { id: 'teams', label: 'Teams', icon: <Users className="w-4 h-4" /> },
          { id: 'stats', label: 'Statistics', icon: <Target className="w-4 h-4" /> },
          { id: 'predictions', label: 'Predictions', icon: <Zap className="w-4 h-4" /> }
        ].map(tab => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab(tab.id as any)}
            className="flex items-center gap-2"
          >
            {tab.icon}
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 text-center">
            <Trophy className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-yellow-600">{leagueStats.matchesPlayed}</div>
            <div className="text-sm text-gray-600">Matches Played</div>
          </Card>
          
          <Card className="p-4 text-center">
            <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">{leagueStats.totalGoals}</div>
            <div className="text-sm text-gray-600">Total Goals</div>
          </Card>
          
          <Card className="p-4 text-center">
            <BarChart3 className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">{leagueStats.avgGoalsPerMatch.toFixed(1)}</div>
            <div className="text-sm text-gray-600">Goals per Match</div>
          </Card>
          
          <Card className="p-4 text-center">
            <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">{teams.length}</div>
            <div className="text-sm text-gray-600">Teams in System</div>
          </Card>
        </div>
      )}

      {activeTab === 'teams' && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">League Table</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2">Pos</th>
                  <th className="text-left py-2">Team</th>
                  <th className="text-center py-2">P</th>
                  <th className="text-center py-2">W</th>
                  <th className="text-center py-2">D</th>
                  <th className="text-center py-2">L</th>
                  <th className="text-center py-2">GF</th>
                  <th className="text-center py-2">GA</th>
                  <th className="text-center py-2">GD</th>
                  <th className="text-center py-2">Pts</th>
                  <th className="text-center py-2">Form</th>
                </tr>
              </thead>
              <tbody>
                {teamStats.map((team, index) => (
                  <tr key={team.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-2 font-medium">{team.position}</td>
                    <td className="py-2">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: team.colors.primary }}
                        ></div>
                        <span className="font-medium">{team.name}</span>
                      </div>
                    </td>
                    <td className="text-center py-2">{team.played}</td>
                    <td className="text-center py-2">{team.wins}</td>
                    <td className="text-center py-2">{team.draws}</td>
                    <td className="text-center py-2">{team.losses}</td>
                    <td className="text-center py-2">{team.goalsFor}</td>
                    <td className="text-center py-2">{team.goalsAgainst}</td>
                    <td className="text-center py-2">{team.goalsFor - team.goalsAgainst}</td>
                    <td className="text-center py-2 font-bold">{team.points}</td>
                    <td className="text-center py-2">
                      <Badge 
                        className={
                          team.form === 'W' ? 'bg-green-100 text-green-800' :
                          team.form === 'L' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }
                        size="sm"
                      >
                        {team.form}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {activeTab === 'stats' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Match Results</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Home Wins</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${leagueStats.homeWinRate * 100}%` }}
                    />
                  </div>
                  <span className="font-medium">{(leagueStats.homeWinRate * 100).toFixed(1)}%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span>Draws</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-yellow-600 h-2 rounded-full"
                      style={{ width: `${leagueStats.drawRate * 100}%` }}
                    />
                  </div>
                  <span className="font-medium">{(leagueStats.drawRate * 100).toFixed(1)}%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span>Away Wins</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-red-600 h-2 rounded-full"
                      style={{ width: `${leagueStats.awayWinRate * 100}%` }}
                    />
                  </div>
                  <span className="font-medium">{(leagueStats.awayWinRate * 100).toFixed(1)}%</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">League Records</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Top Scorer:</span>
                <span className="font-medium">{leagueStats.topScorer} ({leagueStats.topScorerGoals} goals)</span>
              </div>
              <div className="flex justify-between">
                <span>Clean Sheets:</span>
                <span className="font-medium">{leagueStats.cleanSheets}</span>
              </div>
              <div className="flex justify-between">
                <span>Yellow Cards:</span>
                <span className="font-medium">{leagueStats.yellowCards}</span>
              </div>
              <div className="flex justify-between">
                <span>Red Cards:</span>
                <span className="font-medium">{leagueStats.redCards}</span>
              </div>
              <div className="flex justify-between">
                <span>Average Attendance:</span>
                <span className="font-medium">{(Math.random() * 30000 + 15000).toLocaleString()}</span>
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'predictions' && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5" />
            League Prediction Insights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">Prediction Accuracy by Model</h4>
              <div className="space-y-2">
                {[
                  { model: 'Machine Learning', accuracy: 0.72 + Math.random() * 0.1 },
                  { model: 'Tactical Model', accuracy: 0.68 + Math.random() * 0.1 },
                  { model: 'ELO Model', accuracy: 0.65 + Math.random() * 0.1 },
                  { model: 'Poisson Model', accuracy: 0.63 + Math.random() * 0.1 }
                ].map(({ model, accuracy }) => (
                  <div key={model} className="flex justify-between items-center">
                    <span className="text-sm">{model}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${accuracy * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{(accuracy * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium">League Characteristics</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Predictability:</span>
                  <Badge variant="outline">
                    {selectedLeague.tier === 1 ? 'High' : selectedLeague.tier === 2 ? 'Medium' : 'Variable'}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Home Advantage:</span>
                  <Badge variant="outline">
                    {leagueStats.homeWinRate > 0.5 ? 'Strong' : leagueStats.homeWinRate > 0.4 ? 'Moderate' : 'Weak'}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Goal Scoring:</span>
                  <Badge variant="outline">
                    {leagueStats.avgGoalsPerMatch > 3 ? 'High' : leagueStats.avgGoalsPerMatch > 2.5 ? 'Medium' : 'Low'}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Competitiveness:</span>
                  <Badge variant="outline">
                    {selectedLeague.tier === 1 ? 'Very High' : selectedLeague.tier === 2 ? 'High' : 'Medium'}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};