import React from "react";
import { Card, Container } from "semantic-ui-react";

const RouterCard = (props) => {
  return (
    <div>
      <Card
        color="purple"
        style={{ width: "200px", height: "200px" }}
        header={props.name}
        meta={props.meta}
        description={props.details}
      />
    </div>
  );
};

export default RouterCard;
