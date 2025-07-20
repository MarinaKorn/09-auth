'use client'

import { useEffect, useState } from 'react'
import { checkCurrSession, getCurrUser } from '../../lib/api/clientApi'
import { useAuthStore } from '../../lib/store/authStore'
import { ClipLoader } from 'react-spinners'
import { useRouter } from 'next/navigation'


type Props = {
  children: React.ReactNode
}

export default function AuthProvider({ children }: Props) {
  const [isLoading, setIsLoading] = useState(true)
  const { setUser, setIsAuthenticated, cleanAuth } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true)
      try {
        const res = await checkCurrSession()
        if (res) {
          const currUser = await getCurrUser()
          setUser(currUser)
          setIsAuthenticated(true)
        } else {
          cleanAuth()
        }
      } catch {
        cleanAuth()
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [setUser, setIsAuthenticated])

  if (isLoading)
    return (
      <ClipLoader
        size={50}
        cssOverride={{
          display: 'block',
          margin: '0 auto',
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 9999,
        }}
      />
    )

  return <>{children}</>
}