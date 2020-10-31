import React from "react";
import { Tab, Container } from "semantic-ui-react";

const panes = [
  {
    menuItem: "Бараа борлуулагч",
    render: () => <Tab.Pane attached={false}>Tab1</Tab.Pane>
  },
  {
    menuItem: "Сэтгэгдэл",
    render: () => <Tab.Pane attached={false}>Tab2</Tab.Pane>
  },
  {
    menuItem: "Нэмэлт",
    render: () => <Tab.Pane attached={false}>Tab3</Tab.Pane>
  }
];

const TabExampleSecondaryPointing = () => (
  <Container>
    <Tab menu={{ secondary: true }}></Tab>
  </Container>
);

export default TabExampleSecondaryPointing;
