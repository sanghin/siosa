import React, { KeyboardEvent, ChangeEvent, useState } from 'react';

const isPastebinLink = value => /^https:\/\/pastebin\.com\//.test(value);

export default () => {
  const [value, setInputValue] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);

  const onKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13 && isPastebinLink(value) && !submitting) {
      setSubmitting(true);

      await fetch('/api/pastebin', { method: 'POST', body: `${value}` });

      setSubmitting(false);
    }
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
  };

  return (
    <div>
      <label>Import pastebin</label>
      <input onKeyDown={onKeyDown} onChange={onChange} />
    </div>
  );
};
