import { create } from 'zustand'
import { NoteForPost } from '../../types/note'
import { persist } from 'zustand/middleware'

type useNoteDraftStoreType = {
  draft: NoteForPost
  setDraft: (note: NoteForPost) => void
  clearDraft: () => void
}

const initialDraft = {
  title: '',
  content: '',
  tag: 'Todo',
}

export const useNoteDraftStore = create<useNoteDraftStoreType>()(
  persist(
    set => ({
      draft: initialDraft,
      setDraft: (note: NoteForPost) => set(() => ({ draft: note })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      name: 'note-draft',
      partialize: state => ({ draft: state.draft }),
    }
  )
)