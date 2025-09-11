import { BaseModel } from '../models/BaseModel';
import { EnsembleModel } from '../models/EnsembleModel';
import { TacticalModel } from '../models/TacticalModel';
import { StrategicModel } from '../models/StrategicModel';
import { dataIngestionService } from '../data/dataIngestion';

export class PredictionService {
  private models: BaseModel[];
  private ensembleModel: EnsembleModel;
  private tacticalModel: TacticalModel;
  private strategicModel: StrategicModel;
  private isTrainedOnRealData: boolean = false;

  constructor() {
    this.models = [];
    this.tacticalModel = new TacticalModel();
    this.strategicModel = new StrategicModel();
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