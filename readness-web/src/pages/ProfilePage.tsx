import { getUserLibrary, removeBookFromLibrary } from '@/api/user';
import { useAuth } from '@/contexts/AuthContext';
import styles from '@/styles.module.scss';
import type { Author } from '@/types/book';
import type { UserLibrary } from '@/types/user';
import { useEffect, useState, type ButtonHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [books, setBooks] = useState<UserLibrary[]>([]);
  const [removingId, setRemovingId] = useState<number | null>(null);

  useEffect(() => {
    if (!user) return;
    getUserLibrary(Number(user.id)).then(setBooks);
  }, [user]);
  console.log(books);

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
  return (
    <div className={styles['profile-page']}>
      <span>{user?.username}</span>
      <button onClick={logout}>Log Out</button>
      <div>My Books</div>
      <div className={styles['profile-page__library']}>
        {books.map((b: UserLibrary) => (
          <Link
            key={b.id}
            to={`/book/${b.book.id}`}
            className={`${styles['profile-page__library-book']} ${
              removingId === b.id ? styles['removing'] : ''
            }`}
          >
            <div className={styles['profile-page__library-book-cover']}>
              <img
                src={`${import.meta.env.BASE_URL}/books_covers/${b.book.photo_url}`}
              />
            </div>
            <div className={styles['content']}>
              <div className={styles['title-wrapper']}>
                <span>{b.book.title}</span>
                <button onClick={(e) => handleRemoveBook(e, b.id)}>
                  Remove
                </button>
              </div>
              <span className={styles['authors']}>
                {b?.book?.authors?.length ? (
                  b?.book?.authors?.map((author: Author, index: number) => (
                    <span key={author.id}>
                      {author.first_name} {author.last_name}
                      {index < b?.book?.authors?.length - 1 && ',\u00A0'}
                    </span>
                  ))
                ) : (
                  <>No Author</>
                )}
              </span>

              <span>{b.book.description}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
