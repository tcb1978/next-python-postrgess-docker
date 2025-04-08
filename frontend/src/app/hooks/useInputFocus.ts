import { useEffect, useRef } from 'react';

const useInputFocus = (editing: boolean) => {
  const nameInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (editing && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [editing]);

  return nameInputRef;
};

export default useInputFocus;