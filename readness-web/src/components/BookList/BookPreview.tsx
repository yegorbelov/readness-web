import styles from './BookPreview.module.scss';

export default function BookList(props) {
  return (
    <div className={styles['bookpreview']}>
      <img
        className={styles['bookpreview__cover']}
        src={`src/assets/books_covers/${props.photo_url}`}
      />{' '}
      {props.name}
    </div>
  );
}
