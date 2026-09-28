import { useEffect, useState } from 'react';
import type { SubmitEvent } from 'react';

import styles from './NewBookPage.module.scss';

import { createNewBook, uploadBookCover, uploadBookFile } from '@/api/books';

import { createLanguage, fetchLanguages } from '@/api/languages';
import { fetchAuthors } from '@/api/authors';

import { type Author, type Language } from '@/types/book';
import Dropdown from '@/components/Dropdown/Dropdown';
import Modal from '@/components/Modal/Modal';
import Calendar from '@/components/Calendar/Calendar';

export default function NewBookPage() {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);

  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchLanguages().then(setLanguages);
    fetchAuthors().then(setAuthors);
  }, []);

  function handleAddLanguage(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    return createLanguage({ name: formData.get('name') });
  }

  async function handleCreateBook(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    try {
      setIsCreating(true);

      const authorIds = formData.getAll('author_id') as string[];

      const { book_id } = await createNewBook({
        author_ids: authorIds,
        description: formData.get('description') as string,
        language_id: formData.get('language_id') as string,
        published_at: publishedAt as string,
        title: formData.get('title') as string,
      });

      const file = formData.get('file');

      if (file instanceof File && file.size > 0) {
        await uploadBookFile(book_id, file);
      }

      const cover = formData.get('cover');

      if (cover instanceof File && cover.size > 0) {
        await uploadBookCover(book_id, cover);
      }
    } catch (error) {
      console.error('Failed to create book:', error);
    } finally {
      setIsCreating(false);
    }
  }
  const [publishedAt, setPublishedAt] = useState('');

  return (
    <div className={styles['new-book-page']}>
      <form onSubmit={handleAddLanguage}>
        <input name='name' placeholder='name' />
        <button type='submit'>Add Language</button>
      </form>
      <form
        className={styles['new-book-page__form']}
        onSubmit={handleCreateBook}
      >
        <input name='title' placeholder='Title' required />

        <Dropdown
          isMultiple={true}
          list={authors}
          name='author_id'
          getValue={(author) => author.author_id}
          getLabel={(author) => `${author.first_name} ${author.last_name}`}
        />

        <Dropdown
          isMultiple={false}
          list={languages}
          name='language_id'
          getValue={(language) => language.language_id}
          getLabel={(language) => `${language.name}`}
        />

        <textarea name='description' placeholder='Description' />

        <Calendar value={publishedAt} onChange={setPublishedAt} />
        <input type='hidden' name='published_at' value={publishedAt} required />

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
        <div className={styles['new-book-page__button-section']}>
          <button type='button' disabled={isCreating}>
            Cancel
          </button>
          <button type='submit' disabled={isCreating}>
            {isCreating ? 'Creating...' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
}
