// services/detailService.js

const BASE_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

// Fetch all pinstas (GET /pinstas)
export const getAllPinstas = async () => {
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

// Fetch a specific pinsta by ID (GET /pinstas/:pinstaId)
export const getPinstaById = async (pinstaId) => {
  try {
    const res = await fetch(`${BASE_URL}/pinstas/${pinstaId}`, {
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

// Create a new comment on a pinsta (POST /pinstas/:pinstaId/comments)
export const createComment = async (pinstaId, commentData) => {
  try {
    const res = await fetch(`${BASE_URL}/pinstas/${pinstaId}/comments`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    });
    if (!res.ok) throw new Error("Failed to create comment");
    return await res.json();
  } catch (error) {
    console.error("Error creating comment:", error);
    throw new Error("Could not create comment");
  }
};
