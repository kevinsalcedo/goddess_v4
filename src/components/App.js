import React from "react";
import { Container, Divider, Image } from "semantic-ui-react";
import { Router, Route, Switch } from "react-router-dom";
import history from "../history";
import Navbar from "./Navbar";
import Home from "./Home";
import PostList from "./posts/PostList";
import PostCreate from "./posts/PostCreate";
import PostDetail from "./posts/PostDetail";
import PostEdit from "./posts/PostEdit";
import headerImg from "../assets/header.jpg";

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
              <Route path='/' exact component={Home} />
              <Route path='/posts' exact component={PostList} />
              <Route path='/posts/new' exact component={PostCreate} />
              <Route path='/posts/:id' exact component={PostDetail} />
              <Route path='/posts/edit/:id' exact component={PostEdit} />
            </Switch>
          </Container>
        </Router>
      </Container>
    );
  }
}
export default App;
