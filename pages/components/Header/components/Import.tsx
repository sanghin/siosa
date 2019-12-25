import { KeyboardEvent, ChangeEvent, useState } from 'react';

import css from './styles.css';

export default () => {
  const [value, setInputValue] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);

  const onKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13 && !submitting) {
      setSubmitting(true);

      await fetch('/api/pastebin', { method: 'POST', body: `${value}` });

      setSubmitting(false);
    }
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
  };

  return (
    <div className={css.import}>
      <label htmlFor='import'>Import pastebin</label>
      <input id='import' onKeyDown={onKeyDown} onChange={onChange} />
    </div>
  );
};
