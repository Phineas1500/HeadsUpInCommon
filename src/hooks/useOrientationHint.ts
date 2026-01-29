import { useEffect, useState } from 'react';

export function useOrientationHint() {
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    function check() {
      setIsPortrait(window.innerHeight > window.innerWidth);
    }

    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return isPortrait;
}
