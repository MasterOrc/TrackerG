import React from "react";

/**
 * GamblingTable displays bets in a table format.
 * Props:
 * - bets: array of bet objects
 */
export default function GamblingTable({ bets }) {
  if (!bets.length) return <p>No bets yet.</p>;

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Odds</th>
            <th>Result</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
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