import { login } from '@/api/user';
import styles from './LogInModal.module.scss';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface LogInModalProps {
  onSuccess: () => void;
}

export default function LogInModal({ onSuccess }: LogInModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login: setAuthUser } = useAuth();

  function handleLogin() {
    login(email, password)
      .then(({ user, tokens }) => {
        setError('');
        setAuthUser(user, tokens);
        onSuccess();
      })
      .catch((err) => {
        setError(err.message);
      });
  }

  return (
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
  );
}
