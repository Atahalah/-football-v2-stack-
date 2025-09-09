@@ .. @@
 import { 
   PoissonModel, 
   EloModel, 
   MachineLearningModel, 
-  EnsembleModel 
+  EnsembleModel,
+  TacticalModel,
+  StrategicModel
 } from '../models';
 import { mockMatches, mockTeamStats } from '../data/mockData';
 import { Match, Prediction, TeamStats } from '../types';
@@ .. @@
   private eloModel: EloModel;
   private mlModel: MachineLearningModel;
   private ensembleModel: EnsembleModel;
+  private tacticalModel: TacticalModel;
+  private strategicModel: StrategicModel;
 
   constructor() {
     this.poissonModel = new PoissonModel();
     this.eloModel = new EloModel();
     this.mlModel = new MachineLearningModel();
+    this.tacticalModel = new TacticalModel();
+    this.strategicModel = new StrategicModel();
     
     // Initialize ensemble with all models
-    this.ensembleModel = new EnsembleModel([
+    this.ensembleModel = new EnsembleModel([
       this.poissonModel,
       this.eloModel,
-      this.mlModel
+      this.mlModel,
+      this.tacticalModel,
+      this.strategicModel
     ]);
   }
@@ .. @@
   getModelPredictions(match: Match): Record<string, Prediction> {
     return {
       'Poisson Distribution': this.poissonModel.predict(match),
       'Elo Rating': this.eloModel.predict(match),
       'Random Forest': this.mlModel.predict(match, 'randomForest'),
       'Neural Network': this.mlModel.predict(match, 'neuralNetwork'),
       'XGBoost': this.mlModel.predict(match, 'xgboost'),
       'Logistic Regression': this.mlModel.predict(match, 'logisticRegression'),
       'SVM': this.mlModel.predict(match, 'svm'),
+      'Tactical Analysis': this.tacticalModel.predict(match),
+      'Strategic Analysis': this.strategicModel.predict(match),
       'Ensemble': this.ensembleModel.predict(match)
     };
   }
@@ .. @@
   getAvailableModels(): string[] {
     return [
       'Poisson Distribution',
       'Elo Rating', 
       'Random Forest',
       'Neural Network',
       'XGBoost',
       'Logistic Regression',
       'SVM',
+      'Tactical Analysis',
+      'Strategic Analysis',
       'Ensemble'
     ];
   }
+
+  getTacticalInsights(homeTeam: string, awayTeam: string): any {
+    return this.tacticalModel.getTacticalInsights(homeTeam, awayTeam);
+  }
+
+  getStrategicInsights(homeTeam: string, awayTeam: string): any {
+    return this.strategicModel.getStrategicInsights(homeTeam, awayTeam);
+  }
 }