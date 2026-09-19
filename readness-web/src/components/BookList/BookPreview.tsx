import styles from './BookPreview.module.scss';

export default function BookPreview(props: any) {
  return (
    <a className={styles['bookpreview']} href={`/book/${props.id}`}>
      <img
        className={styles['bookpreview__cover']}
        src={`/books_covers/${props.photo_url}`}
      />
      {props.name}
    </a>
  );
}
