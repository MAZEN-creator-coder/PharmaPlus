// Fetch a user by id. Optional `token` will be used for Authorization if provided.
import apiFetch from './apiFetch';

export default async function getUserById(id, tokenOrOpts) {
  if (!id) throw new Error('Missing user id');

  const opts = {};
  if (tokenOrOpts && typeof tokenOrOpts === 'object' && !Array.isArray(tokenOrOpts)) {
    Object.assign(opts, tokenOrOpts);
  } else if (tokenOrOpts) {
    opts.token = tokenOrOpts;
  }

  const payload = await apiFetch(`/users/${encodeURIComponent(id)}`, { method: 'GET', ...opts });

  return payload?.data?.user ?? payload;
}
