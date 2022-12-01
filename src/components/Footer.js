import React from "react";
import Card from "react-bootstrap/Card";

function Footer() {
  return (
    <div>
      <br />
      <Card id="footer-card" className="text-center">
        <Card.Body>
          <div className="footer-col">
            <h4>Connect with me</h4>
            <div className="social-links">
              <a
                href="https://www.facebook.com/profile.php?id=100032200807173"
                id="facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com/rahulmainwal" id="twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/rahul-kumar-mainwal-9598a4187"
                id="linkdedin"
              >
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="https://github.com/RahulMainwal" id="github">
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>
        </Card.Body>
        <Card.Footer
          style={{ backgroundColor: "rgb(249, 248, 248)" }}
          className="text-muted"
        >
          Developer : Rahul Mainwal
        </Card.Footer>
      </Card>
    </div>
  );
}

export default Footer;
