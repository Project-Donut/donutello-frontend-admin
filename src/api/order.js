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

export const putOrder = async (update) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URI}/order/${update._id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
        },
        body: JSON.stringify(update),
    });
    return response.json();
}