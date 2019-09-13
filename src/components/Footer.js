import React from "react";
import { Container, Button } from "semantic-ui-react";
import SignInForm from "./SignInForm";
import { withFirebase } from "./firebase";
import { connect } from "react-redux";
import { signOut } from "../actions";
import { toast } from "react-toastify";

class Footer extends React.Component {
  state = {
    open: false
  };

  onClose = () => {
    this.setState({ open: false });
  };
  onSignOut = () => {
    this.props.firebase.doSignOut().then(() => {
      this.props.signOut();
      toast("Successfully signed out.");
    });
  };
  render() {
    return (
      <Container fluid textAlign="center" color="violet">
        <a
          href="https://www.instagram.com/goddessclimbing/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <Button color="instagram" icon="instagram" />
        </a>
        {this.props.auth.isSignedIn ? (
          <Button onClick={this.onSignOut}>Sign Out</Button>
        ) : (
          <>
            <Button onClick={() => this.setState({ open: true })}>
              Admin Sign In
            </Button>
            <SignInForm open={this.state.open} onClose={this.onClose} />
          </>
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const FirebaseFooter = withFirebase(Footer);

export default connect(
  mapStateToProps,
  { signOut }
)(FirebaseFooter);
