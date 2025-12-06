export interface CalculationData {
  anapara: number;
  yillikFaiz: number;
  vadeGun: number;
  stopaj: number;
}

export interface CalculationResult {
  brutGetiri: number;
  stopajTutari: number;
  netGetiri: number;
  toplamBakiye: number;
  netYillikOran: number; // Net Annual % Rate equivalent
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  data: CalculationData;
  result: CalculationResult;
}

export interface SaveResponse {
  success: boolean;
  message: string;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}