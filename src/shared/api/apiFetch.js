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
  let auth = token;
  if (!auth) {
    try {
      auth = localStorage.getItem("pharmaplus_token");
    } catch {
      /* ignore */
    }
  }

  const reqHeaders = { ...headers };
  // Do not attach Authorization header to public auth endpoints (login/register)
  const isAuthEndpoint =
    typeof url === "string" &&
    (url.endsWith("/users/login") ||
      url.includes("/users/login") ||
      url.endsWith("/users/register") ||
      url.includes("/users/register"));
  if (auth && !isAuthEndpoint) reqHeaders["Authorization"] = `Bearer ${auth}`;

  let reqBody = body;
  // If body is a plain object, serialize as JSON
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
   
    if (isAuthEndpoint) {
      const message = payload?.message || payload?.error || `Unauthorized`;
      const err = new Error(message);
      err.status = res.status;
      err.payload = payload;
      throw err;
    }

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
    // Prefer backend-friendly shapes: payload.data.msg or payload.data.message
    const message =
      payload?.data?.msg ||
      payload?.data?.message ||
      payload?.message ||
      payload?.error ||
      `Request failed: ${res.status}`;
    const err = new Error(message);
    err.status = res.status;
    err.payload = payload;
    throw err;
  }

  return payload;
}
