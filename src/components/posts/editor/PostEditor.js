import React from "react";
import { Editor } from "slate-react";
import { Value } from "slate";
import MarkHotKey from "./MarkHotKey";

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

const plugins = [
  MarkHotKey({ key: "b", type: "bold" }),
  MarkHotKey({ key: "`", type: "code" }),
  MarkHotKey({ key: "i", type: "italic" }),
  MarkHotKey({ key: "~", type: "strikethrough" }),
  MarkHotKey({ key: "u", type: "underline" })
];

class PostEditor extends React.Component {
  state = {
    value: initialValue
  };

  // Update the value of the editor's content
  onChange = ({ value }) => {
    this.setState({ value });
  };

  renderMark = (props, editor, next) => {
    switch (props.mark.type) {
      case "bold":
        return <strong>{props.children}</strong>;
      case "code":
        return <code>{props.children}</code>;
      case "italic":
        return <em>{props.children}</em>;
      case "strikethrough":
        return <del>{props.children}</del>;
      case "underline":
        return <u>{props.children}</u>;
      default:
        return next();
    }
  };
  render() {
    return (
      <Editor
        plugins={plugins}
        value={this.state.value}
        onChange={this.onChange}
        renderMark={this.renderMark}
      />
    );
  }
}

export default PostEditor;
