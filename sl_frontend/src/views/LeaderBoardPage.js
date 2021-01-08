import React, { useEffect, useState } from "react";
import _ from "lodash";
import { LeaderBoardContext } from "../contextprovider";
import {
  Card,
  Container,
  Grid,
  Header,
  Input,
  Segment,
  Table,
} from "semantic-ui-react";
import http from "../api";

function tableReducer(state, action) {
  switch (action.type) {
    case "UPDATE":
      return {
        ...state,
        data: action.data,
      };
    case "CHANGE_SORT":
      if (state.column === action.column) {
        let d = state.data.slice();
        d.reverse();
        let o = {
          ...state,
          data: d,
          direction:
            state.direction === "ascending" ? "descending" : "ascending",
        };
        return o;
      }
      let o = {
        column: action.column,
        data: _.sortBy(state.data, [action.column]),
        direction: "ascending",
      };
      return o;
    default:
      throw new Error();
  }
}

const LeaderBoardPage = () => {
  const [leaderboard, setLeaderboard] = React.useContext(LeaderBoardContext);
  const [search, setSearch] = useState("");
  const [state, dispatch] = React.useReducer(tableReducer, {
    column: null,
    data: leaderboard,
    direction: null,
  });
  const { column, data, direction } = state;

  useEffect(() => {
    if (leaderboard.length === 0) {
      let bckup = JSON.parse(localStorage.getItem("LEADERBOARD_BACKUP") || []);
      if (bckup.length === 0) {
        (async () => {
          let lb = await http.get("leaderboard/");
          lb = lb.data;
          localStorage.setItem("LEADERBOARD_BACKUP", JSON.stringify(lb));
          setLeaderboard(lb);
          dispatch({ type: "UPDATE", data: lb });
        })();
      } else {
        setLeaderboard(bckup);
        dispatch({ type: "UPDATE", data: bckup });
      }
    }
  });

  const handleSearch = (e) => {
    let searchTxt = e.target.value;
    let result = _.filter(leaderboard, (o) => {
      o = Object.values(o);
      let s = searchTxt.toUpperCase();
      let b = false;
      o.map((e) => {
        if ((e + "").toUpperCase().indexOf(s) > -1) {
          b = true;
          return;
        }
      });
      return b;
    });
    setSearch(searchTxt);
    dispatch({ type: "UPDATE", data: result });
  };

  return (
    <div>
      <Container>
        <Grid centered columns={1}>
          <Grid.Column width={100}>
            <Card fluid style={{ margin: "10px auto 0 auto" }}>
              <Card.Header style={{ padding: "20px 5px" }}>
                <Container fluid>
                  <Header floated="left" as="h1">
                    Student Leaderboard
                  </Header>
                  <Input
                    style={{ float: "right" }}
                    icon="search"
                    placeholder="Search..."
                    value={search}
                    onChange={handleSearch}
                  />
                </Container>
              </Card.Header>
              <Card.Content>
                <Table sortable celled>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell
                        sorted={column === "rollno" ? direction : null}
                        onClick={() =>
                          dispatch({ type: "CHANGE_SORT", column: "rollno" })
                        }
                      >
                        Rollno
                      </Table.HeaderCell>
                      <Table.HeaderCell
                        sorted={column === "name" ? direction : null}
                        onClick={() =>
                          dispatch({ type: "CHANGE_SORT", column: "name" })
                        }
                      >
                        Name
                      </Table.HeaderCell>
                      <Table.HeaderCell
                        sorted={column === "math_marks" ? direction : null}
                        onClick={() =>
                          dispatch({
                            type: "CHANGE_SORT",
                            column: "math_marks",
                          })
                        }
                      >
                        Maths
                      </Table.HeaderCell>
                      <Table.HeaderCell
                        sorted={column === "physics_marks" ? direction : null}
                        onClick={() =>
                          dispatch({
                            type: "CHANGE_SORT",
                            column: "physics_marks",
                          })
                        }
                      >
                        Physics
                      </Table.HeaderCell>
                      <Table.HeaderCell
                        sorted={column === "chemistry_marks" ? direction : null}
                        onClick={() =>
                          dispatch({
                            type: "CHANGE_SORT",
                            column: "chemistry_marks",
                          })
                        }
                      >
                        Chemistry
                      </Table.HeaderCell>
                      <Table.HeaderCell
                        sorted={column === "total" ? direction : null}
                        onClick={() =>
                          dispatch({ type: "CHANGE_SORT", column: "total" })
                        }
                      >
                        Total (300)
                      </Table.HeaderCell>
                      <Table.HeaderCell
                        sorted={column === "percentage" ? direction : null}
                        onClick={() =>
                          dispatch({
                            type: "CHANGE_SORT",
                            column: "percentage",
                          })
                        }
                      >
                        Percentage (%)
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {data.map(
                      ({
                        rollno,
                        name,
                        math_marks,
                        physics_marks,
                        chemistry_marks,
                        total,
                        percentage,
                      }) => (
                        <Table.Row key={rollno}>
                          <Table.Cell>{rollno}</Table.Cell>
                          <Table.Cell>{name}</Table.Cell>
                          <Table.Cell>{math_marks}</Table.Cell>
                          <Table.Cell>{physics_marks}</Table.Cell>
                          <Table.Cell>{chemistry_marks}</Table.Cell>
                          <Table.Cell>{total}</Table.Cell>
                          <Table.Cell textAlign="center">
                            {percentage.toFixed(2)}
                          </Table.Cell>
                        </Table.Row>
                      )
                    )}
                  </Table.Body>
                </Table>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
};

export default LeaderBoardPage;
