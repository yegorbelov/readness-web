import styles from './FooterColumns.module.scss';

export default function FooterColumns(props) {
  return (
    <div className={styles['column']}>
      <div className={styles['title']}>{props.title}</div>
      {props.links.map((link) => (
        <a className={styles['anchor']} href={link.url}>
          {link.label}
        </a>
      ))}
    </div>
  );
}
