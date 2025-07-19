'use client'
import Link from 'next/link'
import css from './SidebarNotes.module.css'
import { useQuery } from '@tanstack/react-query'
import { getNotes } from '../../lib/api/clientApi'

export default function SidebarNotes() {
  const { data } = useQuery({
    queryKey: ['note-tag'],
    queryFn: () => getNotes('', 1),
    refetchOnMount: false,
  })
  const uniqueTags = [...new Set(data?.notes.map(note => note.tag))]
  return (
    <ul className={css.menuList}>
      <li key='All' className={css.menuItem}>
        <Link href={`/notes/filter/All`} className={css.menuLink}>
          All
        </Link>
      </li>
      {data?.notes &&
        uniqueTags.map(tag => {
          return (
            <li key={tag} className={css.menuItem}>
              <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
                {tag}
              </Link>
            </li>
          )
        })}
    </ul>
  )
}