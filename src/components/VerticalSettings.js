import React from "react";
import { Dropdown, Icon } from "semantic-ui-react";
import { connect } from "../Context";
const ASOP = ({
  context,
  autoaccess,
  header,
  headericon,
  onpass,
  accessID,
  ...rest
}) => {
  const { onEditHerdModal, state } = context;
  if (!accessID) {
    window.location.assign("/");
  }
  const { herdType, ...args } = onpass;
  const handleOpenModal = (modaltype) => {
    onEditHerdModal(modaltype, { type: herdType, ...args });
  };
  let instance;
  if (state.user._id === accessID && localStorage.getItem("token")) {
    instance = (
      <Dropdown.Menu>
        {header ? (
          <>
            <Dropdown.Header icon={headericon || null} content={header} />
            <Dropdown.Divider />
          </>
        ) : null}
        <Dropdown.Item
          key="edit"
          text="Засах"
          value="засах"
          icon={<Icon name="pencil" color="yellow" />}
          onClick={() => handleOpenModal("editherd")}
        />
        <Dropdown.Divider />
        <Dropdown.Item
          key="delete"
          text="Устгах"
          value="устгах"
          icon={<Icon name="trash" color="red" />}
          onClick={() => {
            handleOpenModal("DELETE_HERD");
          }}
        />
      </Dropdown.Menu>
    );
  } else {
    instance = (
      <Dropdown.Menu>
        {header ? (
          <>
            <Dropdown.Header icon={headericon || null} content={header} />
            <Dropdown.Divider />
          </>
        ) : null}
        <Dropdown.Item
          key="user"
          as="a"
          href={`/хэрэглэгч/${accessID}`}
          text="Зарын эзэн"
          value="owner"
          icon="user"
        />
        <Dropdown.Item
          key="edit"
          text="Мэдэгдэл хийх"
          value="report"
          icon="flag"
        />
      </Dropdown.Menu>
    );
  }

  return (
    <Dropdown icon="ellipsis vertical" {...rest}>
      {instance}
    </Dropdown>
  );
};
export default connect(ASOP);
