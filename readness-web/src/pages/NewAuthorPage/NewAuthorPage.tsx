import styles from './NewAuthorPage.module.scss';
import type { SubmitEvent } from 'react';
import { createNewAuthor } from '@/api/authors';

export default function NewAuthorPage() {
  async function handleCreateAuthor(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    await createNewAuthor({
      first_name: formData.get('first_name') as string,
      last_name: formData.get('last_name') as string,
    });
  }

  return (
    <div className={styles['new-author-page']}>
      <form
        className={styles['new-author-page__form']}
        onSubmit={handleCreateAuthor}
      >
        <input name='first_name' placeholder='First name' required />

        <input name='last_name' placeholder='Last name' required />

        <button type='submit'>Create</button>
      </form>
    </div>
  );
}
