import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

/**
 * Auth component handles user authentication (sign up, login, logout)
 * using Firebase Authentication.
 */
export default function Auth({ user, setUser }) {
  // State to keep track of form data and error messages
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");

  // Handles form submission for login or signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // clear previous error

    try {
      if (isRegistering) {
        // Create new account
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        // Login to existing account
        await signInWithEmailAndPassword(auth, email, password);
      }
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(err.message);
    }
  };

  // Logout the user
  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  // If user is logged in, show a welcome and logout button
  if (user) {
    return (
      <div>
        <p>Welcome, {user.email}!</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  // Otherwise, show login/signup form
  return (
    <div className="auth-container">
      <h2>{isRegistering ? "Sign Up" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="Password (6+ chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
          required
        /><br />
        <button type="submit">{isRegistering ? "Sign Up" : "Login"}</button>
      </form>
      <button onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? "Already have an account? Login" : "No account? Sign Up"}
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  );
}