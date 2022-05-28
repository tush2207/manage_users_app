import React from "react";
import { MDBTypography } from "mdb-react-ui-kit";

const About = () => {
  return (
    <div style={{ marginTop: "100px" }}>
      <MDBTypography note noteColor="primary">
        Redux Saga is a middleware library used to allow a Redux store to
        interact with resources outside of itself asynchronously. This includes
        making HTTP requests to external services, accessing browser storage,
        and executing I/O operations. These operations are also known as side
        effects.
      </MDBTypography>
    </div>
  );
};

export default About;
