// Performs POST /api/users/login and returns the parsed payload via apiFetch
import apiFetch from './apiFetch';

export default async function postLogin({ email, password }) {
  const payload = await apiFetch('/users/login', {
    method: 'POST',
    body: { email, password }
  });

  return payload;
}
