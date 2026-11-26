'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Code2, Mail, MapPin, Menu, Star, X, Zap } from 'lucide-react'
import { navItems } from '@/data/portfolio'
import { HeroHalo } from '@/components/hero-halo'
import { submitContactMessage } from '@/app/actions/contact'
import type {
  CustomTechIconType,
  PortfolioExperience,
  PortfolioProfile,
  PortfolioProject,
  PortfolioTechnology,
} from '@/lib/portfolio-types'

const reveal = { hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0 } }

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion()
  return <motion.div className={className} variants={reveal} initial={reduce ? false : 'hidden'} whileInView="visible" viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.55, delay, ease: 'easeOut' }}>{children}</motion.div>
}

function GitHubMark() {
  return <svg className="github-mark" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .75a11.25 11.25 0 0 0-3.56 21.92c.56.1.77-.24.77-.54v-2.1c-3.14.68-3.8-1.33-3.8-1.33-.5-1.31-1.25-1.66-1.25-1.66-1.02-.7.08-.69.08-.69 1.12.08 1.72 1.16 1.72 1.16 1 1.72 2.63 1.22 3.27.93.1-.72.39-1.22.71-1.51-2.51-.28-5.15-1.25-5.15-5.57 0-1.23.44-2.24 1.16-3.03-.12-.28-.5-1.43.1-2.99 0 0 .95-.3 3.1 1.16a10.8 10.8 0 0 1 5.64 0c2.15-1.46 3.1-1.16 3.1-1.16.62 1.56.23 2.71.12 2.99.72.79 1.16 1.8 1.16 3.03 0 4.33-2.65 5.28-5.17 5.56.4.35.76 1.04.76 2.1v3.11c0 .3.2.65.78.54A11.25 11.25 0 0 0 12 .75Z"/></svg>
}

function BrandLogo() {
  return (
    <svg className="brand-logo-svg" viewBox="0 0 44 44" width="38" height="38" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="ag-border" x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#a855f7" />
          <stop offset="0.55" stopColor="#ec4899" />
          <stop offset="1" stopColor="#4d7cff" />
        </linearGradient>
        <linearGradient id="ag-bg" x1="4" y1="4" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1b1629" />
          <stop offset="1" stopColor="#0f1018" />
        </linearGradient>
      </defs>
      <rect x="1.5" y="1.5" width="41" height="41" rx="11" fill="url(#ag-bg)" stroke="url(#ag-border)" strokeWidth="2" />
      <text x="22" y="27.5" textAnchor="middle" fill="#ffffff" fontSize="16.5" fontWeight="800" letterSpacing="-0.8" fontFamily="var(--font-unbounded), Arial, sans-serif">AG</text>
    </svg>
  )
}

export function Navbar({ profile }: { profile: PortfolioProfile }) {
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  useEffect(() => {
    const sections = navItems.map(({ href }) => document.querySelector(href)).filter((section): section is Element => section !== null)
    let frame = 0
    const updateActiveSection = () => {
      const activationLine = Math.min(window.innerHeight * 0.24, 180)
      const currentSection = [...sections].reverse().find((section) => section.getBoundingClientRect().top <= activationLine)
      setActiveSection(currentSection?.id ?? sections[0]?.id ?? 'home')
    }
    const handleScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        updateActiveSection()
      })
    }
    updateActiveSection()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])
  return <header className="site-header"><nav className="nav wrap" aria-label="Main navigation">
    <a className="brand" href="#home" aria-label={`${profile.name} home`}><BrandLogo /></a>
    <button className="menu-toggle" aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X size={19} /> : <Menu size={19} />}</button>
    <div className={`nav-links ${open ? 'is-open' : ''}`}>{navItems.map((item) => <a key={item.href} href={item.href} onClick={() => { setActiveSection(item.href.slice(1)); setOpen(false) }} aria-current={activeSection === item.href.slice(1) ? 'location' : undefined}>{item.label}</a>)}</div>
    {profile.github ? <a className="nav-cta github-shimmer" href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub profile with 1,361 stars"><GitHubMark/><span className="github-count" aria-hidden="true">1361</span><Star className="github-star" size={18} fill="currentColor" strokeWidth={1.5} aria-hidden="true"/></a> : <span className="nav-cta github-shimmer is-unconfigured" aria-label="GitHub profile link needs configuration"><GitHubMark/><span>GitHub</span></span>}
  </nav></header>
}

function CodeVisual() {
  const reduce = useReducedMotion()
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const smoothX = useSpring(pointerX, { stiffness: 120, damping: 24, mass: 0.5 })
  const smoothY = useSpring(pointerY, { stiffness: 120, damping: 24, mass: 0.5 })
  const editorX = useTransform(smoothX, (value) => value * 3)
  const editorY = useTransform(smoothY, (value) => value * 3)
  const orbitX = useTransform(smoothX, (value) => value * -1.5)
  const orbitY = useTransform(smoothY, (value) => value * -1.5)
  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (reduce || event.pointerType !== 'mouse' || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const bounds = event.currentTarget.getBoundingClientRect()
    pointerX.set((event.clientX - bounds.left - bounds.width / 2) / bounds.width)
    pointerY.set((event.clientY - bounds.top - bounds.height / 2) / bounds.height)
  }
  function resetParallax() { pointerX.set(0); pointerY.set(0) }
  return <motion.div className="hero-art" aria-label="Illustration of a FastAPI code editor" onPointerMove={handlePointerMove} onPointerLeave={resetParallax}>
    <motion.div className="orbit orbit-one" style={{ x: orbitX, y: orbitY }} /><motion.div className="orbit orbit-two" style={{ x: orbitX, y: orbitY }} />
    <motion.div className="float-chip chip-python" animate={reduce ? undefined : { y: [0, -9, 0] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}>Py</motion.div>
    <motion.div className="float-chip chip-api" animate={reduce ? undefined : { y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 4.7, ease: 'easeInOut' }}><Zap size={16} fill="currentColor" /> FastAPI</motion.div>
    <motion.div className="float-chip chip-next" animate={reduce ? undefined : { y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 3.6, ease: 'easeInOut' }}>N</motion.div>
    <motion.div className="editor-parallax" style={{ x: editorX, y: editorY }}><div className="editor"><div className="editor-top"><span/><span/><span/><i>api_engine.py</i></div><pre><code><span className="code-purple">from</span> fastapi <span className="code-purple">import</span> FastAPI, Depends{`\n`}<span className="code-purple">from</span> core.ai_engine <span className="code-purple">import</span> RAGPipeline{`\n\n`}<span className="code-muted"># Initialize high-throughput service</span>{`\n`}app = FastAPI(title=<span className="code-green">&quot;Production Core&quot;</span>){`\n\n`}<span className="code-blue">@app.post</span>(<span className="code-green">&quot;/v1/predict&quot;</span>){`\n`}<span className="code-purple">async def</span> execute_inference(payload: Request):{`\n`}　 response = <span className="code-purple">await</span> pipeline.query(payload){`\n`}　 <span className="code-purple">return</span> {'{'}<span className="code-green">&quot;status&quot;</span>: 200, <span className="code-green">&quot;data&quot;</span>: response{'}'}</code></pre></div></motion.div>
    <div className="build-note"><span className="note-dot"/>Build.<br/>Innovate.<br/>Scale.<span className="note-line"/></div>
  </motion.div>
}

function KineticHeading() {
  const reduce = useReducedMotion()
  const revealWord = (word: string, index: number) => <motion.span className="kinetic-word" key={`${word}-${index}`} initial={reduce ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduce ? 0 : 0.42, delay: reduce ? 0 : index * 0.07, ease: 'easeOut' }}>{word}</motion.span>
  return <h1 aria-label="Hi, I’m Abubakar Ghias"><span className="sr-only">Hi, I’m Abubakar Ghias</span><span className="kinetic-line" aria-hidden="true">{['Hi,', 'I’m'].map(revealWord)}</span><span className="kinetic-line name-gradient" aria-hidden="true">{['Abubakar', 'Ghias'].map((word, index) => revealWord(word, index + 2))}</span></h1>
}

export function Hero({ profile }: { profile: PortfolioProfile }) {
  return <section className="hero wrap" id="home"><HeroHalo/><div className="hero-copy">
    <Reveal><span className="availability"><i/> Available for opportunities</span></Reveal>
    <Reveal delay={0.08}><KineticHeading /></Reveal>
    <Reveal delay={0.16}><h2>Building intelligent software<br className="desktop-break"/> &amp; scalable backend systems.</h2><p className="hero-intro">{profile.intro}</p></Reveal>
    <Reveal delay={0.23}><div className="hero-actions"><a className="button button-primary" href="#projects">Explore My Work <ArrowRight size={16}/></a><a className="button button-secondary" href="/resume.pdf" target="_blank" rel="noopener noreferrer"><ArrowUpRight size={15}/> Resume</a></div><SocialLinks profile={profile} /></Reveal>
  </div><Reveal className="hero-visual"><CodeVisual /></Reveal>
    <a href="#stack" className="scroll-cue"><span className="mouse-shape"/><span>Scroll to explore</span><ArrowDown size={13}/></a>
  </section>
}

function SocialLinks({ profile }: { profile: PortfolioProfile }) { return <div className="social-links">{profile.github ? <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub profile"><GitHubMark/></a> : <span aria-label="GitHub profile link needs configuration"><GitHubMark/></span>}<a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile"><span className="social-letter">in</span></a><a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}`} target="_blank" rel="noopener noreferrer" aria-label="Send email"><Mail size={16}/></a></div> }

function SectionHeading({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) { return <div className="section-heading"><p className="section-label">{label}</p><h2>{title}</h2>{subtitle && <p className="section-subtitle">{subtitle}</p>}</div> }

function CustomTechIcon({ type }: { type: 'github' | 'aws' | 'rag' | 'restapi' }) {
  if (type === 'github') {
    return (
      <svg viewBox="0 0 24 24" width="52" height="52" fill="#ffffff" aria-hidden="true">
        <path d="M12 .75a11.25 11.25 0 0 0-3.56 21.92c.56.1.77-.24.77-.54v-2.1c-3.14.68-3.8-1.33-3.8-1.33-.5-1.31-1.25-1.66-1.25-1.66-1.02-.7.08-.69.08-.69 1.12.08 1.72 1.16 1.72 1.16 1 1.72 2.63 1.22 3.27.93.1-.72.39-1.22.71-1.51-2.51-.28-5.15-1.25-5.15-5.57 0-1.23.44-2.24 1.16-3.03-.12-.28-.5-1.43.1-2.99 0 0 .95-.3 3.1 1.16a10.8 10.8 0 0 1 5.64 0c2.15-1.46 3.1-1.16 3.1-1.16.62 1.56.23 2.71.12 2.99.72.79 1.16 1.8 1.16 3.03 0 4.33-2.65 5.28-5.17 5.56.4.35.76 1.04.76 2.1v3.11c0 .3.2.65.78.54A11.25 11.25 0 0 0 12 .75Z" />
      </svg>
    )
  }
  if (type === 'aws') {
    return (
      <svg viewBox="0 0 64 64" width="56" height="56" fill="none" aria-hidden="true">
        <text x="32" y="31" textAnchor="middle" fill="#ffffff" fontSize="20" fontWeight="800" fontFamily="Arial, sans-serif" letterSpacing="-0.5">aws</text>
        <path d="M12 40.5C22.5 47.5 39.5 48.2 51.5 41.2" stroke="#FF9900" strokeWidth="3.2" strokeLinecap="round" />
        <path d="M47 38.2L53.2 40.5L50.8 46.5" stroke="#FF9900" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  if (type === 'rag') {
    return (
      <svg viewBox="0 0 64 64" width="54" height="54" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="rag-grad" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
            <stop stopColor="#a855f7" />
            <stop offset="1" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
        <ellipse cx="26" cy="18" rx="14" ry="6" stroke="url(#rag-grad)" strokeWidth="2.8" fill="rgba(168,85,247,0.12)" />
        <path d="M12 18v14c0 3.3 6.3 6 14 6s14-2.7 14-6V18" stroke="url(#rag-grad)" strokeWidth="2.8" />
        <path d="M12 32v13c0 3.3 6.3 6 14 6 2.5 0 4.8-.3 6.8-.8" stroke="url(#rag-grad)" strokeWidth="2.8" strokeLinecap="round" />
        <path d="M47 31l2.4 5.6L55 39l-5.6 2.4L47 47l-2.4-5.6L39 39l5.6-2.4L47 31z" fill="#38bdf8" />
        <circle cx="51" cy="24" r="2.2" fill="#c084fc" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 64 64" width="54" height="54" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="api-grad" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38bdf8" />
          <stop offset="1" stopColor="#34d399" />
        </linearGradient>
      </defs>
      <rect x="8" y="12" width="48" height="40" rx="10" stroke="url(#api-grad)" strokeWidth="2.8" fill="rgba(56,189,248,0.1)" />
      <path d="M21 26l-6 6 6 6M43 26l6 6-6 6M35 23l-6 18" stroke="url(#api-grad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function TechnologyLogo({ slug, mark, logoUrl, customIcon }: { slug: string | null; mark: string; logoUrl?: string | null; customIcon?: CustomTechIconType | null }) {
  const [failed, setFailed] = useState(false)

  if (customIcon) {
    return (
      <span className="technology-logo" aria-hidden="true">
        <CustomTechIcon type={customIcon} />
      </span>
    )
  }

  if (logoUrl && !failed) {
    return (
      <span className="technology-logo" aria-hidden="true">
        <img
          src={logoUrl}
          alt=""
          className="technology-logo-rounded"
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />
      </span>
    )
  }

  return (
    <span className="technology-logo" aria-hidden="true">
      {slug && !failed ? (
        <img
          src={`https://thesvg.org/icons/${slug}/default.svg`}
          alt=""
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="technology-mark">{mark}</span>
      )}
    </span>
  )
}

export function TechStack({ technologies }: { technologies: PortfolioTechnology[] }) {
  return (
    <section className="section wrap tech-stack-section" id="stack">
      <Reveal>
        <header className="tech-stack-heading">
          <h2>Tech Stack</h2>
          <p>Tools I build with</p>
        </header>
      </Reveal>
      <div className="technology-grid">
        {technologies.map((technology, index) => (
          <Reveal key={technology.name} delay={index * 0.025}>
            <article className="technology-card">
              <TechnologyLogo
                slug={technology.slug}
                mark={technology.mark}
                logoUrl={technology.logoUrl}
                customIcon={technology.customIcon}
              />
              <p className="technology-name">{technology.name}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function ProjectPreview({ type }: { type: string }) {
  if (type === 'interview') return <div className="project-preview preview-interview"><div className="preview-toolbar"><span className="live-dot"/> LIVE AI SESSION <span className="preview-tag">RAG v2</span></div><div className="question-box"><span>◈ &nbsp; Explain PostgreSQL indexing strategies?</span><strong>AI Feedback: Analysis includes B-Tree, Hash, and GiST indexes.</strong></div><div className="preview-foot"><span>Audio / NLP</span></div></div>
  if (type === 'time') return <div className="project-preview preview-time"><div className="analytics-top"><span>Analytics Board</span><b>WEEKLY VIEW</b></div><div className="metric-row"><div>Total hours<strong>—</strong></div><div>Efficiency<strong>—</strong></div><div>Active tasks<strong>—</strong></div></div><div className="bars">{[38, 27, 52, 43, 19, 40].map((h, i) => <i key={i} style={{ height: `${h}px` }}/>)}</div></div>
  return <div className="project-preview preview-auth"><div className="auth-head"><span>◉ &nbsp; OAuth &amp; 2FA</span><b>Verified</b></div><div className="auth-field">admin@security.io<div/></div><div className="auth-meta"><span>JWT + Refresh Rotation</span><strong>RBAC Active</strong></div></div>
}

export function Projects({ projects }: { projects: PortfolioProject[] }) {
  const [active, setActive] = useState<number | null>(null)
  return <section className="section section-projects wrap" id="projects"><Reveal><SectionHeading label="SELECTED WORK" title="A few things I&apos;ve built" subtitle="Projects built with engineering, creativity and problem-solving."/></Reveal><div className="projects-grid">{projects.map((project, i) => <Reveal key={project.number} delay={i * .07}><article className="project-card"><a className="project-preview-link" href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.title}`}><ProjectPreview type={project.visual}/><span className="project-preview-overlay" aria-hidden="true"><span>Visit Website <ArrowUpRight size={14}/></span></span></a><div className="project-content"><div className="project-overline"><span>{project.number} / {project.category}</span><span className="project-accent"/></div><h3>{project.title}</h3><p className="project-description">{project.description}</p><div className="project-tech">{project.tech.slice(0, 4).map((tech) => <span key={tech}>{tech}</span>)}{project.tech.length > 4 && <span>+{project.tech.length - 4}</span>}</div><button className="details-link" onClick={() => setActive(active === i ? null : i)} aria-expanded={active === i}>View details <ArrowRight size={15}/></button>{active === i && <div className="project-details"><h4>Highlights</h4><ul>{project.features.map((feature) => <li key={feature}><Check size={13}/>{feature}</li>)}</ul></div>}</div></article></Reveal>)}</div><p className="placeholder-note">Project links and demos can be added when they&apos;re ready to share.</p></section>
}

export function Experience({ experiences }: { experiences: PortfolioExperience[] }) {
  return <section className="section wrap" id="experience"><div className="experience-layout"><Reveal className="experience-intro"><SectionHeading label="MY JOURNEY" title="Professional experience" subtitle="A growing path across software engineering and applied AI."/><a className="button button-secondary resume-button" href="#contact">Ask me for my résumé <ArrowRight size={14}/></a></Reveal><div className="timeline">{experiences.map((item, i) => <Reveal key={`${item.role}-${item.company}`} delay={i * .09}><article className="timeline-item"><span className="timeline-marker"/><div className="timeline-role"><h3>{item.role}</h3><p>{item.company}</p></div><p className="timeline-date">{item.dates}</p><p className="timeline-detail">{item.detail}</p></article></Reveal>)}</div></div></section>
}

function WaveArt() { return <div className="wave-art" aria-hidden="true"><svg viewBox="0 0 420 220" fill="none"><path d="M18 142C87 38 144 210 218 135S330 35 401 92"/><path d="M9 160C79 56 140 225 213 153S329 54 395 110"/><path d="M2 180C72 76 132 245 207 173S324 74 389 130"/><path d="M25 123C93 21 153 192 225 116S337 17 407 74"/></svg><div className="wave-glow"/></div> }

export function About() {
  return <section className="section about-section wrap" id="about"><Reveal className="about-art"><WaveArt /></Reveal><Reveal className="about-copy"><SectionHeading label="A LITTLE ABOUT ME" title="Turning data, logic, and ideas into impact."/><p>I&apos;m a BS Computer Science graduate from Riphah International University. I love backend development, AI and creating scalable solutions that make a difference.</p><div className="interest-list">{['Backend development', 'AI & RAG', 'Problem solving', 'Innovation'].map((interest) => <span key={interest}>{interest}</span>)}</div><div className="education-card"><span className="education-icon"><Code2 size={18}/></span><div><span className="education-label">EDUCATION</span><h3>Bachelor of Science in Computer Science</h3><p>Riphah International University <span>·</span> CGPA 3.2</p></div></div></Reveal></section>
}

export function Contact({ profile }: { profile: PortfolioProfile }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (isSubmitting) return

    const form = event.currentTarget
    const formData = new FormData(form)

    setIsSubmitting(true)
    setFeedback(null)

    try {
      const result = await submitContactMessage(formData)
      if (result.ok) {
        setFeedback({ type: 'success', text: result.message })
        form.reset()
      } else {
        setFeedback({ type: 'error', text: result.error })
      }
    } catch {
      setFeedback({
        type: 'error',
        text: 'Something went wrong while sending your message. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="section contact-section wrap" id="contact">
      <div className="contact-grid">
        <Reveal className="contact-copy">
          <SectionHeading
            label="LET'S WORK TOGETHER"
            title="Have a project or opportunity in mind? Let's connect."
            subtitle="I'm always glad to hear about thoughtful projects and new opportunities."
          />
          <div className="contact-details">
            <a className="contact-item" href={`mailto:${profile.email}`}>
              <span className="contact-icon"><Mail size={16} /></span>
              <div><small>Email</small><strong>{profile.email}</strong></div>
            </a>
            <div className="contact-item">
              <span className="contact-icon"><MapPin size={16} /></span>
              <div><small>Location</small><strong>{profile.location}</strong></div>
            </div>
          </div>
        </Reveal>
        <Reveal className="contact-form-wrap" delay={0.1}>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="sr-honeypot" aria-hidden="true">
              <label>
                Leave this empty
                <input name="hp_field" type="text" tabIndex={-1} autoComplete="new-password" />
              </label>
            </div>
            <div className="form-row">
              <label>
                Full name
                <input name="name" placeholder="Your name" required minLength={2} maxLength={100} disabled={isSubmitting} />
              </label>
              <label>
                Email address
                <input name="email" type="email" placeholder="you@example.com" required maxLength={254} disabled={isSubmitting} />
              </label>
            </div>
            <label>
              Subject
              <input name="subject" placeholder="What would you like to discuss?" required minLength={2} maxLength={150} disabled={isSubmitting} />
            </label>
            <label>
              Message
              <textarea name="message" placeholder="Tell me a little about your project..." rows={5} required minLength={10} maxLength={3000} disabled={isSubmitting} />
            </label>
            <button className="button button-primary submit-button" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : <>Send message <ArrowRight size={15} /></>}
            </button>
            {feedback && (
              <p
                className={`form-note ${feedback.type === 'success' ? 'form-note-success' : 'form-note-error'}`}
                role="status"
              >
                {feedback.text}
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  )
}

export function Footer({ profile }: { profile: PortfolioProfile }) { return <footer className="footer"><div className="footer-inner wrap"><a href="#home" className="footer-brand"><span><b>{profile.name}</b><small>{profile.title}</small></span></a><p>© {new Date().getFullYear()} {profile.name}. Built with care.</p><div className="footer-actions">{profile.github && <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><GitHubMark/></a>}<a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><span className="social-letter">in</span></a><a href={`mailto:${profile.email}`} aria-label="Email"><Mail size={15}/></a><a className="back-top" href="#home" aria-label="Back to top"><ArrowUpRight size={15}/></a></div></div></footer> }
