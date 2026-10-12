import { useState } from "react";

function readValue(key, initialValue) {
  try {
    const storedValue = window.localStorage.getItem(key);
    return {
      value: storedValue === null ? initialValue : JSON.parse(storedValue),
      error: null
    };
  } catch (error) {
    return {
      value: initialValue,
      error: `Could not read saved data: ${error.message}`
    };
  }
}

export default function useLocalStorage(key, initialValue) {
  const [storedState, setStoredState] = useState(() =>
    readValue(key, initialValue)
  );

  const setValue = (nextValue) => {
    const value =
      typeof nextValue === "function"
        ? nextValue(storedState.value)
        : nextValue;

    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      setStoredState({ value, error: null });
      return true;
    } catch (error) {
      setStoredState((previous) => ({
        ...previous,
        error: `Could not save your changes: ${error.message}`
      }));
      return false;
    }
  };

  return [storedState.value, setValue, storedState.error];
}
