import React from "react";
import { Modal, Button, Header } from "semantic-ui-react";
import AddressForm from "../components/AddressFrom";
import { useMutation } from "@apollo/react-hooks";
import { ADD_HERD, ADD_TEMPR, GET_HERD } from "../Queries";
import { connect } from "../Context";
import { compress } from "../utils/compressFile";
const HerdSubmitionDialog = ({ context, closer }) => {
  const { state, clearHerd } = context;
  const { accesslevel, ads_type, ...rest } = state.herd;

  /*const [addTempr, { error: erratTEMPR, loading: loadingTEMPR }] = useMutation(
    ADD_TEMPR
  );*/
  const [addHerd, { loading }] = useMutation(ADD_HERD);

  const HandleSubmit = async () => {
    if (!state.isAuth || localStorage.getItem("token") === null) {
      return;
      /*===============removing TEMPR================
      try {
        if (state.address.phone === "" || !state.address.phone) {
          return alert("Утасны дугаар ороогүй байна");
        }
        const tmpr = await addTempr({
          variables: {
            name: rest.type,
            price: parseInt(rest.price, 10),
            amount: parseInt(rest.amount, 10),
            description: rest.description || "test",
            phonenumber: parseInt(state.address.phone, 10),
            province: state.address.province,
          },
        });
        console.log(tmpr);
        return tmpr;
      } catch (e) {
        throw new Error(e);
      }*/
    } else {
      try {
        let compressedImage;
        if (state.image.path !== null) {
          compressedImage = await compress(state.image.path);
        }
        const herd = await addHerd({
          variables: {
            type: rest.type,
            price: parseInt(rest.price, 10),
            weight: parseInt(rest.weight, 10),
            height: parseInt(rest.height, 10),
            color: rest.color,
            age: parseInt(rest.age, 10),
            description: rest.description,
            img: compressedImage,
            amount: parseInt(rest.amount, 10),
            province: state.address.province,
            ads_type,
            sum: state.address.sum_or_district,
          },
          refetchQueries: [{ query: GET_HERD }],
        })
          .then(() => clearHerd())
          .then(() => closer())
          .finally(() => window.location.reload());

        return herd;
      } catch (e) {
        throw Error(e);
      }
    }
  };
  return (
    <>
      {ads_type === "ON_SELL" ? (
        <Modal.Header>
          Таны 👉 <a style={{ color: "orange" }}> {rest.type || "барааг"}</a> 👈
          хаанаас авч болох вэ ❔
        </Modal.Header>
      ) : (
        <Modal.Header>Хаяг байршил</Modal.Header>
      )}
      <Modal.Content image>
        <Modal.Description>
          <Header>Та хаяг байршил аа оруулна уу</Header>
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
          loading={loading}
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
