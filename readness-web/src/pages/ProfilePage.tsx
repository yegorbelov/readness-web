import { getUserLibrary } from '@/api/user';
import { useAuth } from '@/contexts/AuthContext';
import styles from '@/styles.module.scss';
import type { Book } from '@/types/book';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    if (!user) return;
    getUserLibrary(Number(user.id)).then(setBooks);
  }, [user]);

  return (
    <div className={styles['profile-page']}>
      <span>{user?.username}</span>
      <button onClick={logout}>Log Out</button>
      <div>My Books</div>
      <div className={styles['profile-page__library']}>
        {books.map((b) => (
          <Link
            to={`/book/${b.book.id}`}
            className={styles['profile-page__library-book']}
          >
            <div className={styles['profile-page__library-book-cover']}>
              <img
                src={`${import.meta.env.BASE_URL}/books_covers/${b.book.photo_url}`}
              />
            </div>
            <span>{b.book.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
