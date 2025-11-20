import apiFetch from "./apiFetch";

// Get all medicines with pagination
export async function getAllMedicines(page = 1, limit = 10, token = null) {
  try {
    const res = await apiFetch(`/medicines?page=${page}&limit=${limit}`, {
      method: "GET",
      token,
    });
    // Return both medicines and pagination metadata so frontend can paginate
    const medicines = res?.data?.medicines || [];
    const pagination = res?.data?.pagination || {
      total: medicines.length,
      page,
      limit,
      totalPages: 1,
    };
    return { medicines, pagination };
  } catch (error) {
    console.error("Error fetching medicines:", error);
    throw error;
  }
}

// Search medicines by name with pagination and geolocation
export async function searchMedicines(
  name,
  lat,
  lng,
  limit = 10,
  page = 1,
  token = null
) {
  try {
    const params = new URLSearchParams({
      name,
      lat,
      lng,
      limit,
      page,
    });

    const res = await apiFetch(`/medicines/search?${params.toString()}`, {
      method: "GET",
      token,
    });
    return res.data.medicines || [];
  } catch (error) {
    console.error("Error searching medicines:", error);
    throw error;
  }
}

/**
 * Get current user location using Geolocation API
 * @returns {Promise} { lat, lng }
 */
export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported in this browser"));
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  });
};

// Get single medicine by ID
export async function getMedicineById(id, token = null) {
  try {
    const res = await apiFetch(`/medicines/${id}`, {
      method: "GET",
      token,
    });
    return res.data.medicine;
  } catch (error) {
    console.error("Error fetching medicine:", error);
    throw error;
  }
}

// Create new medicine
export async function createMedicine(medicineData, token = null) {
  try {
    const formData = new FormData();

    // Add all fields to FormData
    Object.keys(medicineData).forEach((key) => {
      if (key === "medicineImage" && medicineData[key] instanceof File) {
        formData.append("medicineImage", medicineData[key]);
      } else if (
        medicineData[key] !== null &&
        medicineData[key] !== undefined
      ) {
        formData.append(key, medicineData[key]);
      }
    });

    const res = await apiFetch("/medicines", {
      method: "POST",
      body: formData,
      token,
    });
    const medicine = res.data?.medicine;
    if (medicine) {
      medicine._serverMessage = res.data?.msg || res?.message || null;
    }
    return medicine;
  } catch (error) {
    console.error("Error creating medicine:", error);
    throw error;
  }
}

// Update medicine
export async function updateMedicine(id, medicineData, token = null) {
  try {
    const formData = new FormData();

    // Add all fields to FormData
    Object.keys(medicineData).forEach((key) => {
      if (key === "medicineImage" && medicineData[key] instanceof File) {
        formData.append("medicineImage", medicineData[key]);
      } else if (
        medicineData[key] !== null &&
        medicineData[key] !== undefined
      ) {
        formData.append(key, medicineData[key]);
      }
    });

    const res = await apiFetch(`/medicines/${id}`, {
      method: "PUT",
      body: formData,
      token,
    });
    const medicine = res.data?.medicine;
    if (medicine) {
      medicine._serverMessage = res.data?.msg || res?.message || null;
    }
    return medicine;
  } catch (error) {
    console.error("Error updating medicine:", error);
    throw error;
  }
}

// Delete medicine
export async function deleteMedicine(id, token = null) {
  try {
    const res = await apiFetch(`/medicines/${id}`, {
      method: "DELETE",
      token,
    });
    // return full response so callers can read backend message
    return res;
  } catch (error) {
    console.error("Error deleting medicine:", error);
    throw error;
  }
}
