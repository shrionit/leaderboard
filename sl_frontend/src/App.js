import { useContext, useEffect } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import {
  Button,
  Container,
  Menu,
  Statistic,
  Sticky,
  Transition,
} from "semantic-ui-react";
import NavBar from "./components/NavBar";
import { LeaderBoardProvider, LeaderBoardContext } from "./contextprovider";
import LandingPage from "./views/LandingPage";
import LeaderBoardPage from "./views/LeaderBoardPage";
import MarksEntryPage from "./views/MarksEntryPage";

function App() {
  return (
    <div>
      <LeaderBoardProvider>
        <Container textAlign="center" fluid>
          <Router>
            <NavBar />
            <Switch>
              <Route exact path="/">
                <LandingPage />
              </Route>
              <Route path="/entermarks">
                <MarksEntryPage />
              </Route>
              <Route path="/leaderboard">
                <LeaderBoardPage />
              </Route>
            </Switch>
          </Router>
        </Container>
      </LeaderBoardProvider>
    </div>
  );
}

export default App;
