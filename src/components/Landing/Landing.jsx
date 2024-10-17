import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPosts } from "../../services/pinstaService";
import styles from "./Landing.module.css";

const Landing = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadPosts = async () => {
      const posts = await fetchPosts();
      setPosts(posts);
    };
    loadPosts();
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Pinstagram</h1>
        <p className={styles.description}>
          Explore and share beautiful moments!
        </p>
      </div>
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
      </div>
      <div className={styles.postGrid}>
        {filteredPosts.map((post) => (
          <Link
            to={`/details/${post._id}`}
            key={post._id}
            className={styles.postLink}
          >
            <div className={styles.photos}>
              <img
                src={post.photos[0]}
                alt={post.title}
                className={styles.image}
              />
              <p className={styles.postTitle}>{post.title}</p>{" "}
              {/* Apply styles here */}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Landing;
