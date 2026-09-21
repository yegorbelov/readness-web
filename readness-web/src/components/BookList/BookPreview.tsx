import styles from './BookPreview.module.scss';
import { Link } from 'react-router-dom';

export default function BookPreview(props: any) {
  return (
    <Link className={styles['bookpreview']} to={`/book/${props.id}`}>
      <img
        className={styles['bookpreview__cover']}
        src={`${import.meta.env.BASE_URL}/books_covers/${props.photo_url}`}
      />
      {props.name}
    </Link>
  );
}
