@@ .. @@
 import { ModelBreakdown } from './components/ModelBreakdown';
 import { ModelConfiguration } from './components/ModelConfiguration';
 import { LeagueStats } from './components/LeagueStats';
import { LeagueSelector } from './components/LeagueSelector';
import { GlobalStats } from './components/GlobalStats';
+import { TacticalInsights } from './components/TacticalInsights';
+import { StrategicInsights } from './components/StrategicInsights';
 import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/Tabs';
 import { predictionService } from './services/PredictionService';
 import { mockMatches } from './data/mockData';
import { League } from './data/leagues';
@@ .. @@
   const [selectedMatch, setSelectedMatch] = useState<Match>(mockMatches[0]);
  const [selectedLeague, setSelectedLeague] = useState<League | undefined>();
   const [modelWeights, setModelWeights] = useState<Record<string, number>>({});
   const [predictions, setPredictions] = useState<Record<string, Prediction>>({});
+  const [tacticalInsights, setTacticalInsights] = useState<any>(null);
+  const [strategicInsights, setStrategicInsights] = useState<any>(null);
 
  const filteredMatches = selectedLeague 
    ? mockMatches.filter(match => match.league === selectedLeague.name)
    : mockMatches;

   useEffect(() => {
     const newPredictions = predictionService.getModelPredictions(selectedMatch);
     setPredictions(newPredictions);
+    
+    // Get tactical and strategic insights
+    const tactical = predictionService.getTacticalInsights(selectedMatch.homeTeam, selectedMatch.awayTeam);
+    const strategic = predictionService.getStrategicInsights(selectedMatch.homeTeam, selectedMatch.awayTeam);
+    setTacticalInsights(tactical);
+    setStrategicInsights(strategic);
   }, [selectedMatch]);
@@ .. @@
             <TabsList className="grid w-full grid-cols-4">
               <TabsTrigger value="predictions">Predictions</TabsTrigger>
               <TabsTrigger value="models">Model Analysis</TabsTrigger>
+              <TabsTrigger value="tactical">Tactical</TabsTrigger>
+              <TabsTrigger value="strategic">Strategic</TabsTrigger>
-              <TabsTrigger value="configuration">Configuration</TabsTrigger>
-              <TabsTrigger value="stats">League Stats</TabsTrigger>
             </TabsList>
@@ .. @@
             <TabsContent value="models" className="space-y-6">
               <ModelBreakdown predictions={predictions} />
             </TabsContent>
             
-            <TabsContent value="configuration" className="space-y-6">
-              <ModelConfiguration 
-                models={predictionService.getAvailableModels()}
-                weights={modelWeights}
-                onWeightsChange={setModelWeights}
-              />
+            <TabsContent value="tactical" className="space-y-6">
+              <TacticalInsights 
+                homeTeam={selectedMatch.homeTeam}
+                awayTeam={selectedMatch.awayTeam}
+                insights={tacticalInsights}
+              />
             </TabsContent>
             
-            <TabsContent value="stats" className="space-y-6">
-              <LeagueStats />
+            <TabsContent value="strategic" className="space-y-6">
+              <StrategicInsights 
+                homeTeam={selectedMatch.homeTeam}
+                awayTeam={selectedMatch.awayTeam}
+                insights={strategicInsights}
+              />
             </TabsContent>
            
            <TabsContent value="leagues" className="space-y-6">
              <LeagueSelector 
                onLeagueSelect={setSelectedLeague}
                selectedLeague={selectedLeague}
              />
            </TabsContent>
            
            <TabsContent value="global" className="space-y-6">
              <GlobalStats />
            </TabsContent>
           </Tabs>
         </div>