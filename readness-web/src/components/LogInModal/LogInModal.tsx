import { login } from '@/api/user';
import styles from './LogInModal.module.scss';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function LogInModal({ onClose }) {
  const dialogRef = useRef(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login: setAuthUser } = useAuth();

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    dialog.showModal();

    return () => {
      if (dialog.open) {
        dialog.close();
      }
    };
  }, []);

  function handleLogin() {
    login(email, password)
      .then(({ user, tokens }) => {
        setError('');
        setAuthUser(user, tokens);
        dialogRef.current.close();
      })
      .catch((err) => {
        setError(err.message);
      });
  }

  return (
    <div className={styles['bg']}>
      <dialog className={styles.modal} onClose={onClose} ref={dialogRef}>
        <div className={styles.modal__header}>
          <span>Log In</span>

          <button
            className={styles.modal__close}
            onClick={() => dialogRef.current?.close()}
          >
            <img
              src={`${import.meta.env.BASE_URL}/icons/cross.svg`}
              alt='Close'
            />
          </button>
        </div>

        <form
          className={styles.modal__inner}
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <div className={styles['modal__inner-input']}>
            <input
              onChange={(e) => setEmail(e.target.value)}
              placeholder=''
              type='email'
              name='email'
              autoComplete='username'
              value={email}
            />
            <span className={styles['modal__inner-placeholder']}>Email</span>
          </div>

          <div className={styles['modal__inner-input']}>
            <input
              onChange={(e) => setPassword(e.target.value)}
              placeholder=''
              type='password'
              name='password'
              autoComplete='current-password'
              value={password}
            />
            <span className={styles['modal__inner-placeholder']}>Password</span>
          </div>
          <div className={styles.error}>{error}</div>
          <button type='submit'>Submit</button>
        </form>
      </dialog>
    </div>
  );
}
