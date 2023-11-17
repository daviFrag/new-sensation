import React, { useId } from 'react';
import styles from './Toggle.module.css';

export default function Toggle(props: {
  checked: boolean;
  label_text?: string;
  checkedFn: () => void;
  uncheckedFn: () => void;
}) {
  const { checked, label_text, checkedFn, uncheckedFn } = props;
  const id = useId();

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) uncheckedFn();
    else checkedFn();
  }

  return (
    <>
      <input
        // ref={input_ref}
        id={id}
        type='checkbox'
        className={styles.input}
        checked={checked}
        onChange={(e) => onChange(e)}
      />
      <label htmlFor={id} className={styles.label}>
        {label_text}
      </label>
    </>
  );
}
