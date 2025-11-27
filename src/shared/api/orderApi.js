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

// Get an order by id
export async function getOrderById(orderId, token = null) {
  if (!orderId) throw new Error('Missing order id');
  try {
    const res = await apiFetch(`/orders/${encodeURIComponent(orderId)}`, { token });
    // backend shape may be { data: { order: {...} } } or { data: {...} }
    return res?.data ?? res;
  } catch (err) {
    console.error('getOrderById error', err);
    throw err;
  }
}
