import React, { useState, useEffect } from 'react';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { 
  Play, 
  Clock, 
  MapPin, 
  Calendar,
  RefreshCw,
  Zap,
  TrendingUp,
  AlertCircle,
  Wifi,
  WifiOff
} from 'lucide-react';
import { footballApiService, LiveMatch } from '../services/FootballApiService';
import { predictionService } from '../services/PredictionService';

export const LiveMatches: React.FC = () => {
  const [matches, setMatches] = useState<LiveMatch[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedMatch, setSelectedMatch] = useState<LiveMatch | null>(null);
  const [predictions, setPredictions] = useState<any>(null);
  const [apiUsage, setApiUsage] = useState({ used: 0, remaining: 100, resetTime: '' });

  useEffect(() => {
    loadTodaysMatches();
    updateApiUsage();
  }, []);

  const updateApiUsage = () => {
    const usage = footballApiService.getUsageStats();
    setApiUsage(usage);
  };

  const loadTodaysMatches = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const todaysMatches = await footballApiService.getTodaysMatches();
      setMatches(todaysMatches);
      updateApiUsage();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load matches');
    } finally {
      setLoading(false);
    }
  };

  const loadUpcomingMatches = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const upcomingMatches = await footballApiService.getUpcomingMatches(7);
      setMatches(upcomingMatches);
      updateApiUsage();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load upcoming matches');
    } finally {
      setLoading(false);
    }
  };

  const handleMatchSelect = async (match: LiveMatch) => {
    setSelectedMatch(match);
    
    // Convert to our internal match format for predictions
    const internalMatch = {
      id: match.id.toString(),
      homeTeam: match.homeTeam.name,
      awayTeam: match.awayTeam.name,
      date: match.date,
      time: match.time,
      league: match.league.name,
      venue: match.venue.name
    };

    // Get predictions for this match
    const matchPredictions = predictionService.getModelPredictions(internalMatch);
    setPredictions(matchPredictions);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'NS': return 'bg-blue-100 text-blue-800';
      case '1H': case '2H': return 'bg-green-100 text-green-800';
      case 'HT': return 'bg-yellow-100 text-yellow-800';
      case 'FT': return 'bg-gray-100 text-gray-800';
      case 'CANC': case 'PST': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string, elapsed: number | null) => {
    switch (status) {
      case 'NS': return 'Not Started';
      case '1H': return `${elapsed}'`;
      case 'HT': return 'Half Time';
      case '2H': return `${elapsed}'`;
      case 'FT': return 'Full Time';
      case 'CANC': return 'Cancelled';
      case 'PST': return 'Postponed';
      default: return status;
    }
  };

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="space-y-6">
      {/* API Usage Status */}
      <Card className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {apiUsage.remaining > 0 ? (
                <Wifi className="w-5 h-5 text-green-600" />
              ) : (
                <WifiOff className="w-5 h-5 text-red-600" />
              )}
              <span className="font-medium">Live Data Connection</span>
            </div>
            <Badge className={apiUsage.remaining > 20 ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}>
              {apiUsage.remaining} requests remaining
            </Badge>
          </div>
          <div className="text-sm text-gray-600">
            Resets: {apiUsage.resetTime}
          </div>
        </div>
      </Card>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button
            onClick={loadTodaysMatches}
            disabled={loading || apiUsage.remaining === 0}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Today's Matches
          </Button>
          <Button
            variant="outline"
            onClick={loadUpcomingMatches}
            disabled={loading || apiUsage.remaining === 0}
            className="flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            Upcoming (7 days)
          </Button>
        </div>
        
        <div className="text-sm text-gray-600">
          {matches.length} matches loaded
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <Card className="p-4 bg-red-50 border-red-200">
          <div className="flex items-center gap-2 text-red-800">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        </Card>
      )}

      {/* Matches Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {matches.map((match) => (
          <Card 
            key={match.id} 
            className={`p-4 cursor-pointer transition-all hover:shadow-md ${
              selectedMatch?.id === match.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
            }`}
            onClick={() => handleMatchSelect(match)}
          >
            <div className="space-y-3">
              {/* League and Status */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img 
                    src={match.league.logo} 
                    alt={match.league.name}
                    className="w-4 h-4"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {match.league.name}
                  </span>
                </div>
                <Badge className={getStatusColor(match.status.short)}>
                  {getStatusText(match.status.short, match.status.elapsed)}
                </Badge>
              </div>

              {/* Teams and Score */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="flex items-center gap-2">
                    <img 
                      src={match.homeTeam.logo} 
                      alt={match.homeTeam.name}
                      className="w-6 h-6"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    <span className="font-medium">{match.homeTeam.name}</span>
                  </div>
                </div>
                
                {match.score.home !== null && match.score.away !== null ? (
                  <div className="text-xl font-bold text-center px-4">
                    {match.score.home} - {match.score.away}
                  </div>
                ) : (
                  <div className="text-lg font-medium text-gray-500 px-4">
                    vs
                  </div>
                )}
                
                <div className="flex items-center gap-3 flex-1 justify-end">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{match.awayTeam.name}</span>
                    <img 
                      src={match.awayTeam.logo} 
                      alt={match.awayTeam.name}
                      className="w-6 h-6"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Match Details */}
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{match.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{formatTime(match.time)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span className="truncate max-w-32">{match.venue.name}</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2 border-t border-gray-100">
                <Button
                  variant={selectedMatch?.id === match.id ? "default" : "outline"}
                  size="sm"
                  className="w-full flex items-center gap-2"
                >
                  <Zap className="w-3 h-3" />
                  {selectedMatch?.id === match.id ? 'Analyzing...' : 'Get Prediction'}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Selected Match Predictions */}
      {selectedMatch && predictions && (
        <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            Live Prediction: {selectedMatch.homeTeam.name} vs {selectedMatch.awayTeam.name}
          </h3>
          
          <div className="grid grid-cols-3 gap-4">
            {Object.entries(predictions).map(([modelName, prediction]: [string, any]) => (
              <div key={modelName} className="text-center">
                <div className="text-sm font-medium text-gray-700 mb-2">{modelName}</div>
                <div className="space-y-1">
                  <div className="text-lg font-bold text-blue-600">
                    {(prediction.homeWin * 100).toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-600">
                    Draw: {(prediction.draw * 100).toFixed(1)}%
                  </div>
                  <div className="text-lg font-bold text-red-600">
                    {(prediction.awayWin * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* No Matches Message */}
      {!loading && matches.length === 0 && !error && (
        <Card className="p-8 text-center">
          <div className="text-gray-400 mb-4">
            <Play className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No matches found</h3>
          <p className="text-gray-600 mb-4">
            Try loading today's matches or upcoming fixtures
          </p>
          <Button onClick={loadTodaysMatches} disabled={apiUsage.remaining === 0}>
            Load Matches
          </Button>
        </Card>
      )}
    </div>
  );
};