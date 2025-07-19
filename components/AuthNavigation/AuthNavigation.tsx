'use client'
import Link from 'next/link'
import css from './AuthNavigation.module.css'
import { useAuthStore } from '../../lib/store/authStore'
import { useRouter } from 'next/navigation'
import { logout } from '../../lib/api/clientApi'

export default function AuthNavigation() {
  const {
    user,
    isAuthenticated: isAuthentificated,
    setIsAuthenticated: clearIsAuthenticated,
  } = useAuthStore()
  const router = useRouter()
  const handleClick = async () => {
     await logout()
    clearIsAuthenticated(false)
    router.push('/sign-in')
  }
  return (
    <>
      {isAuthentificated && (
        <>
          <li className={css.navigationItem}>
            <Link href='/profile' prefetch={false} className={css.navigationLink}>
              Profile
            </Link>
          </li>
          <li className={css.navigationItem}>
            <p className={css.userEmail}>{user.email}</p>
            <button className={css.logoutButton} onClick={() => handleClick()}>
              Logout
            </button>
          </li>
        </>
      )}

      {!isAuthentificated && (
        <>
          <li className={css.navigationItem}>
            <Link href='/sign-in' prefetch={false} className={css.navigationLink}>
              Login
            </Link>
          </li>

          <li className={css.navigationItem}>
            <Link href='/sign-up' prefetch={false} className={css.navigationLink}>
              Sign up
            </Link>
          </li>
        </>
      )}
    </>
  )
}