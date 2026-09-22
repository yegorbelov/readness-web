import styles from '@/styles.module.scss';
import { useParams } from 'react-router-dom';
import { fetchBookById } from '@/api/books';
import { useState, useEffect, useRef } from 'react';
import type { Book } from '@/types/book';

export default function BookPage() {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | undefined>(undefined);
  const [isDescOpen, setIsSescOpen] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;

    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(entry.boundingClientRect.top < 0);
      },
      {
        threshold: 0,
      },
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [book]);

  useEffect(() => {
    if (id) fetchBookById(Number(id)).then(setBook);
  }, [id]);

  if (!book) return <></>;

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

          <div className={styles['book-page-wrapper__desc-wrapper']}>
            <div
              className={`${styles['book-page-wrapper__desc']} ${!isDescOpen ? `${styles['book-page-wrapper__desc--closed']}` : ''}`}
            >
              {book.description}
            </div>
            <span
              className={styles['read_more']}
              onClick={() => setIsSescOpen(!isDescOpen)}
            >
              <span>read more...</span>
              <img src={`${import.meta.env.BASE_URL}/icons/arrow-down.svg`} />
            </span>
          </div>
        </div>
      </div>
      {/* <div>
        <div>References</div>
      </div> */}
    </div>
  );
}
