import React from "react";
import { Menu, Header, Button, Icon } from "semantic-ui-react";
const PrivateSettings = ({ state, openModal, ...args }) => {
  const [activeItem, setActive] = React.useState();
  const { zip } = state.address;
  const handleItemClick = (e, { name }) => setActive(name);

  return (
    <Menu vertical fluid>
      <Menu.Item name="State" onClick={handleItemClick}>
        <Header as="h4">Улс</Header>

        <Menu.Menu>
          <Menu.Item color="blue" name={args.State || "оруулах"} />
        </Menu.Menu>
      </Menu.Item>
      <Menu.Item name="province" onClick={handleItemClick}>
        <Header as="h4">Аймаг</Header>
        <p>{args.province || "оруулах"}</p>
      </Menu.Item>
      <Menu.Item name="city" onClick={handleItemClick}>
        <Header as="h4">Сум эсвэл Дүүрэг</Header>
        <p>{args.sum_or_district || "оруулах"}</p>
      </Menu.Item>

      <Menu.Item name="zip" onClick={handleItemClick}>
        <Header as="h4">Зип дугаар</Header>
        <p>{zip || "оруулах"}</p>
      </Menu.Item>
    </Menu>
  );
};
export default PrivateSettings;
