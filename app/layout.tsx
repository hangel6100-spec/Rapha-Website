import type { Metadata } from 'next'
import { Inter, Open_Sans } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})

const openSans = Open_Sans({ 
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'RaphaMed | Professional Medical Device Distribution in Canada',
  description: 'Leading provider of professional medical devices and healthcare solutions across Canada. Trusted by healthcare facilities nationwide for quality, compliance, and reliability.',
  keywords: 'medical devices, healthcare distribution, medical supplies Canada, pharmaceutical distribution, medical equipment, healthcare solutions',
  authors: [{ name: 'RaphaMed Inc.' }],
  creator: 'RaphaMed Inc.',
  publisher: 'RaphaMed Inc.',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: 'https://www.raphamedinc.com',
    siteName: 'RaphaMed',
    title: 'RaphaMed | Professional Medical Device Distribution',
    description: 'Leading provider of professional medical devices and healthcare solutions across Canada.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/assets/cropped_circle_image (1).png" />
      </head>
      <body className={`${inter.variable} ${openSans.variable} font-body antialiased bg-clean-bg`}>
        {children}
      </body>
    </html>
  )
}
