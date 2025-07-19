import { Metadata } from 'next'
import css from './page.module.css'

export const metadata: Metadata = {
  title: 'Not-Found Page',
  description: 'Sorry, the page you’re looking for doesn’t exist.',
  openGraph: {
    title: 'Not-Found Page',
    description: 'Sorry, the page you’re looking for doesn’t exist.',
    url: 'https://07-routing-nextjs-nu-orpin.vercel.app/',
    images: [
      {
        url: 'https://www.toprankindonesia.com/wp-content/uploads/2023/10/4.-Apa-itu-404-not-Found-scaled.jpg',
        alt: '404_image',
        width: 1200,
        height: 600,
      },
    ],
  },
}

export default function NotFound() {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
    </>
  )
}