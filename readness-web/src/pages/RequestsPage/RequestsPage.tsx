import { useEffect, useState } from 'react';

import { fetchRequests } from '@/api/book_requests';
import { publishBook } from '@/api/book_requests';

import styles from './RequestsPage.module.scss';

type BookRequest = {
  request_id: string;
  book_id: string;
  title: string;
  description: string;
  is_public: boolean;
  author: string;
};

export default function RequestsPage() {
  const [requests, setRequests] = useState<BookRequest[]>([]);

  useEffect(() => {
    fetchRequests().then(setRequests);
  }, []);

  const handleApprove = async (bookId: string) => {
    try {
      await publishBook(bookId);

      setRequests((prev) =>
        prev.filter((request) => request.book_id !== bookId),
      );
    } catch (error) {
      console.error('Failed to approve book:', error);
    }
  };

  return (
    <div className={styles['admin-page']}>
      <table className={styles['admin-page__table']}>
        <thead>
          <tr>
            <th scope='col'>ID</th>
            <th scope='col'>Title</th>
            <th scope='col'>Description</th>
            <th scope='col'>Author</th>
            <th scope='col'>Public</th>
            <th scope='col'>Action</th>
          </tr>
        </thead>

        <tbody>
          {requests.map((request) => (
            <tr key={request.request_id}>
              <td>{request.request_id}</td>
              <td>{request.title}</td>
              <td>{request.description}</td>
              <td>{request.author}</td>
              <td>{request.is_public ? 'Yes' : 'No'}</td>
              <td>
                <button
                  type='button'
                  onClick={() => handleApprove(request.book_id)}
                >
                  Approve
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
