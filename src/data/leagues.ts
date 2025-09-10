export interface League {
  id: string;
  name: string;
  country: string;
  continent: string;
  tier: number;
  teams: number;
  season: string;
  founded: number;
}

export const globalLeagues: League[] = [
  // EUROPE - England
  { id: 'epl', name: 'Premier League', country: 'England', continent: 'Europe', tier: 1, teams: 20, season: '2024-25', founded: 1992 },
  { id: 'championship', name: 'Championship', country: 'England', continent: 'Europe', tier: 2, teams: 24, season: '2024-25', founded: 2004 },
  { id: 'league1', name: 'League One', country: 'England', continent: 'Europe', tier: 3, teams: 24, season: '2024-25', founded: 2004 },
  { id: 'league2', name: 'League Two', country: 'England', continent: 'Europe', tier: 4, teams: 24, season: '2024-25', founded: 2004 },
  { id: 'national_league', name: 'National League', country: 'England', continent: 'Europe', tier: 5, teams: 24, season: '2024-25', founded: 1979 },

  // EUROPE - Spain
  { id: 'la_liga', name: 'La Liga', country: 'Spain', continent: 'Europe', tier: 1, teams: 20, season: '2024-25', founded: 1929 },
  { id: 'segunda', name: 'Segunda División', country: 'Spain', continent: 'Europe', tier: 2, teams: 22, season: '2024-25', founded: 1929 },
  { id: 'primera_rfef', name: 'Primera RFEF', country: 'Spain', continent: 'Europe', tier: 3, teams: 40, season: '2024-25', founded: 2021 },
  { id: 'segunda_rfef', name: 'Segunda RFEF', country: 'Spain', continent: 'Europe', tier: 4, teams: 90, season: '2024-25', founded: 2021 },

  // EUROPE - Germany
  { id: 'bundesliga', name: 'Bundesliga', country: 'Germany', continent: 'Europe', tier: 1, teams: 18, season: '2024-25', founded: 1963 },
  { id: 'bundesliga2', name: '2. Bundesliga', country: 'Germany', continent: 'Europe', tier: 2, teams: 18, season: '2024-25', founded: 1974 },
  { id: '3liga', name: '3. Liga', country: 'Germany', continent: 'Europe', tier: 3, teams: 20, season: '2024-25', founded: 2008 },
  { id: 'regionalliga', name: 'Regionalliga', country: 'Germany', continent: 'Europe', tier: 4, teams: 90, season: '2024-25', founded: 1994 },

  // EUROPE - Italy
  { id: 'serie_a', name: 'Serie A', country: 'Italy', continent: 'Europe', tier: 1, teams: 20, season: '2024-25', founded: 1898 },
  { id: 'serie_b', name: 'Serie B', country: 'Italy', continent: 'Europe', tier: 2, teams: 20, season: '2024-25', founded: 1929 },
  { id: 'serie_c', name: 'Serie C', country: 'Italy', continent: 'Europe', tier: 3, teams: 60, season: '2024-25', founded: 1935 },
  { id: 'serie_d', name: 'Serie D', country: 'Italy', continent: 'Europe', tier: 4, teams: 162, season: '2024-25', founded: 1981 },

  // EUROPE - France
  { id: 'ligue1', name: 'Ligue 1', country: 'France', continent: 'Europe', tier: 1, teams: 18, season: '2024-25', founded: 1932 },
  { id: 'ligue2', name: 'Ligue 2', country: 'France', continent: 'Europe', tier: 2, teams: 20, season: '2024-25', founded: 1933 },
  { id: 'national', name: 'Championnat National', country: 'France', continent: 'Europe', tier: 3, teams: 18, season: '2024-25', founded: 1993 },
  { id: 'national2', name: 'Championnat National 2', country: 'France', continent: 'Europe', tier: 4, teams: 64, season: '2024-25', founded: 2017 },

  // EUROPE - Netherlands
  { id: 'eredivisie', name: 'Eredivisie', country: 'Netherlands', continent: 'Europe', tier: 1, teams: 18, season: '2024-25', founded: 1956 },
  { id: 'eerste_divisie', name: 'Eerste Divisie', country: 'Netherlands', continent: 'Europe', tier: 2, teams: 20, season: '2024-25', founded: 1956 },
  { id: 'tweede_divisie', name: 'Tweede Divisie', country: 'Netherlands', continent: 'Europe', tier: 3, teams: 18, season: '2024-25', founded: 2016 },

  // EUROPE - Portugal
  { id: 'primeira_liga', name: 'Primeira Liga', country: 'Portugal', continent: 'Europe', tier: 1, teams: 18, season: '2024-25', founded: 1934 },
  { id: 'liga_portugal2', name: 'Liga Portugal 2', country: 'Portugal', continent: 'Europe', tier: 2, teams: 18, season: '2024-25', founded: 1990 },
  { id: 'campeonato_portugal', name: 'Campeonato de Portugal', country: 'Portugal', continent: 'Europe', tier: 3, teams: 72, season: '2024-25', founded: 2013 },

  // EUROPE - Belgium
  { id: 'pro_league', name: 'Pro League', country: 'Belgium', continent: 'Europe', tier: 1, teams: 16, season: '2024-25', founded: 1895 },
  { id: 'challenger_pro_league', name: 'Challenger Pro League', country: 'Belgium', continent: 'Europe', tier: 2, teams: 8, season: '2024-25', founded: 2016 },

  // EUROPE - Turkey
  { id: 'super_lig', name: 'Süper Lig', country: 'Turkey', continent: 'Europe', tier: 1, teams: 20, season: '2024-25', founded: 1959 },
  { id: 'tff_1_lig', name: 'TFF 1. Lig', country: 'Turkey', continent: 'Europe', tier: 2, teams: 20, season: '2024-25', founded: 2001 },
  { id: 'tff_2_lig', name: 'TFF 2. Lig', country: 'Turkey', continent: 'Europe', tier: 3, teams: 36, season: '2024-25', founded: 2001 },
  { id: 'tff_3_lig', name: 'TFF 3. Lig', country: 'Turkey', continent: 'Europe', tier: 4, teams: 54, season: '2024-25', founded: 2001 },

  // EUROPE - Sweden
  { id: 'allsvenskan', name: 'Allsvenskan', country: 'Sweden', continent: 'Europe', tier: 1, teams: 16, season: '2024', founded: 1924 },
  { id: 'superettan', name: 'Superettan', country: 'Sweden', continent: 'Europe', tier: 2, teams: 16, season: '2024', founded: 2000 },
  { id: 'ettan', name: 'Ettan', country: 'Sweden', continent: 'Europe', tier: 3, teams: 32, season: '2024', founded: 2006 },

  // EUROPE - Norway
  { id: 'eliteserien', name: 'Eliteserien', country: 'Norway', continent: 'Europe', tier: 1, teams: 16, season: '2024', founded: 1937 },
  { id: 'obos_ligaen', name: 'OBOS-ligaen', country: 'Norway', continent: 'Europe', tier: 2, teams: 16, season: '2024', founded: 1963 },
  { id: 'postnord_ligaen', name: 'PostNord-ligaen', country: 'Norway', continent: 'Europe', tier: 3, teams: 28, season: '2024', founded: 2017 },

  // EUROPE - Denmark
  { id: 'superliga', name: 'Superliga', country: 'Denmark', continent: 'Europe', tier: 1, teams: 12, season: '2024-25', founded: 1991 },
  { id: 'nordicbet_liga', name: 'NordicBet Liga', country: 'Denmark', continent: 'Europe', tier: 2, teams: 12, season: '2024-25', founded: 1945 },
  { id: 'denmark_series', name: 'Denmark Series', country: 'Denmark', continent: 'Europe', tier: 3, teams: 84, season: '2024-25', founded: 1966 },

  // EUROPE - Finland
  { id: 'veikkausliiga', name: 'Veikkausliiga', country: 'Finland', continent: 'Europe', tier: 1, teams: 12, season: '2024', founded: 1990 },
  { id: 'ykkönen', name: 'Ykkönen', country: 'Finland', continent: 'Europe', tier: 2, teams: 10, season: '2024', founded: 1973 },
  { id: 'kakkonen', name: 'Kakkonen', country: 'Finland', continent: 'Europe', tier: 3, teams: 36, season: '2024', founded: 1973 },

  // EUROPE - Russia
  { id: 'premier_league_russia', name: 'Premier League', country: 'Russia', continent: 'Europe', tier: 1, teams: 16, season: '2024-25', founded: 1992 },
  { id: 'fnl', name: 'FNL', country: 'Russia', continent: 'Europe', tier: 2, teams: 20, season: '2024-25', founded: 1992 },
  { id: 'pfl', name: 'PFL', country: 'Russia', continent: 'Europe', tier: 3, teams: 80, season: '2024-25', founded: 1998 },

  // EUROPE - Scotland
  { id: 'premiership', name: 'Scottish Premiership', country: 'Scotland', continent: 'Europe', tier: 1, teams: 12, season: '2024-25', founded: 2013 },
  { id: 'championship_scotland', name: 'Scottish Championship', country: 'Scotland', continent: 'Europe', tier: 2, teams: 10, season: '2024-25', founded: 2013 },
  { id: 'league_one_scotland', name: 'Scottish League One', country: 'Scotland', continent: 'Europe', tier: 3, teams: 10, season: '2024-25', founded: 2013 },
  { id: 'league_two_scotland', name: 'Scottish League Two', country: 'Scotland', continent: 'Europe', tier: 4, teams: 10, season: '2024-25', founded: 2013 },

  // EUROPE - Switzerland
  { id: 'super_league_swiss', name: 'Super League', country: 'Switzerland', continent: 'Europe', tier: 1, teams: 12, season: '2024-25', founded: 1897 },
  { id: 'challenge_league', name: 'Challenge League', country: 'Switzerland', continent: 'Europe', tier: 2, teams: 10, season: '2024-25', founded: 2003 },

  // EUROPE - Austria
  { id: 'bundesliga_austria', name: 'Austrian Bundesliga', country: 'Austria', continent: 'Europe', tier: 1, teams: 12, season: '2024-25', founded: 1974 },
  { id: '2_liga_austria', name: '2. Liga', country: 'Austria', continent: 'Europe', tier: 2, teams: 16, season: '2024-25', founded: 1974 },

  // EUROPE - Czech Republic
  { id: 'fortuna_liga', name: 'Fortuna Liga', country: 'Czech Republic', continent: 'Europe', tier: 1, teams: 16, season: '2024-25', founded: 1993 },
  { id: 'fnl_czech', name: 'FNL', country: 'Czech Republic', continent: 'Europe', tier: 2, teams: 16, season: '2024-25', founded: 1993 },

  // EUROPE - Poland
  { id: 'ekstraklasa', name: 'Ekstraklasa', country: 'Poland', continent: 'Europe', tier: 1, teams: 18, season: '2024-25', founded: 1927 },
  { id: 'i_liga', name: 'I Liga', country: 'Poland', continent: 'Europe', tier: 2, teams: 18, season: '2024-25', founded: 1948 },
  { id: 'ii_liga', name: 'II Liga', country: 'Poland', continent: 'Europe', tier: 3, teams: 18, season: '2024-25', founded: 1950 },

  // EUROPE - Ukraine
  { id: 'premier_league_ukraine', name: 'Premier League', country: 'Ukraine', continent: 'Europe', tier: 1, teams: 16, season: '2024-25', founded: 1991 },
  { id: 'persha_liga', name: 'Persha Liga', country: 'Ukraine', continent: 'Europe', tier: 2, teams: 16, season: '2024-25', founded: 1992 },

  // EUROPE - Greece
  { id: 'super_league_greece', name: 'Super League', country: 'Greece', continent: 'Europe', tier: 1, teams: 14, season: '2024-25', founded: 1959 },
  { id: 'super_league_2', name: 'Super League 2', country: 'Greece', continent: 'Europe', tier: 2, teams: 12, season: '2024-25', founded: 2019 },

  // EUROPE - Croatia
  { id: 'hnl', name: 'HNL', country: 'Croatia', continent: 'Europe', tier: 1, teams: 10, season: '2024-25', founded: 1992 },
  { id: 'prva_nl', name: 'Prva NL', country: 'Croatia', continent: 'Europe', tier: 2, teams: 12, season: '2024-25', founded: 1992 },

  // EUROPE - Serbia
  { id: 'superliga_serbia', name: 'SuperLiga', country: 'Serbia', continent: 'Europe', tier: 1, teams: 16, season: '2024-25', founded: 2006 },
  { id: 'prva_liga_serbia', name: 'Prva Liga', country: 'Serbia', continent: 'Europe', tier: 2, teams: 16, season: '2024-25', founded: 2006 },

  // NORTH AMERICA - USA
  { id: 'mls', name: 'Major League Soccer', country: 'USA', continent: 'North America', tier: 1, teams: 29, season: '2024', founded: 1993 },
  { id: 'usl_championship', name: 'USL Championship', country: 'USA', continent: 'North America', tier: 2, teams: 24, season: '2024', founded: 2011 },
  { id: 'usl_league_one', name: 'USL League One', country: 'USA', continent: 'North America', tier: 3, teams: 12, season: '2024', founded: 2019 },
  { id: 'usl_league_two', name: 'USL League Two', country: 'USA', continent: 'North America', tier: 4, teams: 120, season: '2024', founded: 1995 },
  { id: 'nisa', name: 'NISA', country: 'USA', continent: 'North America', tier: 3, teams: 8, season: '2024', founded: 2017 },

  // NORTH AMERICA - Canada
  { id: 'cpl', name: 'Canadian Premier League', country: 'Canada', continent: 'North America', tier: 1, teams: 8, season: '2024', founded: 2019 },
  { id: 'league1_ontario', name: 'League1 Ontario', country: 'Canada', continent: 'North America', tier: 2, teams: 20, season: '2024', founded: 2014 },
  { id: 'plsq', name: 'PLSQ', country: 'Canada', continent: 'North America', tier: 2, teams: 12, season: '2024', founded: 2012 },

  // SOUTH AMERICA - Brazil
  { id: 'serie_a_brazil', name: 'Série A', country: 'Brazil', continent: 'South America', tier: 1, teams: 20, season: '2024', founded: 1959 },
  { id: 'serie_b_brazil', name: 'Série B', country: 'Brazil', continent: 'South America', tier: 2, teams: 20, season: '2024', founded: 1971 },
  { id: 'serie_c_brazil', name: 'Série C', country: 'Brazil', continent: 'South America', tier: 3, teams: 20, season: '2024', founded: 1981 },
  { id: 'serie_d_brazil', name: 'Série D', country: 'Brazil', continent: 'South America', tier: 4, teams: 64, season: '2024', founded: 2009 },
  { id: 'paulista_a1', name: 'Paulistão A1', country: 'Brazil', continent: 'South America', tier: 1, teams: 16, season: '2024', founded: 1902 },
  { id: 'carioca_a', name: 'Carioca A', country: 'Brazil', continent: 'South America', tier: 1, teams: 12, season: '2024', founded: 1906 },

  // SOUTH AMERICA - Chile
  { id: 'primera_division_chile', name: 'Primera División', country: 'Chile', continent: 'South America', tier: 1, teams: 16, season: '2024', founded: 1933 },
  { id: 'primera_b_chile', name: 'Primera B', country: 'Chile', continent: 'South America', tier: 2, teams: 16, season: '2024', founded: 1952 },
  { id: 'segunda_division_chile', name: 'Segunda División', country: 'Chile', continent: 'South America', tier: 3, teams: 18, season: '2024', founded: 1986 },

  // SOUTH AMERICA - Peru
  { id: 'liga_1_peru', name: 'Liga 1', country: 'Peru', continent: 'South America', tier: 1, teams: 18, season: '2024', founded: 1912 },
  { id: 'liga_2_peru', name: 'Liga 2', country: 'Peru', continent: 'South America', tier: 2, teams: 16, season: '2024', founded: 1966 },

  // SOUTH AMERICA - Argentina
  { id: 'liga_profesional', name: 'Liga Profesional', country: 'Argentina', continent: 'South America', tier: 1, teams: 28, season: '2024', founded: 1891 },
  { id: 'primera_nacional', name: 'Primera Nacional', country: 'Argentina', continent: 'South America', tier: 2, teams: 37, season: '2024', founded: 1986 },

  // SOUTH AMERICA - Colombia
  { id: 'categoria_primera_a', name: 'Categoría Primera A', country: 'Colombia', continent: 'South America', tier: 1, teams: 20, season: '2024', founded: 1948 },
  { id: 'categoria_primera_b', name: 'Categoría Primera B', country: 'Colombia', continent: 'South America', tier: 2, teams: 16, season: '2024', founded: 1991 },

  // MIDDLE EAST - Saudi Arabia
  { id: 'saudi_pro_league', name: 'Saudi Pro League', country: 'Saudi Arabia', continent: 'Asia', tier: 1, teams: 18, season: '2024-25', founded: 1976 },
  { id: 'first_division_saudi', name: 'First Division League', country: 'Saudi Arabia', continent: 'Asia', tier: 2, teams: 20, season: '2024-25', founded: 1976 },
  { id: 'second_division_saudi', name: 'Second Division League', country: 'Saudi Arabia', continent: 'Asia', tier: 3, teams: 32, season: '2024-25', founded: 1976 },

  // ASIA - Japan
  { id: 'j1_league', name: 'J1 League', country: 'Japan', continent: 'Asia', tier: 1, teams: 20, season: '2024', founded: 1992 },
  { id: 'j2_league', name: 'J2 League', country: 'Japan', continent: 'Asia', tier: 2, teams: 22, season: '2024', founded: 1999 },
  { id: 'j3_league', name: 'J3 League', country: 'Japan', continent: 'Asia', tier: 3, teams: 18, season: '2024', founded: 2014 },
  { id: 'jfl', name: 'Japan Football League', country: 'Japan', continent: 'Asia', tier: 4, teams: 16, season: '2024', founded: 1992 },

  // ASIA - South Korea
  { id: 'k_league_1', name: 'K League 1', country: 'South Korea', continent: 'Asia', tier: 1, teams: 12, season: '2024', founded: 1983 },
  { id: 'k_league_2', name: 'K League 2', country: 'South Korea', continent: 'Asia', tier: 2, teams: 10, season: '2024', founded: 2013 },
  { id: 'k3_league', name: 'K3 League', country: 'South Korea', continent: 'Asia', tier: 3, teams: 16, season: '2024', founded: 2007 },

  // ASIA - China
  { id: 'chinese_super_league', name: 'Chinese Super League', country: 'China', continent: 'Asia', tier: 1, teams: 16, season: '2024', founded: 2004 },
  { id: 'china_league_one', name: 'China League One', country: 'China', continent: 'Asia', tier: 2, teams: 18, season: '2024', founded: 2004 },
  { id: 'china_league_two', name: 'China League Two', country: 'China', continent: 'Asia', tier: 3, teams: 20, season: '2024', founded: 2011 },

  // ASIA - India
  { id: 'isl', name: 'Indian Super League', country: 'India', continent: 'Asia', tier: 1, teams: 12, season: '2024-25', founded: 2013 },
  { id: 'i_league', name: 'I-League', country: 'India', continent: 'Asia', tier: 2, teams: 13, season: '2024-25', founded: 2007 },

  // ASIA - Thailand
  { id: 'thai_league_1', name: 'Thai League 1', country: 'Thailand', continent: 'Asia', tier: 1, teams: 16, season: '2024-25', founded: 1996 },
  { id: 'thai_league_2', name: 'Thai League 2', country: 'Thailand', continent: 'Asia', tier: 2, teams: 18, season: '2024-25', founded: 1997 },

  // ASIA - Malaysia
  { id: 'super_league_malaysia', name: 'Super League', country: 'Malaysia', continent: 'Asia', tier: 1, teams: 12, season: '2024', founded: 2004 },
  { id: 'premier_league_malaysia', name: 'Premier League', country: 'Malaysia', continent: 'Asia', tier: 2, teams: 12, season: '2024', founded: 2004 },

  // ASIA - Indonesia
  { id: 'liga_1_indonesia', name: 'Liga 1', country: 'Indonesia', continent: 'Asia', tier: 1, teams: 18, season: '2024-25', founded: 2008 },
  { id: 'liga_2_indonesia', name: 'Liga 2', country: 'Indonesia', continent: 'Asia', tier: 2, teams: 24, season: '2024-25', founded: 2008 },

  // AFRICA - South Africa
  { id: 'psl', name: 'Premier Soccer League', country: 'South Africa', continent: 'Africa', tier: 1, teams: 16, season: '2024-25', founded: 1996 },
  { id: 'nfd', name: 'National First Division', country: 'South Africa', continent: 'Africa', tier: 2, teams: 16, season: '2024-25', founded: 1996 },

  // AFRICA - Egypt
  { id: 'egyptian_premier_league', name: 'Egyptian Premier League', country: 'Egypt', continent: 'Africa', tier: 1, teams: 18, season: '2024-25', founded: 1948 },
  { id: 'egyptian_second_division', name: 'Egyptian Second Division', country: 'Egypt', continent: 'Africa', tier: 2, teams: 48, season: '2024-25', founded: 1977 },

  // AFRICA - Nigeria
  { id: 'npfl', name: 'Nigeria Premier Football League', country: 'Nigeria', continent: 'Africa', tier: 1, teams: 20, season: '2024-25', founded: 1972 },
  { id: 'nnl', name: 'Nigeria National League', country: 'Nigeria', continent: 'Africa', tier: 2, teams: 40, season: '2024-25', founded: 1991 },

  // AFRICA - Morocco
  { id: 'botola_pro', name: 'Botola Pro', country: 'Morocco', continent: 'Africa', tier: 1, teams: 16, season: '2024-25', founded: 1956 },
  { id: 'botola_2', name: 'Botola 2', country: 'Morocco', continent: 'Africa', tier: 2, teams: 16, season: '2024-25', founded: 1956 },

  // AFRICA - Ghana
  { id: 'ghana_premier_league', name: 'Ghana Premier League', country: 'Ghana', continent: 'Africa', tier: 1, teams: 18, season: '2024-25', founded: 1956 },
  { id: 'division_one_ghana', name: 'Division One League', country: 'Ghana', continent: 'Africa', tier: 2, teams: 48, season: '2024-25', founded: 1958 },

  // AFRICA - Kenya
  { id: 'fkf_pl', name: 'FKF Premier League', country: 'Kenya', continent: 'Africa', tier: 1, teams: 18, season: '2024-25', founded: 1963 },
  { id: 'nsl', name: 'National Super League', country: 'Kenya', continent: 'Africa', tier: 2, teams: 20, season: '2024-25', founded: 2004 },

  // AFRICA - Tunisia
  { id: 'ligue_1_tunisia', name: 'Ligue Professionnelle 1', country: 'Tunisia', continent: 'Africa', tier: 1, teams: 16, season: '2024-25', founded: 1921 },
  { id: 'ligue_2_tunisia', name: 'Ligue Professionnelle 2', country: 'Tunisia', continent: 'Africa', tier: 2, teams: 16, season: '2024-25', founded: 1956 },

  // AFRICA - Algeria
  { id: 'ligue_1_algeria', name: 'Ligue Professionnelle 1', country: 'Algeria', continent: 'Africa', tier: 1, teams: 16, season: '2024-25', founded: 1962 },
  { id: 'ligue_2_algeria', name: 'Ligue Professionnelle 2', country: 'Algeria', continent: 'Africa', tier: 2, teams: 16, season: '2024-25', founded: 1962 },

  // OCEANIA - Australia
  { id: 'a_league_men', name: 'A-League Men', country: 'Australia', continent: 'Oceania', tier: 1, teams: 12, season: '2024-25', founded: 2004 },
  { id: 'npl_australia', name: 'National Premier Leagues', country: 'Australia', continent: 'Oceania', tier: 2, teams: 120, season: '2024', founded: 2013 },

  // OCEANIA - New Zealand
  { id: 'nz_premiership', name: 'New Zealand Football Premiership', country: 'New Zealand', continent: 'Oceania', tier: 1, teams: 10, season: '2024-25', founded: 2004 },
  { id: 'northern_league_nz', name: 'Northern League', country: 'New Zealand', continent: 'Oceania', tier: 2, teams: 10, season: '2024', founded: 1902 }
];

export const getLeaguesByContinent = (continent: string): League[] => {
  return globalLeagues.filter(league => league.continent === continent);
};

export const getLeaguesByCountry = (country: string): League[] => {
  return globalLeagues.filter(league => league.country === country);
};

export const getLeaguesByTier = (tier: number): League[] => {
  return globalLeagues.filter(league => league.tier === tier);
};

export const getTopTierLeagues = (): League[] => {
  return globalLeagues.filter(league => league.tier === 1);
};

export const searchLeagues = (query: string): League[] => {
  const lowercaseQuery = query.toLowerCase();
  return globalLeagues.filter(league => 
    league.name.toLowerCase().includes(lowercaseQuery) ||
    league.country.toLowerCase().includes(lowercaseQuery) ||
    league.continent.toLowerCase().includes(lowercaseQuery)
  );
};

export const continents = [
  'Europe',
  'North America', 
  'South America',
  'Asia',
  'Africa',
  'Oceania'
];

export const countries = Array.from(new Set(globalLeagues.map(league => league.country))).sort();