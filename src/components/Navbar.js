import React from "react";
import { Menu } from "semantic-ui-react";

class Navbar extends React.Component {
  state = { activeItem: "blog" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item name='logo' />
          <Menu.Menu position='right'>
            <Menu.Item
              name='blog'
              active={activeItem === "blog"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='photos'
              active={activeItem === "photos"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
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
