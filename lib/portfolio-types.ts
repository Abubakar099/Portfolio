export type CustomTechIconType = 'github' | 'aws' | 'rag' | 'restapi'

export interface PortfolioProfile {
  name: string
  title: string
  intro: string
  location: string
  email: string
  github: string
  linkedin: string
}

export interface PortfolioTechnology {
  name: string
  slug: string | null
  mark: string
  logoUrl?: string | null
  customIcon?: CustomTechIconType | null
}

export interface PortfolioProject {
  number: string
  title: string
  category: string
  description: string
  features: string[]
  tech: string[]
  visual: string
  url: string
}

export interface PortfolioExperience {
  role: string
  company: string
  dates: string
  detail: string
}

export interface PortfolioData {
  profile: PortfolioProfile
  technologies: PortfolioTechnology[]
  projects: PortfolioProject[]
  experiences: PortfolioExperience[]
}
