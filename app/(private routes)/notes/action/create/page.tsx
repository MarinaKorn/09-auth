import { Metadata } from 'next'
import CreateNote from './CreateNote.client'

export const metadata: Metadata = {
  title: 'Create a New Note | NoteHUB',
  description:
    'Use this page to create a new note and categorize it for easy access and organization.',
  openGraph: {
    title: 'Create a New Note | NoteHUB',
    description: 'Add a new note to your personal collection. Choose a category and start writing!',
    url: 'https://07-routing-nextjs-nu-orpin.vercel.app/notes/action/create',
    images: [
      {
        url: 'https://cdn.prod.website-files.com/61a05ff14c09ecacc06eec05/61f59d9bcbc09e86950d63a2_illustration_1-3.png',
        alt: 'Notebook with a pen',
      },
    ],
  },
}

export default function PageForNoteCreation() {
  return <CreateNote />
}