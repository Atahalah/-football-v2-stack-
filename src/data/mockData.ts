@@ .. @@
 import { Match, TeamStats } from '../types';
+import { globalTeams, getTeamsByLeague } from './globalTeams';
+import { globalLeagues } from './leagues';
 
-export const mockMatches: Match[] = [
-  {
-    id: '1',
-    homeTeam: 'Manchester City',
-    awayTeam: 'Arsenal',
-    date: new Date('2024-01-15T15:00:00'),
-    league: 'Premier League',
-    homeOdds: 1.85,
-    drawOdds: 3.40,
-    awayOdds: 4.20
-  },
-  {
-    id: '2',
-    homeTeam: 'Liverpool',
-    awayTeam: 'Chelsea',
-    date: new Date('2024-01-15T17:30:00'),
-    league: 'Premier League',
-    homeOdds: 2.10,
-    drawOdds: 3.20,
-    awayOdds: 3.50
-  },
-  {
-    id: '3',
-    homeTeam: 'Real Madrid',
-    awayTeam: 'Barcelona',
-    date: new Date('2024-01-16T20:00:00'),
-    league: 'La Liga',
-    homeOdds: 2.25,
-    drawOdds: 3.10,
-    awayOdds: 3.20
-  },
-  {
-    id: '4',
-    homeTeam: 'Bayern Munich',
-    awayTeam: 'Borussia Dortmund',
-    date: new Date('2024-01-17T18:30:00'),
-    league: 'Bundesliga',
-    homeOdds: 1.95,
-    drawOdds: 3.60,
-    awayOdds: 3.80
-  },
-  {
-    id: '5',
-    homeTeam: 'Inter Milan',
-    awayTeam: 'Juventus',
-    date: new Date('2024-01-18T20:45:00'),
-    league: 'Serie A',
-    homeOdds: 2.40,
-    drawOdds: 3.00,
-    awayOdds: 3.10
-  }
-];
+// Generate matches from global teams data
+export const generateMockMatches = (): Match[] => {
+  const matches: Match[] = [];
+  let matchId = 1;
+
+  // Get top leagues for generating matches
+  const topLeagues = globalLeagues.filter(league => league.tier === 1).slice(0, 20);
+
+  topLeagues.forEach(league => {
+    const teams = getTeamsByLeague(league.id);
+    if (teams.length >= 2) {
+      // Generate a few matches for each league
+      const numMatches = Math.min(5, Math.floor(teams.length / 2));
+      
+      for (let i = 0; i < numMatches; i++) {
+        const homeTeam = teams[i * 2];
+        const awayTeam = teams[i * 2 + 1];
+        
+        if (homeTeam && awayTeam) {
+          // Generate realistic odds based on team strength simulation
+          const homeStrength = 0.4 + Math.random() * 0.4; // 0.4 to 0.8
+          const awayStrength = 0.4 + Math.random() * 0.4;
+          const homeAdvantage = 0.1;
+          
+          const totalStrength = homeStrength + homeAdvantage + awayStrength;
+          const homeWinProb = (homeStrength + homeAdvantage) / totalStrength;
+          const awayWinProb = awayStrength / totalStrength;
+          const drawProb = 1 - homeWinProb - awayWinProb;
+          
+          // Convert probabilities to odds
+          const homeOdds = Math.max(1.1, 1 / homeWinProb);
+          const drawOdds = Math.max(2.5, 1 / drawProb);
+          const awayOdds = Math.max(1.1, 1 / awayWinProb);
+          
+          // Generate match date (next 30 days)
+          const matchDate = new Date();
+          matchDate.setDate(matchDate.getDate() + Math.floor(Math.random() * 30));
+          matchDate.setHours(14 + Math.floor(Math.random() * 8), Math.floor(Math.random() * 60));
+          
+          matches.push({
+            id: matchId.toString(),
+            homeTeam: homeTeam.name,
+            awayTeam: awayTeam.name,
+            date: matchDate,
+            league: league.name,
+            homeOdds: Math.round(homeOdds * 100) / 100,
+            drawOdds: Math.round(drawOdds * 100) / 100,
+            awayOdds: Math.round(awayOdds * 100) / 100
+          });
+          
+          matchId++;
+        }
+      }
+    }
+  });
+
+  return matches.sort((a, b) => a.date.getTime() - b.date.getTime());
+};
+
+export const mockMatches: Match[] = generateMockMatches();
 
 export const mockTeamStats: Record<string, TeamStats> = {
   'Manchester City': {
@@ -78,6 +125,106 @@ export const mockTeamStats: Record<string, TeamStats> = {
     defensiveRating: 85,
     form: [1, 1, 0, 1, 1],
     homeRecord: { wins: 8, draws: 2, losses: 1 },
     awayRecord: { wins: 6, draws: 3, losses: 2 }
+  },
+  'Real Madrid': {
+    attackingRating: 92,
+    defensiveRating: 88,
+    form: [1, 1, 1, 0, 1],
+    homeRecord: { wins: 10, draws: 1, losses: 0 },
+    awayRecord: { wins: 7, draws: 2, losses: 2 }
+  },
+  'Barcelona': {
+    attackingRating: 89,
+    defensiveRating: 82,
+    form: [1, 0, 1, 1, 1],
+    homeRecord: { wins: 9, draws: 2, losses: 0 },
+    awayRecord: { wins: 6, draws: 3, losses: 2 }
+  },
+  'Bayern Munich': {
+    attackingRating: 91,
+    defensiveRating: 86,
+    form: [1, 1, 1, 1, 0],
+    homeRecord: { wins: 9, draws: 1, losses: 1 },
+    awayRecord: { wins: 8, draws: 2, losses: 1 }
+  },
+  'Borussia Dortmund': {
+    attackingRating: 84,
+    defensiveRating: 79,
+    form: [1, 0, 1, 1, 0],
+    homeRecord: { wins: 7, draws: 3, losses: 1 },
+    awayRecord: { wins: 5, draws: 2, losses: 4 }
+  },
+  'Inter Milan': {
+    attackingRating: 86,
+    defensiveRating: 88,
+    form: [1, 1, 0, 1, 1],
+    homeRecord: { wins: 8, draws: 2, losses: 1 },
+    awayRecord: { wins: 6, draws: 4, losses: 1 }
+  },
+  'Juventus': {
+    attackingRating: 82,
+    defensiveRating: 85,
+    form: [0, 1, 1, 0, 1],
+    homeRecord: { wins: 7, draws: 3, losses: 1 },
+    awayRecord: { wins: 5, draws: 3, losses: 3 }
+  },
+  'Paris Saint-Germain': {
+    attackingRating: 90,
+    defensiveRating: 83,
+    form: [1, 1, 1, 0, 1],
+    homeRecord: { wins: 9, draws: 1, losses: 1 },
+    awayRecord: { wins: 7, draws: 2, losses: 2 }
+  },
+  'Olympique de Marseille': {
+    attackingRating: 78,
+    defensiveRating: 76,
+    form: [1, 0, 1, 0, 1],
+    homeRecord: { wins: 6, draws: 3, losses: 2 },
+    awayRecord: { wins: 4, draws: 3, losses: 4 }
+  },
+  'Los Angeles FC': {
+    attackingRating: 81,
+    defensiveRating: 77,
+    form: [1, 1, 0, 1, 1],
+    homeRecord: { wins: 8, draws: 2, losses: 2 },
+    awayRecord: { wins: 5, draws: 4, losses: 3 }
+  },
+  'LA Galaxy': {
+    attackingRating: 79,
+    defensiveRating: 74,
+    form: [1, 0, 1, 1, 0],
+    homeRecord: { wins: 7, draws: 3, losses: 2 },
+    awayRecord: { wins: 4, draws: 3, losses: 5 }
+  },
+  'CR Flamengo': {
+    attackingRating: 87,
+    defensiveRating: 81,
+    form: [1, 1, 1, 0, 1],
+    homeRecord: { wins: 9, draws: 2, losses: 1 },
+    awayRecord: { wins: 6, draws: 3, losses: 3 }
+  },
+  'SE Palmeiras': {
+    attackingRating: 85,
+    defensiveRating: 83,
+    form: [1, 1, 0, 1, 1],
+    homeRecord: { wins: 8, draws: 3, losses: 1 },
+    awayRecord: { wins: 7, draws: 2, losses: 3 }
+  },
+  'Al Hilal': {
+    attackingRating: 83,
+    defensiveRating: 79,
+    form: [1, 1, 1, 1, 0],
+    homeRecord: { wins: 9, draws: 1, losses: 1 },
+    awayRecord: { wins: 6, draws: 3, losses: 2 }
+  },
+  'Al Nassr': {
+    attackingRating: 86,
+    defensiveRating: 76,
+    form: [1, 0, 1, 1, 1],
+    homeRecord: { wins: 8, draws: 2, losses: 1 },
+    awayRecord: { wins: 5, draws: 4, losses: 2 }
   }
 };
+
+// Generate team stats for all teams in the system
+export const generateTeamStats = (): Record<string, TeamStats> => {
+  const stats: Record<string, TeamStats> = { ...mockTeamStats };
+  
+  globalTeams.forEach(team => {
+    if (!stats[team.name]) {
+      // Generate realistic stats based on league tier
+      const league = globalLeagues.find(l => l.id === team.league);
+      const tierMultiplier = league ? Math.max(0.6, 1.1 - (league.tier * 0.1)) : 0.8;
+      
+      const baseAttacking = 60 + Math.random() * 30;
+      const baseDefensive = 60 + Math.random() * 30;
+      
+      stats[team.name] = {
+        attackingRating: Math.round(baseAttacking * tierMultiplier),
+        defensiveRating: Math.round(baseDefensive * tierMultiplier),
+        form: Array.from({ length: 5 }, () => Math.random() > 0.4 ? 1 : 0),
+        homeRecord: {
+          wins: Math.floor(Math.random() * 12),
+          draws: Math.floor(Math.random() * 6),
+          losses: Math.floor(Math.random() * 6)
+        },
+        awayRecord: {
+          wins: Math.floor(Math.random() * 10),
+          draws: Math.floor(Math.random() * 6),
+          losses: Math.floor(Math.random() * 8)
+        }
+      };
+    }
+  });
+  
+  return stats;
+};
+
+export const allTeamStats = generateTeamStats();