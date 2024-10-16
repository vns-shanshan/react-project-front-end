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
        const res = await fetch(`${BACKEND_URL}/pinstas/${pinstaId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });

        return res.status === 200;
    } catch (error) {
        console.log(error);
    }
}

async function editPinsta(pinstaFormData, pinstaId) {
    try {
        const res = await fetch(`${BACKEND_URL}/pinstas/${pinstaId}`, {
            method: "PUT",
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

async function showPinsta(pinstaId) {
    try {
        const res = await fetch(`${BACKEND_URL}/pinstas/${pinstaId}`);
        const data = await res.json();

        return data;
    } catch (error) {
        console.log(error);
    }
}

export { createPinsta, deletePinsta, editPinsta, showPinsta }