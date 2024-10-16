import { useContext, useEffect } from "react";
import { AuthedUserContext } from "../../App";
import * as profileService from "../../services/profileService";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import * as pinstaService from "../../services/pinstaService";

function Profile({ user }) {
  const [profile, setProfile] = useState(null);
  const loggedInUser = useContext(AuthedUserContext);
  const { userId } = useParams();

  async function handleDeletePinsta(pinstaId) {
    await pinstaService.deletePinsta(pinstaId);

    const updatedPinstas = profile.posts.filter(
      (pinsta) => pinsta._id !== pinstaId
    );

    const updatedProfile = { ...profile, posts: updatedPinstas };
    setProfile(updatedProfile);
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

  return (
    <>
      <h1>Welcome, {user.username}</h1>

      <div>
        <h3>{user.username}</h3>
        <h4>{profile.posts.length} Posts</h4>
        <Link to="/pinstas/new">Create a Post</Link>
      </div>

      <div>
        {profile.posts.map((post) => (
          <article key={post._id}>
            <header>
              <h4>{post.title}</h4>
              <Link to={`/pinstas/${post._id}`}>Edit</Link>

              {post.author_id === loggedInUser._id ? (
                <button onClick={() => handleDeletePinsta(post._id)}>
                  Delete
                </button>
              ) : (
                ""
              )}
            </header>

            <img src={post.photos} alt={post.title} />
          </article>
        ))}
      </div>
    </>
  );
}

export default Profile;
