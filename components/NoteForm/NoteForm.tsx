'use client'
import css from './NoteForm.module.css'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { NoteForPost } from '../../types/note'
import { useNoteDraftStore } from '../../lib/store/noteStore'
import React from 'react'
import { postNote } from '../../lib/api/clientApi'

interface NoteFormProps {
  onClose: () => void
}

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (noteForPost: NoteForPost) => postNote(noteForPost),
    onError: () => {
      toast.error('There was an error while creating.')
    },
    onSuccess: () => {
      toast.success('The note successfully created.')
      queryClient.invalidateQueries({ queryKey: ['notes'] })
      onClose()
      clearDraft()
    },
  })

  const { draft, setDraft, clearDraft } = useNoteDraftStore()

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const noteData = {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      tag: formData.get('tag') as string,
    }

    mutation.mutate(noteData)
    event.currentTarget.reset()
  }

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    })
  }

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor='title'>Title</label>
        <input
          id='title'
          type='text'
          name='title'
          className={css.input}
          defaultValue={draft?.title}
          onChange={handleChange}
        />
        <span className={css.error} />
      </div>

      <div className={css.formGroup}>
        <label htmlFor='content'>Content</label>
        <textarea
          id='content'
          name='content'
          rows={8}
          className={css.textarea}
          defaultValue={draft?.content}
          onChange={handleChange}
        />
        <span className={css.error} />
      </div>

      <div className={css.formGroup}>
        <label htmlFor='tag'>Category Id</label>
        <select
          id='tag'
          name='tag'
          className={css.select}
          defaultValue={draft?.tag}
          onChange={handleChange}
        >
          <option value='' disabled>
            Select category
          </option>
          <option value='Todo'>Todo</option>
          <option value='Work'>Work</option>
          <option value='Personal'>Personal</option>
          <option value='Meeting'>Meeting</option>
          <option value='Shopping'>Shopping</option>
        </select>
        <span className={css.error} />
      </div>

      <div className={css.actions}>
        <button onClick={() => onClose()} type='button' className={css.cancelButton}>
          Cancel
        </button>
        <button type='submit' className={css.submitButton} disabled={false}>
          Create note
        </button>
      </div>
    </form>
  )
}