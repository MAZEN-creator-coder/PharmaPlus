import apiFetch from './apiFetch';

export async function getSuperDashboard(token) {
  try {
    const payload = await apiFetch('/analytics-super', { token });
    // backend returns { status: 'success', data: {...} }
    return payload?.data || null;
  } catch (err) {
    console.error('getSuperDashboard error', err);
    return null;
  }
}

export default { getSuperDashboard };
