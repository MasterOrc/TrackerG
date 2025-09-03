import React from "react";

/**
 * Dashboard displays summary stats for the user's bets.
 */
export default function Dashboard({ bets }) {
  // Calculate stats
  const totalBets = bets.length;
  const totalWagered = bets.reduce((sum, b) => sum + (parseFloat(b.amount) || 0), 0);
  const netResult = bets.reduce((sum, b) => {
    if (b.result === "win") return sum + (parseFloat(b.amount) || 0);
    if (b.result === "lose") return sum - (parseFloat(b.amount) || 0);
    return sum;
  }, 0);

  return (
    <div className="dashboard">
      <h3>Stats</h3>
      <p>Total Bets: {totalBets}</p>
      <p>Total Wagered: ${totalWagered.toFixed(2)}</p>
      <p>Net Result: <span style={{ color: netResult >= 0 ? "green" : "red" }}>
        ${netResult.toFixed(2)}
      </span></p>
    </div>
  );
}