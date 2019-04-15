import React from "react";
import { Container, Card, Comment, Segment, Loader } from "semantic-ui-react";
import useResourcesReturnObject from "../../useResourceReturnObject";
import useResourcesReturnList from "../../useResourceReturnList";

const PostDetail = props => {
  const { id } = props.match.params;
  const post = useResourcesReturnObject(id);
  const comments = useResourcesReturnList(`posts/${id}/comments`).slice(0, 5);

  const renderComments = () => {
    return comments.map(comment => (
      <Comment key={comment.id}>
        <Comment.Author>{comment.name}</Comment.Author>
        <Comment.Text>{comment.body}</Comment.Text>
      </Comment>
    ));
  };
  return (
    <Container>
      {post ? (
        <Card fluid>
          <Card.Content header={post.title} />
          <Card.Content description={post.body} />
        </Card>
      ) : (
        <Loader />
      )}
      <Segment>
        {comments ? (
          <Comment.Group>{renderComments()}</Comment.Group>
        ) : (
          <Loader />
        )}
      </Segment>
    </Container>
  );
};

export default PostDetail;
