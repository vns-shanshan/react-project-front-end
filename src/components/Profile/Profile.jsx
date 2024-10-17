import { useContext, useEffect } from "react";
import { AuthedUserContext } from "../../App";
import * as profileService from "../../services/profileService";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import * as pinstaService from "../../services/pinstaService";
import styles from "./Profile.module.css";
const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

function Profile() {
  const [profile, setProfile] = useState(null);
  const loggedInUser = useContext(AuthedUserContext);
  const { userId } = useParams();

  async function handleDeletePinsta(pinstaId) {
    const isSuccessful = await pinstaService.deletePinsta(pinstaId);

    if (isSuccessful) {
      const updatedPinstas = profile.posts.filter(
        (pinsta) => pinsta._id !== pinstaId
      );

      const updatedProfile = { ...profile, posts: updatedPinstas };
      setProfile(updatedProfile);
    }
  }

  useEffect(() => {
    async function fetchProfile() {
      const profileData = await profileService.showProfile(userId);

      setProfile(profileData.user);
    }

    fetchProfile();
  }, [userId]);

  if (!profile) {
    return <p>...</p>;
  }

  // add !! to ensure it's boolean
  const isAuthor = !!loggedInUser && profile._id === loggedInUser._id;

  const title = isAuthor
    ? `Welcome, ${loggedInUser.username}`
    : `${profile.username}'s Account`;

  return (
    <>
      <div className={styles.container}>
        <h1>{title}</h1>

        <div className={styles.profileSection}>
          <div className={styles.profilePic}>
            <img src="https://ih1.redbubble.net/image.14735472.7579/sticker,375x360.u3.png" />
          </div>
          <div className={styles.profileRightSection}>
            <div>
              <div className={styles.userInfo}>
                <h3>{profile.username}</h3>
              </div>
              <div className={styles.postCount}>
                <h4>{profile.posts.length} Posts</h4>
              </div>
            </div>
            {isAuthor && (
              <Link to="/pinstas/new" className={styles.createButton}>
                Create a Post
              </Link>
            )}
          </div>
        </div>

        <div className={styles.postList}>
          {profile.posts.map((post) => (
            <article key={post._id} className={styles.postCard}>
              <header className={styles.postHeader}>
                <h4>{post.title}</h4>
                <div className={styles.postActions}>
                  {isAuthor ? (
                    <Link
                      to={`/pinstas/${post._id}/edit`}
                      className={styles.editButton}
                    >
                      Edit
                    </Link>
                  ) : (
                    ""
                  )}

                  {isAuthor ? (
                    <button
                      onClick={() => handleDeletePinsta(post._id)}
                      className={styles.deleteButton}
                    >
                      Delete
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </header>

              <img src={`${BACKEND_URL}${post.photos}`} alt={post.title} />
            </article>
          ))}
        </div>
      </div>
    </>
  );
}

export default Profile;
