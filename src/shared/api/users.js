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

export async function updateProfile(token, id, data) {
  if (!token) throw new Error('Missing auth token');
  if (!id) throw new Error('Missing user id');

  const res = await fetch(`http://localhost:3000/api/users/${id}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const body = await res.json();
  if (!res.ok || body?.status !== 'success') {
    const msg = body?.data?.msg || body?.message || 'Failed to update profile';
    const err = new Error(msg);
    err.response = body;
    throw err;
  }

  return body.data.user;
}
export default { getProfile, updateProfile };

export async function getOrdersByUser(token, userId, page = 1, limit = 5) {
  if (!token) throw new Error('Missing auth token');
  if (!userId) throw new Error('Missing user id');

  const url = `http://localhost:3000/api/orders/user/${encodeURIComponent(userId)}?limit=${encodeURIComponent(limit)}&page=${encodeURIComponent(page)}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const body = await res.json();
  if (!res.ok || body?.status !== 'success') {
    const msg = body?.data?.msg || body?.message || 'Failed to fetch orders';
    const err = new Error(msg);
    err.response = body;
    throw err;
  }
  return body.data.orders;
}
