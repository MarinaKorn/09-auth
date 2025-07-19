import { getUser } from '../../../lib/api/serverApi'
import Image from 'next/image'
import Link from 'next/link'
import css from './Profile.client.module.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "User's profile",
  description: 'Profile info page',
}

export default async function ProfilePage() {
  const user = await getUser()

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href='/profile/edit' className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={
              user.avatar
                ? `${user.avatar}`
                : 'https://ac.goit.global/fullstack/react/default-avatar.jpg'
            }
            alt='User Avatar'
            width={120}
            height={120}
            className={css.avatar}
            priority
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  )
}