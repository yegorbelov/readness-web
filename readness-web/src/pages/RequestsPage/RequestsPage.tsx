import { useEffect, useState } from 'react';
import styles from './RequestsPage.module.scss';
import { fetchRequests } from '@/api/book_requests';

export default function RequestsPage() {
  const [requests, setRequests] = useState<[]>([]);

  useEffect(() => {
    fetchRequests().then(setRequests);
  }, []);

  console.log(requests);

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
          {requests.map((language) => (
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
