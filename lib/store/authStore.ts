import { create } from 'zustand'
import { User } from '../../types/user'
import { persist } from 'zustand/middleware'

type AuthStore = {
  isAuthenticated: boolean
  setIsAuthenticated: (value: boolean) => void
  setUser: (userData: User) => void
  user: User
  cleanAuth: () => void
}

const initialUserData: User = {
  email: '',
  username: '',
  avatar: '',
}

export const useAuthStore = create<AuthStore>()(
  persist(
    set => ({
      user: initialUserData,
      isAuthenticated: false,
      setIsAuthenticated: (value: boolean) => set({ isAuthenticated: value }),
      setUser: (userData: User) => set({ user: userData, isAuthenticated: true }),
      cleanAuth: () => set({ user: initialUserData, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
)