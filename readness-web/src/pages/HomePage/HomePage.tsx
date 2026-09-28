import styles from './HomePage.module.scss';
import BookList from '@/components/BookList/BookList';
import { images } from '@/constants/images';

function HomePage() {
  const quote = [
    ['Recommendations', 'you’ve'],
    ['never', 'experienced', 'before'],
  ];
  return (
    <>
      <div className={styles['main-photo']}>
        <div className={styles['main-quote-wrapper']}>
          <span className={styles['main-quote']}>
            {quote.map((line, lineIndex) => (
              <span className={styles['quote-line']} key={lineIndex}>
                {line.map((word, wordIndex) => {
                  const index =
                    quote
                      .slice(0, lineIndex)
                      .reduce((sum, line) => sum + line.length, 0) + wordIndex;

                  return (
                    <span
                      key={word}
                      className={[
                        styles['quote-word'],
                        (word === 'never' || word === 'before') &&
                          styles.emphasize,
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      style={{ animationDelay: `${index * 0.2}s` }}
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
        />
      </div>
      <div className={styles['main']}>
        <BookList />
      </div>
    </>
  );
}

export default HomePage;
