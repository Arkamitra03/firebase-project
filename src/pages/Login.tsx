import { auth, provider } from "../config/myFirebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom"
export const Login = () => {
    const navigate = useNavigate()
  
    async function signInWithGoogle() {
        const result = await signInWithPopup(auth, provider);
        console.log(result);
        navigate("/"); //after authenticating redirecting back to the home page
    };

    return (
    <div style={{ textAlign: "center" }}>
      <h1>Sign in with google</h1>
      <button className="btn" onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  );
};
