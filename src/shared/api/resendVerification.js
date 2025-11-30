import apiFetch from "./apiFetch";

export default async function resendVerification(email) {
  if (!email) throw new Error("Email is required");

  return apiFetch("/users/resend-verification", {
    method: "POST",
    body: { email },
  });
}
