import styles from '../Header/Header.module.scss';

export function Header() {
  return (
    <div className={styles.header}>
      <div className={styles['header__logo-text']}>Readness</div>
      <div className={styles.header__search}>
        <input
          className={styles['header__search-input']}
          placeholder=' '
        ></input>
        <span className={styles['header__search-placeholder']}>
          Search for books, authors, geners
        </span>
      </div>
      <div className={styles[`header__tabs`]}>
        <div>Pricing</div>
        <div>Log In</div>
      </div>
    </div>
  );
}
