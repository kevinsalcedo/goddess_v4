import React from "react";
import {
  Container,
  Header,
  Divider,
  Image,
  Card,
  Grid,
  Segment
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import hands from "../assets/hands.jpg";
import doc from "../assets/doc.jpg";
import grace from "../assets/grace_throw.jpg";
import shot from "../assets/action_shot.jpg";

class Home extends React.Component {
  render() {
    return (
      <Container>
        <Header as="h1">
          A community for female rock climbers and those who support them.
        </Header>
        <Divider section />
        <Card.Group
          centered
          stackable
          // style={{ backgroundColor: "blue" }}
        >
          <Card as={Link}>
            <Image className="card-thumb" src={hands} />
            <Card.Content extra>Blog Post</Card.Content>
          </Card>
          <Card as={Link}>
            <Image className="card-thumb" src={doc} />
            <Card.Content extra>Blog Post</Card.Content>
          </Card>
          <Card as={Link}>
            <Image className="card-thumb" src={grace} />
            <Card.Content extra>Photo Op</Card.Content>
          </Card>
        </Card.Group>

        <Header as="h1">Who are we?</Header>
        <Divider hidden />
        <Grid stretched>
          <Grid.Row stretched centered>
            <Grid.Column
              // style={{ backgroundColor: "blue" }}
              verticalAlign="middle"
              centered
              width={8}
            >
              <Header as="h2">
                All women are strong in all endeavors they pursue. We are here
                to keep women climbing, combat bias and prejudice that can exist
                in the sport, and to offer a space that is empowering, safe and
                supportive.
              </Header>
            </Grid.Column>
            <Grid.Column
              width={8}
              // style={{ backgroundColor: "green" }}
              centered
            >
              <Image src={shot} size="big" rounded centered />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row></Grid.Row>
        </Grid>
      </Container>
    );
  }
}
export default Home;
