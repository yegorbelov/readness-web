import { useEffect, useState } from 'react';

import styles from './LanguagesPage.module.scss';
import { fetchLanguages } from '@/api/languages';
import type { Language } from '@/types/book';

export default function LanguagesPage() {
  const [languages, setLanguages] = useState<Language[]>([]);

  useEffect(() => {
    fetchLanguages().then(setLanguages);
  }, []);

  return (
    <div className={styles['admin-page']}>
      <table className={styles['admin-page__table']}>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
          </tr>
        </thead>

        <tbody>
          {languages.map((language) => (
            <tr key={language.language_id}>
              <td>{language.language_id}</td>
              <td>{language.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
