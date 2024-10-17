import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./Details.module.css";
import {
  getPostDetails,
  createComment,
  likePost,
} from "../../services/pinstaService";

const Details = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [userLiked, setUserLiked] = useState(false);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const postDetails = await getPostDetails(postId);
        setPost(postDetails);
        setComments(postDetails.comments);
        setUserLiked(
          postDetails.likes.some(
            (like) => like.author_id === localStorage.getItem("userId")
          )
        );
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };
    fetchPostDetails();
  }, [postId]);

  const handleAddComment = async () => {
    if (newComment.trim()) {
      try {
        const updatedPost = await createComment(postId, {
          commentDetails: newComment,
        });
        setComments(updatedPost.comments);
        setNewComment("");
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  const handleLike = async () => {
    if (!userLiked) {
      try {
        const updatedPost = await likePost(postId);
        setUserLiked(true);
        setPost(updatedPost);
      } catch (error) {
        console.error("Error liking post:", error);
      }
    }
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div className={styles.detailsPage}>
      <Link to="/" className={styles.backLink}>
        ← Back to Home
      </Link>
      <div className={styles.contentWrapper}>
        {/* Left Side: Image */}
        <div className={styles.imageContainer}>
          <img
            src={post.photos[0]}
            alt={post.title}
            className={styles.image}
          />
        </div>

        {/* Right Side: Text Content (Title, Likes, Comments) */}
        <div className={styles.textContent}>
          <h1 className={styles.title}>{post.title}</h1>
          <button onClick={handleLike} disabled={userLiked} className={styles.likeButton}>
            ❤️ {post.likes.length} {userLiked ? "Liked" : "Like"}
          </button>
          <h2 className={styles.commentsTitle}>Comments</h2>
          <div className={styles.comments}>
            {comments.map((comment, index) => (
              <div key={index} className={styles.comment}>
                <strong>{comment.author}</strong>
                <p>{comment.commentDetails}</p>
              </div>
            ))}
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment"
              className={styles.commentInput}
            />
            <button onClick={handleAddComment}>Add Comment</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
