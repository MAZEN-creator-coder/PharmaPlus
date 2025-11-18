const API_BASE =
  (typeof import.meta !== "undefined" &&
    import.meta.env &&
    import.meta.env.VITE_API_BASE) ||
  "http://localhost:3000/api";

async function safeJson(response) {
  try {
    return await response.json();
  } catch {
    return {};
  }
}

export default async function apiFetch(path, options = {}) {
  const { method = "GET", headers = {}, body, token, signal } = options;

  const url =
    typeof path === "string" && path.startsWith("/")
      ? `${API_BASE}${path}`
      : path;

  // resolve token: prefer explicit token, otherwise try localStorage
  let auth = token;
  if (!auth) {
    try {
      auth = localStorage.getItem("pharmaplus_token");
    } catch {
      /* ignore */
    }
  }

  const reqHeaders = { ...headers };
  if (auth) reqHeaders["Authorization"] = `Bearer ${auth}`;

  let reqBody = body;
  // If body is a plain object (and not FormData / URLSearchParams), send JSON
  const isPlainObject =
    body &&
    typeof body === "object" &&
    !(body instanceof FormData) &&
    !(body instanceof URLSearchParams);
  if (isPlainObject) {
    if (
      !Object.keys(reqHeaders).some((h) => h.toLowerCase() === "content-type")
    ) {
      reqHeaders["Content-Type"] = "application/json";
    }
    if (reqHeaders["Content-Type"]?.includes("application/json")) {
      reqBody = JSON.stringify(body);
    }
  }

  let res;
  try {
    res = await fetch(url, {
      method,
      headers: reqHeaders,
      body: reqBody,
      signal,
    });
  } catch (err) {
    // network error or aborted
    const e = new Error(err.message || "Network error");
    e.payload = null;
    throw e;
  }

  const payload = await safeJson(res);

  // If unauthorized, redirect user to the Unauthorized page with an 'expired' flag.
  if (res.status === 401) {
    try {
      localStorage.removeItem("pharmaplus_token");
    } catch {
      // ignore localStorage errors
    }
    if (typeof window !== "undefined") {
      window.location.href = "/unauthorized?expired=1";
      return; // navigation will happen
    }
  }

  if (!res.ok) {
    const message =
      payload?.message || payload?.error || `Request failed: ${res.status}`;
    const err = new Error(message);
    err.status = res.status;
    err.payload = payload;
    throw err;
  }

  return payload;
}
