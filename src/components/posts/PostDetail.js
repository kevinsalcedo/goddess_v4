import React from "react";
import { Container, Card, Loader } from "semantic-ui-react";
import firebase from "../../firestore";
import Serializer from "slate-base64-serializer";
import { parseTitle } from "../../utils/PostUtils";
import RichText from "./editor/RichText";

class PostDetail extends React.Component {
  state = {
    post: null
  };

  componentDidMount() {
    const { title } = this.props.match.params;

    // Get the database
    const db = firebase.firestore();
    const postsRef = db.collection("posts");
    const docRef = postsRef.doc(parseTitle(title));

    // Grab the appropriate document
    docRef.get().then(doc => {
      const content = Serializer.deserialize(doc.data().content);

      this.setState({
        post: {
          title: doc.data().title,
          content: content
        }
      });
    });
  }

  // const renderComments = () => {
  //   return comments.map(comment => (
  //     <Comment key={comment.id}>
  //       <Comment.Author>{comment.name}</Comment.Author>
  //       <Comment.Text>{comment.body}</Comment.Text>
  //     </Comment>
  //   ));
  // };
  render() {
    return (
      <Container>
        {this.state.post ? (
          <Card fluid>
            <Card.Content header={this.state.post.title} />
            {/* <Card.Content description={this.state.post.content} /> */}
            <Card.Content>
              <RichText value={this.state.post.content} readOnly={true} />
            </Card.Content>
          </Card>
        ) : (
          <Loader />
        )}
        {/* <Segment>
        {comments ? (
          <Comment.Group>{renderComments()}</Comment.Group>
        ) : (
          <Loader />
        )}
      </Segment> */}
      </Container>
    );
  }
}

export default PostDetail;
