import apiFetch from "./apiFetch";
// Create a new order
export async function createOrder(orderData, token = null) {
  try {
    const res = await apiFetch("/orders", {
      method: "POST",
      body: orderData,
      token,
    });
    // return full response so callers can read messages and metadata
    return res;
  } catch (error) {
    console.error("Error creating order:", error);
    console.error("Error message:", error.message);
    console.error("Error payload:", error.payload);
    throw error;
  }
}
