import React, { Component } from "react";
import { Button, Dimmer, Header } from "semantic-ui-react";

const DimmablePlaceHolder = ({
  children,
  disable,
  clicker,
  inserttype,
  buttonsize,
  ...rest
}) => {
  const [state, setState] = React.useState({ active: false });
  const fileInputRef = React.useRef();
  const handleShow = () => setState({ active: true });
  const handleHide = () => setState({ active: false });

  const { active } = state;
  const handleClick = () => {
    if (clicker) {
      if (inserttype) {
        return fileInputRef.current.click();
      }
      return clicker();
    }
    return null;
  };
  const content = (
    <div>
      <Header as="h2" inverted>
        Title
      </Header>

      <Button primary>Add</Button>
      <Button>View</Button>
    </div>
  );
  return (
    <Dimmer.Dimmable
      dimmed={active}
      onMouseEnter={handleShow}
      onMouseLeave={handleHide}
      size="huge"
      {...rest}
    >
      {children}
      <Dimmer active={active}>
        <Header as="h2" inverted>
          Зураг
        </Header>

        <Button
          content={inserttype ? "Оруулах" : "Арилгах"}
          labelPosition="left"
          color={inserttype ? "green" : "red"}
          icon={inserttype ? "file" : "x"}
          onClick={handleClick}
          size={buttonsize || null}
        />
        <input
          ref={fileInputRef}
          accept="image/*"
          type="file"
          hidden
          onChange={clicker}
        />
      </Dimmer>
    </Dimmer.Dimmable>
  );
};
export default DimmablePlaceHolder;
