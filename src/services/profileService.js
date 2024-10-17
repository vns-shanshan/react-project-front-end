const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

async function showProfile(userId) {
    try {
        const res = await fetch(`${BACKEND_URL}/profiles/${userId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });

        const data = await res.json();
        // const profilePostsLength = data.user.posts.length;

        return data;

    } catch (error) {
        console.log(error);
    }
}

export { showProfile };
