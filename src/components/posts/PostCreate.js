import React from "react";
import { Container, Header, Button, Input, Form } from "semantic-ui-react";
import RichText from "./editor/RichText";
import firebase from "../../firestore";

class PostCreate extends React.Component {
  state = {
    title: "",
    content: "Sample"
  };

  handleTitleChange = e => {
    this.setState({ title: e.target.value });
  };

  addPost = e => {
    e.preventDefault();
    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true
    });

    const postRef = db.collection("posts").add({
      title: this.state.title,
      content: this.state.content
    });

    this.setState({
      title: "",
      content: "New Sample"
    });
  };
  render() {
    return (
      <Container>
        <Form onSubmit={this.addPost}>
          <Header as='h1'>Post Create</Header>
          <Input
            name='title'
            value={this.state.title}
            onChange={this.handleTitleChange}
          />

          <Button type='submit'>Submit</Button>
        </Form>
        <RichText />
      </Container>
    );
  }
}

export default PostCreate;
