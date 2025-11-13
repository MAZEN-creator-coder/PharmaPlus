// Central fetch wrapper for the frontend.
const API_BASE = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE) || 'http://localhost:3000/api';

async function _safeJson(res) {
  try {
    return await res.json();
  } catch {
    return {};
  }
}

export default async function apiFetch(path, opts = {}) {
  const { method = 'GET', headers = {}, body, token, signal } = opts;

  // Build URL: if path starts with '/', prepend API_BASE.
  const url = typeof path === 'string' && path.startsWith('/') ? `${API_BASE}${path}` : path;

  let t = token;

  if (!t) {
    try { t = localStorage.getItem('pharmaplus_token'); } catch { /* ignore */ }
  }

  const finalHeaders = { ...headers };

  if (t) finalHeaders['Authorization'] = `Bearer ${t}`;

  let finalBody = body;
  if (body && typeof body === 'object' && !(body instanceof FormData) && !(body instanceof URLSearchParams)) {

    // Add Content-Type header if missing
    if (!Object.keys(finalHeaders).some(h => h.toLowerCase() === 'content-type')) {
      finalHeaders['Content-Type'] = 'application/json';
    }
    finalBody = finalHeaders['Content-Type']?.includes('application/json') ? JSON.stringify(body) : body;
  }

  const res = await fetch(url, { method, headers: finalHeaders, body: finalBody, signal });
  const payload = await _safeJson(res);

  if (!res.ok) {
    const msg = payload?.message || payload?.error || `Request failed: ${res.status}`;
    const err = new Error(msg);
    err.status = res.status;
    err.payload = payload;
    throw err;
  }

  return payload;
}
