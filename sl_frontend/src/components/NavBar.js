import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Menu, Statistic, Sticky } from "semantic-ui-react";
import { LeaderBoardContext } from "../contextprovider";

const NavBar = (props) => {
  const [leaderboard, setLeaderboard] = useContext(LeaderBoardContext);
  return (
    <div>
      <Sticky>
        <Menu fluid>
          <Menu.Menu position="left">
            <Menu.Item>
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/entermarks">Marks Entry</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/leaderboard">Leaderboard</Link>
            </Menu.Item>
          </Menu.Menu>
          <Menu.Menu position="right">
            <Statistic
              style={{
                margin: "auto 10px auto 10px",
              }}
              size="mini"
              color="blue"
              label="Total Students"
              value={leaderboard.length}
            />
          </Menu.Menu>
        </Menu>
      </Sticky>
    </div>
  );
};

export default NavBar;
