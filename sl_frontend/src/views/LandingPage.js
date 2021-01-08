import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import http from "../api";
import RouterCard from "../components/RouterCard";
import { LeaderBoardContext } from "../contextprovider";

const LandingPage = () => {
  const [leaderboard, setLeaderboard] = useContext(LeaderBoardContext);
  useEffect(() => {
    (async () => {
      let lb = await http.get("leaderboard/");
      lb = lb.data;
      localStorage.setItem("LEADERBOARD_BACKUP", JSON.stringify(lb));
      setLeaderboard(lb);
    })();
  });
  return (
    <div>
      <Grid className="centerBoth">
        <Grid.Row columns={2}>
          <Grid.Column>
            <Link to="/entermarks">
              <RouterCard name="Enter Marks" meta="marks" />
            </Link>
          </Grid.Column>
          <Grid.Column>
            <Link to="/leaderboard">
              <RouterCard name="Show Leaderboard" meta={leaderboard.length} />
            </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default LandingPage;
