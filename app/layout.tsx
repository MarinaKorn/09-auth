import type { Metadata } from 'next'
import './globals.css'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import QueryProvider from '../components/TanStackProvider/TanStackProvider'
import { Roboto } from 'next/font/google'
import AuthProvider from '../components/AuthProvider/AuthProvider'

const roboto = Roboto({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'NoteHub - Save and find your notes easily.',
  openGraph: {
    title: 'NoteHub - Save and find your notes easily.',
    description: 'NoteHub helps organize thoughts and store important information.',
    url: 'https://07-routing-nextjs-nu-orpin.vercel.app/',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        alt: 'notehub-meta',
        width: 1200,
        height: 630,
      },
    ],
  },
}

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode
  modal: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={roboto.variable}>
        <QueryProvider>
          <AuthProvider>
            <Header />
            {children}
            {modal}
            <Footer />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  )
}