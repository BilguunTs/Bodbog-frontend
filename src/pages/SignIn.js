import React from "react";
import { Button, Grid, Header, Message, Segment } from "semantic-ui-react";
import { Input, Form } from "semantic-ui-react-form-validator";
import { NavLink } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { Redirect } from "react-router-dom";
import { LOGIN } from "../Queries";
import { connect } from "../Context";

const LoginForm = ({ context, ...rest }) => {
  const { setSession, state } = context;
  const [login, { loading, error }] = useMutation(LOGIN);
  const [args, setArgs] = React.useState({
    poe: "",
    password: "",
  });

  const handleChange = (_, { name, value }) => {
    setArgs({ ...args, [name]: value });
  };
  const handleSumbit = (e) => {
    e.persist();
    return login({
      variables: {
        poe: args.poe,
        password: args.password,
      },
    })
      .then((res) => {
        const {
          id,
          token,
          lastname,
          firstname,
          username,
          phonenumber,
        } = res.data.login;
        const data = {
          id,
          firstname,
          lastname,
          token,
          username,
          phonenumber,
          email: "",
        };
        setSession(data);
      })
      .catch((e) => console.warn(e.message));
  };
  const { from } = rest.location.state || { from: { pathname: "/" } };
  if (state.redirect === true) {
    return <Redirect to={"/"} />;
  }
  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 500 }}>
        {error && (
          <Message color="red">
            😱 {error.graphQLErrors.map((e) => e.message)}
          </Message>
        )}
        <Segment loading={loading} padded>
          <Header as="h2" color="orange" textAlign="center">
            Нэвтрэх хэсэг
          </Header>
          <Form onSubmit={handleSumbit} size="large">
            <Input
              width={16}
              error={error}
              size="big"
              icon="user"
              value={args.poe}
              iconPosition="left"
              name="poe"
              validators={["required"]}
              errorMessages={["Та утасны дугаар болон эсвэл е-майл ээ "]}
              placeholder="Утасны дугаар эсвэл захим шуудан"
              onChange={handleChange}
            />
            <Input
              width={16}
              size="huge"
              icon="lock"
              name="password"
              iconPosition="left"
              value={args.password}
              placeholder="Нууц үг"
              type="password"
              validators={["required"]}
              errorMessages={["Нууц үгээ оруулна уу"]}
              onChange={handleChange}
            />
            <Button color="orange" type="submit" fluid size="huge">
              Нэвтрэх
            </Button>
          </Form>
        </Segment>
        <Message attached="bottom" color="olive">
          бүртгэлгүй гэж үү? <NavLink to="/бүртгэл">👉 Бүртгүүлэх 👈</NavLink>
          {error && <Message warning>🔑 Нууц үгээ мартсан гэжүү? 🤯</Message>}
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default connect(LoginForm);
