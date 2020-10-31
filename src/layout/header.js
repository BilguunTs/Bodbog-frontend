import React from "react";
import { Container, Dropdown, Menu, Button, Image } from "semantic-ui-react";
import { NavLink, Link } from "react-router-dom";
import { connect } from "../Context";

const NavBar = ({ context }) => {
  const { isAuth, user } = context.state;
  const trigger = (
    <span>
      <Image
        avatar
        src="https://react.semantic-ui.com/images/wireframe/square-image.png"
      />{" "}
      Сайн уу, {user.username}
    </span>
  );

  const options = [
    {
      key: "user",
      text: (
        <span>
          <strong>{user.username}</strong> нэрээр нэвтэрсэн
        </span>
      ),
      disabled: true,
    },

    { key: "stars", text: "Таны мэдээлэл", icon: "star" },
    { key: "help", text: "Тусламж", icon: "help" },
    { key: "settings", text: "Тохиргоо", icon: "settings" },
    {
      key: "sign-out",
      text: "Гарах",
      icon: "sign-out",
      onClick: () => context.logout(),
    },
  ];

  return (
    <Menu size="large" fixed="top">
      <Container>
        <Menu.Item as="a" style={{ border: 0 }} header href="/">
          БодБог
        </Menu.Item>
        <Dropdown item simple text="Бүх">
          <Dropdown.Menu>
            <Dropdown.Item>Зар</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Menu.Item style={{ border: 0 }} position="right">
          {isAuth ? (
            <Dropdown trigger={trigger}>
              <Dropdown.Menu>
                <Dropdown.Item
                  disabled
                  text={
                    <span>
                      <strong>{user.username}</strong> нэрээр нэвтэрсэн
                    </span>
                  }
                />
                <Dropdown.Item
                  as={Link}
                  to={`/хэрэглэгч/${user._id}`}
                  icon="user circle"
                  text=" Таны профайл"
                />
                <Dropdown.Item
                  onClick={() => context.logout()}
                  icon="sign-out"
                  text="Гарах"
                />
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <>
              <Button as={NavLink} to="/нэвтрэх">
                Нэвтрэх
              </Button>

              <Button
                as={NavLink}
                to="/бүртгэл"
                color="orange"
                style={{ marginLeft: "0.5em" }}
              >
                Эхлэх
              </Button>
            </>
          )}
        </Menu.Item>
      </Container>
    </Menu>
  );
};
export default connect(NavBar);
