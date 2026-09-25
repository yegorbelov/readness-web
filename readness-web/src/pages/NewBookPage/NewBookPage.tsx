import styles from './NewBookPage.module.scss';
import { createNewBook } from '@/api/books';

export default function NewBookPage() {
  async function handleCreateBook(event: SubmitEvent) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    await createNewBook({
      author_id: formData.get('author_id') as string,
      description: formData.get('description') as string,
      language_id: formData.get('language_id') as string,
      published_at: formData.get('published_at') as string,
      title: formData.get('title') as string,
    });

    console.log('GOOD');
  }
  return (
    <div className={styles['new-book-page']}>
      <form
        className={styles['new-book-page__form']}
        onSubmit={handleCreateBook}
      >
        <input name='title' placeholder='Title' />

        <input name='author_id' placeholder='Author ID' />

        <input name='language_id' placeholder='Language ID' />

        <textarea name='description' placeholder='Description' />

        <input name='published_at' type='date' />

        <button type='submit'>Create</button>
      </form>
    </div>
  );
}
