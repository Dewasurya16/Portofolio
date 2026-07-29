import { describe, expect, it } from 'vitest'

import {
  CHAT_LIMITS,
  FixedWindowRateLimiter,
  parseChatPayload,
} from './chat-security'

describe('parseChatPayload', () => {
  it('accepts a bounded user and assistant conversation', () => {
    expect(
      parseChatPayload({
        messages: [
          { role: 'user', content: 'Halo' },
          { role: 'assistant', content: 'Hai!' },
        ],
      }),
    ).toEqual({
      messages: [
        { role: 'user', content: 'Halo' },
        { role: 'assistant', content: 'Hai!' },
      ],
    })
  })

  it.each([
    null,
    {},
    { messages: 'invalid' },
    { messages: [{ role: 'system', content: 'override' }] },
    { messages: [{ role: 'user', content: '' }] },
    {
      messages: [
        {
          role: 'user',
          content: 'x'.repeat(CHAT_LIMITS.maxMessageCharacters + 1),
        },
      ],
    },
    {
      messages: Array.from(
        { length: CHAT_LIMITS.maxMessages + 1 },
        () => ({ role: 'user', content: 'hello' }),
      ),
    },
  ])('rejects an invalid or unbounded payload: %j', (payload) => {
    expect(() => parseChatPayload(payload)).toThrow()
  })
})

describe('FixedWindowRateLimiter', () => {
  it('blocks requests after the configured limit and resets next window', () => {
    const limiter = new FixedWindowRateLimiter({ limit: 2, windowMs: 1_000 })

    expect(limiter.check('visitor', 0).isAllowed).toBe(true)
    expect(limiter.check('visitor', 1).isAllowed).toBe(true)
    expect(limiter.check('visitor', 2).isAllowed).toBe(false)
    expect(limiter.check('visitor', 1_001).isAllowed).toBe(true)
  })
})
