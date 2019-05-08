import React from "react";
import { Container, Header } from "semantic-ui-react";
import PostEditor from "./editor/PostEditor";

class PostCreate extends React.Component {
  render() {
    return (
      <Container>
        <Header as='h1'>Post Create</Header>
        <PostEditor />
      </Container>
    );
  }
}

export default PostCreate;
