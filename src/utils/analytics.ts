import ReactGA from 'react-ga4';

const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

export const initGA = () => {
  if (MEASUREMENT_ID) {
    ReactGA.initialize(MEASUREMENT_ID);
  } else {
    console.warn('Google Analytics Measurement ID not found. Set VITE_GA_MEASUREMENT_ID in your .env file.');
  }
};

export const trackPageView = (path: string) => {
  ReactGA.send({ hitType: 'pageview', page: path });
};

export const trackEvent = (category: string, action: string, label?: string, value?: number) => {
  ReactGA.event({
    category,
    action,
    label,
    value,
  });
};
