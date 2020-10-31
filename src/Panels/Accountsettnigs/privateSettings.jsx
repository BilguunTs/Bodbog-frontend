import React from "react";
import { Menu, Header, Button, Icon, Divider } from "semantic-ui-react";
import AddressSettings from "./AddressSettings";
const PrivateSettings = ({ state, openModal, ...rest }) => {
  const [activeItem, setActive] = React.useState();
  //const { firstname, lastname, email, bio, birthdate } = state.profile;
  const handleItemClick = (e, { name }) => setActive(name);
  return (
    <div>
      <div style={{ marginBottom: "2em" }}>
        <Button
          floated="right"
          icon
          basic
          onClick={() => openModal("EDIT_PROFILE")}
          labelPosition="left"
        >
          <Icon name="settings"></Icon>
          засах
        </Button>
        <Header as="h3" color="orange">
          Мийний мэдээлэл
        </Header>
      </div>
      <Menu vertical fluid>
        <Menu.Item name="firstname" onClick={handleItemClick}>
          <Header as="h4">Нэр</Header>
          <p>{rest.firstname || "оруулах"}</p>
        </Menu.Item>
        <Menu.Item name="lastname" onClick={handleItemClick}>
          <Header as="h4">Овог</Header>
          <p>{rest.lastname || "оруулах"}</p>
        </Menu.Item>
        <Menu.Item name="phonenumber" onClick={handleItemClick}>
          <Header as="h4">Утасны дугаар</Header>
          <p>{rest.phonenumber}</p>
        </Menu.Item>
        <Menu.Item name="email" onClick={handleItemClick}>
          <Header as="h4">Е-майл хаяг</Header>
          <p>{rest.email || "оруулах"}</p>
        </Menu.Item>
      </Menu>
      <Divider section />
      <div style={{ marginBottom: "2em" }}>
        <Button
          icon
          basic
          floated="right"
          onClick={() => openModal("EDIT_ADDRESS")}
          labelPosition="left"
        >
          <Icon name="settings"></Icon>
          засах
        </Button>
        <Header as="h3" color="orange">
          Хаяг байршил
        </Header>
      </div>
      <AddressSettings {...rest.address} state={state} openModal={openModal} />
    </div>
  );
};
export default PrivateSettings;
