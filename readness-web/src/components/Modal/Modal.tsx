import { useState, type ReactNode } from 'react';
import styles from './Modal.module.scss';
import { createPortal } from 'react-dom';

interface ModalProps {
  children: ReactNode;
}

export default function Modal({ children }: ModalProps) {
  const [isOpen, setIsOpen] = useState(true);
  function handleContentClick(event: MouseEvent<HTMLDivElement>) {
    event.stopPropagation();
  }
  if (!isOpen) return null;

  return createPortal(
    <div
      className={styles['modal']}
      onClick={() => {
        setIsOpen(false);
      }}
    >
      <div className={styles['modal__content']} onClick={handleContentClick}>
        {children}
      </div>
    </div>,
    document.body,
  );
}
