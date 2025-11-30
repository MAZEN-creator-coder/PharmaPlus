import apiFetch from "./apiFetch";

export default async function resetPassword(token, password) {
  if (!token) throw new Error("Token is required");
  if (!password) throw new Error("Password is required");
  return apiFetch(`/users/reset-password/${token}`, {
    method: "POST",
    body: { password },
  });
}
