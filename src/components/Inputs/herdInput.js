import React, { Component } from "react";
import {
  Button,
  Grid,
  Segment,
  Radio,
  FormGroup,
  Label
} from "semantic-ui-react";

import {
  Form,
  Input,
  Dropdown,
  TextArea
} from "semantic-ui-react-form-validator";
import { fivestar } from "../../config";
import { withForm } from "../../hoc/withForm";
import { connect } from "../../Context";
class ItemInput extends Component {
  /*componentDidUpdate(prevProps, prevState) {
    if (this.state.type !== prevState.type && this.state.type !== "") {
      this.setState({ errorat: null });
    }
  }*/
  constructor(props) {
    super(props);
  }
  handleChangeForm = (e, { name, value }) => {
    const { updateHerd } = this.props.context;

    updateHerd(name, value);
  };
  handleChangeRatio = (e, { value }) => {
    const { updateHerdAge } = this.props.context;
    updateHerdAge(value);
  };
  clearField = () => this.props.context.clearHerd();

  render() {
    console.log(this.props);
    const {
      age,
      type,
      color,
      weight,
      height,
      price,
      description,
      errorat
    } = this.props.context.state.herd;

    return (
      <>
        <Dropdown
          label="Төрөл"
          name="type"
          selection
          value={type}
          options={fivestar}
          placeholder="хонь үхэр гм"
          onChange={this.handleChangeForm}
        />
        <FormGroup inline style={{ justifyContent: "space-evenly" }}>
          <label>Нас</label>
          {[1, 2, 3, 4, 5, 6].map((v, i) => (
            <Radio
              key={i}
              label={`${v}${v === 6 ? "+" : ""}`}
              value={v}
              type="radio"
              checked={age === v}
              onChange={this.handleChangeRatio}
            />
          ))}
        </FormGroup>
        <Input
          placeholder="Жин оруулах..."
          name="weight"
          value={weight}
          labelPosition="right"
          onChange={this.handleChangeForm}
          validators={["isNumber", "minNumber:5", "maxNumber:9999"]}
          errorMessages={[
            "🔢 тоо оруулна уу",
            "😕",
            `😱 дэлхийн хамгийн хүнд ${type.toLowerCase()} гэж үү`
          ]}
        >
          <input />
          <Label>Кг</Label>
        </Input>

        <Input
          placeholder="Өндөр оруулах..."
          name="height"
          labelPosition="right"
          value={height}
          onChange={this.handleChangeForm}
          validators={["isNumber", "minNumber:20", "maxNumber:3000"]}
          errorMessages={[
            "🔢 тоо оруулна уу",
            "😕",
            `😱 дэлхийн хамгийн өндөр ${type.toLowerCase()} гэж үү`
          ]}
        >
          <input />
          <Label>См</Label>
        </Input>
        <Input
          label="Зүс"
          name="color"
          value={color}
          validators={["isString"]}
          errorMessages={["🌈 Өнгөөр илэрхийлнүү"]}
          placeholder="хүрэн алаг гм"
          onChange={this.handleChangeForm}
        />

        <Input
          name="price"
          type="text"
          value={price}
          onChange={this.handleChangeForm}
          validators={[
            "required",
            "isNumber",
            "minNumber:0",
            "maxNumber:9999999"
          ]}
          errorMessages={[
            "Та үнэ ээ оруулна уу",
            "🔢 тоо оруулна уу",
            "😕",
            "⚖️ хэт их байна"
          ]}
          placeholder="Үнэ"
          labelPosition="left"
        >
          <Label basic>₮</Label>
          <input />
        </Input>
        <TextArea
          name="description"
          value={description}
          onChange={this.handleChangeForm}
          placeholder="Дэлэгрэнгүй талбар"
        />
      </>
    );
  }
}

export default connect(withForm("herdForm")(ItemInput));
