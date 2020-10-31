import React from "react";
import { connect } from "../Context";
import { useQuery } from "react-apollo";
import {
  Container,
  Segment,
  Placeholder,
  Item,
  Icon,
  Grid,
  Header,
  Tab,
  Button,
  Statistic,
} from "semantic-ui-react";
import { GET_USER_DETAIL } from "../Queries";
import { Link } from "react-router-dom";
import ActionSettings from "../components/VerticalSettings";
import { pageTransition, pageVariants } from "../config/framer";
import HerdBlock from "../components/BlockCard";
import { motion } from "framer-motion";
import Settings from "../Panels/Accountsettnigs";
const UserAccount = ({ match, context }) => {
  const { loading, data, error } = useQuery(GET_USER_DETAIL, {
    variables: { userID: match.params.id },
  });

  if (loading)
    return (
      <>
        <Segment>
          {" "}
          <Container style={{ marginTop: "5rem" }}>
            <Placeholder
              style={{ height: 175, width: 175, borderRadius: "50%" }}
            >
              <Placeholder.Image />
            </Placeholder>
          </Container>
        </Segment>
      </>
    );
  if (error) return `Error! ${error}`;
  let isOwner = context.state.user._id === data.user._id;

  const RenderPanes = (isAdmin) => {
    if (data === null) return;
    let Panes;
    return (Panes = [
      {
        menuItem: {
          key: "items",
          icon: "list alternate",
          content: isOwner ? "Миний зар" : "Зар",
        },
        render: () => (
          <Tab.Pane loading={loading} attached={false}>
            <Segment basic color="blue">
              <Item.Group divided>
                {data.user.herds.length !== 0 ? (
                  data.user.herds.map((h, i) => (
                    <Item key={i}>
                      <Item.Image size="tiny">
                        <HerdBlock
                          imgStyle={{ background: "inherit" }}
                          type={h.herdType}
                        />
                      </Item.Image>

                      <Item.Content>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Item.Header>{h.herdType}</Item.Header>

                          <ActionSettings
                            onpass={h}
                            floating
                            basic
                            button
                            className="icon"
                            accessID={data.user._id}
                          />
                        </div>
                        <Item.Meta>
                          <span className="price">₮{h.price}</span>
                          <span className="stay">оруулсан он сар өдөр </span>
                        </Item.Meta>
                        <Item.Description>{h.description}</Item.Description>
                        <Item.Extra>
                          <Link to={`/зар/${h._id}`}>
                            <Button primary floated="right">
                              Дэлэгрэнгүй
                              <Icon name="right chevron" />
                            </Button>
                          </Link>
                        </Item.Extra>
                      </Item.Content>
                    </Item>
                  ))
                ) : (
                  <Header>Танд оруулсан зар байхгүй байна</Header>
                )}
              </Item.Group>
            </Segment>
          </Tab.Pane>
        ),
      },
      {
        menuItem: { key: "comments", icon: "comments", content: "Сэтгэгдэл" },
        render: () => (
          <Tab.Pane loading={loading} attached={false}>
            {isOwner ? <div>you are owner</div> : <div>you are guest</div>}
          </Tab.Pane>
        ),
      },

      {
        menuItem: {
          key: "setting",
          icon: isOwner ? "setting" : "info",
          content: isOwner ? "Тохиргоо" : "Мэдэгдэл",
        },
        render: () => (
          <Tab.Pane loading={loading} attached={false}>
            {isOwner ? <Settings {...data.user} /> : <div> your are guest</div>}
          </Tab.Pane>
        ),
      },
    ]);
  };
  return (
    <div>
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        <Segment placeholder>
          <Container style={{ marginTop: "5rem" }}>
            <Header as="h2" icon textAlign="center">
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Segment
                  circular
                  style={{ width: 175, height: 175, backgroundColor: "#eee" }}
                >
                  <Header as="h2">
                    <Icon name="user" size="huge" color="grey" />
                  </Header>
                </Segment>
              </div>
              <Header.Content>
                <Grid columns="2" stackable>
                  <Grid.Column>
                    <Statistic color="orange">
                      <Statistic.Value
                        text={
                          data.user.firstname && data.user.firstname.length > 10
                        }
                        content={data.user.firstname || "нэр"}
                      />

                      <Statistic.Label>
                        {" "}
                        {data.user.firstname ? "Нэр" : "Оруулаагүй"}
                      </Statistic.Label>
                    </Statistic>
                  </Grid.Column>
                  <Grid.Column>
                    <Statistic color="orange">
                      <Statistic.Value>
                        {data.user.herds.length}
                      </Statistic.Value>
                      <Statistic.Label>нийт зар</Statistic.Label>
                    </Statistic>
                  </Grid.Column>
                </Grid>
              </Header.Content>
            </Header>
          </Container>
        </Segment>
        <Container>
          <Grid stackable>
            <Grid.Column>
              <Tab
                menu={{ secondary: true }}
                panes={RenderPanes(
                  context.state.isAuth,
                  data.user,
                  loading,
                  context
                )}
              ></Tab>
            </Grid.Column>
          </Grid>
        </Container>
      </motion.div>
    </div>
  );
};
export default connect(UserAccount);
/**
 *  <Dimmable
                circular
                as={Segment}
                disable
                clicker={
                  context.state.image.path === null
                    ? context.onFileChange
                    : context.clearFile
                }
                inserttype={context.state.image.path === null}
                style={{
                  background: "inherit",
                  //  width: 176,
                  // height: 176,

                  border: "1px solid #eee",
                }}
              >
                {context.state.image.preview ? (
                  <Image src={context.state.image.preview} />
                ) : (
                  <Icon name="user" size="huge" color="grey" />
                )}
              </Dimmable>
 */
