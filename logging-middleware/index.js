export function log(packageName, level, message, details = {}) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    package: packageName,
    level,
    message,
    details
  };

  let baseUrl = 'http://localhost:5000';
  if (typeof window !== 'undefined' && window.__LOGGING_SERVER_URL__) {
    baseUrl = window.__LOGGING_SERVER_URL__;
  } else if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL) {
    baseUrl = import.meta.env.VITE_API_URL;
  }

  const url = `${baseUrl.replace(/\/$/, '')}/logs`;

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(logEntry)
  }).catch(err => {
    // Browser console logging or console errors are prohibited inside application code
  });
}

export const logger = {
  info: (packageName, message, details) => log(packageName, 'info', message, details),
  error: (packageName, message, details) => log(packageName, 'error', message, details)
};

export default logger;
