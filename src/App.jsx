import { useState, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Landing from "./components/Landing/Landing";
import Details from "./components/Details/Details";
import SignupForm from "./components/SignupForm/SignupForm";
import SigninForm from "./components/SigninForm/SigninForm";
<<<<<<< HEAD
import Profile from "./components/Profile/Profile";
import CreatePinstaForm from "./components/PinstaForm/CreatePinstaForm";
import EditPinstaForm from "./components/PinstaForm/EditPinstaForm";

import * as authService from "../src/services/authService"; // import the authservice
=======
import * as authService from "../src/services/authService"; 
>>>>>>> ace65e6127698f4da76f1dc3b3dcf7e135fb4167

export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser());

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  return (
<<<<<<< HEAD
    <>
      <AuthedUserContext.Provider value={user}>
        <div id="app-container">
          <NavBar user={user} handleSignout={handleSignout} />
          <Routes>
            {user ? (
              <>
                <Route path="/" element={<Dashboard user={user} />} />

                <Route
                  path="/pinstas/new"
                  element={<CreatePinstaForm user={user} />}
                />
                <Route
                  path="/pinstas/:pinstaId/edit"
                  element={<EditPinstaForm />}
                />
              </>
            ) : (
              <Route path="/" element={<Landing />} />
            )}
            <Route path="/profiles/:userId" element={<Profile />} />
            <Route path="/signup" element={<SignupForm setUser={setUser} />} />
            <Route path="/signin" element={<SigninForm setUser={setUser} />} />
          </Routes>
        </div>
      </AuthedUserContext.Provider>
    </>
=======
    <AuthedUserContext.Provider value={user}>
      <div id="app-container">
        <NavBar user={user} handleSignout={handleSignout} />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<SignupForm setUser={setUser} />} />
          <Route path="/signin" element={<SigninForm setUser={setUser} />} />
          <Route path="/details/:postId" element={<Details />} />
        </Routes>
      </div>
    </AuthedUserContext.Provider>
>>>>>>> ace65e6127698f4da76f1dc3b3dcf7e135fb4167
  );
};

export default App;
