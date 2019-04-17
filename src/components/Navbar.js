import React from "react";
import { Menu, Image, Icon, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";

import logo from "../assets/logo-white.png";
import headerImg from "../assets/header.jpg";

class Navbar extends React.Component {
  state = { activeItem: "blog" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Container fluid>
        <Menu className='top fixed' color='violet' inverted stackable>
          <Menu.Item as={Link} to='/'>
            <Icon size='huge'>
              <Image src={logo} />
            </Icon>
          </Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item
              as={Link}
              to='/posts'
              name='blog'
              active={activeItem === "blog"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              as={Link}
              to='#'
              name='photos'
              active={activeItem === "photos"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              as={Link}
              to='#'
              name='about'
              active={activeItem === "about"}
              onClick={this.handleItemClick}
            />
          </Menu.Menu>
        </Menu>
      </Container>
    );
  }
}
export default Navbar;
