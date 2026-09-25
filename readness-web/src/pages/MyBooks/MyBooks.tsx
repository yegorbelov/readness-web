import { useAuth } from '@/contexts/AuthContext';
import styles from './MyBooks.module.scss';
import { getUserLibrary, removeBookFromLibrary } from '@/api/user_library';
import type { Author, Book } from '@/types/book';
import type { UserLibrary } from '@/types/user';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUserUploads, removeBook } from '@/api/books';
import { publishBookRequest } from '@/api/book_requests';

export default function MyBooks() {
  const [books, setBooks] = useState<UserLibrary[]>([]);
  const [uploadedBooks, setUploadedBooks] = useState<Book[]>([]);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const { user } = useAuth();
  console.log(books);

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

  function handleRemoveLibraryBook(
    e: React.MouseEvent<HTMLButtonElement>,
    id: string,
  ) {
    e.preventDefault();
    e.stopPropagation();

    setRemovingId(id);

    removeBookFromLibrary(id);

    setTimeout(() => {
      setBooks((prev) => prev.filter((b) => b.book_id !== id));
      setRemovingId(null);
    }, 200);
  }

  function handleEditBook(e: React.MouseEvent<HTMLButtonElement>, id: string) {
    e.preventDefault();
    e.stopPropagation();
  }

  function handleRemoveBook(
    e: React.MouseEvent<HTMLButtonElement>,
    id: string,
  ) {
    e.preventDefault();
    e.stopPropagation();

    setRemovingId(id);

    removeBook(id);

    setTimeout(() => {
      setUploadedBooks((prev) => prev.filter((b) => b.book_id !== id));
      setRemovingId(null);
    }, 200);
  }

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
                      className={styles['profile-page__publish-request']}
                      onClick={(e) => handlePublishRequest(e, book.book_id)}
                    >
                      Request Publication
                    </button>

                    <button
                      className={styles['profile-page__publish-request']}
                      onClick={(e) => handleRemoveBook(e, book.book_id)}
                    >
                      Remove book
                    </button>

                    <button>Edit</button>

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
          console.log('b', b);

          return (
            <Link
              key={b.id}
              to={`/book/${b.book?.book_id}`}
              className={`${styles['profile-page__library-book']} ${
                removingId === b.id ? styles['removing'] : ''
              }`}
            >
              <div className={styles['profile-page__library-book-cover']}>
                <img src={`${import.meta.env.BASE_URL}${b.book?.cover_url}`} />
              </div>
              <div className={styles['content']}>
                <div className={styles['title-wrapper']}>
                  <span>{b.book?.title}</span>
                  <span>{b.book?.uploaded_at}</span>
                  <button onClick={(e) => handleRemoveLibraryBook(e, b.id)}>
                    Remove
                  </button>
                </div>

                <span className={styles['authors']}>
                  {authors.length ? (
                    authors.map((author: Author, index: number) => (
                      <span key={author.author_id}>
                        {author.first_name} {author.last_name}
                        {index < authors.length - 1 && ',\u00A0'}
                      </span>
                    ))
                  ) : (
                    <>No Author</>
                  )}
                </span>
                <span>{b.book?.description}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
