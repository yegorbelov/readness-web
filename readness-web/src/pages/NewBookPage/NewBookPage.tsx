import { useEffect, useState } from 'react';

import styles from './NewBookPage.module.scss';

import { createNewBook, uploadBookCover, uploadBookFile } from '@/api/books';

import { fetchLanguages } from '@/api/languages';
import { fetchAuthors } from '@/api/authors';

import { type Author, type Language } from '@/types/book';

export default function NewBookPage() {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);

  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchLanguages().then(setLanguages);
    fetchAuthors().then(setAuthors);
  }, []);

  async function handleCreateBook(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    try {
      setIsCreating(true);

      // 1. Сначала создаём книгу
      const { book_id } = await createNewBook({
        author_id: formData.get('author_id') as string,
        description: formData.get('description') as string,
        language_id: formData.get('language_id') as string,
        published_at: formData.get('published_at') as string,
        title: formData.get('title') as string,
      });

      // 2. Потом загружаем PDF, если он выбран
      const file = formData.get('file');

      if (file instanceof File && file.size > 0) {
        await uploadBookFile(book_id, file);
      }

      // 3. Потом загружаем обложку, если она выбрана
      const cover = formData.get('cover');

      if (cover instanceof File && cover.size > 0) {
        await uploadBookCover(book_id, cover);
      }

      console.log('Book created:', book_id);
    } catch (error) {
      console.error('Failed to create book:', error);
    } finally {
      setIsCreating(false);
    }
  }

  return (
    <div className={styles['new-book-page']}>
      <form
        className={styles['new-book-page__form']}
        onSubmit={handleCreateBook}
      >
        <input name='title' placeholder='Title' required />

        <select name='author_id' defaultValue='' required>
          <option value='' disabled>
            Select author
          </option>

          {authors.map((author) => (
            <option key={author.author_id} value={author.author_id}>
              {author.first_name} {author.last_name}
            </option>
          ))}
        </select>

        <select name='language_id' defaultValue='' required>
          <option value='' disabled>
            Select language
          </option>

          {languages.map((language) => (
            <option key={language.language_id} value={language.language_id}>
              {language.name}
            </option>
          ))}
        </select>

        <textarea name='description' placeholder='Description' />

        <input name='published_at' type='date' required />

        <label>
          Cover
          <input
            name='cover'
            type='file'
            accept='image/jpeg,image/png,image/webp'
          />
        </label>

        <label>
          Book file
          <input name='file' type='file' accept='application/pdf,.pdf' />
        </label>

        <button type='submit' disabled={isCreating}>
          {isCreating ? 'Creating...' : 'Create'}
        </button>
      </form>
    </div>
  );
}
