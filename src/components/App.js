import React from "react";
import { Container, Divider, Image } from "semantic-ui-react";
import { Router, Route, Switch } from "react-router-dom";
import history from "../history";
import Navbar from "./Navbar";
import Home from "./Home";
import PostList from "./posts/PostList";
import PostCreate from "./posts/PostCreate";
import PostDetail from "./posts/PostDetail";
import headerImg from "../assets/header.jpg";
import Footer from "./Footer";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class App extends React.Component {
  render() {
    return (
      <Container fluid>
        <Router history={history}>
          <Navbar />
          <Image src={headerImg} fluid />
          <Divider section hidden />
          <Container>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/posts" exact component={PostList} />
              <Route path="/posts/:title" exact component={PostDetail} />
              <Route path="/posts/edit/:title" exact component={PostCreate} />
            </Switch>
          </Container>
          <Divider section />
          <Footer />
          <Divider section hidden />
        </Router>
        <ToastContainer
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
        />
      </Container>
    );
  }
}
export default App;
