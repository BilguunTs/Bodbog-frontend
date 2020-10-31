import React, { Component } from "react";
import {
  Button,
  Radio,
  FormGroup,
  Label,
  Checkbox,
  Icon,
} from "semantic-ui-react";
import { Mutation } from "react-apollo";
import { ADD_HERD } from "../Queries";
import { connect } from "../Context";
import {
  Form,
  Input,
  Dropdown,
  TextArea,
} from "semantic-ui-react-form-validator";
import { fivestar } from "../config";
const options = [
  { key: ".sell", text: "Зарахаар", value: "sell" },
  { key: ".deal", text: "Тохиролцохоор", value: "deal" },
  { key: ".free", text: "Үнэгүй", value: "free" },
];
class ItemForm extends Component {
  /*componentDidUpdate(prevProps, prevState) {
    if (this.state.type !== prevState.type && this.state.type !== "") {
      this.setState({ errorat: null });
    }
  }*/
  constructor(props) {
    super(props);
    this.form = React.createRef();
    this.state = { toggled: false, detail: false };
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
  renderExpandButtons = () => {
    if (!this.state.detail) {
      return (
        <Button
          icon
          labelPosition="right"
          type="button"
          style={{ marginBottom: "1.2rem" }}
          onClick={() => this.setState({ ...this.state, detail: true })}
        >
          Дэлэгрэнгүй мэдээлэл нэмэх
          <Icon name="plus" />
        </Button>
      );
    } else {
      return (
        <Button
          icon
          labelPosition="right"
          type="button"
          color="red"
          style={{ marginBottom: "1.2rem" }}
          onClick={() => this.setState({ ...this.state, detail: false })}
        >
          Дэлэгрэнгүй мэдээлэл хасах
          <Icon name="cancel" />
        </Button>
      );
    }
  };
  render() {
    const {
      age,
      type,
      color,
      weight,
      height,
      price,
      amount,
      description,
      ads_type,
    } = this.props.context.state.herd;

    return (
      <Mutation mutation={ADD_HERD}>
        {(addHerd, { loading, error }) => (
          <>
            <Form
              onSubmit={async (e) => {
                e.persist();
                this.props.context.openModal("address");
              }}
            >
              <Checkbox
                style={{ marginBottom: "1rem" }}
                className="paint"
                onChange={(_, d) => this.setState({ toggled: d.checked })}
                toggle
                label={this.state.toggled ? "Олон" : "Ганц"}
              ></Checkbox>
              <FormGroup>
                <Dropdown
                  label="Төрөл"
                  name="type"
                  selection
                  size="big"
                  value={type}
                  options={fivestar}
                  placeholder="хонь үхэр гм"
                  onChange={this.handleChangeForm}
                />

                {this.state.toggled ? (
                  <Input
                    value={amount}
                    name="amount"
                    onChange={this.handleChangeForm}
                    label="Ширхэгийн тоо"
                    validators={[
                      "required",
                      "isNumber",
                      "minNumber:2",
                      "maxNumber:9999",
                    ]}
                    errorMessages={[
                      "энэ хэсгийг оруулна уу",
                      "🔢 тоо оруулна уу",
                      "😕 2 оос дээш тоо оруулна уу",
                      `😱 хэт их байна`,
                    ]}
                  />
                ) : null}
              </FormGroup>
              {this.renderExpandButtons()}
              {this.state.detail && (
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
              )}
              {this.state.detail && (
                <FormGroup>
                  <Input
                    placeholder={
                      this.state.toggled ? "Дундаж жин" : "Жин оруулах"
                    }
                    name="weight"
                    value={weight}
                    width={16}
                    size="big"
                    labelPosition="right"
                    onChange={this.handleChangeForm}
                    validators={["isNumber", "minNumber:5", "maxNumber:9999"]}
                    errorMessages={[
                      "🔢 тоо оруулна уу",
                      "😕",
                      `😱 дэлхийн хамгийн хүнд ${type.toLowerCase()} гэж үү`,
                    ]}
                  >
                    <input />
                    <Label>Кг</Label>
                  </Input>

                  <Input
                    placeholder={
                      this.state.toggled ? "Дундаж өндөр" : "Өндөр оруулах..."
                    }
                    width={16}
                    name="height"
                    labelPosition="right"
                    value={height}
                    size="big"
                    onChange={this.handleChangeForm}
                    validators={["isNumber", "minNumber:10", "maxNumber:3000"]}
                    errorMessages={[
                      "🔢 тоо оруулна уу",
                      "😕",
                      `😱 дэлхийн хамгийн өндөр ${type.toLowerCase()} гэж үү`,
                    ]}
                  >
                    <input />
                    <Label>См</Label>
                  </Input>
                </FormGroup>
              )}
              <FormGroup>
                {ads_type === "ON_SELL" && (
                  <Input
                    name="price"
                    type="text"
                    value={price}
                    onChange={this.handleChangeForm}
                    size="big"
                    label={
                      <Dropdown
                        size="big"
                        defaultValue="sell"
                        options={options}
                      />
                    }
                    validators={[
                      "required",
                      "isNumber",
                      "minNumber:0",
                      "maxNumber:9999999",
                    ]}
                    errorMessages={[
                      "Та үнэ ээ оруулна уу",
                      "🔢 тоо оруулна уу",
                      "😕",
                      "⚖️ хэт их байна",
                    ]}
                    placeholder={this.state.toggled ? "Нэгжийн үнэ₮" : "Үнэ₮"}
                    labelPosition="left"
                  />
                )}
                {this.state.detail && (
                  <Input
                    label={this.state.toggled ? "Зүс ерөнхий" : "Зүс"}
                    size="big"
                    name="color"
                    value={color}
                    validators={["isString"]}
                    errorMessages={["🌈 Өнгөөр илэрхийлнүү"]}
                    placeholder="хүрэн алаг гм"
                    onChange={this.handleChangeForm}
                  />
                )}
              </FormGroup>
              {this.state.detail && (
                <TextArea
                  name="description"
                  width={16}
                  rows={10}
                  size="big"
                  label={"Дэлэгрэнгүй тайлбар"}
                  value={description}
                  onChange={this.handleChangeForm}
                  placeholder="Нэмэлт мэдээлэл болон дурдагдаагүй зүйлс "
                />
              )}

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  labelPosition="left"
                  icon="arrow left"
                  size="small"
                  color="yellow"
                  size="big"
                  basic
                  content="Буцах"
                  onClick={() => this.props.before()}
                ></Button>
                <Button
                  positive
                  labelPosition="right"
                  icon="add"
                  type="submit"
                  size="big"
                  content="Нийтлэх"
                ></Button>
              </div>
            </Form>
          </>
        )}
      </Mutation>
    );
  }
}

export default connect(ItemForm);
/**
 *    <Input
              style={{ margin: "0 3rem .5rem 0" }}
              label={{ basic: true, content: "kг" }}
              labelPosition="right"
              placeholder="Жин оруулах..."
              name="weight"
              onChange={this.handleChangeForm}
            />

            <Input
              style={{ marginBottom: ".5rem" }}
              label={{ basic: true, content: "см" }}
              labelPosition="right"
              placeholder="Өндөр оруулах..."
              name="height"
              onChange={this.handleChangeForm}
            />
 *    <Form.Group inline>
              <label>нас</label>

              <Form.Radio
                label="1"
                value={1}
                checked={age === 1}
                onChange={this.handleChangeRatio}
              />
              <Form.Radio
                label="2"
                value={2}
                checked={age === 2}
                onChange={this.handleChangeRatio}
              />
              <Form.Radio
                label="3"
                value={3}
                checked={age === 3}
                onChange={this.handleChangeRatio}
              />
              <Form.Radio
                label="4"
                value={4}
                checked={age === 4}
                onChange={this.handleChangeRatio}
              />
              <Form.Radio
                label="5"
                value={5}
                checked={age === 5}
                onChange={this.handleChangeRatio}
              />
              <Form.Radio
                label="6+"
                value={6}
                checked={age === 6}
                onChange={this.handleChangeRatio}
              />
            </Form.Group>
 */
