'use client'

import css from './Notes.client.module.css'
import React, { useState } from 'react'
import { useDebounce } from 'use-debounce'
import { Toaster } from 'react-hot-toast'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import SearchBox from '../../../../../components/SearchBox/SearchBox'
import Pagination from '../../../../../components/Pagination/Pagination'
import NoteList from '../../../../../components/NoteList/NoteList'
import Link from 'next/link'
import { getNotes } from '../../../../../lib/api/clientApi'

type NotesClientProps = {
  tag?: string
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState(1)
  const [searchedValue, setSearchedValue] = useState('')
  const [debouncedText] = useDebounce(searchedValue, 300)

  const { data, isFetching } = useQuery({
    queryKey: ['notes', debouncedText, page, tag],
    queryFn: () => getNotes(debouncedText, page, tag),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  })

  const getHandleSearch = (value: string) => {
    setSearchedValue(value)
    setPage(1)
  }

  return (
    <div className={css.app}>
      <Toaster />
      <header className={css.toolbar}>
        <SearchBox getValue={getHandleSearch} />

        {data?.totalPages && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={page}
            onPageChange={newPage => {
              if (newPage !== page) {
                setPage(newPage)
              }
            }}
          />
        )}

        <Link href={'/notes/action/create'} className={css.button}>
          Create note +
        </Link>
      </header>

      {isFetching && <p>Loading...</p>}

      {data?.notes?.length === 0 && !isFetching && <p>There are no notes found for your request</p>}

     {Array.isArray(data?.notes) && data.notes.length > 0 && <NoteList notes={data.notes} />}

    </div>
  )
}