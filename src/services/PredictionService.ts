import { BaseModel } from '../models/BaseModel';
import { EnsembleModel } from '../models/EnsembleModel';
import { PoissonModel } from '../models/PoissonModel';
import { EloModel } from '../models/EloModel';
import { MachineLearningModel } from '../models/MachineLearningModel';
import { TacticalModel } from '../models/TacticalModel';
import { StrategicModel } from '../models/StrategicModel';
import { WeatherModel } from '../models/WeatherModel';
import { InjuryModel } from '../models/InjuryModel';
import { dataIngestionService } from '../data/dataIngestion';
import { Match, Prediction } from '../types';

export class PredictionService {
  private models: BaseModel[];
  private ensembleModel: EnsembleModel;
  private tacticalModel: TacticalModel;
  private strategicModel: StrategicModel;
  private weatherModel: WeatherModel;
  private injuryModel: InjuryModel;
  private isTrainedOnRealData: boolean = false;

  constructor() {
    this.models = [
      new PoissonModel(),
      new EloModel(),
      new MachineLearningModel()
    ];
    this.tacticalModel = new TacticalModel();
    this.strategicModel = new StrategicModel();
    this.weatherModel = new WeatherModel();
    this.injuryModel = new InjuryModel();
    this.ensembleModel = new EnsembleModel(this.models);
    this.checkTrainingStatus();
  }

  private async checkTrainingStatus(): Promise<void> {
    try {
      const status = await dataIngestionService.getTrainingStatus();
      this.isTrainedOnRealData = !!status?.lastTrained;
    } catch (error) {
      console.warn('Could not check training status:', error);
    }
  }

  getModelPredictions(match: Match): Record<string, Prediction> {
    const predictions: Record<string, Prediction> = {};

    this.models.forEach(model => {
      predictions[model.getName()] = model.predict(match);
    });

    predictions['Tactical Model'] = this.tacticalModel.predict(match);
    predictions['Strategic Model'] = this.strategicModel.predict(match);
    predictions['Weather Model'] = this.weatherModel.predict(match);
    predictions['Injury Model'] = this.injuryModel.predict(match);
    predictions['Ensemble'] = this.ensembleModel.predict(match);

    return predictions;
  }

  getTacticalInsights(homeTeam: string, awayTeam: string): any {
    return this.tacticalModel.analyzeTacticalMatchup(homeTeam, awayTeam);
  }

  getStrategicInsights(homeTeam: string, awayTeam: string): any {
    return this.strategicModel.analyzeStrategicMatchup(homeTeam, awayTeam);
  }

  updateModelWeights(weights: Record<string, number>): void {
    this.ensembleModel.setWeights(weights);
  }

  isUsingRealData(): boolean {
    return this.isTrainedOnRealData;
  }
}

export const predictionService = new PredictionService();
