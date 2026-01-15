import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'RaphaMed | Professional Health & Wellness Solutions',
  description: 'RaphaMed provides professional, reliable health and wellness solutions built on trust, safety, and excellence.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">{children}</body>
    </html>
  )
}
