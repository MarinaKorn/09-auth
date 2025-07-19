import css from '../filter/[...slug]/Notes.client.module.css'
type Props = {
  children: React.ReactNode
  sidebar: React.ReactNode
}

const NotesLayout = ({ children, sidebar }: Props) => {
  return (
    <section className={css.container}>
      <div className={css.sidebar}>{sidebar}</div>
      <div>{children}</div>
    </section>
  )
}

export default NotesLayout