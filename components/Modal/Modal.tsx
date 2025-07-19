'use client'
import { useEffect } from 'react'
import css from './Modal.module.css'
import { createPortal } from 'react-dom'

interface NoteModalProps {
  toClose: () => void
  children?: React.ReactNode
}

export default function Modal({ toClose, children }: NoteModalProps) {
  function handleBackdropClick(event: React.MouseEvent<HTMLDivElement>) {
    if (toClose && event.target === event.currentTarget) {
      toClose()
    }
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (toClose && event.key === 'Escape') {
        toClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [toClose])

  return createPortal(
    <div className={css.backdrop} role='dialog' aria-modal='true' onClick={handleBackdropClick}>
      <div className={css.modal}>{children}</div>
    </div>,
    document.body
  )
}