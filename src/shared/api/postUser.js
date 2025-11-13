// Performs POST /api/users/register and returns the parsed payload via apiFetch
import apiFetch from './apiFetch';

export default async function postUser(formData) {
  // formData is expected to be a FormData instance
  const payload = await apiFetch('/users/register', {
    method: 'POST',
    body: formData
  });

  return payload;
}
