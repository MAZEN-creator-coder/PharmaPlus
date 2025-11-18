import apiFetch from "./apiFetch";

// Simple order creation - sends cart data to backend
export async function createOrder(orderData, token = null) {
  try {
    const res = await apiFetch("/orders", {
      method: "POST",
      body: orderData,
      token,
    });
    return res.data.order;
  } catch (error) {
    console.error("Error creating order:", error);
    console.error("Error message:", error.message);
    console.error("Error payload:", error.payload);
    throw error;
  }
}
