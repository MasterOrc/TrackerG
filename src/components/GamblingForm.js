import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

/**
 * GamblingForm lets the user enter a new gambling record and
 * saves it to Firestore under the 'bets' collection.
 */
export default function GamblingForm({ user, onAdd }) {
  // Form fields for a bet
  const [form, setForm] = useState({
    date: "",
    type: "",
    amount: "",
    odds: "",
    result: "",
    notes: "",
  });
  const [error, setError] = useState("");

  // Handle form field changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!form.date || !form.type || !form.amount || !form.result) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      // Save the bet to Firestore
      await addDoc(collection(db, "bets"), {
        ...form,
        amount: parseFloat(form.amount),
        odds: form.odds ? parseFloat(form.odds) : "",
        userId: user.uid,
        createdAt: Timestamp.now(),
      });
      setForm({ date: "", type: "", amount: "", odds: "", result: "", notes: "" });
      if (onAdd) onAdd(); // Let parent know to refresh data
    } catch (err) {
      setError("Error saving bet: " + err.message);
    }
  };

  return (
    <form className="gambling-form" onSubmit={handleSubmit}>
      <h3>Add a New Bet</h3>
      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="type"
        placeholder="Type (e.g. Sports, Casino)"
        value={form.type}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="amount"
        placeholder="Amount wagered"
        value={form.amount}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="odds"
        placeholder="Odds (optional)"
        value={form.odds}
        onChange={handleChange}
      />
      <select name="result" value={form.result} onChange={handleChange} required>
        <option value="">Result</option>
        <option value="win">Win</option>
        <option value="lose">Lose</option>
        <option value="push">Push</option>
      </select>
      <input
        type="text"
        name="notes"
        placeholder="Notes (optional)"
        value={form.notes}
        onChange={handleChange}
      />
      <button type="submit">Add Bet</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}