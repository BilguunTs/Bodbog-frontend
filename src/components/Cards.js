import React from "react";
import { Button, Icon, Label, Item, Header, List } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { numberWithCommas } from "../utils/number-withcomma";
import HerdImage from "../components/Image";

export const HerdCard = ({
  herdType,
  price,
  description,
  _id,
  age,
  province,
  amount,
  color,
  published_date,
  image,
  ads_type,
  ...rest
}) => {
  return (
    <Item
      style={{
        border: "1px solid rgba(34,36,38,.15)",
        margin: "1rem 0",
        borderRadius: "15px",
        padding: "1.2rem",
        width: "100%",
        boxShadow: "0 1px 2px 0 rgba(34,36,38,.15)",
      }}
    >
      {image ? (
        <Item.Image src={image} />
      ) : (
        <Item.Image>
          <HerdImage type={herdType || "sheep"} />
        </Item.Image>
      )}
      <Item.Content>
        <Item.Header
          style={{ display: "flex", justifyContent: "space-between" }}
          as="a"
          href={`/зар/${_id}`}
        >
          <div>
            {`${herdType}${amount ? `-${amount}ш` : ""}`}
            <Header disabled as="h5">
              {published_date}
            </Header>
          </div>
          <div>
            {ads_type === "ON_SELL" && (
              <Label size="big" tag>
                <b style={{ color: "green" }}>{numberWithCommas(price)}₮</b>
              </Label>
            )}
            {ads_type === "ON_BUY" && (
              <Label color="orange" size="big" tag>
                Авна
              </Label>
            )}
          </div>
        </Item.Header>
        <Item.Meta>
          <List as="h3">
            <List.Item>нас:{age || "😕оруулаагүй"}</List.Item>
            <List.Item>зүс:{color || "😕оруулаагүй"}</List.Item>
          </List>

          <span className="cinema">{province || ""}</span>
        </Item.Meta>
        <Item.Description as="h2" style={{ wordWrap: "break-word" }}>
          {description}
        </Item.Description>
        <Item.Extra>
          <Button as={Link} to={`/зар/${_id}`} color="olive" floated="right">
            Дэлэгрэнгүй
            <Icon name="right chevron" />
          </Button>

          {ads_type === "ON_SELL" && <Label color="blue">Зарна</Label>}
          {ads_type === "ON_BUY" && <Label color="orange">Авна</Label>}
          <Link to={`/хэрэглэгч/${rest.owner._id}`}>
            <Label
              icon="user"
              color="teal"
              content={
                rest.owner
                  ? rest.owner.firstname === "" || rest.owner.firstname === null
                    ? "нэр оруулаагүй"
                    : rest.owner.firstname
                  : ""
              }
            />
          </Link>
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};
/**
 *     <Label as="a" color="teal" ribbon>
          Итгэмжлэгдээгүй
        </Label>
 * <Card fluid>
      <Card.Content>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>{props.herdType}</div>
          <div>₮{props.price}</div>
        </div>
      </Card.Content>
      <Card.Content>
        <Icon color="orange" size="huge" name="meh" />
        {`нас-${props.age}`}
      </Card.Content>
      <Card.Content extra>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>огноо</div>
          <Button
            icon="chevron right"
            content="Дэлэгрэнгүй"
            labelPosition="right"
          />
        </div>
      </Card.Content>
    </Card>
 */
/* display: "flex",
        border: "1px solid rgba(34,36,38,.15)",
        margin: "1rem 0",
        borderRadius: "15px",
        padding: "1em",
        width: "100%",
        boxShadow: "0 1px 2px 0 rgba(34,36,38,.15)",
        margin: "1rem 0px"*/
