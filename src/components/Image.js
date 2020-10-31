import React from "react";
import Goat from "../asset/goat.png";
import Sheep from "../asset/sheep.png";
import Horse from "../asset/horse.png";
import Cow from "../asset/cow.png";
import Camel from "../asset/camel.png";
import Pet from "../asset/pet.png";
import { Defaults } from "../config";
import { Image } from "semantic-ui-react";
const HerdImage = ({ type, image, ...rest }) => {
  let instance;
  if (image) return <Image src={image} {...rest} />;
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
  return <Image src={instance} {...rest} />;
};
export default HerdImage;
