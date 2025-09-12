import { BaseModel } from './BaseModel';
import { Match, Prediction } from '../types';

export interface MarketData {
  homeOdds: number;
  drawOdds: number;
  awayOdds: number;
  volume: number; // Betting volume
  movement: 'rising' | 'falling' | 'stable';
  sharpMoney: number; // Professional bettor activity
  publicMoney: number; // Casual bettor activity
}

export class MarketModel extends BaseModel {
  constructor() {
    super('Betting Market Analysis');
  }

  private oddsToImpliedProbability(odds: number): number {
    return 1 / odds;
  }

  private calculateMarketEfficiency(market: MarketData): number {
    const homeProb = this.oddsToImpliedProbability(market.homeOdds);
    const drawProb = this.oddsToImpliedProbability(market.drawOdds);
    const awayProb = this.oddsToImpliedProbability(market.awayOdds);
    
    const totalProb = homeProb + drawProb + awayProb;
    const overround = totalProb - 1; // Market margin
    
    return Math.max(0, 1 - overround); // Efficiency score
  }

  private adjustForMarketBias(market: MarketData): {
    homeAdjustment: number;
    drawAdjustment: number;
    awayAdjustment: number;
  } {
    let homeAdjustment = 0;
    let drawAdjustment = 0;
    let awayAdjustment = 0;

    // Sharp money vs public money analysis
    const sharpRatio = market.sharpMoney / (market.sharpMoney + market.publicMoney);
    
    if (sharpRatio > 0.7) {
      // Sharp money dominance - market is likely efficient
      // No major adjustments needed
    } else if (sharpRatio < 0.3) {
      // Public money dominance - potential biases
      // Public tends to overbet favorites and overs
      if (market.homeOdds < 2.0) {
        homeAdjustment -= 0.05; // Reduce overbet favorite
        awayAdjustment += 0.03;
        drawAdjustment += 0.02;
      }
    }

    // Market movement analysis
    switch (market.movement) {
      case 'rising':
        // Odds rising = probability falling
        homeAdjustment -= 0.02;
        break;
      case 'falling':
        // Odds falling = probability rising
        homeAdjustment += 0.02;
        break;
    }

    return { homeAdjustment, drawAdjustment, awayAdjustment };
  }

  private generateMarketData(match: Match): MarketData {
    // Simulate realistic market data
    const baseHomeOdds = 1.8 + Math.random() * 2.0;
    const baseDrawOdds = 3.0 + Math.random() * 1.5;
    const baseAwayOdds = 2.2 + Math.random() * 2.5;

    return {
      homeOdds: baseHomeOdds,
      drawOdds: baseDrawOdds,
      awayOdds: baseAwayOdds,
      volume: 50000 + Math.random() * 200000,
      movement: ['rising', 'falling', 'stable'][Math.floor(Math.random() * 3)] as any,
      sharpMoney: Math.random() * 100000,
      publicMoney: Math.random() * 500000
    };
  }

  predict(match: Match, marketData?: MarketData): Prediction {
    const market = marketData || this.generateMarketData(match);
    
    // Convert odds to probabilities
    let homeWin = this.oddsToImpliedProbability(market.homeOdds);
    let draw = this.oddsToImpliedProbability(market.drawOdds);
    let awayWin = this.oddsToImpliedProbability(market.awayOdds);

    // Remove overround (bookmaker margin)
    const total = homeWin + draw + awayWin;
    homeWin /= total;
    draw /= total;
    awayWin /= total;

    // Apply market bias adjustments
    const adjustments = this.adjustForMarketBias(market);
    homeWin += adjustments.homeAdjustment;
    draw += adjustments.drawAdjustment;
    awayWin += adjustments.awayAdjustment;

    // Renormalize
    const newTotal = homeWin + draw + awayWin;
    homeWin /= newTotal;
    draw /= newTotal;
    awayWin /= newTotal;

    // Confidence based on market efficiency and volume
    const efficiency = this.calculateMarketEfficiency(market);
    const volumeScore = Math.min(1, market.volume / 100000);
    const confidence = 0.7 + (efficiency * 0.2) + (volumeScore * 0.1);

    return {
      homeWin: Math.max(0.05, Math.min(0.9, homeWin)),
      draw: Math.max(0.05, Math.min(0.5, draw)),
      awayWin: Math.max(0.05, Math.min(0.9, awayWin)),
      confidence: Math.min(0.95, confidence),
      expectedGoals: {
        home: 1.2 + (homeWin - 0.33) * 2,
        away: 1.0 + (awayWin - 0.33) * 2
      }
    };
  }

  getMarketInsights(match: Match): any {
    const market = this.generateMarketData(match);
    const efficiency = this.calculateMarketEfficiency(market);
    const adjustments = this.adjustForMarketBias(market);

    return {
      marketData: market,
      efficiency,
      adjustments,
      recommendations: this.generateMarketRecommendations(market, efficiency)
    };
  }

  private generateMarketRecommendations(market: MarketData, efficiency: number): string[] {
    const recommendations: string[] = [];

    if (efficiency < 0.9) {
      recommendations.push('Market shows inefficiencies - potential value opportunities');
    }

    const sharpRatio = market.sharpMoney / (market.sharpMoney + market.publicMoney);
    if (sharpRatio > 0.7) {
      recommendations.push('Sharp money dominance - market likely accurate');
    } else if (sharpRatio < 0.3) {
      recommendations.push('Public money heavy - watch for favorite bias');
    }

    if (market.movement === 'falling' && market.homeOdds < 2.0) {
      recommendations.push('Heavy backing for favorite - consider value in draw/away');
    }

    return recommendations;
  }
}