import Groq from 'groq-sdk'
import { NextResponse } from 'next/server'
import { ZodError } from 'zod'

import {
  CHAT_LIMITS,
  FixedWindowRateLimiter,
  parseChatPayload,
} from '@/lib/chat-security'

const rateLimiter = new FixedWindowRateLimiter({
  limit: CHAT_LIMITS.requestsPerWindow,
  windowMs: CHAT_LIMITS.windowMs,
})

function getClientIdentifier(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for')
  return forwardedFor?.split(',')[0]?.trim() || 'anonymous'
}

function isCrossSiteRequest(request: Request): boolean {
  return request.headers.get('sec-fetch-site') === 'cross-site'
}

function jsonError(message: string, status: number, code: string) {
  return NextResponse.json(
    { success: false, data: null, error: { code, message } },
    { status },
  )
}

export async function POST(request: Request) {
  if (isCrossSiteRequest(request)) {
    return jsonError('Permintaan lintas situs ditolak.', 403, 'CROSS_SITE_REQUEST')
  }

  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) {
    return jsonError('Content-Type harus application/json.', 415, 'UNSUPPORTED_MEDIA_TYPE')
  }

  const declaredLength = Number(request.headers.get('content-length') || 0)
  if (declaredLength > CHAT_LIMITS.maxBodyBytes) {
    return jsonError('Payload terlalu besar.', 413, 'PAYLOAD_TOO_LARGE')
  }

  const rateLimit = rateLimiter.check(getClientIdentifier(request))
  if (!rateLimit.isAllowed) {
    const retryAfter = Math.max(Math.ceil((rateLimit.resetAt - Date.now()) / 1_000), 1)
    return NextResponse.json(
      {
        success: false,
        data: null,
        error: { code: 'RATE_LIMITED', message: 'Terlalu banyak permintaan. Coba lagi sebentar.' },
      },
      {
        status: 429,
        headers: {
          'Retry-After': String(retryAfter),
          'X-RateLimit-Remaining': '0',
        },
      },
    )
  }

  try {
    const rawBody = await request.text()
    if (new TextEncoder().encode(rawBody).byteLength > CHAT_LIMITS.maxBodyBytes) {
      return jsonError('Payload terlalu besar.', 413, 'PAYLOAD_TOO_LARGE')
    }

    const payload = parseChatPayload(JSON.parse(rawBody) as unknown)
    const apiKey = process.env.GROQ_API_KEY

    if (!apiKey) {
      return jsonError('Layanan chat belum tersedia.', 503, 'CHAT_NOT_CONFIGURED')
    }

    const systemPrompt = {
      role: 'system',
      content: `Kamu adalah asisten virtual untuk portofolio Dewa Sinar Surya. 
Dewa adalah seorang Pranata Komputer, UI/UX Designer, dan AI Enthusiast dari Magelang. 
Dia memiliki lebih dari 3 tahun pengalaman, telah menyelesaikan lebih dari 20 proyek, dan sangat menyukai teknologi AI serta desain yang intuitif. 
Tugasmu adalah menjawab pertanyaan pengunjung tentang Dewa, keahliannya, atau proyek-proyeknya dengan ramah, profesional, dan sedikit sentuhan kreatif.
Gunakan bahasa Indonesia yang santai tapi sopan.`
    } as const

    const groq = new Groq({ apiKey, timeout: 15_000, maxRetries: 1 })
    const apiMessages = [systemPrompt, ...payload.messages]

    const chatCompletion = await groq.chat.completions.create({
      messages: apiMessages,
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
    })

    const responseMessage =
      chatCompletion.choices[0]?.message?.content ||
      'Maaf, saya tidak bisa merespons saat ini.'

    return NextResponse.json({
      success: true,
      data: { message: responseMessage },
      error: null,
    })
  } catch (error: unknown) {
    if (error instanceof SyntaxError || error instanceof ZodError) {
      return jsonError('Format pesan tidak valid.', 400, 'INVALID_REQUEST')
    }

    const incidentId = crypto.randomUUID()
    console.error('Chat provider request failed', { incidentId, error })
    return NextResponse.json(
      {
        success: false,
        data: null,
        error: {
          code: 'CHAT_UNAVAILABLE',
          message: 'Layanan chat sedang bermasalah. Silakan coba lagi.',
          incidentId,
        },
      },
      { status: 502 },
    )
  }
}
