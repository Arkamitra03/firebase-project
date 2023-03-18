import { Link } from "react-router-dom";
import { auth, provider } from "../config/myFirebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

export const Navbar = () => {
  const [user] = useAuthState(auth);
  async function signOutUser() {
    await signOut(auth);
  }
  return (
    <div>
      <div className="navbar">
        <Link className="links" to="/">
          Home
        </Link>
        
        {!user ? (
          <Link className="links" to="/login">
           Log In
        </Link>
        ) : (
          <Link className="links" to="/createpost">
          Create Post
        </Link>
        )}
      </div>
      {user ? (
        <div style={{ textAlign: "center" }}>
          <h1>Welcome : {user?.displayName || ""}</h1>
          <img src={user?.photoURL || ""} height="50" width="50" />
          <br />
          <button className="btn" onClick={signOutUser}>
            Log Out
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
