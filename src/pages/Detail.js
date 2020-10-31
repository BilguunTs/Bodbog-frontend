import React, { Component } from "react";
import { GET_ITEM_DETAIL } from "../Queries";
import { Query } from "react-apollo";
import {
  Card,
  Container,
  Segment,
  Grid,
  Button,
  Placeholder,
  Header,
} from "semantic-ui-react";
import { pageTransition, pageVariants } from "../config/framer";
import { motion } from "framer-motion";
import BlockCard from "../components/BlockCard";

import ActionSettings from "../components/VerticalSettings";
import { connect } from "../Context";
class Detail extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    this.handlePurchase = this.handlePurchase.bind(this);
  }
  handlePurchase = (e, { value }) => {
    this.props.context.openModal("purchase", value);
  };
  render() {
    const ID = this.props.match.params.id;
    //    const list = { hidden: { opacity: 0 } };
    //  const item = { hidden: { x: -10, opacity: 0 } };
    return (
      <motion.div
        className="row"
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        <Query query={GET_ITEM_DETAIL} variables={{ id: ID }}>
          {({ data, loading, error }) => {
            if (error) {
              return <div>Алдаатай хуудас</div>;
            }
            return (
              <>
                <Segment placeholder>
                  <Container style={{ marginTop: "5em" }}>
                    <Grid stackable columns="3">
                      <Grid.Column>
                        {loading ? (
                          <Placeholder
                            style={{
                              borderRadius: "40px",
                              height: 250,
                              maxWidth: 250,
                            }}
                          >
                            <Placeholder.Image />
                          </Placeholder>
                        ) : (
                          <BlockCard
                            fluid
                            type={data.herd && data.herd.herdType}
                            img={data.image && data.herd.image}
                            cardStyle={{
                              backgroundColor: "inherit",
                            }}
                            imgStyle={{
                              background: "inherit",
                            }}
                          />
                        )}
                      </Grid.Column>
                      <Grid.Column textAlign="left" stretched>
                        {loading ? (
                          <Placeholder>
                            <Placeholder.Line />
                          </Placeholder>
                        ) : (
                          <>
                            <Grid.Row>
                              <Header as="h2" color="brown">
                                Төрөл-
                                {(data.herd && data.herd.herdType) ||
                                  "😕оруулаагүй"}
                              </Header>
                            </Grid.Row>
                            <Grid.Row>
                              <Header as="h2">
                                Нас-
                                {(data.herd && data.herd.age) || "😕оруулаагүй"}
                              </Header>
                            </Grid.Row>
                            <Grid.Row>
                              <Header as="h2">
                                Жин-
                                {(data.herd && data.herd.weight) ||
                                  "😕оруулаагүй"}
                                {data.herd.height !== null ? "кг" : null}
                              </Header>
                            </Grid.Row>
                            <Grid.Row>
                              <Header as="h2">
                                Өндөр-
                                {(data.herd && data.herd.height) ||
                                  "😕оруулаагүй"}
                                {data.herd.height !== null ? "см" : null}
                              </Header>
                            </Grid.Row>
                            <Grid.Row>
                              <Header as="h2">
                                Ширхэгийн тоо-
                                {(data.herd && data.herd.amount) || 1}
                              </Header>
                            </Grid.Row>
                          </>
                        )}
                      </Grid.Column>

                      <Grid.Column>
                        {loading ? (
                          <>🦊</>
                        ) : (
                          <>
                            <Card color="orange" centered>
                              <Card.Content>
                                <Card.Header>
                                  <Header color="green" as="h1">
                                    {data.herd && (
                                      <>
                                        {data.herd.ads_type === "ON_SELL" ? (
                                          <> Үнэ- {data.herd.price}₮</>
                                        ) : (
                                          <>Авна</>
                                        )}
                                      </>
                                    )}
                                  </Header>
                                </Card.Header>
                                <Card.Description>
                                  {data.herd && data.herd.description}
                                </Card.Description>
                              </Card.Content>
                              <Card.Content>
                                <Button.Group fluid size="big">
                                  {data.herd &&
                                  data.herd.owner._id !==
                                    this.props.context.state.user._id ? (
                                    <Button
                                      onClick={this.handlePurchase}
                                      color="orange"
                                      icon="eye"
                                      labelPosition="right"
                                      value={data.herd.owner.phonenumber || ""}
                                      content="Дугаар"
                                    />
                                  ) : (
                                    <Button
                                      color="orange"
                                      disabled
                                      content="Зар харсан хүмүүс"
                                    />
                                  )}
                                  <ActionSettings
                                    floating
                                    basic
                                    button
                                    className="icon"
                                    onpass={data.herd && data.herd}
                                    accessID={data.herd && data.herd.owner._id}
                                  />
                                </Button.Group>
                              </Card.Content>
                            </Card>
                          </>
                        )}
                      </Grid.Column>
                    </Grid>
                  </Container>
                </Segment>

                <Container text style={{ marginTop: "5em", minHeight: "70vh" }}>
                  {loading ? (
                    <>...loading</>
                  ) : (
                    <Card fluid>
                      <Card.Content>
                        <Header as="h4">
                          өнгө: {data.herd && data.herd.color}
                        </Header>
                      </Card.Content>
                      <Card.Content>
                        <Header as="h4">
                          нэмэлт: {data.herd && data.herd.description}
                        </Header>
                      </Card.Content>
                    </Card>
                  )}
                </Container>
              </>
            );
          }}
        </Query>
      </motion.div>
    );
  }
}

export default connect(Detail);
/**
 * const list = { hidden: { opacity: 0 } }
const item = { hidden: { x: -10, opacity: 0 } }

return (
  <motion.ul animate="hidden" variants={list}>
    <motion.li variants={item} />
    <motion.li variants={item} />
    <motion.li variants={item} />
  </motion.ul>
)
 */
