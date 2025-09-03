// Import React and hooks for state management
import React, { useState } from "react";
// Import the Firebase authentication object from our setup file
import { auth } from "../firebase";
// Import necessary Firebase authentication functions
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

/**
 * Auth component handles all user authentication:
 * - Registering a new user (sign up)
 * - Logging in
 * - Logging out
 * 
 * Props:
 * - user: The currently logged-in user (or null if not logged in)
 * - setUser: Function to update the user state in the parent component
 */
export default function Auth({ user, setUser }) {
  // React state for form data and UI feedback
  const [email, setEmail] = useState(""); // Stores the email address input
  const [password, setPassword] = useState(""); // Stores the password input
  const [isRegistering, setIsRegistering] = useState(false); // Tracks whether we're showing the sign up form
  const [error, setError] = useState(""); // To show any error messages to the user

  /**
   * Handles form submission for both login and signup.
   * Uses Firebase Auth methods depending on the mode.
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the page from reloading on form submit
    setError(""); // Reset error message before trying

    try {
      if (isRegistering) {
        // If in sign-up mode, create a new user with the provided email and password
        await createUserWithEmailAndPassword(auth, email, password);
        // Firebase will automatically log in the user after sign-up
      } else {
        // If in login mode, attempt to sign in with the provided credentials
        await signInWithEmailAndPassword(auth, email, password);
      }
      // Clear the input fields on successful login/sign up
      setEmail("");
      setPassword("");
    } catch (err) {
      // If there's an error (e.g. wrong password), show it to the user
      setError(err.message);
    }
  };

  /**
   * Logs out the current user using Firebase Auth's signOut method.
   */
  const handleLogout = async () => {
    await signOut(auth);
    setUser(null); // Update parent state to show user is logged out
  };

  // If the user is logged in, show a welcome message and logout button
  if (user) {
    return (
      <div>
        <p>Welcome, {user.email}!</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  // If the user is NOT logged in, show the login or sign up form
  // This form switches between login and registration with a button
  return (
    <div className="auth-container">
      <h2>{isRegistering ? "Sign Up" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        {/* Email input field */}
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Updates the email state as you type
          required
        /><br />
        {/* Password input field */}
        <input
          type="password"
          placeholder="Password (6+ chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Updates the password state as you type
          minLength={6}
          required
        /><br />
        {/* Button text changes depending on mode */}
        <button type="submit">{isRegistering ? "Sign Up" : "Login"}</button>
      </form>
      {/* Button to toggle between sign up and login modes */}
      <button onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? "Already have an account? Login" : "No account? Sign Up"}
      </button>
      {/* Show error message if there is one */}
      {error && <p className="error">{error}</p>}
    </div>
  );
}