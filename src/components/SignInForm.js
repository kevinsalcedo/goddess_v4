import React from "react";
import { Modal, Form, Button } from "semantic-ui-react";
import { withFirebase } from "./firebase";
import { connect } from "react-redux";
import { signIn } from "../actions";
import { toast } from "react-toastify";

class SignInForm extends React.Component {
  state = {
    email: "",
    password: "",
    open: false
  };

  onEmailUpdate = e => {
    this.setState({ email: e.target.value });
  };
  onPasswordUpdate = e => {
    this.setState({ password: e.target.value });
  };

  onSubmit = e => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(response => {
        this.props.onClose();
        toast("Successfully signed in!");
        console.log(response);
        this.props.signIn(response.user.email, response.user.uid);
      })
      .catch(e => {
        toast.error(`Oops! ${e}`);
      });
    e.preventDefault();
  };

  validateForm = (email, password) => {
    const validEmail = email.trim().length > 0 && email.includes("@");
    const validPassword = password.trim().length > 0;
    return validEmail && validPassword;
  };
  render() {
    const { email, password } = this.state;
    return (
      <Modal
        open={this.props.open}
        closeOnDimmerClick
        closeOnEscape
        onClose={this.props.onClose}
      >
        <Modal.Header>Admin Login</Modal.Header>
        <Modal.Content>
          <Form onSubmit={this.onSubmit}>
            <Form.Field>
              <label>Email</label>
              <input
                name="email"
                type="text"
                onChange={this.onEmailUpdate}
                value={email}
              />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input
                placeholder="Password"
                name="password"
                type="password"
                onChange={this.onPasswordUpdate}
                value={password}
              />
            </Form.Field>
            <Button type="submit">Log In</Button>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

const FirebaseForm = withFirebase(SignInForm);

export default connect(
  null,
  { signIn }
)(FirebaseForm);
