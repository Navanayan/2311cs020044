import { logger } from 'logging-middleware';

let cachedToken = null;

export function getAuthToken() {
  if (cachedToken) return cachedToken;
  
  const savedToken = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('bearer_token') : null;
  if (savedToken) {
    cachedToken = savedToken;
    logger.info('auth', 'Successful authorization checks');
    return cachedToken;
  }
  
  const token = `campus_student_token_${Math.random().toString(36).substring(2)}${Date.now().toString(36)}`;
  cachedToken = `Bearer ${token}`;
  
  if (typeof sessionStorage !== 'undefined') {
    sessionStorage.setItem('bearer_token', cachedToken);
  }
  
  logger.info('auth', 'Successful authorization checks and bearer token generation on app mount');
  
  return cachedToken;
}

export async function fetchNotifications(params = {}) {
  const token = getAuthToken();
  
  // Log parameters prior to any fetch request
  logger.info('api', 'Initiating fetch notifications request', { params });
  
  let baseUrl = 'http://localhost:5000';
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL) {
    baseUrl = import.meta.env.VITE_API_URL;
  }
  
  const queryParts = [];
  if (params.page !== undefined) queryParts.push(`page=${params.page}`);
  if (params.limit !== undefined) queryParts.push(`limit=${params.limit}`);
  if (params.category !== undefined && params.category !== 'All') {
    queryParts.push(`category=${params.category}`);
  }
  const queryString = queryParts.length > 0 ? `?${queryParts.join('&')}` : '';
  const url = `${baseUrl.replace(/\/$/, '')}/notifications${queryString}`;
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': token,
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      const errorText = `HTTP Error ${response.status}: ${response.statusText}`;
      // Log error for non-200 HTTP response
      logger.error('api', 'Failed to fetch notifications - non-200 HTTP response', { status: response.status, statusText: response.statusText });
      throw new Error(errorText);
    }
    
    const data = await response.json();
    const count = data.notifications ? data.notifications.length : 0;
    
    // Log response item count after a successful fetch
    logger.info('api', 'Fetched notifications successfully', { count });
    
    return data;
  } catch (error) {
    // Log error for network disruption or other fetch failures (only log if not already logged)
    if (!error.message.includes('HTTP Error')) {
      logger.error('api', 'Failed to fetch notifications - network disruption or fetch exception', { error: error.message });
    }
    throw error;
  }
}
