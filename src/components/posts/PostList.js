import React from "react";
import { Link } from "react-router-dom";
import { Header, Divider, Loader, Container, Card } from "semantic-ui-react";
import useResources from "../../useResourceReturnList";

const PostList = () => {
  const posts = useResources("posts", []);

  const renderPosts = () => {
    if (posts) {
      return posts.map(post => (
        <Card as={Link} to={`/posts/${post.id}`} fluid key={post.id}>
          <Card.Content header={post.title} />
          <Card.Content description={post.body} />
          <Card.Content extra>{post.id}</Card.Content>
        </Card>
      ));
    }
    return <Loader />;
  };

  return (
    <Container>
      <Header size='large'>Grace's Posts</Header>
      <Divider horizontal />
      {renderPosts()}
    </Container>
  );
};
export default PostList;
