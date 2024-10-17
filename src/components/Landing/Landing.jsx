import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPosts } from "../../services/pinstaService";
import styles from './Landing.module.css';

const Landing = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
      const posts = await fetchPosts();
      console.log(posts);
      setPosts(posts);
    };
    loadPosts();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Landing Page</h1>
      <div className={styles.postGrid}>
        {posts.map(post => (
          <Link to={`/details/${post._id}`} key={post._id}>
            <div className={styles.post}>
              <img src={post.photos[0]} alt={post.title} className={styles.image} />
              <p className={styles.postTitle}>{post.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Landing;
