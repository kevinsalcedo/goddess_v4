import React from "react";
import { Link } from "react-router-dom";
import {
  Header,
  Divider,
  Loader,
  Container,
  Card,
  Button
} from "semantic-ui-react";
import Serializer from "slate-base64-serializer";
import PlainSerializer from "slate-plain-serializer";
import { connect } from "react-redux";
import { withFirebase } from "../firebase";

class PostList extends React.Component {
  state = {
    posts: [],
    isEditMode: false
  };
  // Fetch all created posts
  async componentDidMount() {
    const items = await this.getContent();
    this.setState({ posts: items });
  }

  // Hit Firestore db to get posts
  async getContent() {
    const db = this.props.firebase.db;
    const collection = db.collection("posts");
    let posts = [];

    await collection.get().then(snapshot => {
      snapshot.forEach(doc => {
        // Deserialize base64 encoding of body
        const content = Serializer.deserialize(doc.data().content);
        // Convert body to plain text
        const plainText = PlainSerializer.serialize(content).split("\n")[0];
        // Create post to append to list
        const post = {
          id: doc.id,
          title: doc.data().title,
          body: doc.data().content,
          snippet: plainText
        };
        posts = [...posts, post];
      });
    });
    return posts;
  }

  // Render the list of posts
  renderList() {
    if (this.state.posts) {
      const { isEditMode } = this.state;
      const validEditMode = isEditMode && this.props.auth.isSignedIn;
      return this.state.posts.map(post => (
        <Card
          fluid
          key={post.title}
          as={Link}
          color={validEditMode ? "yellow" : "violet"}
          to={`posts/${validEditMode ? "edit/" : ""}${post.title}`}
        >
          <Card.Content>
            <Card.Header>{post.title}</Card.Header>
          </Card.Content>
          <Card.Content description={post.snippet} />
        </Card>
      ));
    }
    return <Loader />;
  }

  // If Grace is signed in, then show link to create
  renderPostButtons() {
    // TODO: check for authenticated token for Grace's login
    if (this.props.auth.isSignedIn) {
      const { isEditMode } = this.state;
      const validEditMode = isEditMode && this.props.auth.isSignedIn;
      return (
        <>
          <Button onClick={() => this.props.history.push("/posts/edit/new")}>
            Create a Post
          </Button>
          <Button
            toggle
            active={validEditMode}
            onClick={() => this.setState({ isEditMode: !isEditMode })}
          >
            {isEditMode ? "Stop Editing" : "Edit"}
          </Button>
        </>
      );
    }
  }

  render() {
    return (
      <Container>
        <Container
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <Header size="large">Grace's Posts</Header>
          <Button.Group>{this.renderPostButtons()}</Button.Group>
        </Container>
        <Divider horizontal />
        {this.renderList()}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: Object.values(state.posts)[0],
    auth: state.auth
  };
};

const list = withFirebase(PostList);

export default connect(mapStateToProps)(list);
