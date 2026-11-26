'use server'

import { contactMessages } from '@/db/schema'
import { getDb } from '@/lib/db'

export type ContactFormResult =
  | { ok: true; message: string }
  | { ok: false; error: string }

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

// Simple in-memory rate limit per email address (max 3 submissions per 10 minutes per server instance)
const submissionLog = new Map<string, number[]>()
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX = 3

function isRateLimited(key: string): boolean {
  const now = Date.now()
  const recent = (submissionLog.get(key) ?? []).filter(
    (ts) => now - ts < RATE_LIMIT_WINDOW_MS
  )
  if (recent.length >= RATE_LIMIT_MAX) {
    submissionLog.set(key, recent)
    return true
  }
  recent.push(now)
  submissionLog.set(key, recent)
  return false
}

export async function submitContactMessage(
  formData: FormData
): Promise<ContactFormResult> {
  // Honeypot spam trap: bots often fill hidden fields
  const honeypot = String(formData.get('hp_field') ?? '').trim()
  if (honeypot.length > 0) {
    return {
      ok: true,
      message: 'Thank you! Your message has been received.',
    }
  }

  const name = String(formData.get('name') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim().toLowerCase()
  const subject = String(formData.get('subject') ?? '').trim()
  const message = String(formData.get('message') ?? '').trim()

  if (name.length < 2 || name.length > 100) {
    return { ok: false, error: 'Please enter your name (2–100 characters).' }
  }

  if (!EMAIL_REGEX.test(email) || email.length > 254) {
    return { ok: false, error: 'Please enter a valid email address.' }
  }

  if (subject.length < 2 || subject.length > 150) {
    return { ok: false, error: 'Please enter a subject (2–150 characters).' }
  }

  if (message.length < 10 || message.length > 3000) {
    return {
      ok: false,
      error: 'Please enter a message between 10 and 3000 characters.',
    }
  }

  if (isRateLimited(email)) {
    return {
      ok: false,
      error: 'Too many messages sent recently. Please try again in a few minutes.',
    }
  }

  try {
    const db = getDb()
    await db.insert(contactMessages).values({
      name,
      email,
      subject,
      message,
      createdAt: new Date().toISOString(),
    })

    return {
      ok: true,
      message: 'Thanks for reaching out! Your message has been saved.',
    }
  } catch (error) {
    console.error('Failed to store contact message:', error)
    return {
      ok: false,
      error:
        'Could not save your message right now. Please try again later or email directly.',
    }
  }
}
