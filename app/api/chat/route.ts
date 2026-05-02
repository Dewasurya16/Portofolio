import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

// Initialize Groq client
// It will automatically use the GROQ_API_KEY environment variable if available
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || 'dummy_key', // fallback to prevent crash on build, but API will fail without valid key
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Messages are required' }, { status: 400 });
    }

    if (!process.env.GROQ_API_KEY) {
       return NextResponse.json({ 
         error: 'Missing GROQ_API_KEY', 
         message: 'API Key Groq belum dikonfigurasi di server.' 
       }, { status: 500 });
    }

    const systemPrompt = {
      role: 'system',
      content: `Kamu adalah asisten virtual untuk portofolio Dewa Sinar Surya. 
Dewa adalah seorang Pranata Komputer, UI/UX Designer, dan AI Enthusiast dari Makassar. 
Dia memiliki lebih dari 3 tahun pengalaman, telah menyelesaikan lebih dari 20 proyek, dan sangat menyukai teknologi AI serta desain yang intuitif. 
Tugasmu adalah menjawab pertanyaan pengunjung tentang Dewa, keahliannya, atau proyek-proyeknya dengan ramah, profesional, dan sedikit sentuhan kreatif.
Gunakan bahasa Indonesia yang santai tapi sopan.`
    };

    const apiMessages = [systemPrompt, ...messages];

    const chatCompletion = await groq.chat.completions.create({
      messages: apiMessages,
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
    });

    const responseMessage = chatCompletion.choices[0]?.message?.content || 'Maaf, saya tidak bisa merespons saat ini.';

    return NextResponse.json({ message: responseMessage });
  } catch (error: any) {
    console.error('Groq API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', message: error.message || 'Terjadi kesalahan pada server Groq.' },
      { status: 500 }
    );
  }
}
