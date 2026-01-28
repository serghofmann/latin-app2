
import { GoogleGenAI, Type } from "@google/genai";
import { QuizQuestion, AIExplanation } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getAIExplanation = async (topic: string): Promise<AIExplanation> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Erkläre das Latein-Thema "${topic}" basierend auf dem CURSUS (Neue Ausgabe) Lehrplan für das Gymnasium in Baden-Württemberg (Klasse 7).
    Der Schüler hat eine 5-6 und versteht die Grundlagen nicht. 
    1. Erkläre es wie ein cooler Nachhilfelehrer (13-jähriger Adressat).
    2. Benutze die Begriffe aus der CURSUS-Grammatik (z.B. Tempuszeichen, Moduszeichen, Stammformen).
    3. Nutze visuelle Metaphern (Satzbau-Züge, Lego-Endungen).
    4. Gib 3 extrem klare Beispiele mit Analyse (Subjekt, Prädikat, Objekt markieren).`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          concept: { type: Type.STRING },
          explanation: { type: Type.STRING },
          examples: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                latin: { type: Type.STRING },
                german: { type: Type.STRING },
                note: { type: Type.STRING }
              },
              required: ["latin", "german", "note"]
            }
          },
          mnemonics: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ["concept", "explanation", "examples", "mnemonics"]
      }
    }
  });

  return JSON.parse(response.text);
};

export const generateQuiz = async (topic: string): Promise<QuizQuestion[]> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Erstelle 5 Quizfragen zu "${topic}" für die 7. Klasse Gymnasium (CURSUS Niveau). 
    Inkludiere:
    - Bestimmungsfragen (Welcher Fall/Zeitform ist das?)
    - Übersetzungs-Hacks (Welche deutsche Wendung passt hier?)
    - Stolperfallen aus dem CURSUS-Wortschatz.
    Gib motivierendes Feedback bei der Erklärung.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            options: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            },
            correctAnswer: { type: Type.STRING },
            explanation: { type: Type.STRING }
          },
          required: ["question", "options", "correctAnswer", "explanation"]
        }
      }
    }
  });

  return JSON.parse(response.text);
};

export const askOracle = async (query: string): Promise<string> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: query,
    config: {
      systemInstruction: "Du bist das 'Orakel von Rom' und ein Experte für das CURSUS Latein-Lehrbuch. Dein Ziel ist es, einen 7.-Klässler vom Notenbereich 5-6 auf eine 2-3 zu bringen. Erkläre Regeln kurz, prägnant und immer mit einem motivierenden Spruch am Ende. Wenn er nach Vokabeln fragt, nenne auch immer die Stammformen (z.B. laudo, laudavi, laudatum)."
    }
  });
  return response.text;
};
