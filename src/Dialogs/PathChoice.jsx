import React from "react";
import {
  Segment,
  Grid,
  Divider,
  Header,
  Button,
  Icon,
} from "semantic-ui-react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
export const PathChoice = ({ next, closer }) => {
  return (
    <motion.div animate={{ scale: [0.5, 1.1, 1], opacity: [0, 1] }}>
      <Segment placeholder>
        <Grid columns={2} stackable textAlign="center">
          <Grid.Row verticalAlign="middle">
            <Grid.Column>
              <Header icon>
                <Icon color="olive" name="hand point down" />
                <span role="img">✔️</span> Таны оруулсан зар таныг устгах товч
                дарах хүртэл байсаар л байх болно <span role="img">😀</span>
              </Header>
              <NavLink to="/бүртгэл">
                <Button onClick={closer} positive>
                  Бүртгүүлэх
                </Button>
              </NavLink>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </motion.div>
  );
};
/**removing tempr
 *  <Divider vertical>
            <motion.div
              animate={{
                scale: [0.1, 15, 1.5],
                opacity: [0, 1],
                y: [-300, 0],
              }}
              transition={{ delay: 0.5 }}
            >
              <span role="img">🤔</span>
            </motion.div>
          </Divider>
 *     <Grid.Column>
              <Header icon>
                <Icon color="yellow" name="exclamation triangle" />
                <span role="img"> ⚠️ </span> Таны оруулсан бараа{" "}
                <a style={{ color: "red" }}> 12 </a> цагын дотор устах болно
                гэдгийг анхаарна уу <span role="img">❗❗</span>
              </Header>
              <Button color="yellow" onClick={next.bind(this)}>
                Үргэлжлүүлэх
              </Button>
            </Grid.Column>
 */
