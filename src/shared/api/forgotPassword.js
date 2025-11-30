import apiFetch from "./apiFetch";

export default async function forgotPassword(email) {
  if (!email) throw new Error("Email is required");
  return apiFetch("/users/forgot-password", {
    method: "POST",
    body: { email },
  });
}
