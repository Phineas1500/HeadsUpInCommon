import { useEffect, useRef } from 'react';

export function useWakeLock(active: boolean) {
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);

  useEffect(() => {
    if (!active) {
      wakeLockRef.current?.release();
      wakeLockRef.current = null;
      return;
    }

    let cancelled = false;

    async function request() {
      try {
        if ('wakeLock' in navigator) {
          const sentinel = await navigator.wakeLock.request('screen');
          if (cancelled) {
            sentinel.release();
          } else {
            wakeLockRef.current = sentinel;
          }
        }
      } catch {
        // Wake Lock not supported or denied
      }
    }

    request();

    return () => {
      cancelled = true;
      wakeLockRef.current?.release();
      wakeLockRef.current = null;
    };
  }, [active]);
}
