import React from "react";
import { Container, Header } from "semantic-ui-react";
import { Editor } from "slate-react";
import { Value } from "slate";

// Initial content
const initialValue = Value.fromJSON({
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
});

class PostCreate extends React.Component {
  state = {
    value: initialValue
  };

  onChange = ({ value }) => {
    this.setState({ value });
  };

  render() {
    return (
      <Container>
        <Header>Post Create</Header>
        <Editor value={this.state.value} onChange={this.onChange} />
      </Container>
    );
  }
}
export default PostCreate;
