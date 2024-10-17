import { Link, useLocation } from "react-router-dom";
import { AuthedUserContext } from "../../App";
import { useContext } from "react";

import styles from "./NavBar.module.css";

const NavBar = ({ handleSignout }) => {
  const user = useContext(AuthedUserContext);
  const location = useLocation();
  const selectedTab = location.pathname;

  return (
    <>
      {user ? (
        <nav className={styles.container}>
          <ul>
            <li>
              <div
                className={
                  selectedTab === "/" ? styles.linkBgSelected : styles.linkBg
                }
              >
                <Link to="/">Home</Link>
              </div>
            </li>
            <li>
              <div
                className={
                  selectedTab === "/pinstas/new"
                    ? styles.linkBgSelected
                    : styles.linkBg
                }
              >
                <Link to="/pinstas/new">Create</Link>
              </div>
            </li>
            <li>
              <div
                className={
                  selectedTab === `/profiles/${user._id}`
                    ? styles.linkBgSelected
                    : styles.linkBg
                }
              >
                <Link to={`/profiles/${user._id}`}>Profile</Link>
              </div>
            </li>
            <li>
              <div>
                <Link onClick={handleSignout}>Sign Out</Link>
              </div>
            </li>
          </ul>
        </nav>
      ) : (
        <nav className={styles.container}>
          <ul>
            <li>
              <div
                className={
                  selectedTab === "/" ? styles.linkBgSelected : styles.linkBg
                }
              >
                <Link to="/">Home</Link>
              </div>
            </li>
            <li>
              <div
                className={
                  selectedTab === "/signin"
                    ? styles.linkBgSelected
                    : styles.linkBg
                }
              >
                <Link to="/signin">Log In</Link>
              </div>
            </li>
            <li>
              <div
                className={
                  selectedTab === "/signup"
                    ? styles.linkBgSelected
                    : styles.linkBg
                }
              >
                <Link to="/signup">Sign Up</Link>
              </div>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};
export default NavBar;