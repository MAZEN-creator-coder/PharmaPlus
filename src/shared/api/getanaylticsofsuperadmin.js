import apiFetch from './apiFetch';

function resolveToken(token) {
  if (token) return token;
  try {
    const t = localStorage.getItem('pharmaplus_token');
    if (t) return t;
  } catch {
    // ignore storage errors
  }
  throw new Error('Authentication required: missing token');
}

export default async function getAnalyticsOfSuperAdmin(token = null) {
  try {
    const tk = resolveToken(token);
    const res = await apiFetch('/analytics-super', {
      method: 'GET',
      token: tk,
    });
    return res.data || null;
  } catch (error) {
    console.error('Error fetching analytics:', error);
    throw error;
  }
}