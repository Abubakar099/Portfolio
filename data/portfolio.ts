export const personal = {
  name: "Abubakar Ghias",
  title: "Software Engineer · Backend Developer · AI Engineer",
  intro: "I build scalable backend systems, modern web applications and AI-powered solutions. I enjoy turning complex problems into reliable and practical software.",
  location: "Lahore, Pakistan",
  email: "abubakarghias750@gmail.com",
  github: "https://github.com/Abubakar099",
  linkedin: "https://linkedin.com/in/m-abubakar-b1b04821a",
}

export const navItems = [
  { label: "Home", href: "#home" }, { label: "About", href: "#about" },
  { label: "Tech Stack", href: "#stack" }, { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" }, { label: "Contact", href: "#contact" },
]

export const technologies = [
  { name: "Next.js", slug: "nextjs", mark: "N" },
  { name: "Tailwind CSS", slug: "tailwindcss", mark: "TW" },
  { name: "Aceternity UI", slug: null, mark: "A", logoUrl: "https://cdn.dribbble.com/userupload/48720081/file/7d8e3a0d109ed51250b38d5bf083330e.jpg?resize=752x&vertical=center" },
  { name: "FastAPI", slug: "fastapi", mark: "API" },
  { name: "Python", slug: "python", mark: "Py" },
  { name: "PostgreSQL", slug: "postgresql", mark: "PG" },
  { name: "SQLite", slug: "sqlite", mark: "SQ" },
  { name: "RAG", slug: null, mark: "RAG", customIcon: "rag" as const },
  { name: "GitHub", slug: "github", mark: "GH", customIcon: "github" as const },
  { name: "TypeScript", slug: "typescript", mark: "TS" },
  { name: "JavaScript", slug: "javascript", mark: "JS" },
  { name: "REST API", slug: null, mark: "API", customIcon: "restapi" as const },
  { name: "Docker", slug: "docker", mark: "D" },
  { name: "AWS Cloud", slug: null, mark: "AWS", customIcon: "aws" as const },
  { name: "Claude", slug: "claude", mark: "C" },
  { name: "Google Cloud", slug: "googlecloud", mark: "GCP" },
  { name: "Cloudflare", slug: "cloudflare", mark: "CF" },
  { name: "Git", slug: "git", mark: "Git" },
]

export const projects = [
  { number: "01", title: "AI-Powered Interview Preparation", category: "AI · RAG", description: "An AI-powered platform that generates interview questions, evaluates answers and delivers personalized feedback for more focused preparation.", features: ["AI-generated interview questions", "Coding assessment environment", "Adaptive follow-up questions", "Personalized answer feedback"], tech: ["FastAPI", "Python", "Gemini 2.5 Flash", "ChromaDB", "PostgreSQL", "Judge0"], visual: "interview", url: "https://www.google.com" },
  { number: "02", title: "TimeTrack", category: "BACKEND · PRODUCTIVITY", description: "A time-tracking application with backend REST APIs for managing and tracking time-related activities.", features: ["REST API architecture", "Time activity management", "PostgreSQL persistence"], tech: ["FastAPI", "Python", "PostgreSQL"], visual: "time", url: "https://www.google.com" },
  { number: "03", title: "Full Stack Authentication System", category: "FULL STACK · SECURITY", description: "A full-stack authentication system with secure authentication, email verification, role-based authorization and an admin dashboard.", features: ["Email verification", "Role-based authorization", "Admin dashboard"], tech: ["Next.js", "FastAPI", "PostgreSQL", "SQLAlchemy", "JWT"], visual: "auth", url: "https://www.google.com" },
]

export const experience = [
  {
    role: "Generative AI Engineer",
    company: "RSF Soft",
    dates: "Generative AI",
    detail: "Built and integrated Generative AI solutions including RAG pipelines, LLM integrations (Gemini, Claude, Qwen), embeddings, vector search, and token-efficient prompt engineering for production applications.",
  },
  {
    role: "Software Engineer",
    company: "DevsArch",
    dates: "3+ months",
    detail: "Developed and maintained full-stack web features using Next.js, FastAPI, and PostgreSQL. Built and integrated REST APIs, debugged frontend-backend issues, and tested features to improve application reliability.",
  },
  {
    role: "Agentic AI Certification",
    company: "UMT",
    dates: "Certification",
    detail: "Completed specialized training in Agentic AI, autonomous workflows, RAG systems, LLM orchestration, and scalable AI application development.",
  },
]
