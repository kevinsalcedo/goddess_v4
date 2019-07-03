/*
DISCLAIMER:
Most of this is altered code from slate creator Ian Storm Taylor
Original code can be found here:
https://github.com/ianstormtaylor/slate/blob/master/examples/rich-text/index.js
*/

import React from "react";
import { Editor } from "slate-react";
import { Container, Menu } from "semantic-ui-react";
import { isKeyHotkey } from "is-hotkey";

const DEFAULT_NODE = "paragraph";

const isBoldHotkey = isKeyHotkey("mod+b");
const isItalicHotkey = isKeyHotkey("mod+i");
const isUnderlinedHotkey = isKeyHotkey("mod+u");
const isCodeHotkey = isKeyHotkey("mod+`");

class RichText extends React.Component {
  // Check to see if mark 'type' exists in selection
  hasMark = type => {
    const { value } = this.props;
    return value.activeMarks.some(mark => mark.type === type);
  };

  // Check to see if block 'type' exists
  hasBlock = type => {
    const { value } = this.props;
    return value.blocks.some(node => node.type === type);
  };

  // Store reference to slate editor
  ref = editor => {
    this.editor = editor;
  };

  render() {
    return (
      <Container>
        {this.renderMenu()}
        <Container
          style={{
            backgroundColor: "#eee",
            borderRadius: 3,
            minHeight: 200,
            padding: 20
          }}
        >
          <Editor
            spellCheck
            autoFocusplaceholder='Enter text here...'
            ref={this.ref}
            value={this.props.value}
            onChange={this.onChange}
            onKeyDown={this.onKeyDown}
            renderBlock={this.renderBlock}
            renderMark={this.renderMark}
            readOnly={this.props.readOnly}
          />
        </Container>
      </Container>
    );
  }

  // Show in/active mark buttons on toolbar
  renderMarkButton = (type, icon) => {
    const isActive = this.hasMark(type);

    return (
      <Menu.Item
        as='a'
        active={isActive}
        onMouseDown={event => this.onClickMark(event, type)}
        icon={icon}
      />
    );
  };

  renderMenu = () => {
    return !this.props.readOnly ? (
      <Menu secondary pointing>
        {this.renderMarkButton("bold", "bold")}
        {this.renderMarkButton("italic", "italic")}
        {this.renderMarkButton("underlined", "underline")}
        {this.renderMarkButton("code", "code")}
        {this.renderBlockButton("block-quote", "quote right")}
        {this.renderBlockButton("numbered-list", "list ol")}
        {this.renderBlockButton("bulleted-list", "list")}
      </Menu>
    ) : null;
  };
  // Show in/active block buttons on toolbar
  renderBlockButton = (type, icon) => {
    let isActive = this.hasBlock(type);

    if (["numbered-list", "bulleted-list"].includes(type)) {
      const {
        value: { document, blocks }
      } = this.props;

      if (blocks.size > 0) {
        const parent = document.getParent(blocks.first().key);
        isActive = this.hasBlock("list-item") && parent && parent.type === type;
      }
    }

    return (
      <Menu.Item
        as='a'
        active={isActive}
        onMouseDown={event => this.onClickBlock(event, type)}
        icon={icon}
      />
    );
  };

  // Render a block of text with attributes
  renderBlock = (props, editor, next) => {
    const { attributes, children, node } = props;

    switch (node.type) {
      case "block-quote":
        return <blockquote {...attributes}>{children}</blockquote>;
      case "bulleted-list":
        return <ul {...attributes}>{children}</ul>;
      case "list-item":
        return <li {...attributes}>{children}</li>;
      case "numbered-list":
        return <ol {...attributes}>{children}</ol>;
      default:
        return next();
    }
  };

  // Render text with markup attributes
  renderMark = (props, editor, next) => {
    const { children, mark, attributes } = props;

    switch (mark.type) {
      case "bold":
        return <strong {...attributes}>{children}</strong>;
      case "code":
        return <code {...attributes}>{children}</code>;
      case "italic":
        return <em {...attributes}>{children}</em>;
      case "underlined":
        return <u {...attributes}>{children}</u>;
      default:
        return next();
    }
  };

  // Editor behavior when user enters/deletes text
  onChange = ({ value }) => {
    this.props.handleContentChange(value);
  };

  // Check for CTRL/CMD+modifier combinations
  onKeyDown = (event, editor, next) => {
    let mark;

    if (isBoldHotkey(event)) {
      mark = "bold";
    } else if (isItalicHotkey(event)) {
      mark = "italic";
    } else if (isUnderlinedHotkey(event)) {
      mark = "underlined";
    } else if (isCodeHotkey(event)) {
      mark = "code";
    } else {
      return next();
    }

    event.preventDefault();
    editor.toggleMark(mark);
  };

  // Toggle toolbar mark
  onClickMark = (event, type) => {
    event.preventDefault();
    this.editor.toggleMark(type);
  };

  // Toggle toolbar block
  onClickBlock = (event, type) => {
    event.preventDefault();

    const { editor } = this;
    const { value } = editor;
    const { document } = value;

    // Handle everything but list buttons.
    if (type !== "bulleted-list" && type !== "numbered-list") {
      const isActive = this.hasBlock(type);
      const isList = this.hasBlock("list-item");

      if (isList) {
        editor
          .setBlocks(isActive ? DEFAULT_NODE : type)
          .unwrapBlock("bulleted-list")
          .unwrapBlock("numbered-list");
      } else {
        editor.setBlocks(isActive ? DEFAULT_NODE : type);
      }
    } else {
      // Handle the extra wrapping required for list buttons.
      const isList = this.hasBlock("list-item");
      const isType = value.blocks.some(block => {
        return !!document.getClosest(block.key, parent => parent.type === type);
      });

      if (isList && isType) {
        editor
          .setBlocks(DEFAULT_NODE)
          .unwrapBlock("bulleted-list")
          .unwrapBlock("numbered-list");
      } else if (isList) {
        editor
          .unwrapBlock(
            type === "bulleted-list" ? "numbered-list" : "bulleted-list"
          )
          .wrapBlock(type);
      } else {
        editor.setBlocks("list-item").wrapBlock(type);
      }
    }
  };
}

export default RichText;
