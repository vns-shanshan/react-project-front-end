// Define BASE_URL once for consistency across the file
const BASE_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

// Fetch all posts
export const fetchPosts = async () => {
  try {
    const res = await fetch(`${BASE_URL}/pinstas`, {
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
export const getPostDetails = async (postId) => {
  try {
    const res = await fetch(`${BASE_URL}/pinstas/${postId}`, {
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
export const createComment = async (postId, commentData) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error("No token found");

  try {
    const res = await fetch(`${BASE_URL}/pinstas/${postId}/comments`, {
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
export const likePost = async (postId) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error("No token found");

  try {
    const res = await fetch(`${BASE_URL}/pinstas/${postId}/like`, {
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
