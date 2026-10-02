import styles from './BookPage.module.scss';
import { useParams } from 'react-router-dom';
import { downloadBookFile, fetchBookById, uploadBookFile } from '@/api/books';
import { useState, useEffect, useRef } from 'react';
import type { Author, BookDetails } from '@/types/book';
import { useAuth } from '@/contexts/AuthContext';
import { addBookToLibrary, removeBookFromLibrary } from '@/api/user_library';
import Button from '@/components/ui/Button/Button';

export default function BookPage() {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<BookDetails | undefined>(undefined);
  const [isDescOpen, setIsDescOpen] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  const { user, isLoggedIn } = useAuth();
  const [isDownloading, setIsDownloading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const descRef = useRef<HTMLDivElement>(null);
  const [descHeight, setDescHeight] = useState(0);

  useEffect(() => {
    const element = descRef.current;

    if (!element) return;

    const updateHeight = () => {
      setDescHeight(element.scrollHeight);
    };

    updateHeight();

    const observer = new ResizeObserver(() => {
      updateHeight();
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, [book?.description]);
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

          <div className={styles['book-page-wrapper__pdf-wrapper']}>
            <label
              className={styles['book-page-wrapper__upload']}
              aria-disabled={isUploading}
            >
              <span>{isUploading ? 'uploading...' : 'upload PDF'}</span>

              <input
                type='file'
                accept='application/pdf,.pdf'
                onChange={handleUpload}
                disabled={isUploading}
              />
            </label>
            {isOwner && (
              <Button
                type='button'
                onClick={handleDownload}
                disabled={isDownloading}
                className={styles['book-page-wrapper__upload']}
              >
                {isDownloading ? 'downloading...' : 'download PDF'}
              </Button>
            )}
          </div>

          <Button onClick={handleAddToList}>
            <div
              className={`${styles['book-page-wrapper__heart']} ${book.saved_at ? styles['book-page-wrapper__heart--active'] : ''}`}
              style={
                {
                  '--heart-mask': `url(${import.meta.env.BASE_URL}icons/heart.svg)`,
                } as React.CSSProperties
              }
            />
            {book.saved_at ? 'remove from list' : 'add to list'}
          </Button>
          <div className={styles['authors-wrapper']}>
            {authors.map((author: Author, index: number) => (
              <span key={author.author_id}>
                {author.first_name} {author.last_name}
                {index < authors.length - 1 && ',\u00A0'}
              </span>
            ))}
          </div>
          <div>Uploaded By {book.uploaded_by}</div>

          <div
            style={{
              maxHeight: isDescOpen
                ? `${descHeight}px`
                : `${Math.min(descHeight, 200)}px`,
            }}
            className={`${styles['book-page-wrapper__desc-wrapper']} ${isDescOpen ? styles['book-page-wrapper__desc-wrapper--open'] : ''}`}
          >
            <div
              className={`${styles['mask']} ${isDescOpen || descHeight <= 200 ? styles['mask--open'] : ''}`}
            >
              <div
                ref={descRef}
                className={`${styles['book-page-wrapper__desc']} ${!isDescOpen ? `${styles['book-page-wrapper__desc--closed']}` : ''}`}
              >
                {book.description}
              </div>
            </div>
            {descHeight > 200 && (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
