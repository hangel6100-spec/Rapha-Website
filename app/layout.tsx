import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'RaphaMed - Medical Solutions',
  description: 'Your trusted partner in medical solutions',
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
