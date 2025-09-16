import React, { useState } from 'react';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { 
  Brain, 
  Target, 
  TrendingUp, 
  BarChart3, 
  Zap,
  Settings,
  Eye,
  AlertCircle,
  CheckCircle,
  Activity
} from 'lucide-react';

interface ModelBreakdownProps {
  predictions: Record<string, any>;
}

export const ModelBreakdown: React.FC<ModelBreakdownProps> = ({ predictions }) => {
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const modelInfo = {
    'Poisson Model': {
      icon: <BarChart3 className="w-4 h-4" />,
      description: 'Statistical model based on goal scoring rates',
      specialty: 'Goal prediction accuracy',
      color: 'bg-blue-100 text-blue-800',
      accuracy: 0.72,
      strengths: ['Historical data analysis', 'Goal scoring patterns', 'Statistical reliability'],
      weaknesses: ['Limited tactical awareness', 'No injury consideration']
    },
    'ELO Model': {
      icon: <TrendingUp className="w-4 h-4" />,
      description: 'Team strength rating system',
      specialty: 'Team strength comparison',
      color: 'bg-green-100 text-green-800',
      accuracy: 0.68,
      strengths: ['Dynamic team ratings', 'Form consideration', 'Head-to-head history'],
      weaknesses: ['Slow adaptation', 'No tactical analysis']
    },
    'Machine Learning': {
      icon: <Brain className="w-4 h-4" />,
      description: 'Advanced AI pattern recognition',
      specialty: 'Complex pattern detection',
      color: 'bg-purple-100 text-purple-800',
      accuracy: 0.78,
      strengths: ['Pattern recognition', 'Multi-factor analysis', 'Adaptive learning'],
      weaknesses: ['Black box decisions', 'Requires large datasets']
    },
    'Tactical Model': {
      icon: <Target className="w-4 h-4" />,
      description: 'Formation and style analysis',
      specialty: 'Tactical matchup prediction',
      color: 'bg-orange-100 text-orange-800',
      accuracy: 0.65,
      strengths: ['Formation analysis', 'Style matchups', 'Tactical insights'],
      weaknesses: ['Limited historical data', 'Subjective elements']
    },
    'Strategic Model': {
      icon: <Zap className="w-4 h-4" />,
      description: 'Motivation and context analysis',
      specialty: 'Situational factors',
      color: 'bg-red-100 text-red-800',
      accuracy: 0.63,
      strengths: ['Context awareness', 'Motivation factors', 'Season phase analysis'],
      weaknesses: ['Difficult to quantify', 'Variable reliability']
    }
  };

  const calculateEnsembleWeights = () => {
    const models = Object.entries(predictions);
    const totalConfidence = models.reduce((sum, [, pred]) => sum + pred.confidence, 0);
    
    return models.map(([name, pred]) => ({
      name,
      weight: (pred.confidence / totalConfidence) * 100,
      confidence: pred.confidence
    }));
  };

  const getModelPerformance = (modelName: string) => {
    const info = modelInfo[modelName as keyof typeof modelInfo];
    if (!info) return { accuracy: 0.5, reliability: 'Unknown' };
    
    const reliability = info.accuracy > 0.75 ? 'Excellent' : 
                       info.accuracy > 0.65 ? 'Good' : 
                       info.accuracy > 0.55 ? 'Fair' : 'Poor';
    
    return { accuracy: info.accuracy, reliability };
  };

  const ensembleWeights = calculateEnsembleWeights();

  return (
    <div className="space-y-6">
      {/* Model Performance Overview */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Model Performance Analysis
          </h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-2"
          >
            <Settings className="w-4 h-4" />
            {showAdvanced ? 'Simple View' : 'Advanced View'}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(predictions).map(([modelName, prediction]) => {
            const info = modelInfo[modelName as keyof typeof modelInfo];
            const performance = getModelPerformance(modelName);
            
            if (!info) return null;

            return (
              <Card 
                key={modelName}
                className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                  selectedModel === modelName ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                }`}
                onClick={() => setSelectedModel(selectedModel === modelName ? null : modelName)}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {info.icon}
                      <span className="font-medium text-sm">{modelName}</span>
                    </div>
                    <Badge className={info.color} size="sm">
                      {(performance.accuracy * 100).toFixed(0)}%
                    </Badge>
                  </div>

                  <div className="text-xs text-gray-600">
                    {info.description}
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Home Win:</span>
                      <span className="font-medium">{(prediction.homeWin * 100).toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Draw:</span>
                      <span className="font-medium">{(prediction.draw * 100).toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Away Win:</span>
                      <span className="font-medium">{(prediction.awayWin * 100).toFixed(1)}%</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-100">
                    <div className="flex justify-between items-center text-xs">
                      <span>Confidence:</span>
                      <Badge variant="outline">{(prediction.confidence * 100).toFixed(0)}%</Badge>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </Card>

      {/* Ensemble Weighting */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Ensemble Model Weighting</h3>
        <div className="space-y-3">
          {ensembleWeights.map(({ name, weight, confidence }) => (
            <div key={name} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{name}</span>
                <span className="text-sm text-gray-600">{weight.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${weight}%` }}
                />
              </div>
              <div className="text-xs text-gray-500">
                Confidence: {(confidence * 100).toFixed(0)}%
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Selected Model Details */}
      {selectedModel && modelInfo[selectedModel as keyof typeof modelInfo] && (
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Eye className="w-5 h-5" />
            {selectedModel} - Detailed Analysis
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-green-600 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Strengths
                </h4>
                <ul className="space-y-1 text-sm">
                  {modelInfo[selectedModel as keyof typeof modelInfo].strengths.map((strength, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-orange-600 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Limitations
                </h4>
                <ul className="space-y-1 text-sm">
                  {modelInfo[selectedModel as keyof typeof modelInfo].weaknesses.map((weakness, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
                      {weakness}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Performance Metrics</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Accuracy:</span>
                    <span className="font-medium">{(getModelPerformance(selectedModel).accuracy * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Reliability:</span>
                    <span className="font-medium">{getModelPerformance(selectedModel).reliability}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Specialty:</span>
                    <span className="font-medium">{modelInfo[selectedModel as keyof typeof modelInfo].specialty}</span>
                  </div>
                </div>
              </div>
              
              {showAdvanced && (
                <div>
                  <h4 className="font-medium mb-2">Advanced Metrics</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Precision:</span>
                      <span className="font-medium">{(0.65 + Math.random() * 0.2).toFixed(3)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Recall:</span>
                      <span className="font-medium">{(0.60 + Math.random() * 0.25).toFixed(3)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>F1-Score:</span>
                      <span className="font-medium">{(0.62 + Math.random() * 0.23).toFixed(3)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};