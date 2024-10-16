const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

async function createPinsta(pinstaFormData) {
    try {
        const res = await fetch(`${BACKEND_URL}/pinstas`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(pinstaFormData)
        });
        const data = await res.json();

        return data;
    } catch (error) {
        console.log(error);
    }
}

async function deletePinsta(pinstaId) {
    try {
        await fetch(`${BACKEND_URL}/pinstas/${pinstaId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
    } catch (error) {
        console.log(error);
    }
}

export { createPinsta, deletePinsta }