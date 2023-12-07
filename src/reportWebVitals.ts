import { onLCP, onFID, onCLS } from 'web-vitals/attribution';

const reportWebVitals = (onPerfEntry?: (metric: any) => void) => {
  if (onPerfEntry && typeof onPerfEntry === 'function') {
    onLCP((metric) => onPerfEntry(metric));
    onFID((metric) => onPerfEntry(metric));
    onCLS((metric) => onPerfEntry(metric));
  }
};

export default reportWebVitals;
