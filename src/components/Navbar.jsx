import { Link } from "react-router-dom";
import { auth, provider } from "../firebase";
import { useState } from "react";
import { signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const navigate = useNavigate();
  function signIn() {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        if (!result.user.email.endsWith("@iith.ac.in")) {
          signOut(auth)
            .then(() => {
              // Sign-out successful.
              toast.error("Please sign in using IITH email");
            })
            .catch((error) => {
              // An error happened.
            });
        } else {
          localStorage.setItem("user", JSON.stringify(result.user));
          setUser(result.user);

          toast.success("Sign in successful");
          // navigate("/newpage");
        }
      })
      .catch((error) => {
        toast.error("Sign in failed");
        console.log(error);
      });
  }
  function handleSignOut() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        localStorage.removeItem("user");
        setUser(null);
        toast.success("Sign out successful");
      })
      .catch((error) => {
        // An error happened.
        toast.error("Sign out failed");
      });
      navigate("/");
  }
  return (
    <div className="bg-gray-950 text-white py-9 px-6 flex items-center justify-between ">
      <div className="flex items-center gap-4">
        <nav className="hidden md:flex items-center gap-6">
          <Link
            className="text-l font-medium hover:underline underline-offset-4"
            to="/"
          >
            Home
          </Link>
          <Link
            className="text-l font-medium hover:underline underline-offset-4"
            to="/lostlist"
          >
            Lost Items
          </Link>
          <Link
            className="text-l font-medium hover:underline underline-offset-4"
            to="/foundlist"
          >
            Found Items
          </Link>
          <Link
            className="text-l font-medium hover:underline underline-offset-4"
            to="/lost"
          >
            Lost an item
          </Link>
          <Link
            className="text-l font-medium hover:underline underline-offset-4"
            to="/found"
          >
            Found an item
          </Link>
        </nav>
      </div>
      <div>
        {user ? (
          <button
            className="bg-[#0077b6] text-white py-2 px-4 rounded-md hover:bg-[#0066a2]"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        ) : (
          <button
            className="bg-[#0077b6] text-white py-2 px-4 rounded-md hover:bg-[#0066a2]"
            onClick={signIn}
          >
            Sign In
          </button>
        )}
      </div>
      <Toaster />
    </div>
  );
}
