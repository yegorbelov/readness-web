import styles from './HomePage.module.scss';
import BookList from '@/components/BookList/BookList';

function HomePage() {
  return (
    <>
      <div className={styles['main-photo']}>
        <div className={styles['main-quote-wrapper']}>
          <span className={styles['main-quote']}>
            Recommendations you’ve <p />
            <span className={styles['emphasize']}>never</span> experienced{' '}
            <span className={styles['emphasize']}>before</span>
          </span>
        </div>
        <img
          className={styles['reading-girl']}
          src={`${import.meta.env.BASE_URL}images/reading-girl.jpg`}
        />
      </div>
      <div className={styles['main']}>
        <BookList />
      </div>
    </>
  );
}

export default HomePage;
