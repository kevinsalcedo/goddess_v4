import React from "react";
import { Container, Button } from "semantic-ui-react";
import GoogleAuth from "./GoogleAuth";

const Footer = () => {
  return (
    <Container fluid textAlign="center" color="violet">
      <a
        href="https://www.instagram.com/goddessclimbing/"
        rel="noopener noreferrer"
        target="_blank"
      >
        <Button color="instagram" icon="instagram" />
      </a>
      {/* <GoogleAuth /> */}
    </Container>
  );
};

export default Footer;
