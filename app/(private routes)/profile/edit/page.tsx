'use client'

import Image from 'next/image'
import css from './edit.module.css'
import { useAuthStore } from '../../../../lib/store/authStore'
import { useRouter } from 'next/navigation'
import { updateUser } from '../../../../lib/api/clientApi'

type UpdatedInfo = {
  username: string
}

export default function EditPage() {
  const { user, setUser } = useAuthStore()
  const router = useRouter()

  async function handleSubmitUser(formData: FormData) {
    const formValue = Object.fromEntries(formData) as UpdatedInfo

    const payload = {
      username: formValue.username,
    }

    const { data } = await updateUser(payload)

    if (data) setUser(data)

    router.push('/profile')
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src='https://ac.goit.global/fullstack/react/default-avatar.jpg'
          alt='User Avatar'
          width={120}
          height={120}
          className={css.avatar}
          priority
        />

        <form className={css.profileInfo} action={handleSubmitUser}>
          <div className={css.usernameWrapper}>
            <label htmlFor='username'>Username:</label>
            <input
              id='username'
              name='username'
              type='text'
              className={css.input}
              defaultValue={user.username}
            />
          </div>

          <p>Email: {user.email}</p>

          <div className={css.actions}>
            <button type='submit' className={css.saveButton}>
              Save
            </button>
            <button type='button' className={css.cancelButton} onClick={() => router.back()}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}