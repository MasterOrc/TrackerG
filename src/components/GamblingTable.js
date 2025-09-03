import React from "react";

/**
 * GamblingTable component displays a list of bets in a table.
 * 
 * Props:
 * - bets: Array of bet objects (each with fields: date, type, amount, odds, result, notes, id)
 */
export default function GamblingTable({ bets }) {
  // If there are no bets, give a friendly message
  if (!bets.length) return <p>No bets yet.</p>;

  // Render a table with headings and one row per bet
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {/* Table column headings */}
            <th>Date</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Odds</th>
            <th>Result</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {/* Loop through each bet and make a row */}
          {bets.map((bet) => (
            <tr key={bet.id}>
              <td>{bet.date}</td>
              <td>{bet.type}</td>
              <td>{bet.amount}</td>
              <td>{bet.odds}</td>
              <td>{bet.result}</td>
              <td>{bet.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}