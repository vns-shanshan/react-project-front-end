import { useContext, useEffect } from "react";
import { AuthedUserContext } from "../../App";
import * as profileService from "../../services/profileService";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import * as pinstaService from "../../services/pinstaService";
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
      <h1>{title}</h1>

      <div>
        <h3>{profile.username}</h3>
        <h4>{profile.posts.length} Posts</h4>
        {isAuthor && <Link to="/pinstas/new">Create a Post</Link>}
      </div>

      <div>
        {profile.posts.map((post) => (
          <article key={post._id}>
            <header>
              <h4>{post.title}</h4>
              {isAuthor ? (
                <Link to={`/pinstas/${post._id}/edit`}>Edit</Link>
              ) : (
                ""
              )}

              {isAuthor ? (
                <button onClick={() => handleDeletePinsta(post._id)}>
                  Delete
                </button>
              ) : (
                ""
              )}
            </header>

            <img src={`${BACKEND_URL}${post.photos}`} alt={post.title} />
          </article>
        ))}
      </div>
    </>
  );
}

export default Profile;
