import React from "react";
import {
  Button,
  Grid,
  Header,
  Message,
  Segment,
  Icon,
  Checkbox,
} from "semantic-ui-react";
import { Input, Form } from "semantic-ui-react-form-validator";
import { NavLink } from "react-router-dom";

import { useMutation } from "@apollo/react-hooks";
import { connect } from "../Context";
import { REGISTER } from "../Queries";
const SingUp = ({ context }) => {
  const [state, setState] = React.useState({
    phone: "",
    password: "",
    password2: "",
    accept: false,
    Error: {
      type: "",
      target: "",
    },
  });

  const [register, { data, loading, error }] = useMutation(REGISTER);
  const handleChane = (e, { name, value }) => {
    setState({ ...state, [name]: value });
  };
  const handleSubmit = (e) => {
    e.persist();

    const { Error, password2, ...rest } = state;
    if (state.password !== password2) {
      return setState({ ...state, Error: "NSP" });
    }

    // let cPhone = ONLY_NUMBER_REGEX.test(state.phone);
    //let cPassword = PASSWORD_REGEX.test(state.password);
    // let cfirstname = NAME_REGEX.test(state.firstname);
    // let clastname = NAME_REGEX.test(state.lastname);

    const newuser = register({
      variables: {
        phonenumber: parseInt(rest.phone, 10),
        password: rest.password,
      },
    })
      .then((r) => {
        context.setSession(r.data);
      })
      .catch((e) => console.log(e));
    return newuser;
  };
  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 500 }}>
        <Message attached="top" warning>
          <Icon name="help" />
          Бүртгэлтэй гэж үү? <NavLink to="/нэвтрэх">Нэвтрэх</NavLink>
        </Message>
        {error && (
          <Message color="red">
            {error.graphQLErrors.map((e) => e.message)}
          </Message>
        )}
        <Segment padded loading={loading}>
          <Header as="h2" color="orange" textAlign="center">
            Шинэ хэрэглэгчийн бүртгэл
          </Header>
          <Form
            id="SIGN_UP_FORM"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <Input
              width={16}
              size="big"
              fluid
              label={"(+976)"}
              inline="true"
              name="phone"
              value={state.phone}
              validators={[
                "required",
                "isNumber",
                "minNumber:11111111",
                "maxNumber:99999999",
              ]}
              errorMessages={[
                "Та утасны дугаараа оруулна уу",
                "🔢 тоо оруулна уу",
                "😕",
                "⚖️ хэт их байна",
              ]}
              iconPosition="left"
              placeholder="утасны дугаар"
              onChange={handleChane}
            />

            <Input
              icon="lock"
              size="big"
              name="password"
              value={state.password}
              width={16}
              iconPosition="left"
              validators={[
                "required",
                "isString",
                // "matchRegexp:^(?=[^a-z]*[a-z])(?=D*d)[^:&.~s]{8,20}$"
              ]}
              errorMessages={[
                "Та нууц үгээ оруулна уу",
                "Хамгийн багадаа 8, ядаж нэг том үсэг оруулна уу",
              ]}
              placeholder="нууц үг"
              type="password"
              onChange={handleChane}
            />

            <Input
              icon="repeat"
              iconPosition="left"
              width={16}
              size="big"
              state={state.password2}
              placeholder="нууц үгээ давтах"
              type="password"
              name="password2"
              onChange={handleChane}
            />
          </Form>
        </Segment>
        <Message attached="bottom" color={state.accept ? "green" : "yellow"}>
          Би BodBog.mn сайтын{" "}
          <NavLink to="/үйлчилгээний-нөхцөл">үйлчилгээний нөхцөл</NavLink>, зар
          нийтлэх журмыг хүлээн зөвшөөрч, мөн өөрийгөө 18 нас хүрсэн болохыг
          баталж байна
          <Checkbox
            onClick={(e) => setState({ ...state, accept: !state.accept })}
            required
            label="👌 Зөвшөөрөх"
          />
        </Message>
        {state.accept ? (
          <Message color="violet" floating>
            ☝️🧐 Батлах товчлуурыг дарснаар та үйлчилгээний нөхцөл, зар нийтлэх
            журам, нууцлалын бодлого болон Монгол улсын холбогдох хууль
            тогтоомжийг хүлээн зөвшөөрч буй болно.
          </Message>
        ) : null}
        <Button
          disabled={!state.accept}
          type="submit"
          form="SIGN_UP_FORM"
          color="orange"
          fluid
          size="huge"
        >
          Батлах
        </Button>
      </Grid.Column>
    </Grid>
  );
};

export default connect(SingUp);
