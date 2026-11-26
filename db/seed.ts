import { config } from 'dotenv'
import { createClient } from '@libsql/client'

config({ path: '.env.local' })
config()
import { drizzle } from 'drizzle-orm/libsql'
import * as schema from './schema'
import {
  experience as seedExperience,
  personal as seedPersonal,
  projects as seedProjects,
  technologies as seedTechnologies,
} from '../data/portfolio'

async function seed() {
  const url = process.env.TURSO_DATABASE_URL
  if (!url) {
    throw new Error('TURSO_DATABASE_URL is required to run the seed script.')
  }

  const client = createClient({
    url,
    authToken: process.env.TURSO_AUTH_TOKEN,
  })

  const db = drizzle(client, { schema })

  console.log('Seeding Turso database...')

  // Clear existing portfolio content tables so seeding is idempotent
  await db.delete(schema.profile)
  await db.delete(schema.technologies)
  await db.delete(schema.projects)
  await db.delete(schema.experiences)

  await db.insert(schema.profile).values({
    name: seedPersonal.name,
    title: seedPersonal.title,
    intro: seedPersonal.intro,
    location: seedPersonal.location,
    email: seedPersonal.email,
    github: seedPersonal.github,
    linkedin: seedPersonal.linkedin,
  })

  await db.insert(schema.technologies).values(
    seedTechnologies.map((item, index) => ({
      name: item.name,
      slug: item.slug,
      mark: item.mark,
      logoUrl: 'logoUrl' in item ? (item.logoUrl ?? null) : null,
      customIcon: 'customIcon' in item ? (item.customIcon ?? null) : null,
      sortOrder: index,
    }))
  )

  await db.insert(schema.projects).values(
    seedProjects.map((item, index) => ({
      number: item.number,
      title: item.title,
      category: item.category,
      description: item.description,
      features: item.features,
      tech: item.tech,
      visual: item.visual,
      url: item.url,
      sortOrder: index,
    }))
  )

  await db.insert(schema.experiences).values(
    seedExperience.map((item, index) => ({
      role: item.role,
      company: item.company,
      dates: item.dates,
      detail: item.detail,
      sortOrder: index,
    }))
  )

  console.log('Seed complete: profile, technologies, projects, and experiences inserted.')
  client.close()
}

seed().catch((error) => {
  console.error('Failed to seed database:', error)
  process.exit(1)
})
