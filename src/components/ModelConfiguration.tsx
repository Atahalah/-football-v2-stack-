import React, { useState } from 'react';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { 
  Settings, 
  Sliders, 
  RotateCcw, 
  Save,
  AlertTriangle,
  Info,
  TrendingUp,
  Target
} from 'lucide-react';

interface ModelConfigurationProps {
  onWeightsChange: (weights: Record<string, number>) => void;
  currentWeights: Record<string, number>;
}

export const ModelConfiguration: React.FC<ModelConfigurationProps> = ({
  onWeightsChange,
  currentWeights
}) => {
  const [weights, setWeights] = useState(currentWeights);
  const [presetMode, setPresetMode] = useState<'balanced' | 'conservative' | 'aggressive' | 'custom'>('balanced');

  const modelDescriptions = {
    'Poisson Model': {
      description: 'Statistical analysis of goal scoring patterns',
      bestFor: 'Over/Under goals predictions',
      defaultWeight: 0.2
    },
    'ELO Model': {
      description: 'Dynamic team strength ratings',
      bestFor: 'Head-to-head comparisons',
      defaultWeight: 0.15
    },
    'Machine Learning': {
      description: 'AI pattern recognition and prediction',
      bestFor: 'Complex multi-factor analysis',
      defaultWeight: 0.25
    },
    'Tactical Model': {
      description: 'Formation and playing style analysis',
      bestFor: 'Style clash predictions',
      defaultWeight: 0.15
    },
    'Strategic Model': {
      description: 'Motivation and context factors',
      bestFor: 'High-stakes matches',
      defaultWeight: 0.1
    },
    'Weather Model': {
      description: 'Environmental impact analysis',
      bestFor: 'Outdoor conditions',
      defaultWeight: 0.05
    },
    'Injury Model': {
      description: 'Player availability impact',
      bestFor: 'Key player absences',
      defaultWeight: 0.1
    }
  };

  const presets = {
    balanced: {
      name: 'Balanced',
      description: 'Equal weighting across all models',
      weights: Object.keys(modelDescriptions).reduce((acc, key) => {
        acc[key] = 1 / Object.keys(modelDescriptions).length;
        return acc;
      }, {} as Record<string, number>)
    },
    conservative: {
      name: 'Conservative',
      description: 'Favor statistical and historical models',
      weights: {
        'Poisson Model': 0.3,
        'ELO Model': 0.25,
        'Machine Learning': 0.2,
        'Tactical Model': 0.1,
        'Strategic Model': 0.05,
        'Weather Model': 0.05,
        'Injury Model': 0.05
      }
    },
    aggressive: {
      name: 'Aggressive',
      description: 'Emphasize AI and contextual factors',
      weights: {
        'Machine Learning': 0.35,
        'Tactical Model': 0.2,
        'Strategic Model': 0.15,
        'Injury Model': 0.1,
        'Weather Model': 0.1,
        'Poisson Model': 0.05,
        'ELO Model': 0.05
      }
    }
  };

  const handleWeightChange = (model: string, value: number) => {
    const newWeights = { ...weights, [model]: value / 100 };
    setWeights(newWeights);
    setPresetMode('custom');
  };

  const applyPreset = (preset: keyof typeof presets) => {
    const presetWeights = presets[preset].weights;
    setWeights(presetWeights);
    setPresetMode(preset);
    onWeightsChange(presetWeights);
  };

  const resetToDefaults = () => {
    const defaultWeights = Object.entries(modelDescriptions).reduce((acc, [key, info]) => {
      acc[key] = info.defaultWeight;
      return acc;
    }, {} as Record<string, number>);
    
    setWeights(defaultWeights);
    setPresetMode('custom');
    onWeightsChange(defaultWeights);
  };

  const saveConfiguration = () => {
    onWeightsChange(weights);
    localStorage.setItem('modelWeights', JSON.stringify(weights));
  };

  const totalWeight = Object.values(weights).reduce((sum, weight) => sum + weight, 0);
  const isNormalized = Math.abs(totalWeight - 1) < 0.01;

  return (
    <div className="space-y-6">
      {/* Preset Selection */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Model Configuration Presets
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {Object.entries(presets).map(([key, preset]) => (
            <Card 
              key={key}
              className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                presetMode === key ? 'ring-2 ring-blue-500 bg-blue-50' : ''
              }`}
              onClick={() => applyPreset(key as keyof typeof presets)}
            >
              <div className="text-center">
                <h4 className="font-medium mb-2">{preset.name}</h4>
                <p className="text-sm text-gray-600 mb-3">{preset.description}</p>
                <Button
                  variant={presetMode === key ? "default" : "outline"}
                  size="sm"
                  className="w-full"
                >
                  {presetMode === key ? 'Active' : 'Apply'}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Info className="w-4 h-4" />
          <span>Choose a preset or customize individual model weights below</span>
        </div>
      </Card>

      {/* Weight Configuration */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Sliders className="w-5 h-5" />
            Individual Model Weights
          </h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={resetToDefaults}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button size="sm" onClick={saveConfiguration}>
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </div>

        {!isNormalized && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center gap-2 text-yellow-800">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm">
                Total weight: {(totalWeight * 100).toFixed(1)}% (should equal 100%)
              </span>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {Object.entries(modelDescriptions).map(([modelName, info]) => {
            const weight = weights[modelName] || 0;
            return (
              <div key={modelName} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-medium">{modelName}</span>
                    <div className="text-sm text-gray-600">{info.description}</div>
                  </div>
                  <Badge variant="outline">
                    {(weight * 100).toFixed(1)}%
                  </Badge>
                </div>
                
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={weight * 100}
                    onChange={(e) => handleWeightChange(modelName, Number(e.target.value))}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <input
                    type="number"
                    min="0"
                    max="50"
                    step="0.1"
                    value={(weight * 100).toFixed(1)}
                    onChange={(e) => handleWeightChange(modelName, Number(e.target.value))}
                    className="w-16 px-2 py-1 text-sm border border-gray-300 rounded"
                  />
                </div>
                
                <div className="text-xs text-gray-500 flex items-center gap-1">
                  <Target className="w-3 h-3" />
                  Best for: {info.bestFor}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Configuration Summary */}
      <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-green-600" />
          Configuration Summary
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium mb-2">Active Configuration</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Preset Mode:</span>
                <Badge className="capitalize">{presetMode}</Badge>
              </div>
              <div className="flex justify-between">
                <span>Total Weight:</span>
                <span className={isNormalized ? 'text-green-600' : 'text-red-600'}>
                  {(totalWeight * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span>Active Models:</span>
                <span>{Object.values(weights).filter(w => w > 0).length}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Top Weighted Models</h4>
            <div className="space-y-1 text-sm">
              {Object.entries(weights)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 3)
                .map(([model, weight]) => (
                  <div key={model} className="flex justify-between">
                    <span>{model}:</span>
                    <span className="font-medium">{(weight * 100).toFixed(1)}%</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};