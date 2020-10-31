import React from "react";
import { Menu, Grid } from "semantic-ui-react";
import GeneralSettings from "./GeneralSettings";
import PrivateSettings from "./privateSettings";
import { connect } from "../../Context";
const SettingsPanel = ({ context, ...props }) => {
  const [activeItem, setActive] = React.useState("Үндсэн");
  const handleItemClick = (e, { name }) => setActive(name);

  const RenderContent = () => {
    let instance;
    switch (activeItem) {
      case "Үндсэн":
        instance = <GeneralSettings {...props} {...context} />;
        break;
      case "Хувийн мэдээлэл":
        instance = <PrivateSettings {...props} {...context} />;
        break;
      default:
        instance = null;
        break;
    }
    return instance;
  };
  return (
    <Grid stackable>
      <Grid.Column width={4}>
        <Menu stackable secondary vertical>
          <Menu.Item
            name="Үндсэн"
            active={activeItem === "Үндсэн"}
            onClick={handleItemClick}
          />
          <Menu.Item
            name="Хувийн мэдээлэл"
            active={activeItem === "Хувийн мэдээлэл"}
            onClick={handleItemClick}
          />
        </Menu>
      </Grid.Column>

      <Grid.Column stretched width={12}>
        {RenderContent()}
      </Grid.Column>
    </Grid>
  );
};

export default connect(SettingsPanel);
