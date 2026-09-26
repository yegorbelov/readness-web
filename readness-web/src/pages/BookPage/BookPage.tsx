import styles from './BookPage.module.scss';
import { useParams } from 'react-router-dom';
import { downloadBookFile, fetchBookById, uploadBookFile } from '@/api/books';
import { useState, useEffect, useRef } from 'react';
import type { Author, BookDetails } from '@/types/book';
import { useAuth } from '@/contexts/AuthContext';
import { addBookToLibrary, removeBookFromLibrary } from '@/api/user_library';

export default function BookPage() {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<BookDetails | undefined>(undefined);
  const [isDescOpen, setIsDescOpen] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  const { user } = useAuth();
  const [isDownloading, setIsDownloading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file || !id) return;

    if (file.type !== 'application/pdf') {
      alert('Please select a PDF file');
      event.target.value = '';
      return;
    }

    try {
      setIsUploading(true);

      await uploadBookFile(id, file);

      const updatedBook = await fetchBookById(id);
      setBook(updatedBook);
    } catch (error) {
      console.error('Failed to upload book:', error);
    } finally {
      setIsUploading(false);
      event.target.value = '';
    }
  }

  async function handleDownload() {
    if (!id) return;

    try {
      setIsDownloading(true);
      await downloadBookFile(id);
    } catch (error) {
      console.error('Failed to download book:', error);
    } finally {
      setIsDownloading(false);
    }
  }

  useEffect(() => {
    const sentinel = sentinelRef.current;

    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(entry.boundingClientRect.top < 0);
      },
      {
        threshold: 0,
        rootMargin: '-0px 0px 0px 0px',
      },
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [book]);

  useEffect(() => {
    if (id)
      fetchBookById(id).then((e) => {
        setBook(e);
      });
  }, [id, user]);

  function handleAddToList() {
    console.log('click');
    if (book?.saved_at) {
      removeBookFromLibrary(book.book_id).then((e) => {
        setBook((prev) => (prev ? { ...prev, saved_at: undefined } : prev));
      });
    } else {
      addBookToLibrary(id).then((r: UserLibrary) => {
        setBook((prev) =>
          prev ? { ...prev, saved_at: '1', library_id: '1' } : prev,
        );
      });
    }
  }

  const isPublic = book?.is_public ?? true;
  const isOwner = book?.uploaded_by?.id === user?.id;
  // const hasPdf = Boolean(book?.file_url);

  if (!book || (!isPublic && book?.uploaded_by?.id !== user?.id)) return <></>;

  const authors = book.authors ?? [];
  // console.log(book);

  return (
    <div className={styles['book-page-wrapper']}>
      <img
        className={styles['book-page-wrapper__bg']}
        src={`${import.meta.env.VITE_API_URL}${book.cover_url}`}
      />
      <div className={styles['book-page-wrapper__main']}>
        <div className={styles['book-page-wrapper__cover-wrapper']}>
          <img
            className={styles['book-page-wrapper__cover']}
            src={`${import.meta.env.VITE_API_URL}${book.cover_url}`}
          />
          <img
            className={styles['book-page-wrapper__cover-blur']}
            src={`${import.meta.env.VITE_API_URL}${book.cover_url}`}
          />
        </div>
        <div ref={sentinelRef} className={styles['sentinel']}></div>

        <div className={styles['book-page-wrapper__content']}>
          <div
            className={`${styles['book-page-wrapper__title']} ${isSticky ? styles['book-page-wrapper__title--stuck'] : ''}`}
          >
            {book.title}
          </div>
          <label className={styles['book-page-wrapper__upload']}>
            {isUploading ? 'uploading...' : 'upload PDF'}

            <input
              type='file'
              accept='application/pdf,.pdf'
              onChange={handleUpload}
              disabled={isUploading}
              hidden
            />
          </label>
          {isOwner && (
            <button
              type='button'
              onClick={handleDownload}
              disabled={isDownloading}
              className={styles['book-page-wrapper__download']}
            >
              {isDownloading ? 'downloading...' : 'download PDF'}
            </button>
          )}
          <button
            onClick={handleAddToList}
            className={styles['book-page-wrapper__add-to-list']}
          >
            <div
              className={`${styles['book-page-wrapper__heart']} ${book.saved_at ? styles['book-page-wrapper__heart--active'] : ''}`}
              style={
                {
                  '--heart-mask': `url(${import.meta.env.BASE_URL}icons/heart.svg)`,
                } as React.CSSProperties
              }
            />
            {book.saved_at ? 'remove from list' : 'add to list'}
          </button>
          <div className={styles['authors-wrapper']}>
            {authors.map((author: Author, index: number) => (
              <span key={author.author_id}>
                {author.first_name} {author.last_name}
                {index < authors.length - 1 && ',\u00A0'}
              </span>
            ))}
          </div>

          <div
            className={`${styles['book-page-wrapper__desc-wrapper']} ${isDescOpen ? styles['book-page-wrapper__desc-wrapper--open'] : ''}`}
          >
            <div
              className={`${styles['mask']} ${isDescOpen ? styles['mask--open'] : ''}`}
            >
              <div
                className={`${styles['book-page-wrapper__desc']} ${!isDescOpen ? `${styles['book-page-wrapper__desc--closed']}` : ''}`}
              >
                {book.description}
              </div>
            </div>
            <button
              className={`${styles['read_more']} ${isDescOpen ? styles['read_more--open'] : ''}`}
              onClick={() => setIsDescOpen(!isDescOpen)}
            >
              <span>{`read ${isDescOpen ? 'less' : 'more...'}`}</span>
              <img
                className={`${styles['read_more__arrow']}`}
                src={`${import.meta.env.BASE_URL}icons/arrow-down.svg`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
