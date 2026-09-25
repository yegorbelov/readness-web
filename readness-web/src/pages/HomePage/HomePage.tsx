import styles from './HomePage.module.scss';
import BookList from '@/components/BookList/BookList';
import { images } from '@/constants/images';

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
          draggable={false}
          className={styles['reading-girl']}
          src={images.readingGirl}
        />
      </div>
      <div className={styles['main']}>
        <BookList />
      </div>
    </>
  );
}

export default HomePage;
