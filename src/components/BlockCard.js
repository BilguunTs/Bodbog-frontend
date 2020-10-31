import React from "react";
import { Card, Image, Segment } from "semantic-ui-react";
import Goat from "../asset/goat.png";
import Sheep from "../asset/sheep.png";
import Horse from "../asset/horse.png";
import Cow from "../asset/cow.png";
import Camel from "../asset/camel.png";
import Pet from "../asset/pet.png";
import { Defaults } from "../config";
import Dimmable from "../components/Dimmable";
import { connect } from "../Context";

const BlockCard = ({
  img,
  dimmable,
  name,
  size,
  type,
  cardStyle,
  imgStyle,
  context,
  ...rest
}) => {
  let instance;
  switch (type) {
    case Defaults.types.SHEEP:
      instance = Sheep;
      break;
    case Defaults.types.HORSE:
      instance = Horse;
      break;
    case Defaults.types.GOAT:
      instance = Goat;
      break;
    case Defaults.types.COW:
      instance = Cow;
      break;
    case Defaults.types.CAMEL:
      instance = Camel;
      break;
    default:
      instance = Pet;
      break;
  }
  if (dimmable) {
    const { onFileChange, clearFile } = context;
    const { preview, path } = context.state.image;

    return (
      <Dimmable
        as={Image}
        active={false}
        clicker={!path ? onFileChange : clearFile}
        inserttype={preview === null}
        style={{
          borderRadius: 40,
          background: "inherit",
          ...cardStyle,
        }}
      >
        <Image
          draggable="false"
          style={{ ...imgStyle }}
          src={preview !== null ? preview : img || instance}
          size={size || "massive"}
        />
      </Dimmable>
    );
  }
  return (
    <Card
      {...rest}
      style={{ ...cardStyle }}
      name={name || type || "card name"}
      image={
        <Image
          draggable="false"
          style={{ ...imgStyle }}
          src={img || instance}
          size={size || "massive"}
        />
      }
    ></Card>
  );
};

export default connect(BlockCard);
/**
 *  <Card
          {...rest}
          style={{ borderRadius: 50, padding: "1rem", ...cardStyle }}
          name={name || type || "card name"}
          image={
            <Image
              draggable="false"
              style={{ ...imgStyle }}
              src={img || instance}
              size={size || "massive"}
            />
          }
        ></Card>
 */
