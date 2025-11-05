const { GoogleGenerativeAI } = require('@google/generative-ai');
const operations = require('./operations');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
    console.error('❌ La variable de entorno GEMINI_API_KEY no está configurada.');
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

module.exports = class GenerateService {

    async process(req, res) {
        try {
            console.log('GenerateService - process - Generando contenido con Gemini');

            const { prompt, user } = req.body;

            if (!prompt) {
                return res.status(400).json({ message: 'El "prompt" es requerido' });
            }

            if (user && typeof user !== 'string') {
                return res.status(400).json({ message: 'El "user" debe ser una cadena de texto' });
            }

            // Instrucción de sistema para dar contexto a la IA
            const systemInstruction = `Eres una IA asistente de psicología. 
            Tu propósito es hablar con los pacientes y escucharlos. No debes desviarte del tema de la psicología. 
            Sé empático y comprensivo en tus respuestas. Si sientes que la situación se te sale de las manos o que el paciente necesita ayuda
             urgente o que el paciente tenga indices de suicido , 
             debes proporcionarle el siguiente número de contacto de un psicóloga Maria : 1110023409234.`;

            let userContext = "";
            if (user) {
                userContext = `El paciente con el que estás hablando se llama ${user}.`;
            }

            const finalPrompt = `${systemInstruction} ${userContext} El paciente dice: "${prompt}"`;

            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
            const result = await model.generateContent(finalPrompt);
            const response = await result.response;
            const text = response.text();

            // Guardar la interacción en la colección 'messages'
            const messageLog = {
                user: user || 'anonymous', // Guardar 'anonymous' si no se provee usuario
                prompt: prompt,
                response: text,
                createdAt: new Date()
            };
            console.log(messageLog)
            await operations.insertOne('messages', messageLog);

            return res.status(200).json({ response: text });

        } catch (error) {
            console.error('GenerateService - process - Error al generar contenido con Gemini', error);
            // Evita exponer detalles del error de la API de Gemini al cliente
            if (error.message.includes('API key')) {
                return res.status(500).json({ message: 'Error de configuración del servicio de IA.' });
            }
            return res.status(500).json({ message: 'Ocurrió un error al procesar la solicitud.' });
        }
    }
}