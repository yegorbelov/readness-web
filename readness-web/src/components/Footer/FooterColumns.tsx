import styles from './FooterColumns.module.scss';
import type { FooterColumn } from '@/types/footer';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function FooterColumns(props: FooterColumn) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={styles['column']} onClick={() => setIsOpen(!isOpen)}>
      <div className={styles['title-wrapper']}>
        <div className={styles['title']}>{props.title}</div>
        <img
          className={`${styles['arrow']} ${isOpen ? styles['arrow--open'] : ''}`}
          src={`${import.meta.env.BASE_URL}/icons/arrow-down.svg`}
        />
      </div>
      <div
        className={`${styles['links-wrapper']} ${isOpen ? styles['links-wrapper--open'] : ''}`}
      >
        <div className={styles['links-inner']}>
          {props.links.map((link) => (
            <Link key={link.url} className={styles['anchor']} to={link.url}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
