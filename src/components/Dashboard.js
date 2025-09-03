import React from "react";

/**
 * Dashboard component shows summary statistics about the user's bets.
 * 
 * Props:
 * - bets: Array of bet objects (each with at least: amount, result)
 */
export default function Dashboard({ bets }) {
  // Calculate total number of bets
  const totalBets = bets.length;

  // Calculate total amount wagered (add up 'amount' fields)
  // Use parseFloat in case amount comes as string
  const totalWagered = bets.reduce((sum, b) => sum + (parseFloat(b.amount) || 0), 0);

  // Calculate net result:
  // - For each bet: add amount for wins, subtract for losses, ignore pushes
  const netResult = bets.reduce((sum, b) => {
    if (b.result === "win") return sum + (parseFloat(b.amount) || 0);
    if (b.result === "lose") return sum - (parseFloat(b.amount) || 0);
    return sum; // pushes (or other) don't affect net
  }, 0);

  return (
    <div className="dashboard">
      <h3>Stats</h3>
      {/* Show stats with clear labels */}
      <p>Total Bets: {totalBets}</p>
      <p>Total Wagered: ${totalWagered.toFixed(2)}</p>
      <p>
        Net Result:{" "}
        {/* Color code the net result: green for +, red for - */}
        <span style={{ color: netResult >= 0 ? "green" : "red" }}>
          ${netResult.toFixed(2)}
        </span>
      </p>
    </div>
  );
}