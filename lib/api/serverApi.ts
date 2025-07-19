import { cookies } from 'next/headers'
import { serverApi } from './api'
import { User } from '../../types/user'
import { Note } from '../../types/note'

export const getUser = async () => {
  const cookieStore = cookies()

  const res = await serverApi.get<User>('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  })
  return res.data
}

export const checkSession = async () => {
  const cookieStore = cookies()
  const res = await serverApi.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  })
  return res.data
}

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieStore = cookies()
  const res = await serverApi.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  })
  return res.data
}