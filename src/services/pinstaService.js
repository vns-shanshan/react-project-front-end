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



// Fetch all posts
 const fetchPosts = async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/pinstas`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!res.ok) throw new Error("Failed to fetch posts");
    return await res.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

// Fetch post details by postId
 const getPostDetails = async (postId) => {
  try {
    const res = await fetch(`${BACKEND_URL}/pinstas/${postId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!res.ok) throw new Error("Failed to fetch post details");
    return await res.json();
  } catch (error) {
    console.error("Error fetching post details:", error);
    throw error;
  }
};

// Create a comment for a specific post
const createComment = async (postId, commentData) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error("No token found");

  try {
    const res = await fetch(`${BACKEND_URL}/pinstas/${postId}/comments`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentData),
    });
    if (!res.ok) throw new Error("Failed to add comment");
    return await res.json();
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
};

// Like a specific post
const likePost = async (postId) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error("No token found");

  try {
    const res = await fetch(`${BACKEND_URL}/pinstas/${postId}/like`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw new Error("Could not like post");
    return await res.json();
  } catch (error) {
    console.error("Error liking post:", error);
    throw error;
  }
};
export { createPinsta, deletePinsta, editPinsta, showPinsta, fetchPosts, getPostDetails, createComment, likePost }
