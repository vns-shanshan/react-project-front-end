const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

async function createPinsta(pinstaFormData) {

    const newData = new FormData();
    newData.append('title', pinstaFormData.title);
    newData.append('caption', pinstaFormData.caption);
    newData.append('photos', pinstaFormData.photos);

    try {
        const res = await fetch(`${BACKEND_URL}/pinstas`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: newData
            // body: JSON.stringify(pinstaFormData)
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
    const updatedData = new FormData();
    updatedData.append('title', pinstaFormData.title);
    updatedData.append('caption', pinstaFormData.caption);
    updatedData.append('photos', pinstaFormData.photos);

    try {
        const res = await fetch(`${BACKEND_URL}/pinstas/${pinstaId}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: updatedData
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