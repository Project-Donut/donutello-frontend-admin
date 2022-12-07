const API_URI = import.meta.env.VITE_API_URI;

export const getOrders = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URI}/order`, {
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
        },
    });
    return response.json();
}
