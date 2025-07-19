'use client'

import { useQuery } from '@tanstack/react-query'
import css from './NoteDetails.module.css'
import { Note } from '../../../../types/note'
import { fetchCurrNoteById } from '../../../../lib/api/clientApi'
import { useRouter } from 'next/navigation'

export default function NoteDetailsClient({ id }: { id: string }) {
  const router = useRouter()
  const {
    data: note,
    isLoading,
    error,
  } = useQuery<Note>({
    queryKey: ['note-details', id],
    queryFn: () => fetchCurrNoteById(id),
    refetchOnMount: false,
  })

  if (isLoading) return <p>Loading, please wait...</p>
  if (error || !note) return <p>Something went wrong.</p>
  return (
    <>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
            <button
              className={css.editBtn}
              onClick={() => {
                router.back()
              }}
            >
              Back
            </button>
          </div>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>{new Date(note.createdAt).toLocaleDateString('uk-UA')}</p>
        </div>
      </div>
    </>
  )
}