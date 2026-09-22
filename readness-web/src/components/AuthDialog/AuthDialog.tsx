import styles from './LogInModal.module.scss';
import { useEffect, useRef, useState } from 'react';
import LogInModal from './LogInModal';
import SignUpModal from './SignUpModal';
import type { AuthMode } from '@/types/auth';
import { authConfig } from './authConfig';

interface AuthDialogProps {
  onClose: () => void;
  initialMode?: AuthMode;
}

export default function AuthDialog({
  onClose,
  initialMode = 'login',
}: AuthDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [mode, setMode] = useState(initialMode);

  const config = authConfig[mode];

  function renderForm() {
    switch (mode) {
      case 'login':
        return <LogInModal onSuccess={() => dialogRef.current?.close()} />;
      case 'signup':
        return <SignUpModal onSuccess={() => dialogRef.current?.close()} />;
    }
  }

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    dialog.showModal();

    return () => {
      if (dialog.open) dialog.close();
    };
  }, []);

  return (
    <div className={styles['bg']}>
      <dialog className={styles.modal} onClose={onClose} ref={dialogRef}>
        <div className={styles.modal__header}>
          <span>{config.title}</span>

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
        {renderForm()}

        <div className={styles['fallback']}>
          <span>{config.fallbackText}</span>
          <button onClick={() => setMode(config.fallbackTargetMode!)}>
            {config.fallbackActionText}
          </button>
        </div>
      </dialog>
    </div>
  );
}
