import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Header,
  Label,
  Menu,
  Message,
  Segment,
  Statistic,
  Sticky,
  Transition,
} from "semantic-ui-react";
import http from "../api";
import StudentForm from "../components/StudentForm";
import { LeaderBoardContext } from "../contextprovider";

const MarksEntryPage = () => {
  const [leaderboard, setLeaderboard] = useContext(LeaderBoardContext);
  useEffect(() => {
    if (leaderboard.length === 0) {
      let bckup = JSON.parse(localStorage.getItem("LEADERBOARD_BACKUP") || []);
      if (bckup.length === 0) {
        (async () => {
          let lb = await http.get("leaderboard/");
          lb = lb.data;
          localStorage.setItem("LEADERBOARD_BACKUP", JSON.stringify(lb));
          setLeaderboard(lb);
        })();
      } else {
        setLeaderboard(bckup);
      }
    }
  });
  return (
    <div>
      <Container>
        <Grid centered columns={1}>
          <Grid.Column width={100}>
            <Card
              fluid
              color="green"
              style={{ maxWidth: "600px", margin: "10px auto 0 auto" }}
            >
              <Card.Header style={{ padding: "20px 5px", textAlign: "center" }}>
                <Header>Student Details Form</Header>
              </Card.Header>
              <Card.Content>
                <StudentForm />
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
};

export default MarksEntryPage;
