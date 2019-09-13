import React from "react";
import {
  Container,
  Header,
  Button,
  Input,
  Label,
  Segment,
  Confirm
} from "semantic-ui-react";
import Serializer from "slate-base64-serializer";
import { Value } from "slate";
import RichText from "./editor/RichText";
import { toast } from "react-toastify";
import { parseTitle, validatePost } from "../../utils/PostUtils";
import withAuth from "../withAuth";
import { withFirebase } from "../firebase";

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
                  text: ""
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
    value: initialValue,
    isEditMode: false,
    cancelConfirmOpen: false,
    deleteConfirmOpen: false
  };

  // Should read the url and load the appropriate data
  componentDidMount() {
    const { title } = this.props.match.params;
    // If not a new post, then get the post and set the edit flag
    if (title !== "new") {
      const db = this.props.firebase.db;
      const postsRef = db.collection("posts");
      const docRef = postsRef.doc(parseTitle(title));

      docRef.get().then(doc => {
        const content = Serializer.deserialize(doc.data().content);

        this.setState({
          title: doc.data().title,
          value: content,
          isEditMode: true
        });
      });
    }
  }

  // Update the title on form change
  handleTitleChange = e => {
    this.setState({ title: e.target.value });
  };

  // Set the current state to the new content
  handleContentChange = value => {
    // If document changes, then set a copy in local storage
    // Should probably remove later
    if (value.document !== this.state.value.document) {
      const content = JSON.stringify(value.toJSON());
      localStorage.setItem("content", content);
    }

    this.setState({ value });
  };

  // Posts the new document to database for persistence
  // If new, then creates the doc. If not, then updates
  addPost = () => {
    const { title, value } = this.state;

    const errors = validatePost(title, value);
    if (errors > 0) {
      const bodyError = errors - 2 >= 0;
      const titleError = errors - 1 === 0 || errors - 1 === 2;

      const msg = `Oops! Your post needs a ${titleError ? "title" : ""} ${
        titleError && bodyError ? "and" : ""
      } ${bodyError ? "body" : ""}. Please enter some text and try again.`;
      toast.error(msg);
      return;
    }

    const db = this.props.firebase.db;
    db.settings({
      timestampsInSnapshots: true
    });

    const serializedContent = Serializer.serialize(value);

    db.collection("posts")
      .doc(parseTitle(title))
      .set({
        title: title,
        content: serializedContent
      })
      .then(() => {
        toast("Post published! Good job!");
        this.setState({
          title: "",
          value: initialValue
        });
        localStorage.clear();
        this.props.history.push("/posts");
      });
  };

  deletePost = () => {
    const { title } = this.state;
    const db = this.props.firebase.db;
    db.settings({ timestampsInSnapshots: true });
    db.collection("posts")
      .doc(title)
      .delete()
      .then(() => {
        toast("Post successfuly deleted");
        this.props.history.push("/posts");
      })
      .catch(e => console.log(e));
  };

  render() {
    const {
      isEditMode,
      title,
      value,
      cancelConfirmOpen,
      deleteConfirmOpen
    } = this.state;
    return (
      <Container>
        <Header as="h1">
          {isEditMode ? "Edit " : "Create a "} Post
          {isEditMode ? (
            <Button
              floated="right"
              negative
              onClick={() => this.setState({ deleteConfirmOpen: true })}
            >
              Delete Post
            </Button>
          ) : null}
        </Header>

        <Input
          name="title"
          value={title}
          onChange={this.handleTitleChange}
          placeholder="Enter a sick post title"
          fluid
          size="large"
        />
        <Segment>
          <Label attached="top left">Post Body</Label>
          <RichText
            value={value}
            handleContentChange={this.handleContentChange}
            readOnly={false}
          />
        </Segment>
        <br />
        <Button positive onClick={this.addPost}>
          Submit
        </Button>
        <Button onClick={() => this.setState({ cancelConfirmOpen: true })}>
          Cancel
        </Button>
        <Confirm
          open={cancelConfirmOpen}
          header="Confirm Cancel"
          content="Are you sure you want to cancel? Your changes will not be saved."
          onCancel={() => this.setState({ cancelConfirmOpen: false })}
          onConfirm={() => {
            this.props.history.push("/posts");
            localStorage.clear();
          }}
        />
        <Confirm
          open={deleteConfirmOpen}
          header="Confirm Delete"
          content="Are you sure you want to delete this post? This cannot be undone."
          onCancel={() => this.setState({ deleteConfirmOpen: false })}
          onConfirm={this.deletePost}
        />
      </Container>
    );
  }
}

const FirebaseCreate = withFirebase(PostCreate);
export default withAuth(FirebaseCreate);
