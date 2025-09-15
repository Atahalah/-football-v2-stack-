import React from 'react';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { Globe, Trophy, Users, TrendingUp, MapPin, Calendar } from 'lucide-react';
import { globalLeagues, continents } from '../data/leagues';
import { globalTeams } from '../data/globalTeams';

export const GlobalStats: React.FC = () => {
  const stats = React.useMemo(() => {
    const continentStats = continents.map(continent => {
      const leagues = globalLeagues.filter(l => l.continent === continent);
      const teams = globalTeams.filter(t => {
        const teamLeague = globalLeagues.find(l => l.id === t.league);
        return teamLeague?.continent === continent;
      });
      
      return {
        continent,
        leagues: leagues.length,
        teams: teams.length,
        countries: new Set(leagues.map(l => l.country)).size,
        topTier: leagues.filter(l => l.tier === 1).length
      };
    });

    const tierStats = [1, 2, 3, 4, 5].map(tier => ({
      tier,
      leagues: globalLeagues.filter(l => l.tier === tier).length,
      teams: globalLeagues.filter(l => l.tier === tier).reduce((sum, l) => sum + l.teams, 0)
    }));

    const countryStats = Array.from(new Set(globalLeagues.map(l => l.country)))
      .map(country => ({
        country,
        leagues: globalLeagues.filter(l => l.country === country).length,
        teams: globalTeams.filter(t => t.country === country).length,
        topTier: globalLeagues.filter(l => l.country === country && l.tier === 1).length > 0
      }))
      .sort((a, b) => b.leagues - a.leagues)
      .slice(0, 10);

    return {
      total: {
        leagues: globalLeagues.length,
        teams: globalTeams.length,
        countries: new Set(globalLeagues.map(l => l.country)).size,
        continents: continents.length
      },
      continentStats,
      tierStats,
      countryStats
    };
  }, []);

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

  const getCountryFlag = (country: string) => {
    const flags: Record<string, string> = {
      'England': '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
      'Spain': '🇪🇸',
      'Germany': '🇩🇪',
      'Italy': '🇮🇹',
      'France': '🇫🇷',
      'Brazil': '🇧🇷',
      'USA': '🇺🇸',
      'Japan': '🇯🇵',
      'South Korea': '🇰🇷',
      'China': '🇨🇳',
      'Saudi Arabia': '🇸🇦',
      'Turkey': '🇹🇷',
      'Netherlands': '🇳🇱',
      'Portugal': '🇵🇹',
      'Argentina': '🇦🇷',
      'Mexico': '🇲🇽',
      'Canada': '🇨🇦',
      'Australia': '🇦🇺',
      'Sweden': '🇸🇪',
      'Norway': '🇳🇴',
      'Denmark': '🇩🇰',
      'Finland': '🇫🇮'
    };
    return flags[country] || '🌍';
  };

  return (
    <div className="space-y-6">
      {/* Global Overview */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Globe className="w-5 h-5" />
          Global Football Coverage
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{stats.total.leagues}</div>
            <div className="text-sm text-gray-600">Total Leagues</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{stats.total.teams}</div>
            <div className="text-sm text-gray-600">Teams in System</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">{stats.total.countries}</div>
            <div className="text-sm text-gray-600">Countries</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">{stats.total.continents}</div>
            <div className="text-sm text-gray-600">Continents</div>
          </div>
        </div>
      </Card>

      {/* Continental Breakdown */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          Coverage by Continent
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.continentStats.map(continent => (
            <div key={continent.continent} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{getContinentFlag(continent.continent)}</span>
                <span className="font-medium">{continent.continent}</span>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Leagues:</span>
                  <span className="font-medium">{continent.leagues}</span>
                </div>
                <div className="flex justify-between">
                  <span>Teams:</span>
                  <span className="font-medium">{continent.teams}</span>
                </div>
                <div className="flex justify-between">
                  <span>Countries:</span>
                  <span className="font-medium">{continent.countries}</span>
                </div>
                <div className="flex justify-between">
                  <span>Top Tier:</span>
                  <span className="font-medium">{continent.topTier}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Tier Distribution */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Trophy className="w-4 h-4" />
          League Tier Distribution
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {stats.tierStats.map(tier => (
            <div key={tier.tier} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{tier.leagues}</div>
              <div className="text-sm text-gray-600 mb-1">Tier {tier.tier} Leagues</div>
              <div className="text-xs text-gray-500">{tier.teams} total teams</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Top Countries */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          Top Countries by League Coverage
        </h3>
        <div className="space-y-3">
          {stats.countryStats.map((country, index) => (
            <div key={country.country} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-6 text-center font-bold text-gray-400">#{index + 1}</div>
                <span className="text-lg">{getCountryFlag(country.country)}</span>
                <span className="font-medium">{country.country}</span>
                {country.topTier && (
                  <Badge size="sm" className="bg-yellow-100 text-yellow-800">
                    Top Tier
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="text-center">
                  <div className="font-bold text-blue-600">{country.leagues}</div>
                  <div className="text-gray-500">Leagues</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-green-600">{country.teams}</div>
                  <div className="text-gray-500">Teams</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Updates */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          System Coverage Highlights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-medium text-green-600">✅ Fully Covered Regions</h4>
            <ul className="text-sm space-y-1 text-gray-600">
              <li>• Europe: All major leagues + lower divisions</li>
              <li>• North America: MLS, USL, CPL systems</li>
              <li>• South America: Top leagues from all countries</li>
              <li>• Asia: Major leagues from 10+ countries</li>
              <li>• Africa: Premier leagues from key nations</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-blue-600">🔄 Continuous Updates</h4>
            <ul className="text-sm space-y-1 text-gray-600">
              <li>• Real-time league data integration</li>
              <li>• Seasonal format adjustments</li>
              <li>• New league additions quarterly</li>
              <li>• Team database expansions</li>
              <li>• Historical data enrichment</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};