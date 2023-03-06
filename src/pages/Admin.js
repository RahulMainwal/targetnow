import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";

function Admin() {

  const [access, setAccess] = useState(false);

  const handleAllow = () => {
    localStorage.setItem("token", JSON.stringify(true))
    alert("Enabled")
    setAccess(true)
  }

  const handleDisable = () => {
    localStorage.setItem("token", JSON.stringify(false))
    alert("disabled")
    setAccess(false)
  }

  useEffect(() => {
    setAccess(JSON.parse(localStorage.getItem("token")))
  }, [])

  return (
    <div style={{ textAlign: "start", margin: "0 5%" }}>
      <br />
      <h1 style={{ textAlign: "center" }}>Admin Access Status: {access === null || access === false ? "Denied" : "Allowed"}</h1>
      <br />
      <div style={{ textAlign: "center" }}>
        <Button
          variant="dark"
          className="me-2 mb-2"
          onClick={(e) => {
            handleAllow(e);
          }}
        >
          Allow
        </Button>
        <br />
        <br />
        <Button
          variant="dark"
          className="me-2 mb-2"
          onClick={(e) => {
            handleDisable(e);
          }}
        >
          Disable
        </Button>
      </div>
    </div>
  );
}

export default Admin;
