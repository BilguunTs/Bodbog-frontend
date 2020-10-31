import React from "react";
import { Modal, Button } from "semantic-ui-react";
import AddressForm from "../components/AddressFrom";
//import { motion } from "framer-motion";
//import { useMutation, useQuery } from "@apollo/react-hooks";
//import { ADD_HERD, ADD_TEMPR, GET_HERD } from "../Queries";
import { connect } from "../Context";
const HerdSubmitionDialog = ({ context, closer }) => {
  const { state } = context;

  const HandleSubmit = async () => {
    if (!state.isAuth || localStorage.getItem("token") === null) {
    }
  };
  return (
    <>
      <Modal.Header>Хаяг байршил</Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <AddressForm
            onSubmit={(e) => {
              e.persist();
              HandleSubmit();
            }}
          />
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="yellow" onClick={closer}>
          цуцлах
        </Button>
        <Button
          positive
          icon="checkmark"
          labelPosition="right"
          content="Зарах"
          form="address"
          type="submit"
        />
      </Modal.Actions>
    </>
  );
};
export default connect(HerdSubmitionDialog);
