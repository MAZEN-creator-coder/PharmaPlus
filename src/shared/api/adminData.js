// Use centralized apiFetch helper so base URL and auth are consistent with the app
import apiFetch from './apiFetch';

// Direct wrappers around backend controller endpoints (use controller functions)
export async function getCustomerAnalytics(token, pharmacyId) {
  if (!pharmacyId) return null;
  try {
    const res = await apiFetch(`/pharmacies/${pharmacyId}/customer-analytics`, { token }).catch(() => null);
    return res && res.data ? res.data : null;
  } catch (err) {
    console.error('getCustomerAnalytics error', err);
    return null;
  }
}

export async function getPharmacyDashboard(token, pharmacyId) {
  if (!pharmacyId) return null;
  try {
    const res = await apiFetch(`/pharmacies/${pharmacyId}/dashboard`, { token }).catch(() => null);
    return res && res.data ? res.data : null;
  } catch (err) {
    console.error('getPharmacyDashboard error', err);
    return null;
  }
}

export async function getPharmacyById(token, pharmacyId) {
  if (!pharmacyId) return null;
  try {
    const res = await apiFetch(`/pharmacies/${pharmacyId}`, { token }).catch(() => null);
    return res && res.data ? res.data.pharmacy || res.data : null;
  } catch (err) {
    console.error('getPharmacyById error', err);
    return null;
  }
}

export async function getOrdersByPharmacy(token, pharmacyId, limit = 5) {
  if (!pharmacyId) return null;
  try {
    const res = await apiFetch(`/orders/pharmacy/${pharmacyId}?limit=${limit}`, { token }).catch(() => null);
    return res && res.data ? res.data.orders : null;
  } catch (err) {
    console.error('getOrdersByPharmacy error', err);
    return null;
  }
}

export async function getLowStockAlerts(token, pharmacyId) {
  if (!pharmacyId) return null;
  try {
    const res = await apiFetch(`/pharmacies/${pharmacyId}/low-stock-alerts`, { token }).catch(() => null);
    // controller returns top-level fields (not wrapped in `data`), so return the whole payload
    return res || null;
  } catch (err) {
    console.error('getLowStockAlerts error', err);
    return null;
  }
}

export async function getSalesByCategory(token, pharmacyId) {
  if (!pharmacyId) return null;
  try {
    const res = await apiFetch(`/pharmacies/${pharmacyId}/sales-by-category`, { token }).catch(() => null);
    // controller returns the salesByCategory at top-level
    return res || null;
  } catch (err) {
    console.error('getSalesByCategory error', err);
    return null;
  }
}

export default { getCustomerAnalytics, getPharmacyDashboard, getPharmacyById , getLowStockAlerts};
