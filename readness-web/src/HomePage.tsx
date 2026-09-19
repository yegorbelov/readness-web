import { BookList } from './components/BookList/BookList';

import './App.css';

function HomePage() {
  return (
    <>
      <div className='main-photo'>
        <div className='main-quote-wrapper'>
          <span className='main-quote'>
            Recommendations you’ve <p />
            <span className='emphasize'>never</span> experienced{' '}
            <span className='emphasize'>before</span>
          </span>
        </div>
        <img className='reading-girl' src='/images/reading-girl.jpg' />
      </div>
      <div className='main'>
        <BookList />
      </div>
    </>
  );
}

export default HomePage;
