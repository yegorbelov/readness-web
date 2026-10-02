import styles from './NotFound.module.scss';
import { Link } from 'react-router-dom';
import { images } from '@/constants/images';

export default function NotFoundPage() {
  return (
    <div className={styles['not-found-page']}>
      <img className={styles['image']} src={images.notFound} />

      <div>
        <h4>Page Not Found</h4>
        <Link to='/' className={styles['home-page-link']}>
          Go to Home Page
        </Link>
      </div>
    </div>
  );
}
