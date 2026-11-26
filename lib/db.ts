import 'server-only'
import { createClient, type Client } from '@libsql/client'
import { drizzle, type LibSQLDatabase } from 'drizzle-orm/libsql'
import * as schema from '@/db/schema'

type PortfolioDb = LibSQLDatabase<typeof schema>

const globalForDb = globalThis as unknown as {
  libsqlClient?: Client
  portfolioDb?: PortfolioDb
}

export function getDb(): PortfolioDb {
  if (globalForDb.portfolioDb) {
    return globalForDb.portfolioDb
  }

  const url = process.env.TURSO_DATABASE_URL
  if (!url) {
    throw new Error(
      'Missing TURSO_DATABASE_URL environment variable. Configure it in .env.local (see .env.example).'
    )
  }

  const client =
    globalForDb.libsqlClient ??
    createClient({
      url,
      authToken: process.env.TURSO_AUTH_TOKEN,
    })

  const db = drizzle(client, { schema })

  if (process.env.NODE_ENV !== 'production') {
    globalForDb.libsqlClient = client
    globalForDb.portfolioDb = db
  }

  return db
}
