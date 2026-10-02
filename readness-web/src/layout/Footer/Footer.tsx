import styles from './Footer.module.scss';
import FooterColumns from './FooterColumns';
import type { FooterColumn } from '@/types/footer';
import { images } from '@/constants/images';

export default function Footer() {
  const columns = [
    {
      id: 1,
      title: 'COMPANY',
      links: [
        { id: 1, label: 'About us', url: '/about' },
        { id: 1, label: 'Contact us', url: '/contact' },
        { id: 1, label: 'Help Center', url: '/help' },
      ],
    },
    {
      id: 2,
      title: 'SOCIAL',
      links: [
        { id: 1, label: 'MAX', url: '/max' },
        { id: 1, label: 'VK', url: '/vk' },
        { id: 1, label: 'Dzen', url: '/dzen' },
      ],
    },
    {
      id: 3,
      title: 'MORE',
      links: [
        { id: 1, label: 'Privacy Policy', url: '/privacy' },
        { id: 1, label: 'Collections', url: '/collections' },
        { id: 1, label: 'Language', url: '/language' },
      ],
    },
  ];
  return (
    <div className={styles['footer-wrapper']}>
      <div className={styles['footer']}>
        <div className={styles['footer__content']}>
          <div className={styles['logo-wrapper']}>
            <img src={images.logo} />
            <span>Readness</span>
          </div>
          <div className={styles['columns']}>
            {columns.map((column: FooterColumn) => (
              <FooterColumns
                key={column.id}
                title={column.title}
                links={column.links}
              />
            ))}
          </div>
        </div>
        <div className={styles['copyright']}>
          Copyright © {new Date().getFullYear()} Readness All rights reserved.
        </div>
      </div>
    </div>
  );
}
