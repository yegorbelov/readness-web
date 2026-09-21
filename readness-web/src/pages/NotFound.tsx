import styles from '@/styles.module.scss';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className={styles['not-found-page']}>
      <div>Page Not Found</div>
      <Link to='/' className={styles['home-page-link']}>
        Go to Home Page
      </Link>
    </div>
  );
}
