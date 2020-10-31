import React from "react";
import {
  Grid,
  Image,
  Card,
  CardContent,
  Header,
  Segment
} from "semantic-ui-react";
import Pet from "../asset/pet.png";
import BlockCard from "../components/BlockCard";
import { HerdCard } from "./Cards";
const SmoothCard = () => {
  return <HerdCard />;
};
export default SmoothCard;
/**
 * <Card>
      <Image src={Pet} wrapped ui={false} />
      <Card.Content>
        <Card.Header>Daniel</Card.Header>
        <Card.Meta>Joined in 2016</Card.Meta>
        <Card.Description>
          Daniel is a comedian living in Nashville.
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a>10 Friends</a>
      </Card.Content>
    </Card>
 */
