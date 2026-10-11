"use client";

import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react";

export function usePersistedState<T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(initialValue);
  const isFirstWrite = useRef(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw != null) {
        setState(JSON.parse(raw) as T);
      }
    } catch {}
  }, [key]);

  useEffect(() => {
    // Skip the mount-time write so a stored value is never clobbered
    // before it has been hydrated from localStorage.
    if (isFirstWrite.current) {
      isFirstWrite.current = false;
      return;
    }
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {}
  }, [key, state]);

  return [state, setState];
}