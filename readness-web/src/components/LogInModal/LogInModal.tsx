import styles from './LogInModal.module.scss';
import { useEffect, useRef } from 'react';

export default function LogInModal({ onClose }) {
  const dialogRef = useRef(null);

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

        <div className={styles.modal__inner}>
          <div className={styles['modal__inner-input']}>
            <input placeholder='' type='email' />
            <span className={styles['modal__inner-placeholder']}>Email</span>
          </div>

          <div className={styles['modal__inner-input']}>
            <input placeholder='' type='password' />
            <span className={styles['modal__inner-placeholder']}>Password</span>
          </div>
        </div>
        <button>Submit</button>
      </dialog>
    </div>
  );
}
