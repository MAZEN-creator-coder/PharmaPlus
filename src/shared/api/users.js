// Small users API module to centralize user-related fetch calls
export async function getProfile(token) {
  if (!token) throw new Error('Missing auth token');

  const res = await fetch('http://localhost:3000/api/users/profile', {
    headers: { Authorization: `Bearer ${token}` },
  });

  // Try to parse JSON; if the response isn't JSON this will throw.
  const body = await res.json();

  // Normalize error handling: throw on non-success so callers can catch
  if (!res.ok || body?.status !== 'success') {
    const msg = body?.data?.msg || body?.message || 'Failed to fetch profile';
    const err = new Error(msg);
    err.response = body;
    throw err;
  }

  return body.data.user;
}

export default { getProfile };
