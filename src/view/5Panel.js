import React from "react";
import { Grid, Divider } from "semantic-ui-react";
import { motion } from "framer-motion";
import { connect } from "../Context";
import { Defaults } from "../config";
import BlockCard from "../components/BlockCard";
import { herds } from "../config";

/*const Style = {
  container: {
    background: "#ffffff",
    // boxShadow: "  23px 23px 46px #d9d9d9, -23px -23px 46px #ffffff"
  },
  clicked: {
    borderRadius: "30%",
    background: " linear-gradient(145deg, #e6e6e6, #ffffff)",
    boxShadow: " 23px 23px 46px #d9d9d9, -23px -23px 46px #ffffff",
    padding: "30px",
  },
  default: {
    borderRadius: "30%",
    background: "linear-gradient(145deg, #ffffff, #e6e6e6)",
    boxShadow: " 23px 23px 46px #d9d9d9, -23px -23px 46px #ffffff",
    padding: "30px",
  },
};*/
const FiveStarPane = ({ context, ...rest }) => {
  const handleClick = (e, { name }) => {
    context.setHerd(Object.assign(Defaults.herd, { type: name }));
    rest.next();
  };

  return (
    <motion.div
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      exit={{ x: 300, opacity: 0 }}
    >
      <Grid columns={2} stackable textAlign="center">
        <Divider vertical style={{ zIndex: "1" }}>
          <div style={{ transform: "scale(1.5)", zIndex: "1" }}>🐮🐶</div>
        </Divider>
        <Grid.Row verticalAlign="middle">
          <Grid.Column>
            <Grid columns={5}>
              {herds.map((c, i) => (
                <Grid.Column key={i} width="5">
                  <motion.div
                    whileHover={{
                      scale: 1.1,
                      boxShadow:
                        "0 19px 38px rgba(0, 0, 0, 0.30), 0 15px 12px rgba(0, 0, 0, 0.22)",
                      translateY: -5,
                    }}
                    whileTap={{
                      scale: 1,
                      translateY: -1,
                    }}
                    animate={{ opacity: [0, 1] }}
                    transition={{
                      type: "spring",
                      stiffness: 660,
                      damping: 20,
                    }}
                    style={{
                      borderRadius: 35,
                    }}
                  >
                    <BlockCard
                      onClick={handleClick}
                      type={c.type}
                      imgStyle={{ background: "inherit" }}
                      cardStyle={{
                        padding: "1rem",
                        borderRadius: 35,
                      }}
                    />
                  </motion.div>
                </Grid.Column>
              ))}
            </Grid>
          </Grid.Column>

          <Grid.Column>
            <Grid centered columns={1}>
              <Grid.Column computer="8" tablet="10" mobile="9">
                <motion.div>
                  <BlockCard
                    fluid
                    name={"Тэжээвэр"}
                    cardStyle={{ padding: "2rem", borderRadius: 50 }}
                    imgStyle={{ background: "inherit" }}
                  ></BlockCard>
                </motion.div>
              </Grid.Column>
            </Grid>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </motion.div>
  );
};
export default connect(FiveStarPane);
/** <Card
                  fluid
                  onClick={handleClick}
                  raised
                  name={"Тэжээвэр"}
                  image={
                    <Image
                      style={{ background: "inherit" }}
                      src={Pet}
                      size="huge"
                    />
                  }
                  style={{ padding: "2rem" }}
                ></Card> */
