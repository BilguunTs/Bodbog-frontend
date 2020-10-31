import React from "react";
import { Modal, Header, Button } from "semantic-ui-react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { connect } from "../Context";
const PurchaseDialog = ({ closer, context }) => {
  const [step, setStep] = React.useState(0);
  const { modal } = context.state;
  let show;

  switch (step) {
    case 0:
      show = (
        <>
          <Modal.Header>
            <motion.label animate={{ scale: [0.5, 2.3] }}>🧐</motion.label> Та
            зөвшөөрч байна уу
          </Modal.Header>
          <Modal.Content>
            <Header as="h3">
              товчлуурыг дарснаар та үйлчилгээний нөхцөл, зар нийтлэх журам,
              нууцлалын бодлого болон Монгол улсын холбогдох хууль тогтоомжийг
              хүлээн зөвшөөрч буй болно.
            </Header>
          </Modal.Content>
          <Modal.Actions>
            <Button
              icon="checkmark"
              content="Тийм"
              labelPosition="right"
              positive
              onClick={() => setStep(1)}
            ></Button>
            <Button
              negative
              onClick={closer}
              icon="x"
              labelPosition="right"
              content="Үгүй"
            />
          </Modal.Actions>
        </>
      );
      break;
    case 1:
      show = (
        <>
          <Modal.Content>
            <Header as="h3">📞Зарын эзний дугаар</Header>
            <Header as="h1">{modal.data}</Header>
          </Modal.Content>
          <Modal.Actions>
            <Button positive onClick={closer}>
              Ок
            </Button>
          </Modal.Actions>
        </>
      );
    default:
      break;
  }
  return show;
};
export default connect(PurchaseDialog);
