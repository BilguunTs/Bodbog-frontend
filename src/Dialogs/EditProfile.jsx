import React from "react";
import { Form, Input, TextArea } from "semantic-ui-react-form-validator";
import { FormGroup, Label, Modal, Button, Message } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import { GET_HERD, ADD_TEMPR, EDIT_PROFILE } from "../Queries";
import { connect } from "../Context";
import { gql } from "apollo-boost";
import { DateInput } from "semantic-ui-calendar-react";

const EditProfile = ({ context, closer }) => {
  const { state } = context;

  const { firstname, lastname, bio, birthdate, email } = context.state.profile;
  const [editProfile, { loading, error, data }] = useMutation(EDIT_PROFILE);

  const { updateProfile } = context;

  const HandleSubmit = () => {
    if (!state.isAuth || localStorage.getItem("token") === null) {
      return alert("cannot edit");
    }

    editProfile({
      variables: {
        firstname,
        lastname,
        bio,
        email,
      },
    })
      .then((r) => closer())
      .catch((e) => {
        console.warn(e);
      });
  };
  const handleChangeProfile = (e, { name, value }) => {
    updateProfile(name, value);
  };

  return (
    <>
      <Modal.Header>Хувийн мэдээлэл</Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <Message info>
            Хувийн мэдээлэл оруулснаар худалдан авагчтай холбоо тогтооход илүү
            дөхөм байх
          </Message>
          <Form
            id="EDIT_PROFILE"
            onSubmit={(e) => {
              e.persist();
              HandleSubmit();
            }}
          >
            <Input
              label="Нэр"
              name="firstname"
              value={firstname}
              onChange={handleChangeProfile}
              validators={["isString"]}
              errorMessages={["🌈 Нэр гэжүү"]}
            ></Input>

            <Input
              label="Овог"
              name="lastname"
              value={lastname}
              onChange={handleChangeProfile}
              validators={["isString"]}
              errorMessages={["🌈 Нэр гэжүү"]}
            ></Input>
            <Input
              label="Е-майл хаяг"
              name="email"
              value={email}
              validators={["isString"]}
              errorMessages={["🌈 Е-майл оруулна уу"]}
              placeholder="хүрэн алаг гм"
              onChange={handleChangeProfile}
            />

            <DateInput
              label="Төрсөн он сар өдөр"
              name="birthdate"
              closable
              popupPosition="top center"
              animation="fly right"
              clearable
              value={birthdate || ""}
              onChange={handleChangeProfile}
            />

            <TextArea
              name="bio"
              value={bio}
              onChange={handleChangeProfile}
              placeholder="Миний талаар"
            />
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={closer}>цуцлах</Button>
        <Button
          color="yellow"
          icon="save"
          loading={loading}
          labelPosition="right"
          content="Хадгалах"
          form="EDIT_PROFILE"
          type="submit"
        />
      </Modal.Actions>
    </>
  );
};
export default connect(EditProfile);
