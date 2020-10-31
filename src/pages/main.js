import React from "react";
import {
  Container,
  Header,
  Segment,
  Grid,
  Icon,
  Button,
  Divider,
} from "semantic-ui-react";
import { motion } from "framer-motion";
import { herds } from "../config";
import BlockCard from "../components/BlockCard";
import ListView from "../view/ListView";
import ElasticView from "../view/ElasticView";
import ItemForm from "../components/ItemForm";
import AddressForm from "../components/AddressFrom";
import FivePanel from "../view/5Panel";
import { connect } from "../Context";
import PathChoice from "../view/PathChoice";
import Filters from "../components/Filters";
const FormVariant = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: 300 },
};
const Main = ({ context, match, history }) => {
  const [indexAt, setIndexAt] = React.useState(-1);
  const [viewType, setViewType] = React.useState(1);
  const [adsType, setAdsType] = React.useState(null);
  const { type } = context.state.herd;
  const nextIndex = () => {
    if (indexAt === 2) {
      return null;
    }
    setIndexAt(indexAt + 1);
  };
  const preIndex = () => {
    if (indexAt === -1) {
      return 0;
    }
    setIndexAt(indexAt - 1);
  };
  const renderForm = () => {
    // add block card
    switch (indexAt) {
      case -1:
        return <PathChoice next={nextIndex} setAdsType={setAdsType} />;
      case 0:
        return <FivePanel before={preIndex} next={nextIndex} />;
      case 1:
        return (
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5 }}
            variants={FormVariant}
          >
            <Grid columns={2} stackable stretched container>
              <Grid.Column width="4">
                {herds.map((h, i) =>
                  h.type === type ? (
                    <motion.div
                      key={i}
                      animate={{ scale: [0.5, 1.1, 1], opacity: [0, 1] }}
                    >
                      <BlockCard
                        dimmable={adsType === "зарах"}
                        cardStyle={{
                          background: "inherit",
                          border: "0px",
                        }}
                        imgStyle={{
                          background: "inherit",
                          border:
                            context.state.image.path !== null ||
                            adsType !== "зарах"
                              ? null
                              : "5px dashed orange",
                          borderRadius: 40,
                          opacity: context.state.image.path !== null ? 1 : 0.6,
                        }}
                        type={type}
                      />
                    </motion.div>
                  ) : null
                )}
              </Grid.Column>
              <Grid.Column width="9">
                <ItemForm name="iform" before={preIndex} />
              </Grid.Column>
            </Grid>
          </motion.div>
        );
      case 2:
        return <AddressForm adsType={adsType} name="aform" />;
      default:
        return null;
    }
  };
  const renderText = () => {
    if (indexAt === -1) {
      return (
        <div style={{ textAlign: "center" }}>
          👋 Та ямар төрлийн зар оруулах вэ?
        </div>
      );
    }
    if (indexAt === 0) {
      return (
        <div
          style={{
            whiteSpace: " nowrap",
            overflow: "hidden",
          }}
        >
          <Button
            onClick={preIndex.bind(this)}
            size="massive"
            color="orange"
            circular
            icon="angle left"
          />
          Та юу {adsType} вэ? 🧐
        </div>
      );
    }
    return (
      <>
        👀 Ямар <a style={{ color: "orange" }}>{type.toLowerCase()}</a> вэ?
      </>
    );
  };
  return (
    <motion.div
      animate={{ opacity: [0, 1], scale: [0.8, 1] }}
      exit="out"
      //  variants={pageVariants}
      //  transition={pageTransition}
    >
      <div style={{ marginTop: "7em" }}>
        <div style={{ minHeight: "5rem" }}>
          <Container>
            <Header as="h1">{renderText()}</Header>
          </Container>
          <Segment>
            <Container>{renderForm()}</Container>
          </Segment>
        </div>

        <Container style={{ paddingTop: 0 }}>
          <Segment basic>
            <Segment basic floated="left" vertical>
              <Filters />
            </Segment>

            <Button.Group floated="right">
              <Button
                onClick={() => setViewType(0)}
                active={viewType === 0}
                icon
              >
                <Icon name="grid layout" />
              </Button>
              <Button
                onClick={() => setViewType(1)}
                active={viewType === 1}
                icon
              >
                <Icon name="list layout" />
              </Button>
            </Button.Group>
            <Divider clearing />

            <div className="Container">
              {viewType === 0 && (
                <ElasticView
                  dir={context.state.direction_of_list}
                  match={match}
                  history={history}
                />
              )}

              {viewType === 1 && (
                <ListView dir={context.state.direction_of_list} />
              )}
            </div>
          </Segment>
        </Container>
      </div>
    </motion.div>
  );
};
/**   <Container text style={{ marginTop: "7em", minHeight: "70vh" }}> */
export default connect(Main);

/*
<Grid.Column stretched columns={1}>
  <ListView />
</Grid.Column>
 <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <div style={{ marginTop: "7em" }}>
        <div style={{ minHeight: "35rem" }}>
          <Container>
            <Header as="h1">{renderText()}</Header>
          </Container>
          <Segment placeholder>
            <Container>{renderForm()}</Container>
          </Segment>
        </div>
        <Container>
          <div className="Container">
            <ElasticView match={match} history={history} />
          </div>
        </Container>
      </div>
    </motion.div>
*/
