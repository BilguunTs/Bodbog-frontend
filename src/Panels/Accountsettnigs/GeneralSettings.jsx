import React from "react";
import { Menu, Header, Button, Icon } from "semantic-ui-react";
const GeneralSettings = () => {
  const [activeItem, setActive] = React.useState();
  const handleItemClick = (e, { name }) => setActive(name);

  return (
    <Menu vertical fluid>
      <Menu.Item
        name="promotions"
        active={activeItem === "promotions"}
        onClick={handleItemClick}
      >
        <Header as="h4">Хамгаалалт</Header>

        <p>Хамгаалалтын талаар</p>
      </Menu.Item>

      <Menu.Item
        name="мэдэгдэл"
        active={activeItem === "мэдэгдэл"}
        onClick={handleItemClick}
      >
        <Header as="p">Мэдэгдэл</Header>
        <p>ямар нэгэн юм</p>
      </Menu.Item>
    </Menu>
  );
};
export default GeneralSettings;
