import styles from './FooterColumns.module.scss';
import type { FooterColumn } from '@/types/footer';

export default function FooterColumns(props: FooterColumn) {
  return (
    <div className={styles['column']}>
      <div className={styles['title']}>{props.title}</div>
      {props.links.map((link) => (
        <a key={link.url} className={styles['anchor']} href={link.url}>
          {link.label}
        </a>
      ))}
    </div>
  );
}
