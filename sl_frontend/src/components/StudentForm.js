import { useContext, useEffect, useState } from "react";
import _ from "lodash";
import {
  Button,
  Confirm,
  Divider,
  Form,
  Header,
  Icon,
  Portal,
  Segment,
} from "semantic-ui-react";
import http from "../api";
import { LeaderBoardContext } from "../contextprovider";

const StudentForm = () => {
  const [formloading, setFormloading] = useState(false);
  const [resopen, setResopen] = useState(false);
  const handleOpen = () => setResopen(true);
  const handleClose = () => setResopen(false);

  useEffect(() => {
    setFormloading(false);
  }, []);
  const [rollno, setRollno] = useState("");
  const [name, setName] = useState("");
  const [mathmarks, setMathmarks] = useState();
  const [physicsmarks, setPhysicsmarks] = useState();
  const [chemistrymarks, setChemistrymarks] = useState();
  const [total, setTotal] = useState("");
  const [percentage, setPercentage] = useState("");
  const [confirm_open, setConfirm_open] = useState(false);
  const [leaderboard, setLeaderboard] = useContext(LeaderBoardContext);
  const [rollnoerr, setRollnoerr] = useState(false);
  useEffect(() => {
    let m = parseInt(mathmarks || 0);
    let p = parseInt(physicsmarks || 0);
    let c = parseInt(chemistrymarks || 0);
    let t = m + p + c;
    let pr = (t * 100) / 300;
    pr = pr.toFixed(2);
    setTotal(t);
    setPercentage(pr);
  }, [mathmarks, physicsmarks, chemistrymarks]);

  function handleSubmit() {
    let form = {
      rollno: rollno,
      name: name,
      math_marks: mathmarks,
      physics_marks: physicsmarks,
      chemistry_marks: chemistrymarks,
      total: total,
      percentage: percentage,
    };
    (async () => {
      let res = await http.post("leaderboard/", form);
      if (res.status === 201 && res.statusText === "Created") {
        setLeaderboard((prevLB) => [...prevLB, res.data]);
        setConfirm_open(false);
        handleOpen();
      }
    })();
  }

  function checkRollNo(e) {
    let rollNo = e.target.value;
    if (rollNo.length > 10) return;
    setRollno(rollNo);
    setRollnoerr(false);
    if (rollNo.length === 10) {
      let result = _.find(leaderboard, (o) => {
        o = Object.values(o);
        let s = rollNo;
        let b = false;
        o.map((e) => {
          if ((e + "").toUpperCase().indexOf(s) > -1) {
            b = true;
            return;
          }
        });
        return b;
      });
      if (result) {
        setRollnoerr(true);
      } else {
        setRollnoerr(false);
      }
    }
  }

  return (
    <div>
      <Portal onClose={handleClose} open={resopen}>
        <Segment
          style={{
            left: "50%",
            position: "fixed",
            top: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1000,
          }}
        >
          <Header icon color="green">
            <Icon name="check" />
            Details Submitted
          </Header>
          <Button content="OK" color="green" fluid onClick={handleClose} />
        </Segment>
      </Portal>
      <Form
        loading={formloading}
        size="small"
        onSubmit={() => setConfirm_open(true)}
      >
        <Form.Input
          required
          label="Roll No."
          value={rollno}
          onChange={checkRollNo}
          error={
            rollnoerr && {
              content: "Roll No. Already Exist",
              pointing: "below",
            }
          }
        />
        <Form.Input
          required
          label="Name"
          value={name}
          onChange={(e) => {
            if (e.target.value.length > 50) return;
            setName(e.target.value);
          }}
        />
        <Form.Input
          required
          label="Maths Marks"
          value={mathmarks}
          type="number"
          min="0"
          max="100"
          onChange={(e) => {
            if (e.target.value > 100 || e.target.value < 0) return;
            setMathmarks(e.target.value);
          }}
        />
        <Form.Input
          required
          label="Physics Marks"
          value={physicsmarks}
          type="number"
          onChange={(e) => {
            if (e.target.value > 100 || e.target.value < 0) return;
            setPhysicsmarks(e.target.value);
          }}
        />
        <Form.Input
          required
          label="Chemistry"
          value={chemistrymarks}
          type="number"
          onChange={(e) => {
            if (e.target.value > 100 || e.target.value < 0) return;
            setChemistrymarks(e.target.value);
          }}
        />
        <Form.Input required label="Total" value={total} type="number" />
        <Form.Input required label="Percentage %" value={percentage} />
        <Button type="submit" fluid>
          Submit
        </Button>
        <Divider hidden />
      </Form>
      <Confirm
        open={confirm_open}
        content="Make sure you've entered all the information correctly."
        onCancel={() => setConfirm_open(false)}
        onConfirm={handleSubmit}
      />
    </div>
  );
};

export default StudentForm;
