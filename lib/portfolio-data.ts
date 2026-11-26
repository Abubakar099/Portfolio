import 'server-only'
import { asc } from 'drizzle-orm'
import { experiences, profile, projects, technologies } from '@/db/schema'
import { getDb } from '@/lib/db'
import type { CustomTechIconType, PortfolioData } from '@/lib/portfolio-types'

const VALID_CUSTOM_ICONS = new Set<CustomTechIconType>([
  'github',
  'aws',
  'rag',
  'restapi',
])

function toCustomIcon(value: string | null): CustomTechIconType | null {
  if (value && VALID_CUSTOM_ICONS.has(value as CustomTechIconType)) {
    return value as CustomTechIconType
  }
  return null
}

export async function getPortfolioData(): Promise<PortfolioData> {
  const db = getDb()

  const [profileRows, techRows, projectRows, experienceRows] = await Promise.all([
    db.select().from(profile).limit(1),
    db.select().from(technologies).orderBy(asc(technologies.sortOrder), asc(technologies.id)),
    db.select().from(projects).orderBy(asc(projects.sortOrder), asc(projects.id)),
    db.select().from(experiences).orderBy(asc(experiences.sortOrder), asc(experiences.id)),
  ])

  const profileRow = profileRows[0]
  if (!profileRow) {
    throw new Error(
      'Portfolio profile not found in Turso database. Run `pnpm db:seed` after applying migrations.'
    )
  }

  return {
    profile: {
      name: profileRow.name,
      title: profileRow.title,
      intro: profileRow.intro,
      location: profileRow.location,
      email: profileRow.email,
      github: profileRow.github,
      linkedin: profileRow.linkedin,
    },
    technologies: techRows.map((row) => ({
      name: row.name,
      slug: row.slug,
      mark: row.mark,
      logoUrl: row.logoUrl,
      customIcon: toCustomIcon(row.customIcon),
    })),
    projects: projectRows.map((row) => ({
      number: row.number,
      title: row.title,
      category: row.category,
      description: row.description,
      features: Array.isArray(row.features) ? row.features : [],
      tech: Array.isArray(row.tech) ? row.tech : [],
      visual: row.visual,
      url: row.url,
    })),
    experiences: experienceRows.map((row) => ({
      role: row.role,
      company: row.company,
      dates: row.dates,
      detail: row.detail,
    })),
  }
}
