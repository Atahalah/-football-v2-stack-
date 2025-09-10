export interface Team {
  id: string;
  name: string;
  shortName: string;
  country: string;
  league: string;
  founded: number;
  stadium: string;
  capacity: number;
  colors: {
    primary: string;
    secondary: string;
  };
}

export const globalTeams: Team[] = [
  // PREMIER LEAGUE
  { id: 'man_city', name: 'Manchester City', shortName: 'MCI', country: 'England', league: 'epl', founded: 1880, stadium: 'Etihad Stadium', capacity: 55017, colors: { primary: '#6CABDD', secondary: '#FFFFFF' } },
  { id: 'arsenal', name: 'Arsenal', shortName: 'ARS', country: 'England', league: 'epl', founded: 1886, stadium: 'Emirates Stadium', capacity: 60704, colors: { primary: '#EF0107', secondary: '#FFFFFF' } },
  { id: 'liverpool', name: 'Liverpool', shortName: 'LIV', country: 'England', league: 'epl', founded: 1892, stadium: 'Anfield', capacity: 53394, colors: { primary: '#C8102E', secondary: '#FFFFFF' } },
  { id: 'chelsea', name: 'Chelsea', shortName: 'CHE', country: 'England', league: 'epl', founded: 1905, stadium: 'Stamford Bridge', capacity: 40834, colors: { primary: '#034694', secondary: '#FFFFFF' } },
  { id: 'man_utd', name: 'Manchester United', shortName: 'MUN', country: 'England', league: 'epl', founded: 1878, stadium: 'Old Trafford', capacity: 74879, colors: { primary: '#DA020E', secondary: '#FFFFFF' } },
  { id: 'tottenham', name: 'Tottenham Hotspur', shortName: 'TOT', country: 'England', league: 'epl', founded: 1882, stadium: 'Tottenham Hotspur Stadium', capacity: 62850, colors: { primary: '#132257', secondary: '#FFFFFF' } },
  { id: 'newcastle', name: 'Newcastle United', shortName: 'NEW', country: 'England', league: 'epl', founded: 1892, stadium: 'St. James\' Park', capacity: 52305, colors: { primary: '#241F20', secondary: '#FFFFFF' } },
  { id: 'brighton', name: 'Brighton & Hove Albion', shortName: 'BHA', country: 'England', league: 'epl', founded: 1901, stadium: 'American Express Community Stadium', capacity: 31800, colors: { primary: '#0057B8', secondary: '#FFFFFF' } },
  { id: 'aston_villa', name: 'Aston Villa', shortName: 'AVL', country: 'England', league: 'epl', founded: 1874, stadium: 'Villa Park', capacity: 42749, colors: { primary: '#95BFE5', secondary: '#670E36' } },
  { id: 'west_ham', name: 'West Ham United', shortName: 'WHU', country: 'England', league: 'epl', founded: 1895, stadium: 'London Stadium', capacity: 66000, colors: { primary: '#7A263A', secondary: '#1BB1E7' } },

  // LA LIGA
  { id: 'real_madrid', name: 'Real Madrid', shortName: 'RMA', country: 'Spain', league: 'la_liga', founded: 1902, stadium: 'Santiago Bernabéu', capacity: 81044, colors: { primary: '#FFFFFF', secondary: '#FEBE10' } },
  { id: 'barcelona', name: 'FC Barcelona', shortName: 'BAR', country: 'Spain', league: 'la_liga', founded: 1899, stadium: 'Camp Nou', capacity: 99354, colors: { primary: '#A50044', secondary: '#004D98' } },
  { id: 'atletico_madrid', name: 'Atlético Madrid', shortName: 'ATM', country: 'Spain', league: 'la_liga', founded: 1903, stadium: 'Wanda Metropolitano', capacity: 68456, colors: { primary: '#CE3524', secondary: '#FFFFFF' } },
  { id: 'sevilla', name: 'Sevilla FC', shortName: 'SEV', country: 'Spain', league: 'la_liga', founded: 1890, stadium: 'Ramón Sánchez-Pizjuán', capacity: 43883, colors: { primary: '#FFFFFF', secondary: '#D50000' } },
  { id: 'real_sociedad', name: 'Real Sociedad', shortName: 'RSO', country: 'Spain', league: 'la_liga', founded: 1909, stadium: 'Reale Arena', capacity: 39500, colors: { primary: '#003DA5', secondary: '#FFFFFF' } },
  { id: 'villarreal', name: 'Villarreal CF', shortName: 'VIL', country: 'Spain', league: 'la_liga', founded: 1923, stadium: 'Estadio de la Cerámica', capacity: 23500, colors: { primary: '#FFE135', secondary: '#003DA5' } },
  { id: 'athletic_bilbao', name: 'Athletic Bilbao', shortName: 'ATH', country: 'Spain', league: 'la_liga', founded: 1898, stadium: 'San Mamés', capacity: 53289, colors: { primary: '#EE2523', secondary: '#FFFFFF' } },
  { id: 'real_betis', name: 'Real Betis', shortName: 'BET', country: 'Spain', league: 'la_liga', founded: 1907, stadium: 'Benito Villamarín', capacity: 60721, colors: { primary: '#00954C', secondary: '#FFFFFF' } },
  { id: 'valencia', name: 'Valencia CF', shortName: 'VAL', country: 'Spain', league: 'la_liga', founded: 1919, stadium: 'Mestalla', capacity: 49430, colors: { primary: '#FF8F00', secondary: '#000000' } },
  { id: 'getafe', name: 'Getafe CF', shortName: 'GET', country: 'Spain', league: 'la_liga', founded: 1946, stadium: 'Coliseum Alfonso Pérez', capacity: 17393, colors: { primary: '#005999', secondary: '#FFFFFF' } },

  // BUNDESLIGA
  { id: 'bayern_munich', name: 'FC Bayern München', shortName: 'BAY', country: 'Germany', league: 'bundesliga', founded: 1900, stadium: 'Allianz Arena', capacity: 75000, colors: { primary: '#DC052D', secondary: '#FFFFFF' } },
  { id: 'borussia_dortmund', name: 'Borussia Dortmund', shortName: 'BVB', country: 'Germany', league: 'bundesliga', founded: 1909, stadium: 'Signal Iduna Park', capacity: 81365, colors: { primary: '#FDE100', secondary: '#000000' } },
  { id: 'rb_leipzig', name: 'RB Leipzig', shortName: 'RBL', country: 'Germany', league: 'bundesliga', founded: 2009, stadium: 'Red Bull Arena', capacity: 47069, colors: { primary: '#DD0741', secondary: '#FFFFFF' } },
  { id: 'bayer_leverkusen', name: 'Bayer 04 Leverkusen', shortName: 'B04', country: 'Germany', league: 'bundesliga', founded: 1904, stadium: 'BayArena', capacity: 30210, colors: { primary: '#E32221', secondary: '#000000' } },
  { id: 'eintracht_frankfurt', name: 'Eintracht Frankfurt', shortName: 'SGE', country: 'Germany', league: 'bundesliga', founded: 1899, stadium: 'Deutsche Bank Park', capacity: 51500, colors: { primary: '#E1000F', secondary: '#000000' } },
  { id: 'borussia_mgladbach', name: 'Borussia Mönchengladbach', shortName: 'BMG', country: 'Germany', league: 'bundesliga', founded: 1900, stadium: 'Borussia-Park', capacity: 54057, colors: { primary: '#00B04F', secondary: '#FFFFFF' } },
  { id: 'vfb_stuttgart', name: 'VfB Stuttgart', shortName: 'VFB', country: 'Germany', league: 'bundesliga', founded: 1893, stadium: 'Mercedes-Benz Arena', capacity: 60449, colors: { primary: '#FFFFFF', secondary: '#E32221' } },
  { id: 'werder_bremen', name: 'SV Werder Bremen', shortName: 'SVW', country: 'Germany', league: 'bundesliga', founded: 1899, stadium: 'Weserstadion', capacity: 42100, colors: { primary: '#1D9053', secondary: '#FFFFFF' } },
  { id: 'schalke', name: 'FC Schalke 04', shortName: 'S04', country: 'Germany', league: 'bundesliga2', founded: 1904, stadium: 'Veltins-Arena', capacity: 62271, colors: { primary: '#004C99', secondary: '#FFFFFF' } },
  { id: 'hamburger_sv', name: 'Hamburger SV', shortName: 'HSV', country: 'Germany', league: 'bundesliga2', founded: 1887, stadium: 'Volksparkstadion', capacity: 57000, colors: { primary: '#003DA5', secondary: '#FFFFFF' } },

  // SERIE A
  { id: 'juventus', name: 'Juventus', shortName: 'JUV', country: 'Italy', league: 'serie_a', founded: 1897, stadium: 'Allianz Stadium', capacity: 41507, colors: { primary: '#000000', secondary: '#FFFFFF' } },
  { id: 'inter_milan', name: 'Inter Milan', shortName: 'INT', country: 'Italy', league: 'serie_a', founded: 1908, stadium: 'San Siro', capacity: 75923, colors: { primary: '#0068A8', secondary: '#000000' } },
  { id: 'ac_milan', name: 'AC Milan', shortName: 'MIL', country: 'Italy', league: 'serie_a', founded: 1899, stadium: 'San Siro', capacity: 75923, colors: { primary: '#FB090B', secondary: '#000000' } },
  { id: 'napoli', name: 'SSC Napoli', shortName: 'NAP', country: 'Italy', league: 'serie_a', founded: 1926, stadium: 'Stadio Diego Armando Maradona', capacity: 54726, colors: { primary: '#087FD1', secondary: '#FFFFFF' } },
  { id: 'roma', name: 'AS Roma', shortName: 'ROM', country: 'Italy', league: 'serie_a', founded: 1927, stadium: 'Stadio Olimpico', capacity: 70634, colors: { primary: '#CC0000', secondary: '#F7DC6F' } },
  { id: 'lazio', name: 'SS Lazio', shortName: 'LAZ', country: 'Italy', league: 'serie_a', founded: 1900, stadium: 'Stadio Olimpico', capacity: 70634, colors: { primary: '#87CEEB', secondary: '#FFFFFF' } },
  { id: 'atalanta', name: 'Atalanta BC', shortName: 'ATA', country: 'Italy', league: 'serie_a', founded: 1907, stadium: 'Gewiss Stadium', capacity: 21300, colors: { primary: '#1E90FF', secondary: '#000000' } },
  { id: 'fiorentina', name: 'ACF Fiorentina', shortName: 'FIO', country: 'Italy', league: 'serie_a', founded: 1926, stadium: 'Stadio Artemio Franchi', capacity: 43147, colors: { primary: '#6A0DAD', secondary: '#FFFFFF' } },

  // LIGUE 1
  { id: 'psg', name: 'Paris Saint-Germain', shortName: 'PSG', country: 'France', league: 'ligue1', founded: 1970, stadium: 'Parc des Princes', capacity: 47929, colors: { primary: '#004170', secondary: '#DA020E' } },
  { id: 'marseille', name: 'Olympique de Marseille', shortName: 'OM', country: 'France', league: 'ligue1', founded: 1899, stadium: 'Orange Vélodrome', capacity: 67394, colors: { primary: '#009ADA', secondary: '#FFFFFF' } },
  { id: 'lyon', name: 'Olympique Lyonnais', shortName: 'OL', country: 'France', league: 'ligue1', founded: 1950, stadium: 'Groupama Stadium', capacity: 59186, colors: { primary: '#FFFFFF', secondary: '#DA020E' } },
  { id: 'monaco', name: 'AS Monaco', shortName: 'ASM', country: 'France', league: 'ligue1', founded: 1924, stadium: 'Stade Louis II', capacity: 18523, colors: { primary: '#DA020E', secondary: '#FFFFFF' } },
  { id: 'lille', name: 'LOSC Lille', shortName: 'LOSC', country: 'France', league: 'ligue1', founded: 1944, stadium: 'Stade Pierre-Mauroy', capacity: 50186, colors: { primary: '#DA020E', secondary: '#FFFFFF' } },
  { id: 'nice', name: 'OGC Nice', shortName: 'NICE', country: 'France', league: 'ligue1', founded: 1904, stadium: 'Allianz Riviera', capacity: 35624, colors: { primary: '#DA020E', secondary: '#000000' } },

  // MLS
  { id: 'lafc', name: 'Los Angeles FC', shortName: 'LAFC', country: 'USA', league: 'mls', founded: 2014, stadium: 'BMO Stadium', capacity: 22000, colors: { primary: '#000000', secondary: '#C39E6D' } },
  { id: 'la_galaxy', name: 'LA Galaxy', shortName: 'LAG', country: 'USA', league: 'mls', founded: 1994, stadium: 'Dignity Health Sports Park', capacity: 27000, colors: { primary: '#00245D', secondary: '#FFFFFF' } },
  { id: 'inter_miami', name: 'Inter Miami CF', shortName: 'MIA', country: 'USA', league: 'mls', founded: 2018, stadium: 'DRV PNK Stadium', capacity: 18000, colors: { primary: '#F7B5CD', secondary: '#000000' } },
  { id: 'atlanta_united', name: 'Atlanta United FC', shortName: 'ATL', country: 'USA', league: 'mls', founded: 2014, stadium: 'Mercedes-Benz Stadium', capacity: 42500, colors: { primary: '#A71930', secondary: '#000000' } },
  { id: 'seattle_sounders', name: 'Seattle Sounders FC', shortName: 'SEA', country: 'USA', league: 'mls', founded: 2007, stadium: 'Lumen Field', capacity: 37722, colors: { primary: '#5D9741', secondary: '#1E3A8A' } },
  { id: 'portland_timbers', name: 'Portland Timbers', shortName: 'POR', country: 'USA', league: 'mls', founded: 2009, stadium: 'Providence Park', capacity: 25218, colors: { primary: '#004225', secondary: '#FDB52A' } },

  // BRAZILIAN SERIE A
  { id: 'flamengo', name: 'CR Flamengo', shortName: 'FLA', country: 'Brazil', league: 'serie_a_brazil', founded: 1895, stadium: 'Maracanã', capacity: 78838, colors: { primary: '#E30613', secondary: '#000000' } },
  { id: 'palmeiras', name: 'SE Palmeiras', shortName: 'PAL', country: 'Brazil', league: 'serie_a_brazil', founded: 1914, stadium: 'Allianz Parque', capacity: 43713, colors: { primary: '#006341', secondary: '#FFFFFF' } },
  { id: 'corinthians', name: 'SC Corinthians', shortName: 'COR', country: 'Brazil', league: 'serie_a_brazil', founded: 1910, stadium: 'Neo Química Arena', capacity: 49205, colors: { primary: '#000000', secondary: '#FFFFFF' } },
  { id: 'sao_paulo', name: 'São Paulo FC', shortName: 'SAO', country: 'Brazil', league: 'serie_a_brazil', founded: 1930, stadium: 'Morumbi', capacity: 67052, colors: { primary: '#FFFFFF', secondary: '#E30613' } },
  { id: 'santos', name: 'Santos FC', shortName: 'SAN', country: 'Brazil', league: 'serie_a_brazil', founded: 1912, stadium: 'Vila Belmiro', capacity: 16068, colors: { primary: '#FFFFFF', secondary: '#000000' } },
  { id: 'gremio', name: 'Grêmio FBPA', shortName: 'GRE', country: 'Brazil', league: 'serie_a_brazil', founded: 1903, stadium: 'Arena do Grêmio', capacity: 55662, colors: { primary: '#0080C7', secondary: '#000000' } },

  // SAUDI PRO LEAGUE
  { id: 'al_hilal', name: 'Al Hilal', shortName: 'HIL', country: 'Saudi Arabia', league: 'saudi_pro_league', founded: 1957, stadium: 'Kingdom Arena', capacity: 68000, colors: { primary: '#0066CC', secondary: '#FFFFFF' } },
  { id: 'al_nassr', name: 'Al Nassr', shortName: 'NAS', country: 'Saudi Arabia', league: 'saudi_pro_league', founded: 1955, stadium: 'Mrsool Park', capacity: 25000, colors: { primary: '#FFD700', secondary: '#0066CC' } },
  { id: 'al_ittihad', name: 'Al Ittihad', shortName: 'ITT', country: 'Saudi Arabia', league: 'saudi_pro_league', founded: 1927, stadium: 'King Abdullah Sports City', capacity: 62000, colors: { primary: '#000000', secondary: '#FFD700' } },
  { id: 'al_ahli', name: 'Al Ahli', shortName: 'AHL', country: 'Saudi Arabia', league: 'saudi_pro_league', founded: 1937, stadium: 'King Abdullah Sports City', capacity: 62000, colors: { primary: '#00B04F', secondary: '#FFFFFF' } },

  // J1 LEAGUE
  { id: 'kashima_antlers', name: 'Kashima Antlers', shortName: 'KAS', country: 'Japan', league: 'j1_league', founded: 1947, stadium: 'Kashima Soccer Stadium', capacity: 40728, colors: { primary: '#8B0000', secondary: '#FFFFFF' } },
  { id: 'urawa_reds', name: 'Urawa Red Diamonds', shortName: 'URA', country: 'Japan', league: 'j1_league', founded: 1950, stadium: 'Saitama Stadium 2002', capacity: 63700, colors: { primary: '#E30613', secondary: '#000000' } },
  { id: 'yokohama_marinos', name: 'Yokohama F. Marinos', shortName: 'YFM', country: 'Japan', league: 'j1_league', founded: 1972, stadium: 'Nissan Stadium', capacity: 72327, colors: { primary: '#0066CC', secondary: '#FFFFFF' } },
  { id: 'gamba_osaka', name: 'Gamba Osaka', shortName: 'GAM', country: 'Japan', league: 'j1_league', founded: 1980, stadium: 'Panasonic Stadium Suita', capacity: 39694, colors: { primary: '#0066CC', secondary: '#000000' } },

  // K LEAGUE 1
  { id: 'jeonbuk_motors', name: 'Jeonbuk Hyundai Motors', shortName: 'JEO', country: 'South Korea', league: 'k_league_1', founded: 1994, stadium: 'Jeonju World Cup Stadium', capacity: 42477, colors: { primary: '#00B04F', secondary: '#000000' } },
  { id: 'ulsan_hyundai', name: 'Ulsan Hyundai', shortName: 'ULS', country: 'South Korea', league: 'k_league_1', founded: 1983, stadium: 'Ulsan Munsu Football Stadium', capacity: 44102, colors: { primary: '#FF6600', secondary: '#0066CC' } },
  { id: 'pohang_steelers', name: 'Pohang Steelers', shortName: 'POH', country: 'South Korea', league: 'k_league_1', founded: 1973, stadium: 'Pohang Steel Yard', capacity: 25000, colors: { primary: '#E30613', secondary: '#000000' } },

  // CHINESE SUPER LEAGUE
  { id: 'guangzhou_fc', name: 'Guangzhou FC', shortName: 'GUA', country: 'China', league: 'chinese_super_league', founded: 1954, stadium: 'Tianhe Stadium', capacity: 54500, colors: { primary: '#E30613', secondary: '#FFFFFF' } },
  { id: 'shanghai_sipg', name: 'Shanghai Port', shortName: 'SHA', country: 'China', league: 'chinese_super_league', founded: 2005, stadium: 'Shanghai Stadium', capacity: 56842, colors: { primary: '#E30613', secondary: '#FFFFFF' } },
  { id: 'beijing_guoan', name: 'Beijing Guoan', shortName: 'BEI', country: 'China', league: 'chinese_super_league', founded: 1992, stadium: 'Workers\' Stadium', capacity: 66161, colors: { primary: '#00B04F', secondary: '#FFFFFF' } },

  // AFRICAN LEAGUES
  { id: 'al_ahly', name: 'Al Ahly SC', shortName: 'AHL', country: 'Egypt', league: 'egyptian_premier_league', founded: 1907, stadium: 'Cairo International Stadium', capacity: 75000, colors: { primary: '#E30613', secondary: '#FFFFFF' } },
  { id: 'zamalek', name: 'Zamalek SC', shortName: 'ZAM', country: 'Egypt', league: 'egyptian_premier_league', founded: 1911, stadium: 'Cairo International Stadium', capacity: 75000, colors: { primary: '#FFFFFF', secondary: '#E30613' } },
  { id: 'kaizer_chiefs', name: 'Kaizer Chiefs', shortName: 'KAI', country: 'South Africa', league: 'psl', founded: 1970, stadium: 'FNB Stadium', capacity: 94736, colors: { primary: '#FFD700', secondary: '#000000' } },
  { id: 'orlando_pirates', name: 'Orlando Pirates', shortName: 'ORL', country: 'South Africa', league: 'psl', founded: 1937, stadium: 'Orlando Stadium', capacity: 40000, colors: { primary: '#000000', secondary: '#FFFFFF' } },

  // TURKISH SUPER LIG
  { id: 'galatasaray', name: 'Galatasaray', shortName: 'GAL', country: 'Turkey', league: 'super_lig', founded: 1905, stadium: 'Türk Telekom Stadium', capacity: 52280, colors: { primary: '#FFD700', secondary: '#E30613' } },
  { id: 'fenerbahce', name: 'Fenerbahçe', shortName: 'FEN', country: 'Turkey', league: 'super_lig', founded: 1907, stadium: 'Şükrü Saracoğlu Stadium', capacity: 50530, colors: { primary: '#FFD700', secondary: '#0066CC' } },
  { id: 'besiktas', name: 'Beşiktaş', shortName: 'BES', country: 'Turkey', league: 'super_lig', founded: 1903, stadium: 'Vodafone Park', capacity: 41903, colors: { primary: '#000000', secondary: '#FFFFFF' } },

  // SCANDINAVIAN LEAGUES
  { id: 'malmo_ff', name: 'Malmö FF', shortName: 'MAL', country: 'Sweden', league: 'allsvenskan', founded: 1910, stadium: 'Eleda Stadion', capacity: 24000, colors: { primary: '#87CEEB', secondary: '#FFFFFF' } },
  { id: 'aik', name: 'AIK', shortName: 'AIK', country: 'Sweden', league: 'allsvenskan', founded: 1891, stadium: 'Friends Arena', capacity: 50000, colors: { primary: '#000000', secondary: '#FFD700' } },
  { id: 'rosenborg', name: 'Rosenborg BK', shortName: 'ROS', country: 'Norway', league: 'eliteserien', founded: 1917, stadium: 'Lerkendal Stadion', capacity: 21421, colors: { primary: '#FFFFFF', secondary: '#000000' } },
  { id: 'molde', name: 'Molde FK', shortName: 'MOL', country: 'Norway', league: 'eliteserien', founded: 1911, stadium: 'Aker Stadion', capacity: 11800, colors: { primary: '#0066CC', secondary: '#FFFFFF' } },
  { id: 'fc_copenhagen', name: 'FC Copenhagen', shortName: 'FCK', country: 'Denmark', league: 'superliga', founded: 1992, stadium: 'Parken Stadium', capacity: 38065, colors: { primary: '#FFFFFF', secondary: '#0066CC' } },
  { id: 'brondby', name: 'Brøndby IF', shortName: 'BRO', country: 'Denmark', league: 'superliga', founded: 1964, stadium: 'Brøndby Stadium', capacity: 29000, colors: { primary: '#FFD700', secondary: '#0066CC' } },
  { id: 'hjk_helsinki', name: 'HJK Helsinki', shortName: 'HJK', country: 'Finland', league: 'veikkausliiga', founded: 1907, stadium: 'Bolt Arena', capacity: 10770, colors: { primary: '#0066CC', secondary: '#FFFFFF' } }
];

export const getTeamsByLeague = (leagueId: string): Team[] => {
  return globalTeams.filter(team => team.league === leagueId);
};

export const getTeamsByCountry = (country: string): Team[] => {
  return globalTeams.filter(team => team.country === country);
};

export const searchTeams = (query: string): Team[] => {
  const lowercaseQuery = query.toLowerCase();
  return globalTeams.filter(team => 
    team.name.toLowerCase().includes(lowercaseQuery) ||
    team.shortName.toLowerCase().includes(lowercaseQuery) ||
    team.country.toLowerCase().includes(lowercaseQuery)
  );
};

export const getTeamById = (id: string): Team | undefined => {
  return globalTeams.find(team => team.id === id);
};