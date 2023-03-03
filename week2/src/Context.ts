import { Strategy } from './Strategy';

export class Context {
  private strategy: Strategy;
    
  constructor(strategy: Strategy) {
    this.strategy = strategy;
  }

  public setStrategy(strategy: Strategy) {
    this.strategy = strategy;
  }

  public applyStrategyToText(data: string): string {
    return this.strategy.execute(data);
  }
}