import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

class Navbar extends React.Component {
  state = { activeItem: "blog" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item as={Link} to='/' name='logo' />
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
      </div>
    );
  }
}
export default Navbar;
