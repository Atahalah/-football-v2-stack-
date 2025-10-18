import { useState, useEffect } from 'react';
import { ModelBreakdown } from './components/ModelBreakdown';
import { ModelConfiguration } from './components/ModelConfiguration';
import { LeagueStats } from './components/LeagueStats';
import { LeagueSelector } from './components/LeagueSelector';
import { GlobalStats } from './components/GlobalStats';
import { TacticalInsights } from './components/TacticalInsights';
import { StrategicInsights } from './components/StrategicInsights';
import { DataTraining } from './components/DataTraining';
import { AdvancedAnalytics } from './components/AdvancedAnalytics';
import { PredictionDashboard } from './components/PredictionDashboard';
import { LiveMatches } from './components/LiveMatches';
import { BettingMarkets } from './components/BettingMarkets';
import { AIAssistant } from './components/AIAssistant';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/Tabs';
import { predictionService } from './services/PredictionService';
import { AIAssistantService } from './services/AIAssistantService';
import { mockMatches } from './data/mockData';
import { League } from './data/leagues';
import { Match, Prediction, ChatMessage } from './types';

function App() {
  const [selectedMatch] = useState<Match>(mockMatches[0]);
  const [selectedLeague, setSelectedLeague] = useState<League | undefined>();
  const [modelWeights, setModelWeights] = useState<Record<string, number>>({
    'Poisson Model': 0.2,
    'ELO Model': 0.15,
    'Machine Learning': 0.25,
    'Tactical Model': 0.15,
    'Strategic Model': 0.1,
    'Weather Model': 0.05,
    'Injury Model': 0.1
  });
  const [predictions, setPredictions] = useState<Record<string, Prediction>>({});
  const [tacticalInsights, setTacticalInsights] = useState<any>(null);
  const [strategicInsights, setStrategicInsights] = useState<any>(null);
  const [aiAssistantService] = useState(() => new AIAssistantService(predictionService));
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { sender: 'ai', text: "Hello! I'm your AI Assistant. How can I help you with this match?" }
  ]);

  const filteredMatches = selectedLeague
    ? mockMatches.filter(match => match.league === selectedLeague.name)
    : mockMatches;

  useEffect(() => {
    const newPredictions = predictionService.getModelPredictions(selectedMatch);
    setPredictions(newPredictions);

    const tactical = predictionService.getTacticalInsights(selectedMatch.homeTeam, selectedMatch.awayTeam);
    const strategic = predictionService.getStrategicInsights(selectedMatch.homeTeam, selectedMatch.awayTeam);
    setTacticalInsights(tactical);
    setStrategicInsights(strategic);
  }, [selectedMatch]);

  const handleSendMessage = async (message: string) => {
    const userMessage: ChatMessage = { sender: 'user', text: message };
    setChatMessages(prevMessages => [...prevMessages, userMessage]);

    const aiResponse = await aiAssistantService.getResponse(message, selectedMatch);
    const aiMessage: ChatMessage = { sender: 'ai', text: aiResponse };
    setChatMessages(prevMessages => [...prevMessages, aiMessage]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <Tabs defaultValue="predictions" className="space-y-6">
          <TabsList className="flex w-full overflow-x-auto whitespace-nowrap">
            <TabsTrigger value="predictions">Predictions</TabsTrigger>
            <TabsTrigger value="live">Live Matches</TabsTrigger>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="betting">Betting Markets</TabsTrigger>
            <TabsTrigger value="models">Model Analysis</TabsTrigger>
            <TabsTrigger value="config">Configuration</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
            <TabsTrigger value="tactical">Tactical</TabsTrigger>
            <TabsTrigger value="strategic">Strategic</TabsTrigger>
            <TabsTrigger value="leagues">Leagues</TabsTrigger>
            <TabsTrigger value="league-stats">League Stats</TabsTrigger>
            <TabsTrigger value="training">Data Training</TabsTrigger>
            <TabsTrigger value="ai-assistant">AI Assistant</TabsTrigger>
          </TabsList>

          <TabsContent value="predictions" className="space-y-6">
            <GlobalStats matches={filteredMatches} />
          </TabsContent>

          <TabsContent value="ai-assistant" className="space-y-6">
            <AIAssistant
              messages={chatMessages}
              onSendMessage={handleSendMessage}
            />
          </TabsContent>

          <TabsContent value="models" className="space-y-6">
            <ModelBreakdown predictions={predictions} />
          </TabsContent>

          <TabsContent value="config" className="space-y-6">
            <ModelConfiguration
              onWeightsChange={setModelWeights}
              currentWeights={modelWeights}
            />
          </TabsContent>

          <TabsContent value="tactical" className="space-y-6">
            <TacticalInsights
              homeTeam={selectedMatch.homeTeam}
              awayTeam={selectedMatch.awayTeam}
              insights={tacticalInsights}
            />
          </TabsContent>

          <TabsContent value="dashboard" className="space-y-6">
            <PredictionDashboard
              match={selectedMatch}
              predictions={predictions}
            />
          </TabsContent>

          <TabsContent value="live" className="space-y-6">
            <LiveMatches />
          </TabsContent>

          <TabsContent value="betting" className="space-y-6">
            <BettingMarkets
              match={selectedMatch}
              basePrediction={predictions['Machine Learning'] || predictions[Object.keys(predictions)[0]]}
            />
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6">
            <AdvancedAnalytics match={selectedMatch} />
          </TabsContent>

          <TabsContent value="strategic" className="space-y-6">
            <StrategicInsights
              homeTeam={selectedMatch.homeTeam}
              awayTeam={selectedMatch.awayTeam}
              insights={strategicInsights}
            />
          </TabsContent>

          <TabsContent value="leagues" className="space-y-6">
            <LeagueSelector
              onLeagueSelect={setSelectedLeague}
              selectedLeague={selectedLeague}
            />
          </TabsContent>

          <TabsContent value="league-stats" className="space-y-6">
            <LeagueStats selectedLeague={selectedLeague} />
          </TabsContent>

          <TabsContent value="training" className="space-y-6">
            <DataTraining />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default App;
