import styles from './Loader.module.scss';
import { useEffect, useRef } from 'react';

interface LoaderProps {
  isFadingOut: boolean;
}

export default function Loader({ isFadingOut = false }: LoaderProps) {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const length = path.getTotalLength();
    path.style.setProperty('--path-length', `${length}`);
  }, []);

  return (
    <div
      className={`${styles['loader']} ${isFadingOut ? styles['loader--fading'] : ''}`}
    >
      <svg
        className={styles['loader__logo']}
        width='256'
        height='256'
        viewBox='0 0 256 256'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          ref={pathRef}
          className={styles['loader__path']}
          d='M127.5 79.4605C124.167 74.9737 112.6 66 93 66H56V179.803H96C110 179.803 122.833 186.601 127.5 190C132.167 186.601 145 179.803 159 179.803H181M127.5 79.4605V190M127.5 79.4605C130.833 74.9737 142.4 66 162 66H199V111M182.5 135.5H217.5M182.5 155.5C183.7 155.5 197.333 155.5 204 155.5'
          stroke='white'
          strokeWidth='12'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </div>
  );
}
