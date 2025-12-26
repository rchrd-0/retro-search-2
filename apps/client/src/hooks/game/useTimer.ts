import { useCallback, useEffect, useRef, useState } from "react";

export function useTimer() {
  const [elapsedMs, setElapsedMs] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalIdRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const isRunningRef = useRef(false);
  const elapsedMsRef = useRef(0);

  useEffect(() => {
    isRunningRef.current = isRunning;
  }, [isRunning]);

  useEffect(() => {
    elapsedMsRef.current = elapsedMs;
  }, [elapsedMs]);

  const stop = useCallback(() => {
    if (intervalIdRef.current) {
      window.clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }

    isRunningRef.current = false;
    setIsRunning(false);
  }, []);

  const start = useCallback(() => {
    if (isRunningRef.current) return;

    isRunningRef.current = true;
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedMsRef.current;

    intervalIdRef.current = window.setInterval(() => {
      setElapsedMs(Date.now() - startTimeRef.current);
    }, 10);
  }, []);

  const reset = useCallback(() => {
    stop();
    setElapsedMs(0);
    elapsedMsRef.current = 0;
  }, [stop]);

  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  return {
    elapsedMs,
    isRunning,
    start,
    stop,
    reset,
  };
}
