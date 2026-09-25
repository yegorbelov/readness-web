import { useAuth } from '@/contexts/AuthContext';
import styles from './MyBooks.module.scss';
import { getUserLibrary, removeBookFromLibrary } from '@/api/user_library';
import type { Author, Book } from '@/types/book';
import type { UserLibrary } from '@/types/user';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUserUploads } from '@/api/books';
import { publishBookRequest } from '@/api/book_requests';

export default function MyBooks() {
  const [books, setBooks] = useState<UserLibrary[]>([]);
  const [uploadedBooks, setUploadedBooks] = useState<Book[]>([]);
  const [removingId, setRemovingId] = useState<number | null>(null);
  const { user } = useAuth();

  async function handlePublishRequest(
    e: React.MouseEvent<HTMLButtonElement>,
    id: string,
  ) {
    e.preventDefault();
    e.stopPropagation();

    try {
      await publishBookRequest(id);
    } catch (error) {
      console.error('Failed to request publication:', error);
    }
  }

  useEffect(() => {
    if (!user) return;
    getUserLibrary().then(setBooks);
    getUserUploads().then(setUploadedBooks);
  }, [user]);

  function handleRemoveBook(
    e: React.MouseEvent<HTMLButtonElement>,
    id: number,
  ) {
    e.preventDefault();
    e.stopPropagation();

    setRemovingId(id);

    removeBookFromLibrary(id);

    setTimeout(() => {
      setBooks((prev) => prev.filter((b) => b.id !== id));
      setRemovingId(null);
    }, 200);
  }
  console.log(uploadedBooks);
  return (
    <div className={styles['profile-page']}>
      <div className={styles['profile-page__uploads']}>
        <h2>My uploads</h2>

        {uploadedBooks.length === 0 ? (
          <div>No uploaded books yet</div>
        ) : (
          <div className={styles['profile-page__uploads-list']}>
            {uploadedBooks.map((book) => (
              <Link
                key={book.book_id}
                to={`/book/${book.book_id}`}
                className={styles['profile-page__upload-book']}
              >
                <div className={styles['profile-page__upload-book-cover']}>
                  {book.cover_url ? (
                    <img
                      src={`${import.meta.env.VITE_API_URL}${book.cover_url}`}
                      alt={book.title}
                    />
                  ) : (
                    <div>No cover</div>
                  )}
                </div>

                <div className={styles['content']}>
                  <div className={styles['title-wrapper']}>
                    <span>{book.title}</span>
                    <button
                      onClick={(e) => handlePublishRequest(e, book.book_id)}
                    >
                      Request Publication
                    </button>

                    <span>{book.is_public ? 'Published' : 'Pending'}</span>
                  </div>

                  <span>{book.description}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <div>My Books</div>
      <div className={styles['profile-page__library']}>
        {books.map((b: UserLibrary) => {
          const authors = b.book?.authors ?? [];

          return (
            <Link
              key={b.id}
              to={`/book/${b.book.id}`}
              className={`${styles['profile-page__library-book']} ${
                removingId === b.id ? styles['removing'] : ''
              }`}
            >
              <div className={styles['profile-page__library-book-cover']}>
                <img
                  src={`${import.meta.env.BASE_URL}books_covers/${b.book.photo_url}`}
                />
              </div>
              <div className={styles['content']}>
                <div className={styles['title-wrapper']}>
                  <span>{b.book.title}</span>
                  <span>{b.book.uploaded_at}</span>
                  <button onClick={(e) => handleRemoveBook(e, b.id)}>
                    Remove
                  </button>
                </div>

                <span className={styles['authors']}>
                  {authors.length ? (
                    authors.map((author: Author, index: number) => (
                      <span key={author.id}>
                        {author.first_name} {author.last_name}
                        {index < authors.length - 1 && ',\u00A0'}
                      </span>
                    ))
                  ) : (
                    <>No Author</>
                  )}
                </span>
                <span>{b.book.description}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
