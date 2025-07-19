'use client'
import { useState } from 'react'
import css from './SearchBox.module.css'

interface SearchBoxProps {
  getValue: (value: string) => void
}

export default function SearchBox({ getValue }: SearchBoxProps) {
  const [inputValue, setInputValue] = useState('')

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newValue = event.target.value
    setInputValue(newValue)
    getValue(newValue)
  }

  return (
    <input
      value={inputValue}
      onChange={handleChange}
      className={css.input}
      type='text'
      placeholder='Search notes'
    />
  )
}