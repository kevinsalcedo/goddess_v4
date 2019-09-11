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
import firebase from "../../firestore";
import { connect } from "react-redux";
import { fetchPosts } from "../../actions";

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
    const db = firebase.firestore();
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
      return this.state.posts.map(post => (
        <Card
          fluid
          key={post.title}
          as={Link}
          color={isEditMode ? "yellow" : "violet"}
          to={`posts/${isEditMode ? "edit/" : ""}${post.title}`}
        >
          <Card.Content>
            <Card.Header>{post.title}</Card.Header>
          </Card.Content>
          <Card.Content description={post.snippet} />
          {/* <Card.Content extra>{this.renderEditButton(post.title)}</Card.Content> */}
        </Card>
      ));
    }
    return <Loader />;
  }

  // If Grace is signed in, then show link to create
  renderCreateButton() {
    // TODO: check for authenticated token for Grace's login
    if (this.props.auth.isSignedIn) {
      return (
        // <Button as={Link} to="/posts/edit/new">
        <Button onClick={() => this.props.history.push("/posts/edit/new")}>
          Create a Post
        </Button>
      );
    }
  }

  renderEditButton = () => {
    if (this.props.auth.isSignedIn) {
      const { isEditMode } = this.state;
      return (
        <Button
          toggle
          active={isEditMode}
          onClick={() => this.setState({ isEditMode: !isEditMode })}
        >
          {isEditMode ? "Stop Editing" : "Edit"}
        </Button>
      );
    }
  };

  // renderEditButton(title) {
  //   if (this.props.auth.isSignedIn) {
  //     return (
  //       <Button
  //         size="small"
  //         floated="right"
  //         as={Link}
  //         to={`/posts/edit/${title}`}
  //       >
  //         Edit
  //       </Button>
  //     );
  //   }
  // }

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
          <Button.Group>
            {this.renderCreateButton()}
            {this.renderEditButton()}
          </Button.Group>
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

export default connect(
  mapStateToProps,
  { fetchPosts }
)(PostList);
