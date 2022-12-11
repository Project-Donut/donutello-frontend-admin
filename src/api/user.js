const API_URI = import.meta.env.VITE_API_URI;

export const getUserInfo = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URI}/user/token`, {
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
        },
    });
    return response.json();
}