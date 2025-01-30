import { useEffect, useState } from 'react';

function useSessionStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(initialValue);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const item = window.sessionStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    }
  }, [key]);

  const setValue = (value) => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem(key, JSON.stringify(value));
    }
    setStoredValue(value);
  };

  return [storedValue, setValue];
}

export default useSessionStorage;
