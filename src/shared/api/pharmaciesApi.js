import apiFetch from "./apiFetch";

function resolveToken(token) {
  if (token) return token;
  try {
    const t = localStorage.getItem("pharmaplus_token");
    if (t) return t;
  } catch {
    // ignore 
  }
  // If the backend requires authentication, fail fast on the client
  throw new Error("Authentication required: missing token");
}

export async function getPharmacies(page = 1, limit = 10, token = null) {
  const tk = resolveToken(token);
  const res = await apiFetch(`/pharmacies?page=${page}&limit=${limit}`, {
    method: "GET",
    token: tk,
  });

  try {
    console.debug("[api] getPharmacies payload:", res);
  } catch {
    // ignore 
  }

  if (res && res.data && Array.isArray(res.data.pharmacies))
    return res.data.pharmacies;
  if (res && Array.isArray(res)) return res;
  if (res && res.data && Array.isArray(res.data)) return res.data;

  // Fallback: try to extract nested arrays or return empty
  return res?.data?.pharmacies || res?.data || [];
}

export async function getMedicinesByPharmacy(pharmacyId, token = null) {
  const tk = resolveToken(token);
  const res = await apiFetch(`/pharmacies/${pharmacyId}/medicines`, {
    method: "GET",
    token: tk,
  });
  return res.data?.medicines || [];
}

export async function updatePharmacy(id, data, token = null) {
  const tk = resolveToken(token);
  const res = await apiFetch(`/pharmacies/${id}`, {
    method: "PUT",
    token: tk,
    body: data,
  });
  return res.data || res;
}

export async function deletePharmacy(id, token = null) {
  const tk = resolveToken(token);
  const res = await apiFetch(`/pharmacies/${id}`, {
    method: "DELETE",
    token: tk,
  });
  return res.data || res;
}

export default {
  getPharmacies,
  getMedicinesByPharmacy,
  updatePharmacy,
  deletePharmacy,
};
