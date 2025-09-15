import React, { useState } from 'react';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { Search, Globe, Trophy, Users, Calendar } from 'lucide-react';
import { globalLeagues, getLeaguesByContinent, searchLeagues, continents, League } from '../data/leagues';
import { getTeamsByLeague } from '../data/globalTeams';

interface LeagueSelectorProps {
  onLeagueSelect: (league: League) => void;
  selectedLeague?: League;
}

export const LeagueSelector: React.FC<LeagueSelectorProps> = ({
  onLeagueSelect,
  selectedLeague
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContinent, setSelectedContinent] = useState<string>('all');
  const [selectedTier, setSelectedTier] = useState<number>(0);

  const filteredLeagues = React.useMemo(() => {
    let leagues = globalLeagues;

    // Filter by search query
    if (searchQuery) {
      leagues = searchLeagues(searchQuery);
    }

    // Filter by continent
    if (selectedContinent !== 'all') {
      leagues = leagues.filter(league => league.continent === selectedContinent);
    }

    // Filter by tier
    if (selectedTier > 0) {
      leagues = leagues.filter(league => league.tier === selectedTier);
    }

    return leagues.sort((a, b) => {
      // Sort by tier first, then by name
      if (a.tier !== b.tier) return a.tier - b.tier;
      return a.name.localeCompare(b.name);
    });
  }, [searchQuery, selectedContinent, selectedTier]);

  const getTierColor = (tier: number) => {
    const colors = {
      1: 'bg-yellow-100 text-yellow-800',
      2: 'bg-gray-100 text-gray-800',
      3: 'bg-orange-100 text-orange-800',
      4: 'bg-blue-100 text-blue-800'
    };
    return colors[tier as keyof typeof colors] || 'bg-purple-100 text-purple-800';
  };

  const getTierLabel = (tier: number) => {
    const labels = {
      1: 'Top Tier',
      2: '2nd Tier',
      3: '3rd Tier',
      4: '4th Tier'
    };
    return labels[tier as keyof typeof labels] || `Tier ${tier}`;
  };

  const getContinentFlag = (continent: string) => {
    const flags = {
      'Europe': '🇪🇺',
      'North America': '🌎',
      'South America': '🌎',
      'Asia': '🌏',
      'Africa': '🌍',
      'Oceania': '🌏'
    };
    return flags[continent as keyof typeof flags] || '🌍';
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card className="p-4">
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search leagues, countries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {/* Continent Filter */}
            <select
              value={selectedContinent}
              onChange={(e) => setSelectedContinent(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Continents</option>
              {continents.map(continent => (
                <option key={continent} value={continent}>
                  {getContinentFlag(continent)} {continent}
                </option>
              ))}
            </select>

            {/* Tier Filter */}
            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(Number(e.target.value))}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value={0}>All Tiers</option>
              <option value={1}>Top Tier Only</option>
              <option value={2}>2nd Tier Only</option>
              <option value={3}>3rd Tier Only</option>
              <option value={4}>4th Tier Only</option>
            </select>

            {/* Clear Filters */}
            {(searchQuery || selectedContinent !== 'all' || selectedTier > 0) && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedContinent('all');
                  setSelectedTier(0);
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Showing {filteredLeagues.length} of {globalLeagues.length} leagues
        </div>
        {selectedLeague && (
          <Badge variant="outline" className="flex items-center gap-1">
            <Trophy className="w-3 h-3" />
            Selected: {selectedLeague.name}
          </Badge>
        )}
      </div>

      {/* League Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLeagues.map(league => {
          const teams = getTeamsByLeague(league.id);
          const isSelected = selectedLeague?.id === league.id;
          
          return (
            <Card 
              key={league.id} 
              className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : ''
              }`}
              onClick={() => onLeagueSelect(league)}
            >
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm line-clamp-2">{league.name}</h3>
                    <div className="flex items-center gap-1 mt-1 text-xs text-gray-600">
                      <Globe className="w-3 h-3" />
                      <span>{getContinentFlag(league.continent)} {league.country}</span>
                    </div>
                  </div>
                  <Badge className={getTierColor(league.tier)} size="sm">
                    {getTierLabel(league.tier)}
                  </Badge>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3 text-gray-400" />
                    <span>{league.teams} teams</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-gray-400" />
                    <span>{league.season}</span>
                  </div>
                  <div className="text-gray-500">
                    Founded: {league.founded}
                  </div>
                  <div className="text-gray-500">
                    {teams.length} in system
                  </div>
                </div>

                {/* Action */}
                <div className="pt-2 border-t border-gray-100">
                  <Button
                    variant={isSelected ? "default" : "outline"}
                    size="sm"
                    className="w-full"
                  >
                    {isSelected ? 'Selected' : 'Select League'}
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* No Results */}
      {filteredLeagues.length === 0 && (
        <Card className="p-8 text-center">
          <div className="text-gray-400 mb-2">
            <Search className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No leagues found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search criteria or filters
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery('');
              setSelectedContinent('all');
              setSelectedTier(0);
            }}
          >
            Clear All Filters
          </Button>
        </Card>
      )}
    </div>
  );
};