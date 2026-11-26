import { Analytics } from '@vercel/analytics/next'
import { Unbounded } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import './globals.css'

const unbounded = Unbounded({ subsets: ['latin'], variable: '--font-unbounded', display: 'swap', weight: ['400', '500', '600', '700'] })

export const metadata: Metadata = {
  title: 'Abubakar Ghias | Software Engineer & AI Developer',
  description: 'Portfolio of Abubakar Ghias — software engineer building scalable backend systems, modern web applications, and AI-powered products.',
  openGraph: {
    title: 'Abubakar Ghias | Software Engineer & AI Developer',
    description: 'Building intelligent software and scalable backend systems.',
    type: 'website',
  },
  generator: 'Next.js',
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${unbounded.variable} antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
