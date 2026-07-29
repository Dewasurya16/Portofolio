import { z } from 'zod'

export const CHAT_LIMITS = {
  maxBodyBytes: 24_000,
  maxMessageCharacters: 2_000,
  maxMessages: 20,
  requestsPerWindow: 5,
  windowMs: 60_000,
} as const

const chatMessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string().trim().min(1).max(CHAT_LIMITS.maxMessageCharacters),
}).strict()

const chatPayloadSchema = z.object({
  messages: z.array(chatMessageSchema).min(1).max(CHAT_LIMITS.maxMessages),
}).strict()

export type ChatPayload = z.infer<typeof chatPayloadSchema>

export function parseChatPayload(payload: unknown): ChatPayload {
  return chatPayloadSchema.parse(payload)
}

type RateLimitEntry = {
  count: number
  resetAt: number
}

type RateLimitResult = {
  isAllowed: boolean
  remaining: number
  resetAt: number
}

type RateLimiterOptions = {
  limit: number
  windowMs: number
}

export class FixedWindowRateLimiter {
  private readonly entries = new Map<string, RateLimitEntry>()

  constructor(private readonly options: RateLimiterOptions) {}

  check(key: string, now = Date.now()): RateLimitResult {
    const current = this.entries.get(key)
    const entry =
      !current || current.resetAt <= now
        ? { count: 0, resetAt: now + this.options.windowMs }
        : current
    const nextEntry = { ...entry, count: entry.count + 1 }

    this.entries.set(key, nextEntry)
    this.prune(now)

    return {
      isAllowed: nextEntry.count <= this.options.limit,
      remaining: Math.max(this.options.limit - nextEntry.count, 0),
      resetAt: nextEntry.resetAt,
    }
  }

  private prune(now: number): void {
    if (this.entries.size < 1_000) return

    for (const [key, entry] of this.entries) {
      if (entry.resetAt <= now) this.entries.delete(key)
    }
  }
}
