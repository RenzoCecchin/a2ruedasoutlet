import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ImageSize } from '../types';

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Chat with the AI Model
 */
export const sendChatMessage = async (
  message: string, 
  history: { role: 'user' | 'model', text: string }[]
): Promise<string> => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-3-pro-preview',
      config: {
        systemInstruction: "Sos un experto asistente virtual de MotoElite Argentina. Tu tono es profesional, elegante y servicial. Ayudas a los clientes a encontrar repuestos de motos (especialmente Voge 300 DS, Benelli TRK 251 y Daelim Liberty) e indumentaria. Siempre enfatiza la seguridad de la compra y los envíos a toda Argentina. Responde de forma concisa.",
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text || "Disculpa, no pude procesar tu solicitud en este momento.";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "Ocurrió un error al conectar con el asistente. Por favor intenta más tarde.";
  }
};

/**
 * Generate Image using Gemini
 */
export const generateMotoImage = async (prompt: string, size: ImageSize): Promise<string | null> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [
          { text: prompt }
        ]
      },
      config: {
        imageConfig: {
          imageSize: size,
          aspectRatio: "1:1"
        }
      }
    });

    // Extract image
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Gemini Image Gen Error:", error);
    throw error;
  }
};