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
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/signin">Log In</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};
export default NavBar;
