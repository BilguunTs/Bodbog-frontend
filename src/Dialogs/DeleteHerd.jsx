import React from "react";
import { Modal, Button, Header, Grid, List } from "semantic-ui-react";

import { useMutation } from "@apollo/react-hooks";
import { DELETE_HERD, GET_USER_DETAIL } from "../Queries";
import { connect } from "../Context";
import BlockCard from "../components/BlockCard";

const HerdSubmitionDialog = ({ context, closer }) => {
  const { state } = context;
  const [deleteHerd, { loading }] = useMutation(DELETE_HERD);
  const HandleSubmit = async () => {
    if (!state.isAuth || localStorage.getItem("token") === null) return;
    return deleteHerd({
      variables: { targetID: state.herd._id },
    })
      .then((r) => {
        console.log(r.data.deleteHerd);
        if (r) {
          closer();
          //should refetch
          window.location.assign(`/хэрэглэгч/${state.user._id}`);
        }
      })
      .catch((e) => console.warn(e));
  };
  return (
    <>
      <Modal.Header>Та итгэлтэй байна уу</Modal.Header>
      <Modal.Content image>
        <Grid stackable>
          <Grid.Column width="10">
            <BlockCard type={state.herd.type} />
          </Grid.Column>
          <Grid.Column>
            <List relaxed inverted bulleted>
              <List.Item as="h4">төрөл-{state.herd.type}</List.Item>
              <List.Item as="h4">нас-{state.herd.age}</List.Item>
              <List.Item as="h4">зүс-{state.herd.color}</List.Item>
              <List.Item as="h4">жин-{state.herd.weight}</List.Item>
              <List.Item as="h4">өндөр-{state.herd.height}</List.Item>
              <List.Item as="h4">үнэ-{state.herd.price}</List.Item>
            </List>
          </Grid.Column>
        </Grid>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={closer}>цуцлах</Button>
        <Button
          loading={loading}
          negative
          icon="trash"
          labelPosition="right"
          content="Устгах"
          onClick={HandleSubmit}
        />
      </Modal.Actions>
    </>
  );
};
export default connect(HerdSubmitionDialog);
