'use client'

import { useState } from 'react'
import { register, RegisterData } from '../../../lib/api/clientApi'
import css from './SignUp.client.module.css'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '../../../lib/store/authStore'

export default function SignUpClientPage() {
  const { setUser, setIsAuthenticated } = useAuthStore()
  const [error, setError] = useState('')
  const router = useRouter()
  async function handleSubmit(formData: FormData) {
    try {
      const formValues = Object.fromEntries(formData) as RegisterData
      const registerRequest = await register(formValues)
      setIsAuthenticated(true)
      setUser(registerRequest)
      router.push('/profile')
    } catch (error) {
      console.log(error)
      setError('Some error')
    }
  }
  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form className={css.form} action={handleSubmit}>
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
            autoComplete='new-password'
          />
        </div>

        <div className={css.actions}>
          <button type='submit' className={css.submitButton}>
            Register
          </button>
        </div>

        <p className={css.error}>{error}</p>
      </form>
    </main>
  )
}