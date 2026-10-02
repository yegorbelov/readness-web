import { useEffect, useRef, useState } from 'react';

import type { SubmitEvent } from 'react';

import styles from './NewBookPage.module.scss';

import { createNewBook, uploadBookCover, uploadBookFile } from '@/api/books';
import { fetchLanguages } from '@/api/languages';
import { fetchAuthors } from '@/api/authors';

import { type Author, type Language } from '@/types/book';

import Dropdown from '@/components/ui/Dropdown/Dropdown';
import Calendar from '@/components/ui/Calendar/Calendar';
import Button from '@/components/ui/Button/Button';

import { Link } from 'react-router-dom';

export default function NewBookPage() {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);

  const [isCreating, setIsCreating] = useState(false);
  const [isCreated, setIsCreated] = useState(false);

  const [publishedAt, setPublishedAt] = useState('');

  const coverInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchLanguages().then(setLanguages);
    fetchAuthors().then(setAuthors);
  }, []);

  async function handleCreateBook(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const cover = formData.get('cover');

    if (!(cover instanceof File) || cover.size === 0) {
      coverInputRef.current?.focus();
      return;
    }

    try {
      setIsCreating(true);

      const authorIds = formData.getAll('author_id') as string[];

      const { book_id } = await createNewBook({
        author_ids: authorIds,
        description: formData.get('description') as string,
        language_id: formData.get('language_id') as string,
        published_at: publishedAt,
        title: formData.get('title') as string,
      });

      const file = formData.get('file');

      if (file instanceof File && file.size > 0) {
        await uploadBookFile(book_id, file);
      }

      await uploadBookCover(book_id, cover);

      setIsCreated(true);
    } catch (error) {
      console.error('Failed to create book:', error);
    } finally {
      setIsCreating(false);
    }
  }

  function handleFormChange() {
    setIsCreated(false);
  }

  return (
    <div className={styles['new-book-page']}>
      <form
        className={styles['new-book-page__form']}
        onSubmit={handleCreateBook}
        onChange={handleFormChange}
      >
        <input name='title' placeholder='Title' required />

        <div className={styles['field']}>
          <Dropdown
            isMultiple={true}
            list={authors}
            name='author_id'
            getValue={(author) => author.author_id}
            getLabel={(author) => `${author.first_name} ${author.last_name}`}
            placeholder='Select authors'
          />

          <Button type='button'>
            <Link to='/authors/new'>Create Author</Link>
          </Button>
        </div>

        <Dropdown
          isMultiple={false}
          list={languages}
          name='language_id'
          getValue={(language) => language.language_id}
          getLabel={(language) => language.name}
          placeholder='Select language'
        />

        <textarea name='description' placeholder='Description' />

        <Calendar value={publishedAt} onChange={setPublishedAt} />

        <input type='hidden' name='published_at' value={publishedAt} required />

        <Button
          type='button'
          onClick={() => coverInputRef.current?.click()}
          disabled={isCreating || isCreated}
        >
          Cover
        </Button>

        <input
          ref={coverInputRef}
          name='cover'
          type='file'
          accept='image/jpeg,image/png,image/webp'
          hidden
          required
        />

        <Button
          type='button'
          onClick={() => fileInputRef.current?.click()}
          disabled={isCreating || isCreated}
        >
          Book file (PDF)
        </Button>

        <input
          ref={fileInputRef}
          name='file'
          type='file'
          accept='application/pdf,.pdf'
          hidden
        />

        <div className={styles['new-book-page__button-section']}>
          <button type='button' disabled={isCreating || isCreated}>
            Cancel
          </button>

          <button type='submit' disabled={isCreating || isCreated}>
            {isCreating ? 'Creating...' : isCreated ? 'Created' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
}
