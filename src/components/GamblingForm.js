// Import React and hooks for form state
import React, { useState } from "react";
// Import Firestore database object from our Firebase setup
import { db } from "../firebase";
// Import Firestore functions for adding a document and getting the current timestamp
import { collection, addDoc, Timestamp } from "firebase/firestore";

/**
 * GamblingForm component lets the user add a new gambling record (a "bet").
 * Each record is saved to Firestore in the "bets" collection.
 * 
 * Props:
 * - user: The currently logged-in user object (so we can link bets to users)
 * - onAdd: (Optional) Function to call after a bet is added (for refreshing data)
 */
export default function GamblingForm({ user, onAdd }) {
  // State to hold the form's current values
  const [form, setForm] = useState({
    date: "",    // Date of the bet (string, yyyy-mm-dd)
    type: "",    // Type of bet (sports, casino, etc)
    amount: "",  // Amount wagered (number, as string here)
    odds: "",    // Odds (optional)
    result: "",  // Result: win/lose/push
    notes: "",   // Any extra notes
  });
  const [error, setError] = useState(""); // For showing form errors

  /**
   * Handle changes in any form field.
   * Updates the relevant property in the form state.
   */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /**
   * Handle form submission:
   * - Validate required fields
   * - Save the bet to Firestore
   * - Clear the form if successful
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    setError(""); // Clear previous error

    // Simple check: make sure required fields are filled
    if (!form.date || !form.type || !form.amount || !form.result) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      // Add a new document to the "bets" collection in Firestore
      await addDoc(collection(db, "bets"), {
        ...form,
        amount: parseFloat(form.amount), // convert to number
        odds: form.odds ? parseFloat(form.odds) : "", // convert if provided
        userId: user.uid, // Save the user's unique ID with the bet
        createdAt: Timestamp.now(), // Store when the bet was added (for ordering)
      });
      // Reset the form to empty after successful add
      setForm({ date: "", type: "", amount: "", odds: "", result: "", notes: "" });
      // If the parent component gave us an onAdd function, call it (to refresh the bet list)
      if (onAdd) onAdd();
    } catch (err) {
      setError("Error saving bet: " + err.message);
    }
  };

  // The form UI: lots of input fields, with labels and validation
  return (
    <form className="gambling-form" onSubmit={handleSubmit}>
      <h3>Add a New Bet</h3>
      {/* Date input */}
      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        required
      />
      {/* Type of bet (free text) */}
      <input
        type="text"
        name="type"
        placeholder="Type (e.g. Sports, Casino)"
        value={form.type}
        onChange={handleChange}
        required
      />
      {/* Amount wagered (number input) */}
      <input
        type="number"
        name="amount"
        placeholder="Amount wagered"
        value={form.amount}
        onChange={handleChange}
        required
      />
      {/* Odds (optional) */}
      <input
        type="text"
        name="odds"
        placeholder="Odds (optional)"
        value={form.odds}
        onChange={handleChange}
      />
      {/* Result: dropdown menu for win/lose/push */}
      <select name="result" value={form.result} onChange={handleChange} required>
        <option value="">Result</option>
        <option value="win">Win</option>
        <option value="lose">Lose</option>
        <option value="push">Push</option>
      </select>
      {/* Notes (optional, free text) */}
      <input
        type="text"
        name="notes"
        placeholder="Notes (optional)"
        value={form.notes}
        onChange={handleChange}
      />
      {/* Submit button */}
      <button type="submit">Add Bet</button>
      {/* Show any error messages */}
      {error && <p className="error">{error}</p>}
    </form>
  );
}