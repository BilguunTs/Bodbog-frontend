import React from "react";
import { Modal, Button, Header, Radio, Image, Grid } from "semantic-ui-react";
import {
  Form,
  Input,
  Dropdown,
  TextArea,
} from "semantic-ui-react-form-validator";
import { FormGroup, Label } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import { EDIT_HERD, GET_USER_DETAIL } from "../Queries";
import { connect } from "../Context";
import { Provinces, fivestar } from "../config";
import { compress } from "../utils/compressFile";
const EditHerdDialog = ({ context, closer }) => {
  const { state } = context;
  const {
    _id,
    age,
    type,
    color,
    weight,
    height,
    price,
    description,
    image,
  } = context.state.herd;
  const { province, sum_or_district, phone, State } = context.state.address;
  const { updateHerd, updateHerdAge, updateAddress, onFileChange } = context;
  const [editherd, { error, loading }] = useMutation(EDIT_HERD);
  const InputRef = React.useRef();
  const HandleSubmit = async () => {
    if (!state.isAuth || localStorage.getItem("token") === null) {
      return alert("cannot edit");
    }
    let compressedImage = null;
    if (state.image.path !== null) {
      try {
        compressedImage = await compress(state.image.path);
      } catch (e) {
        console.log(e);
      }
    }
    console.log("editing ?");
    editherd(
      {
        variables: {
          targetID: _id,
          herdType: type,
          weight: parseInt(weight, 10),
          height: parseInt(height, 10),
          color,
          price: parseInt(price, 10),
          age,
          description,
          image: compressedImage,
        },
      },
      {
        refetchQueries: () => [
          GET_USER_DETAIL,
          { variables: { userID: context.state.user.id } },
        ],
      }
    )
      .then(() => {
        closer();
      })
      .then(() => window.location.reload())
      .catch((e) => console.log(e));
  };
  const handleChangeHerd = (e, { name, value }) => {
    updateHerd(name, value);
  };
  const handleChangeRatio = (e, { value }) => {
    updateHerdAge(value);
  };
  const handleChangeAddress = (e, { name, value }) => {
    updateAddress(name, value);
  };

  return (
    <>
      <Modal.Header>Өөрчлөх</Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <Header>Энэ бол </Header>
          <Form
            id="EDIT_HERD"
            onSubmit={(e) => {
              e.persist();
              HandleSubmit();
            }}
          >
            <div>
              <Button
                content="зураг оруулах"
                color="yellow"
                labelPosition="left"
                icon="upload"
                floated="right"
                size="small"
                onClick={() => InputRef.current.click()}
              />
              <input
                type="file"
                ref={InputRef}
                hidden
                accept="image/*"
                onChange={onFileChange}
              />
            </div>
            <div
              style={{
                maxWidth: 670,
                maxHeight: 330,
                display: "flex",
                overflowY: "auto",
              }}
            >
              <Image src={image} />
              <Image src={state.image.preview} />
            </div>

            <Dropdown
              label="Төрөл"
              name="type"
              selection
              value={type}
              options={fivestar}
              placeholder="хонь үхэр гм"
              onChange={handleChangeHerd}
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
                  onChange={handleChangeRatio}
                />
              ))}
            </FormGroup>
            <Input
              placeholder="Жин оруулах..."
              name="weight"
              value={weight}
              labelPosition="right"
              onChange={handleChangeHerd}
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
              placeholder="Өндөр оруулах..."
              name="height"
              labelPosition="right"
              value={height}
              onChange={handleChangeHerd}
              validators={["isNumber", "minNumber:20", "maxNumber:3000"]}
              errorMessages={[
                "🔢 тоо оруулна уу",
                "😕",
                `😱 дэлхийн хамгийн өндөр ${type.toLowerCase()} гэж үү`,
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
              onChange={handleChangeHerd}
            />

            <Input
              name="price"
              type="text"
              value={price}
              onChange={handleChangeHerd}
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
              placeholder="Үнэ"
              labelPosition="left"
            >
              <Label basic>₮</Label>
              <input />
            </Input>
            <TextArea
              name="description"
              value={description}
              onChange={handleChangeHerd}
              placeholder="Дэлэгрэнгүй талбар"
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
          form="EDIT_HERD"
          type="submit"
        />
      </Modal.Actions>
    </>
  );
};
export default connect(EditHerdDialog);
/**   <Dropdown
              placeholder="Улс..."
              name="State"
              value={State}
              selection
              labelposition="right"
              onChange={handleChangeAddress}
              options={[{ key: "m", text: "🇲🇳 монгол", value: "MN" }]}
              validators={["required"]}
            ></Dropdown>
            <Dropdown
              placeholder="Аймаг"
              name="province"
              value={province}
              selection
              labelposition="right"
              onChange={handleChangeAddress}
              options={Provinces}
              validators={["required"]}
            ></Dropdown>
            {context.state.isAuth ? null : (
              <Input
                placeholder="утасны дугаар"
                name="phone"
                value={phone}
                onChange={handleChangeAddress}
                validators={["required", "isString"]}
                errorMessages={["жин оруулна уу", "🔢 тоо оруулна уу"]}
              >
                <input />
              </Input>
            )}

            <Input
              placeholder="Дүүрэг эсвэл сум"
              name="sum_or_district"
              value={sum_or_district}
              onChange={handleChangeAddress}
              validators={["required", "isString"]}
              errorMessages={[
                "жин оруулна уу",
                "🔢 тоо оруулна уу",
                "😕",
                `😱 дэлхийн хамгийн  гэж үү`,
              ]}
            /> */
