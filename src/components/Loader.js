import React from "react";
import Spinner from "react-bootstrap/Spinner";

function Loader() {
  return (
    <div style={{ height: "53vh" }}>
      <Spinner
        style={{ marginTop: "20vh" }}
        animation="border"
        variant="secondary"
      />
      <div>Loading...</div>
    </div>
  );
}

export default Loader;
