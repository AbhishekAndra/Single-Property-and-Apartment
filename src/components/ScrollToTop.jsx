import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop({ lenis }) {
  const { pathname } = useLocation();

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, lenis]);

  return null;
}

