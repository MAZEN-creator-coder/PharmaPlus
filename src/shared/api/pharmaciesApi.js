import apiFetch from "./apiFetch";

function resolveToken(token) {
  if (token) return token;
  try {
    const t = localStorage.getItem("pharmaplus_token");
    if (t) return t;
  } catch {
    // ignore storage errors
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
  return res.data?.pharmacies || [];
}

export async function getMedicinesByPharmacy(pharmacyId, token = null) {
  const tk = resolveToken(token);
  const res = await apiFetch(`/pharmacies/${pharmacyId}/medicines`, {
    method: "GET",
    token: tk,
  });
  return res.data?.medicines || [];
}

export default { getPharmacies, getMedicinesByPharmacy };
