import React from "react";
import { Container, Button } from "semantic-ui-react";

const Footer = () => {
  return (
    <Container fluid textAlign="center" color="violet">
      <a
        href="https://www.instagram.com/goddessclimbing/"
        rel="noopener noreferrer"
        target="_blank"
      >
        <Button circular color="instagram" icon="instagram" />
      </a>
    </Container>
  );
};

export default Footer;
