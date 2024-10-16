// src/components/Details/Details.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const Details = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const samplePost = {
        _id: postId,
        title: `Sample Post ${postId}`,
        content: "This is a detailed view of the post content.",
        imageURL: "https://via.placeholder.com/300",
      };
      setPost(samplePost);
    };
    fetchPost();
  }, [postId]);

  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <Link to="/">← Back to Home</Link>
      <h1>{post.title}</h1>
      <img src={post.imageURL} alt={post.title} />
      <p>{post.content}</p>
    </div>
  );
};

export default Details;
