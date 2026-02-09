import { useEffect } from 'react';

const DEFAULT_TITLE = 'FitNest';

const usePageTitle = (title?: string) => {
  useEffect(() => {
    if (title) {
      document.title = title;
    }

    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [title]);
};

export default usePageTitle;
