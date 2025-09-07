"""
Free, non-commercial transformer baseline.
Uses Hugging-Face TabNet (MIT license) – no pre-trained weights, train from scratch.
"""
import os, joblib, numpy as np, pandas as pd
import torch, tabnet
from tabnet import TabNetClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import log_loss
import mlflow

DEVICE = "cuda" if torch.cuda.is_available() else "cpu"

class TransformerBaseline:
    def __init__(self, n_d=64, n_steps=3, lr=2e-2, max_epochs=200):
        self.scaler = StandardScaler()
        self.model = TabNetClassifier(
            n_d=n_d,
            n_steps=n_steps,
            n_independent=2,
            n_shared=2,
            gamma=1.3,
            n_classes=3,
            lr=lr,
            max_epochs=max_epochs,
            device_name=DEVICE,
            verbose=0,
        )

    # same interface as AdaptiveModel ---------------------------------
    def fit(self, X: pd.DataFrame, y: pd.Series):
        X = self.scaler.fit_transform(X)
        self.model.fit(X, y)
        joblib.dump(self.scaler, "models/transformer_scaler.pkl")
        joblib.dump(self.model, "models/transformer_model.pkl")
        mlflow.sklearn.log_model(self.model, "transformer_model")

    def predict_proba(self, X: pd.DataFrame):
        X = self.scaler.transform(X)
        return self.model.predict_proba(X)

    # convenience wrapper
    def predict_one(self, home_form: float, market_margin: float, home_implied: float):
        X = np.array([[home_form, market_margin, home_implied]])
        prob = self.predict_proba(X)[0]
        return {"home": round(prob[2], 3), "draw": round(prob[1], 3), "away": round(prob[0], 3)}
