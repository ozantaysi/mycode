import { CalculationData, SaveResponse } from '../types';
import { API_ENDPOINT } from '../constants';

export const saveCalculation = async (
  data: CalculationData, 
  netGetiri: number
): Promise<SaveResponse> => {
  try {
    const formData = new FormData();
    formData.append('anapara', data.anapara.toString());
    formData.append('yillikFaiz', data.yillikFaiz.toString());
    formData.append('stopaj', data.stopaj.toString());
    formData.append('vadeGun', data.vadeGun.toString());
    
    // We are saving the calculated Net Return Amount (TL) as 'netYillik' 
    // based on the context of tracking earnings in the DB.
    formData.append('netYillik', netGetiri.toString());

    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: SaveResponse = await response.json();
    return result;
  } catch (error) {
    console.error('Save failed:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Bilinmeyen bir hata oluştu.'
    };
  }
};
