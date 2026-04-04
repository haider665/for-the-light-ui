import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../utils/analytics';

/**
 * Hook that tracks page views on every route change.
 * Must be used inside a <Router> component.
 */
const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);
};

export default usePageTracking;
