import React from "react";
import { Form, Input, Dropdown } from "semantic-ui-react-form-validator";
import { connect } from "../Context";
import { Provinces } from "../config";

const AddressForm = ({ context, submiter, ...rest }) => {
  const { updateAddress } = context;
  const handleChangeForm = (e, { name, value }) => {
    updateAddress(name, value);
  };
  const { province, sum_or_district, zip } = context.state.address;
  return (
    <Form id="address" {...rest}>
      <Dropdown
        placeholder="Аймаг"
        name="province"
        value={province}
        selection
        labelposition="right"
        onChange={handleChangeForm}
        options={Provinces}
        validators={["required"]}
      ></Dropdown>

      <Input
        placeholder="Дүүрэг эсвэл сум"
        name="sum_or_district"
        value={sum_or_district}
        onChange={handleChangeForm}
        validators={["required", "isString"]}
        errorMessages={[
          "дүүрэг болон сум ",
          "🔢 тоо оруулна уу",
          "😕",
          `😱 дэлхийн хамгийн  гэж үү`,
        ]}
      />
    </Form>
  );
};
export default connect(AddressForm);
/* 
  <Dropdown
        placeholder="Улс..."
        name="State"
        value={State}
        selection
        labelposition="right"
        onChange={handleChangeForm}
        options={[{ key: "m", text: "🇲🇳 монгол", value: "MN" }]}
        validators={["required"]}
      ></Dropdown>
   ============tmpr has been removed===========
  {context.state.isAuth ? null : (
        <Input
          placeholder="утасны дугаар"
          name="phone"
          value={phone}
          onChange={handleChangeForm}
          validators={["required", "isString"]}
          errorMessages={["жин оруулна уу", "🔢 тоо оруулна уу"]}
        >
          <input />
        </Input>
      )}
*/
