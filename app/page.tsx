import { About, Contact, Experience, Footer, Hero, Navbar, Projects, TechStack } from '@/components/portfolio'
import { getPortfolioData } from '@/lib/portfolio-data'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const { profile, technologies, projects, experiences } = await getPortfolioData()

  return (
    <>
      <Navbar profile={profile} />
      <main>
        <Hero profile={profile} />
        <TechStack technologies={technologies} />
        <Projects projects={projects} />
        <Experience experiences={experiences} />
        <About />
        <Contact profile={profile} />
      </main>
      <Footer profile={profile} />
    </>
  )
}
