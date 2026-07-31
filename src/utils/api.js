// src/utils/api.js
const BASE_URL = 'https://edu-snap-dbms-api.vercel.app/api';

export async function fetchFromAPI(endpoint, options = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch data');
  }
  return data;
}