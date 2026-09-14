import BookPreview from './BookPreview';
import styles from './BookList.module.scss';

export function BookList() {
  const books = [
    {
      id: 1,
      name: 'The Looming Tower: Al-Qaeda and the Road to 9/11',
      photo_url: 'The-Looming-Tower.png',
    },
    { id: 2, name: 'Run Away With Me', photo_url: 'Run_Away_With_Me.png' },
    {
      id: 3,
      name: 'I Am, I Am, I Am: Seventeen Brushes With Death',
      photo_url: 'I Am, I Am.png',
    },
    { id: 4, name: 'Last Acts', photo_url: 'Last Acts.png' },
  ];
  return (
    <div className={styles['booklist']}>
      {books.map((book) => (
        <BookPreview
          key={book.id}
          name={book.name}
          photo_url={book.photo_url}
        />
      ))}
    </div>
  );
}
