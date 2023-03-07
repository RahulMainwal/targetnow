import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import logo from "../images/logo.png";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";
import "../App.css";

function Header() {
  const [show, setShow] = useState(false);
  const access = JSON.parse(localStorage.getItem("token"));

  return (
    <Navbar id="navbar" expand="lg" style={{background: "white"}}>
      <Container fluid>
        <div style={{ width: "100%", padding: "0 10px", display: "flex"}}>
          <div style={{ width: "10%" }}>
            <Nav.Link href="/">
              <img src={logo} alt="logo" width="45px" />
            </Nav.Link>
          </div>
          <div style={{ width: "90%", textAlign: "end" }}>
            {show ? (
              <i
                className="fa-solid fa-xmark"
                onClick={() => setShow(false)}
                style={{
                  fontSize: "30px",
                  paddingTop: "10px",
                  cursor: "pointer",
                }}
              ></i>
            ) : (
              <i
                className="fa-solid fa-grip-lines"
                onClick={() => setShow(true)}
                style={{
                  fontSize: "30px",
                  paddingTop: "10px",
                  cursor: "pointer",
                }}
              ></i>
            )}
          </div>
          <div id="screenchanges">
            <ul style={{ display: "flex", listStyle: "none" }}>
              <li style={{ margin: "17px 20px 0 20px" }}>
                <div><NavLink to="/" onClick={() => setShow(false)} style={{ color: "black", textDecoration: "none" }} >Home</NavLink></div>
              </li>
              <li style={{ margin: "17px 20px 0 20px" }}>
                <NavDropdown
                  title="English"
                  id="offcanvasNavbarDropdown-expand"
                  style={{ width: "100%", color: "black" }}
                >
                  <NavLink
                    onClick={() => setShow(false)}
                    style={{ color: "black", textDecoration: "none" }}
                    to="vocabulary"
                  >
                    <div id="english-dropdown">Vocabulary</div>
                  </NavLink>
                  <NavLink
                    onClick={() => setShow(false)}
                    style={{ color: "black", textDecoration: "none" }}
                    to="one-word-substitutes"
                  >
                    <div id="english-dropdown">One word substitutes</div>
                  </NavLink>
                  <NavLink
                    onClick={() => setShow(false)}
                    style={{ color: "black", textDecoration: "none" }}
                    to="idiom-&-phrases"
                  >
                    <div id="english-dropdown">Idiom & phrases</div>
                  </NavLink>
                  <NavLink
                    onClick={() => setShow(false)}
                    style={{ color: "black", textDecoration: "none" }}
                    to="phrasal-verbs"
                  >
                    <div id="english-dropdown">Phrasal verbs</div>
                  </NavLink>
                  <NavLink
                    onClick={() => setShow(false)}
                    style={{ color: "black", textDecoration: "none" }}
                    to="antonyms"
                  >
                    <div id="english-dropdown">Antonyms</div>
                  </NavLink>
                  <NavLink
                    onClick={() => setShow(false)}
                    style={{ color: "black", textDecoration: "none" }}
                    to="synonyms"
                  >
                    <div id="english-dropdown">Synonyms</div>
                  </NavLink>
                </NavDropdown>
              </li>
              {
                  access
                  ?
              <li style={{ margin: "10px 20px 0 20px" }}>
                <NavLink to="/add-data">
                  <Button
                    style={{ width: "100px" }}
                    variant="dark"
                    className="me-2 mb-2"
                    onClick={() => setShow(false)}
                  >
                    Add New
                  </Button>
                </NavLink>
              </li>
              :
              ""
              }
            </ul>
          </div>
        </div>
      </Container>

      <Offcanvas placement="end" show={show} onHide={() => setShow(false)}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Course</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav
            className="justify-content-end flex-grow-1 pe-6"
            style={{ display: "block" }}
          >
            <NavLink onClick={() => setShow(false)} id="navbar-content" to="/">
              <div id="offcanvas-home">Home</div>
            </NavLink>
            <NavDropdown
              title="English"
              id="offcanvasNavbarDropdown-expand"
              style={{ width: "100%" }}
            >
              <NavLink
                onClick={() => setShow(false)}
                style={{ color: "black", textDecoration: "none" }}
                to="vocabulary"
              >
                <div id="english-dropdown">Vocabulary</div>
              </NavLink>
              <NavLink
                onClick={() => setShow(false)}
                style={{ color: "black", textDecoration: "none" }}
                to="one-word-substitutes"
              >
                <div id="english-dropdown">One word substitutes</div>
              </NavLink>
              <NavLink
                onClick={() => setShow(false)}
                style={{ color: "black", textDecoration: "none" }}
                to="idiom-&-phrases"
              >
                <div id="english-dropdown">Idiom & phrases</div>
              </NavLink>
              <NavLink
                onClick={() => setShow(false)}
                style={{ color: "black", textDecoration: "none" }}
                to="synonyms"
              >
                <div id="english-dropdown">Synonyms</div>
              </NavLink>
              <NavLink
                onClick={() => setShow(false)}
                style={{ color: "black", textDecoration: "none" }}
                to="antonyms"
              >
                <div id="english-dropdown">Antonyms</div>
              </NavLink>
              <NavLink
                onClick={() => setShow(false)}
                style={{ color: "black", textDecoration: "none" }}
                to="phrasal-verbs"
              >
                <div id="english-dropdown" style={{ border: "none" }}>
                Phrasal verbs
                </div>
              </NavLink>
            </NavDropdown>
            <br />
                {
                  access
                  ?
            <NavLink to="/add-data">
              <Button
                style={{ width: "100%" }}
                variant="dark"
                className="me-2 mb-2"
                onClick={() => setShow(false)}
              >
                Add New
              </Button>
            </NavLink>
            :
            ""
                }
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </Navbar>
  );
}

export default Header;
