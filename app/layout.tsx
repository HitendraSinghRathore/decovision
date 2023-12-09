
import type { Metadata } from 'next'
import './globals.css'


export const metadata: Metadata = {
  title: 'Deco Vision',
  description: 'App to help you decorate your home with AI',
  keywords: 'decoration, home design, AI, interior design',
  robots: 'index, follow',
  icons: {
    icon: '/images/favicon.ico'
  }

}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">

      <body>{children}</body>
    </html>
  )
}
