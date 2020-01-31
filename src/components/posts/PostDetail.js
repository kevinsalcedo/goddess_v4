import React from "react";
import { Container, Card, Loader, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Serializer from "slate-base64-serializer";
import { parseTitle } from "../../utils/PostUtils";
import RichText from "./editor/RichText";
import { withFirebase } from "../firebase";
import { connect } from "react-redux";

class PostDetail extends React.Component {
  state = {
    post: null
  };

  componentDidMount() {
    const { title } = this.props.match.params;

    // Get the database
    const db = this.props.firebase.db;
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

  render() {
    return (
      <Container>
        {this.state.post ? (
          <Card fluid>
            <Card.Content>
              <Card.Header>
                {this.state.post.title}{" "}
                {this.props.auth.isSignedIn ? (
                  <Button
                    floated="right"
                    as={Link}
                    to={`/posts/edit/${this.state.post.title}`}
                  >
                    Edit
                  </Button>
                ) : null}
              </Card.Header>
            </Card.Content>
            <Card.Content>
              <RichText value={this.state.post.content} readOnly={true} />
            </Card.Content>
          </Card>
        ) : (
          <Loader />
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.auth };
};

const FirebaseDetail = withFirebase(PostDetail);

export default connect(mapStateToProps)(FirebaseDetail);
