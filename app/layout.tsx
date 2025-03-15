import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PuMi',
  description: 'PuMi is a tool for product managers to collect and analyze feedback from various sources.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
