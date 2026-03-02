import { GoogleGenerativeAI } from "@google/generative-ai";

export async function refineIdea(input: string, auth: string) {
  if (!auth) throw new Error("Auth (API Key or Token) is required");

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

  // Si el auth empieza por 'ya29.', es un token OAuth de Google
  if (auth.startsWith('ya29.')) {
    console.log('Using Google OAuth Token for Gemini API...');
    
    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${auth}`,
          'Content-Type': 'application/json',
          'x-goog-user-project': 'chulisticapp'
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Google API OAuth Error:', errorData);
      throw new Error(errorData.error?.message || "Error al autenticar con Google para Gemini.");
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!text) throw new Error("La IA no devolvió contenido.");
    
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No se pudo extraer JSON de la respuesta.");
    
    return JSON.parse(jsonMatch[0]);

  } else {
    // Es una API Key normal
    console.log('Using API Key for Gemini API...');
    const genAI = new GoogleGenerativeAI(auth);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("No se pudo extraer JSON de la respuesta.");
      
      return JSON.parse(jsonMatch[0]);
    } catch (error: any) {
      console.error('Gemini SDK Error:', error);
      if (error.message?.includes('API_KEY_INVALID')) {
        throw new Error("La API Key proporcionada no es válida.");
      }
      throw error;
    }
  }
}
