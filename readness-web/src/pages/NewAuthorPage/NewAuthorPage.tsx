import styles from './NewAuthorPage.module.scss';

import { useState, type SubmitEvent } from 'react';

import { createNewAuthor } from '@/api/authors';

import Button from '@/components/ui/Button/Button';

export default function NewAuthorPage() {
  const [isCreated, setIsCreated] = useState(false);

  async function handleCreateAuthor(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    try {
      await createNewAuthor({
        first_name: formData.get('first_name') as string,
        last_name: formData.get('last_name') as string,
      });

      setIsCreated(true);
    } catch (error) {
      console.error(error);
    }
  }

  function handleFormChange() {
    setIsCreated(false);
  }

  return (
    <div className={styles['new-author-page']}>
      <div className={styles['new-author-page__content']}>
        <div className={styles['new-author-page__header']}>
          <h1>Create new author</h1>
        </div>

        <form
          className={styles['new-author-page__form']}
          onSubmit={handleCreateAuthor}
          onChange={handleFormChange}
        >
          <input name='first_name' placeholder='First name' required />

          <input name='last_name' placeholder='Last name' required />

          <Button type='submit' disabled={isCreated}>
            {isCreated ? 'Created' : 'Create'}
          </Button>
        </form>
      </div>
    </div>
  );
}
