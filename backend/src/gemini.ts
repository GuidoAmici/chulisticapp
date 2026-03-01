import { GoogleGenerativeAI } from "@google/generative-ai";

export async function refineIdea(input: string, auth: string) {
  if (!auth) throw new Error("Auth (API Key or Token) is required");

  // If it starts with 'ya29.', it's a Google OAuth token
  const genAI = auth.startsWith('ya29.') 
    ? new GoogleGenerativeAI(auth) // The library handles tokens passed as the first argument
    : new GoogleGenerativeAI(auth);
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

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("Could not parse JSON from AI response");
  }
  
  return JSON.parse(jsonMatch[0]);
}
