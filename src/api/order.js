const API_URI = import.meta.env.VITE_API_URI;

export const getOrders = async (query = null) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URI}/order${query}`, {
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
        },
    });
    return response.json();
}
