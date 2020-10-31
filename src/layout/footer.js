import React from "react";
import {
  Container,
  Divider,
  Grid,
  Header,
  List,
  Segment,
} from "semantic-ui-react";
import { NavLink } from "react-router-dom";
const Footer = () => {
  return (
    <Segment
      inverted
      vertical
      style={{ margin: "5em 0em 0em", padding: "5em 0em" }}
    >
      <Container textAlign="center">
        <Grid divided inverted stackable>
          <Grid.Column>
            <Header inverted as="h4" content="БодБог" />
            <p>Бид малчдад зориулсан онлайн зарын үйлчилгээ үзүүлж байна</p>
          </Grid.Column>
        </Grid>

        <Divider inverted section />
        <div>CoolIcon</div>
        <List horizontal inverted divided link size="small">
          <List.Item as="a" href="#">
            Бидэнтэй холбогдох
          </List.Item>
          <List.Item as={NavLink} to="/үйлчилгээний-нөхцөл">
            Үйлчилгээний нөхцөл
          </List.Item>
          <List.Item as={NavLink} to="/хамгаалалтын-нөхцөл">
            Хамгаалалтын нөхцөл
          </List.Item>
        </List>
      </Container>
    </Segment>
  );
};
export default Footer;
