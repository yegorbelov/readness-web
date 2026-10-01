import styles from './HomePage.module.scss';
import BookList from '@/components/BookList/BookList';
import { images } from '@/constants/images';

function HomePage() {
  const quote = [
    ['Recommendations', ' ', 'you’ve'],
    ['never', ' ', 'experienced', ' ', 'before'],
  ];

  let animationIndex = 0;

  return (
    <>
      <div className={styles['main-photo']}>
        <div className={styles['main-quote-wrapper']}>
          <span className={styles['main-quote']}>
            {quote.map((line, lineIndex) => (
              <span className={styles['quote-line']} key={lineIndex}>
                {line.map((word, wordIndex) => {
                  const isSpace = word === ' ';

                  if (isSpace) {
                    return (
                      <span
                        key={`${lineIndex}-${wordIndex}`}
                        className={styles['quote-space']}
                      >
                        {' '}
                      </span>
                    );
                  }

                  const delay = animationIndex * 0.2;
                  animationIndex++;

                  return (
                    <span
                      key={`${lineIndex}-${wordIndex}`}
                      className={[
                        styles['quote-word'],
                        (word === 'never' || word === 'before') &&
                          styles.emphasize,
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      style={{ animationDelay: `${delay}s` }}
                    >
                      {word}
                    </span>
                  );
                })}
              </span>
            ))}
          </span>
        </div>

        <img
          draggable={false}
          className={styles['reading-girl']}
          src={images.readingGirl}
          fetchPriority='high'
        />
      </div>

      <div className={styles['main']}>
        <BookList />
      </div>
    </>
  );
}

export default HomePage;
