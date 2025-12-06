import { GoogleGenAI } from "@google/genai";
import { CalculationData, CalculationResult } from "../types";

export const getFinancialAdvice = async (
  data: CalculationData,
  result: CalculationResult
): Promise<string> => {
  if (!process.env.API_KEY) {
    return "API Anahtarı bulunamadı. Lütfen ortam değişkenlerini kontrol edin.";
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    Sen uzman bir Türk finans danışmanısın. Kullanıcı aşağıdaki verilere göre bir mevduat yatırımı planlıyor:
    
    Yatırım Detayları:
    - Anapara: ${data.anapara.toLocaleString('tr-TR')} TL
    - Yıllık Faiz Oranı: %${data.yillikFaiz}
    - Vade: ${data.vadeGun} Gün
    - Stopaj Kesintisi: %${data.stopaj}
    
    Hesaplama Sonuçları:
    - Net Getiri (Kazanç): ${result.netGetiri.toLocaleString('tr-TR')} TL
    - Vade Sonu Toplam Para: ${result.toplamBakiye.toLocaleString('tr-TR')} TL
    
    Lütfen bu yatırımı kısaca değerlendir. 
    1. Bu faiz oranı mevcut Türkiye piyasa koşullarına göre (simüle edilmiş) rekabetçi mi?
    2. Vade süresi mantıklı mı?
    3. Elde edilecek net getiri için bu parayı bağlamaya değer mi?
    
    Cevabın samimi, kısa ve anlaşılır olsun. Yatırım tavsiyesi değildir uyarısını en sona ekle.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text || "Şu anda tavsiye oluşturulamıyor.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Yapay zeka servisine erişirken bir hata oluştu.";
  }
};
