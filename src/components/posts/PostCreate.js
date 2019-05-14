import React from "react";
import { Container, Header } from "semantic-ui-react";
import RichText from "./editor/RichText";

class PostCreate extends React.Component {
  render() {
    return (
      <Container>
        <Header as='h1'>Post Create</Header>
        <RichText />
      </Container>
    );
  }
}

export default PostCreate;
