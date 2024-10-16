// src/components/Landing/Landing.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Simulated API call to fetch posts
    const fetchPosts = async () => {
      const samplePosts = [
        { _id: "1", title: "Sample Post 1", imageURL: "https://via.placeholder.com/150" },
        { _id: "2", title: "Sample Post 2", imageURL: "https://via.placeholder.com/150" },
      ];
      setPosts(samplePosts);
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Explore Posts</h1>
      <div className="post-grid">
        {posts.map(post => (
          <Link to={`/details/${post._id}`} key={post._id}>
            <div className="post">
              <img src={post.imageURL} alt={post.title} />
              <p>{post.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Landing;
