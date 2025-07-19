'use client'
import { useState } from 'react'
import { login, RegisterData } from '../../../lib/api/clientApi'
import css from './SignIn.client.module.css'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '../../../lib/store/authStore'

export default function SighInClient() {
  const [error, setError] = useState('')
  const { setUser, setIsAuthenticated } = useAuthStore()
  const router = useRouter()
  async function handleLogin(formData: FormData) {
    try {
      const formValues = Object.fromEntries(formData) as RegisterData
      const loginRequest = await login(formValues)
      setUser(loginRequest)
      setIsAuthenticated(true)
      router.push('/profile')
    } catch {
      setError('Invalid email or password')
    }
  }
  return (
    <main className={css.mainContent}>
      <form className={css.form} action={handleLogin}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor='email'>Email</label>
          <input id='email' type='email' name='email' className={css.input} required />
        </div>

        <div className={css.formGroup}>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            name='password'
            className={css.input}
            required
            autoComplete='current-password'
          />
        </div>

        <div className={css.actions}>
          <button type='submit' className={css.submitButton}>
            Log in
          </button>
        </div>

        <p className={css.error}>{error}</p>
      </form>
    </main>
  )
}