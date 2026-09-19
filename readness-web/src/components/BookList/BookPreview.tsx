import styles from './BookPreview.module.scss';

export default function BookPreview(props: any) {
  return (
    <a
      className={styles['bookpreview']}
      href={`${import.meta.env.BASE_URL}book/${props.id}`}
    >
      <img
        className={styles['bookpreview__cover']}
        src={`${import.meta.env.BASE_URL}/books_covers/${props.photo_url}`}
      />
      {props.name}
    </a>
  );
}
