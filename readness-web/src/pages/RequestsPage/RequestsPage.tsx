import { useEffect, useState } from 'react';

import { fetchRequests, publishBook } from '@/api/book_requests';

import styles from './RequestsPage.module.scss';
import Button from '@/components/ui/Button/Button';

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [approvingBookId, setApprovingBookId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadRequests() {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchRequests();

        if (!cancelled) {
          setRequests(data);
        }
      } catch (error) {
        console.error('Failed to fetch requests:', error);

        if (!cancelled) {
          setError('Failed to load requests.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadRequests();

    return () => {
      cancelled = true;
    };
  }, []);

  async function handleApprove(bookId: string) {
    try {
      setApprovingBookId(bookId);

      await publishBook(bookId);

      setRequests((prev) =>
        prev.filter((request) => request.book_id !== bookId),
      );
    } catch (error) {
      console.error('Failed to approve book:', error);
    } finally {
      setApprovingBookId(null);
    }
  }

  if (loading) {
    return (
      <main className={styles['admin-page']}>
        <div className={styles['state']}>Loading requests...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className={styles['admin-page']}>
        <div className={styles['state']}>{error}</div>
      </main>
    );
  }

  return (
    <main className={styles['admin-page']}>
      <div className={styles['header']}>
        <div>
          <h1 className={styles['title']}>Book requests</h1>
          <p className={styles['subtitle']}>
            Review and approve submitted books.
          </p>
        </div>
      </div>

      {requests.length === 0 ? (
        <div className={styles['state']}>No requests found.</div>
      ) : (
        <div className={styles['table-wrapper']}>
          <table className={styles['table']} aria-label='Book requests list'>
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
              {requests.map((request) => {
                const isApproving = approvingBookId === request.book_id;

                return (
                  <tr key={request.request_id}>
                    <td>
                      <span className={styles['request-id']}>
                        {request.request_id}
                      </span>
                    </td>

                    <td>
                      <span className={styles['title-cell']}>
                        {request.title}
                      </span>
                    </td>

                    <td>
                      <span className={styles['description']}>
                        {request.description}
                      </span>
                    </td>

                    <td>
                      <span className={styles['author']}>{request.author}</span>
                    </td>

                    <td>
                      <span
                        className={
                          request.is_public
                            ? styles['public']
                            : styles['private']
                        }
                      >
                        {request.is_public ? 'Yes' : 'No'}
                      </span>
                    </td>

                    <td>
                      <Button
                        type='button'
                        className={styles['approve-button']}
                        disabled={isApproving}
                        onClick={() => handleApprove(request.book_id)}
                      >
                        {isApproving ? 'Saving...' : 'Approve'}
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
