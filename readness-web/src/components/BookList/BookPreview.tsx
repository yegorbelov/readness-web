import styles from './BookPreview.module.scss';

export default function BookList(props: any) {
  return (
    <div className={styles['bookpreview']}>
      <img
        className={styles['bookpreview__cover']}
        src={`/readness-web/books_covers/${props.photo_url}`}
      />{' '}
      {props.name}
    </div>
  );
}
