import { GoogleGenerativeAI } from "@google/generative-ai";

export async function refineIdea(input: string, auth: string) {
  if (!auth) throw new Error("Auth (API Key or Token) is required");

  console.log('Initializing Gemini with auth length:', auth.length);
  
  // If it starts with 'ya29.', it's likely a Google OAuth token.
  // Note: The SDK constructor technically expects an API Key string.
  // If this fails, we might need to use the REST API with the Bearer token.
  const genAI = new GoogleGenerativeAI(auth);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `
    Eres un asistente experto en productividad para un sistema de Segundo Cerebro.
    Analiza la siguiente idea o pensamiento y estructúralo de la mejor manera posible.
    Debes clasificarlo en una de estas categorías:
    - task: Algo que debe hacerse.
    - project: Algo más complejo que requiere múltiples pasos.
    - person: Alguien con quien contactar o registrar información.
    - idea: Una nota, concepto o pensamiento fugaz.

    Devuelve un JSON estrictamente con este formato:
    {
      "type": "task" | "project" | "person" | "idea",
      "title": "Un título conciso y claro",
      "content": "Contenido detallado o descripción si es necesario",
      "status": "pending" (para task) | "active" (para project) | null,
      "due": "YYYY-MM-DD" (opcional para task si se menciona una fecha),
      "tags": ["tag1", "tag2"]
    }

    Input: "${input}"
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log('Gemini Response:', text);
    
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Could not parse JSON from AI response: " + text);
    }
    
    return JSON.parse(jsonMatch[0]);
  } catch (error: any) {
    console.error('Gemini API Error details:', error);
    if (error.message?.includes('API_KEY_INVALID')) {
      throw new Error("La API Key o el Token de Google no es válido.");
    }
    throw error;
  }
}
