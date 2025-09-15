import React, { useState, useEffect } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { 
  Database, 
  Download, 
  RefreshCw, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  BarChart3,
  Globe,
  Shield
} from 'lucide-react';
import { dataIngestionService, FREE_DATA_SOURCES } from '../data/dataIngestion';

export const DataTraining: React.FC = () => {
  const [isTraining, setIsTraining] = useState(false);
  const [trainingStatus, setTrainingStatus] = useState<any>(null);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    loadTrainingStatus();
  }, []);

  const loadTrainingStatus = async () => {
    try {
      const status = await dataIngestionService.getTrainingStatus();
      setTrainingStatus(status);
      if (status?.lastTrained) {
        setLastRefresh(new Date(status.lastTrained));
      }
    } catch (error) {
      console.error('Error loading training status:', error);
    }
  };

  const handleRefreshData = async () => {
    setIsTraining(true);
    setProgress(0);

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + Math.random() * 15;
        });
      }, 500);

      await dataIngestionService.refreshData();
      
      clearInterval(progressInterval);
      setProgress(100);
      
      // Reload status
      await loadTrainingStatus();
      setLastRefresh(new Date());
      
      setTimeout(() => {
        setIsTraining(false);
        setProgress(0);
      }, 1000);
      
    } catch (error) {
      console.error('Error refreshing data:', error);
      setIsTraining(false);
      setProgress(0);
    }
  };

  const getLicenseColor = (license: string) => {
    if (license.includes('CC')) return 'bg-green-100 text-green-800';
    if (license.includes('Free')) return 'bg-blue-100 text-blue-800';
    if (license.includes('Public')) return 'bg-purple-100 text-purple-800';
    return 'bg-gray-100 text-gray-800';
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  return (
    <div className="space-y-6">
      {/* Training Status Overview */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Database className="w-5 h-5" />
            Model Training Status
          </h2>
          <Button
            onClick={handleRefreshData}
            disabled={isTraining}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${isTraining ? 'animate-spin' : ''}`} />
            {isTraining ? 'Training...' : 'Refresh Data'}
          </Button>
        </div>

        {isTraining && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Training Progress</span>
              <span className="text-sm font-medium">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {trainingStatus ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">
                {trainingStatus.samplesCount?.toLocaleString() || '0'}
              </div>
              <div className="text-sm text-gray-600">Training Samples</div>
            </div>
            
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <BarChart3 className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">
                {trainingStatus.features?.length || 0}
              </div>
              <div className="text-sm text-gray-600">Features</div>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-sm font-medium text-purple-600">
                {lastRefresh ? formatTimeAgo(lastRefresh) : 'Never'}
              </div>
              <div className="text-sm text-gray-600">Last Updated</div>
            </div>
          </div>
        ) : (
          <div className="text-center p-8 bg-gray-50 rounded-lg">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Training Data</h3>
            <p className="text-gray-600 mb-4">
              Click "Refresh Data" to fetch free football data and train the models
            </p>
          </div>
        )}
      </Card>

      {/* Data Sources */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Globe className="w-5 h-5" />
          Free Data Sources
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FREE_DATA_SOURCES.map((source, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium">{source.name}</h4>
                <Badge className={getLicenseColor(source.license)} size="sm">
                  {source.license}
                </Badge>
              </div>
              
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-3 h-3" />
                  <span>Updates: {source.updateFrequency}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Database className="w-3 h-3" />
                  <span>Format: {source.format.toUpperCase()}</span>
                </div>
              </div>
              
              <div className="mt-3">
                <div className="text-xs text-gray-500 mb-1">Coverage:</div>
                <div className="flex flex-wrap gap-1">
                  {source.coverage.slice(0, 3).map((league, idx) => (
                    <Badge key={idx} variant="outline" size="sm">
                      {league}
                    </Badge>
                  ))}
                  {source.coverage.length > 3 && (
                    <Badge variant="outline" size="sm">
                      +{source.coverage.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Training Features */}
      {trainingStatus?.features && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Training Features</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {trainingStatus.features.map((feature: string, index: number) => (
              <Badge key={index} variant="outline" className="justify-center">
                {feature}
              </Badge>
            ))}
          </div>
        </Card>
      )}

      {/* Legal Notice */}
      <Card className="p-4 bg-blue-50 border-blue-200">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900 mb-1">Non-Commercial Use Only</h4>
            <p className="text-sm text-blue-800">
              This system uses free, publicly available football data for research and educational purposes only. 
              All data sources are properly attributed and used in accordance with their respective licenses. 
              Commercial use requires appropriate licensing from data providers.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};