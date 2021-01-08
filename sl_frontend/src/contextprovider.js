import { createContext, useState } from "react";
export const LeaderBoardContext = createContext();

export function LeaderBoardProvider(props) {
  const [leaderboard, setLeaderboard] = useState([]);
  return (
    <LeaderBoardContext.Provider value={[leaderboard, setLeaderboard]}>
      {props.children}
    </LeaderBoardContext.Provider>
  );
}
