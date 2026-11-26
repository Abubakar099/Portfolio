import { sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const profile = sqliteTable('profile', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  title: text('title').notNull(),
  intro: text('intro').notNull(),
  location: text('location').notNull(),
  email: text('email').notNull(),
  github: text('github').notNull(),
  linkedin: text('linkedin').notNull(),
})

export const technologies = sqliteTable('technologies', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  slug: text('slug'),
  mark: text('mark').notNull(),
  logoUrl: text('logo_url'),
  customIcon: text('custom_icon'),
  sortOrder: integer('sort_order').notNull().default(0),
})

export const projects = sqliteTable('projects', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  number: text('number').notNull(),
  title: text('title').notNull(),
  category: text('category').notNull(),
  description: text('description').notNull(),
  features: text('features', { mode: 'json' }).$type<string[]>().notNull(),
  tech: text('tech', { mode: 'json' }).$type<string[]>().notNull(),
  visual: text('visual').notNull(),
  url: text('url').notNull(),
  sortOrder: integer('sort_order').notNull().default(0),
})

export const experiences = sqliteTable('experiences', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  role: text('role').notNull(),
  company: text('company').notNull(),
  dates: text('dates').notNull(),
  detail: text('detail').notNull(),
  sortOrder: integer('sort_order').notNull().default(0),
})

export const contactMessages = sqliteTable('contact_messages', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull(),
  subject: text('subject').notNull(),
  message: text('message').notNull(),
  createdAt: text('created_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
})
