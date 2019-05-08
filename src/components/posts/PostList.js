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
import { connect } from "react-redux";
import { fetchPosts } from "../../actions";

class PostList extends React.Component {
  // Fetch all created posts
  componentDidMount() {
    this.props.fetchPosts();
  }

  // Render the list of posts
  renderList() {
    if (this.props.posts) {
      return this.props.posts.map(post => (
        <Card as={Link} to={`/posts/${post.id}`} fluid key={post.id}>
          <Card.Content header={post.title} />
          <Card.Content description={post.body} />
          <Card.Content extra>{post.id}</Card.Content>
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
        <Button as={Link} to='/posts/new'>
          Create a Post
        </Button>
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
          <Header size='large'>Grace's Posts</Header>
          {this.renderCreateButton()}
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
