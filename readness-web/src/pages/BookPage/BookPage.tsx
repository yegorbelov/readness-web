import styles from './BookPage.module.scss';
import { useParams } from 'react-router-dom';
import { fetchBookById } from '@/api/books';
import { useState, useEffect, useRef } from 'react';
import type { Author, BookDetails } from '@/types/book';
import { useAuth } from '@/contexts/AuthContext';
import { addBookToLibrary, removeBookFromLibrary } from '@/api/user_library';
import type { UserLibrary } from '@/types/user';

export default function BookPage() {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<BookDetails | undefined>(undefined);
  const [isDescOpen, setIsDescOpen] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  const { user } = useAuth();

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
        console.log(e);
        setBook(e);
      });
  }, [id, user]);

  function handleAddToList() {
    if (book.added_at) {
      removeBookFromLibrary(Number(book.library_id)).then((e) => {
        setBook((prev) => (prev ? { ...prev, added_at: undefined } : prev));
      });
    } else {
      addBookToLibrary(Number(id), user.id).then((r: UserLibrary) => {
        setBook((prev) =>
          prev ? { ...prev, added_at: r.added_at, library_id: r.id } : prev,
        );
      });
    }
  }

  const isPublic = book?.is_public ?? true;

  if (!book || (!isPublic && book?.uploaded_by?.id !== user?.id)) return <></>;

  const authors = book.authors ?? [];

  return (
    <div className={styles['book-page-wrapper']}>
      <img
        className={styles['book-page-wrapper__bg']}
        src={`${import.meta.env.BASE_URL}/books_covers/${book.photo_url}`}
      />
      <div className={styles['book-page-wrapper__main']}>
        <div className={styles['book-page-wrapper__cover-wrapper']}>
          <img
            className={styles['book-page-wrapper__cover']}
            src={`${import.meta.env.BASE_URL}/books_covers/${book.photo_url}`}
          />
          <img
            className={styles['book-page-wrapper__cover-blur']}
            src={`${import.meta.env.BASE_URL}/books_covers/${book.photo_url}`}
          />
        </div>
        <div ref={sentinelRef} className={styles['sentinel']}></div>

        <div className={styles['book-page-wrapper__content']}>
          <div
            className={`${styles['book-page-wrapper__title']} ${isSticky ? styles['book-page-wrapper__title--stuck'] : ''}`}
          >
            {book.title}
          </div>
          <button
            onClick={handleAddToList}
            className={styles['book-page-wrapper__add-to-list']}
          >
            <div
              className={`${styles['book-page-wrapper__heart']} ${book.added_at ? styles['book-page-wrapper__heart--active'] : ''}`}
              style={{
                '--heart-mask': `url(${import.meta.env.BASE_URL}icons/heart.svg)`,
              }}
            />
            {book.added_at ? 'remove from list' : 'add to list'}
          </button>
          <div className={styles['authors-wrapper']}>
            {authors.map((author: Author, index: number) => (
              <span key={author.id}>
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
                src={`${import.meta.env.BASE_URL}/icons/arrow-down.svg`}
              />
            </button>
          </div>
        </div>
      </div>
      {/* <div>
        <div>References</div>
      </div> */}
    </div>
  );
}
