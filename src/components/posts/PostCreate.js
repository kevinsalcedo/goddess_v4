import React from "react";
import { Container, Header, Button, Input, Form } from "semantic-ui-react";
import Serializer from "slate-base64-serializer";
import { Value } from "slate";
import RichText from "./editor/RichText";
import firebase from "../../firestore";

const existingValue = JSON.parse(localStorage.getItem("content"));
const initialValue = Value.fromJSON(
  existingValue || {
    document: {
      nodes: [
        {
          object: "block",
          type: "paragraph",
          nodes: [
            {
              object: "text",
              leaves: [
                {
                  text: "A line of text in a paragraph."
                }
              ]
            }
          ]
        }
      ]
    }
  }
);

class PostCreate extends React.Component {
  state = {
    title: "",
    value: initialValue
  };

  handleTitleChange = e => {
    this.setState({ title: e.target.value });
  };

  handleContentChange = value => {
    // If document changes, then set a copy in local storage
    if (value.document !== this.state.value.document) {
      const content = JSON.stringify(value.toJSON());
      localStorage.setItem("content", content);
    }

    this.setState({ value });
  };

  addPost = e => {
    e.preventDefault();
    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true
    });

    const serializedContent = Serializer.serialize(this.state.value);

    const postRef = db.collection("posts").add({
      title: this.state.title,
      content: serializedContent
    });

    this.setState({
      title: "",
      value: initialValue
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
        <RichText
          value={this.state.value}
          handleContentChange={this.handleContentChange}
        />
      </Container>
    );
  }
}

export default PostCreate;
