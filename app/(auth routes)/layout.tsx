'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useAuthStore } from '../../lib/store/authStore'

type Props = {
  children: React.ReactNode
}

export default function AuthLayout({ children }: Props) {
  const [loading, setIsLoading] = useState(true)
  const { setIsAuthenticated } = useAuthStore()
  const router = useRouter()
  useEffect(() => {
    setIsAuthenticated(false)
    router.refresh()
    setIsLoading(false)
  }, [router, setIsAuthenticated])
  return <>{loading ? <p>Loading...</p> : <div>{children}</div>}</>
}