import React, { Component } from "react";
import { Modal } from "semantic-ui-react";
import { connect } from "../Context";
import { DELETE_HERD } from "../Queries/deleteRq";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { PathChoice } from "./PathChoice";
import HerdSubmitionDialog from "./HerdSubmitionDialog";
import PurchaseDialog from "./PurchaseDialog";
import EditHerd from "./EditHerd";
import EditAddress from "./EditAddress";
import DeleteHerd from "./DeleteHerd";
import EditProfile from "./EditProfile";
import { useMutation } from "@apollo/react-hooks";

const GlobalDialog = (props) => {
  const [removeHerd] = useMutation(DELETE_HERD);
  const { state, closeModal, openModal } = props.context;
  const Token = localStorage.getItem("token");
  const [step, setStep] = React.useState(0);
  const triggerNext = () => {
    setStep(step + 1);
  };
  const { accesslevel, ...rest } = state.herd;

  const triggerPre = () => {
    if (step === 0) return 0;
    setStep(step - 1);
  };
  const handleClose = () => {
    setStep(0);
    closeModal();
  };
  React.useEffect(() => {
    if (Token || state.isAuth) {
      setStep(1);
    }
  }, [Token]);

  const switchedModal = () => {
    let instance;
    switch (state.modal.type) {
      case "address":
        instance = <HerdSubmitionDialog closer={handleClose} />;
        break;
      case "purchase":
        instance = <PurchaseDialog closer={handleClose} />;
        break;
      case "editherd":
        instance = <EditHerd closer={handleClose} />;
        break;
      case "EDIT_PROFILE":
        instance = <EditProfile closer={handleClose} />;
        break;
      case "EDIT_ADDRESS":
        instance = <EditAddress closer={handleClose} />;
        break;
      case "DELETE_HERD":
        instance = <DeleteHerd closer={handleClose} />;
        break;
      default:
        break;
    }
    return (
      <Modal
        dimmer="blurring"
        open={state.modal.isOn}
        size="small"
        closeOnDimmerClick={false}
        onClose={closeModal.bind(this)}
      >
        {instance}
      </Modal>
    );
  };
  const renderModal = () => {
    if (Token === null || state.isAuth === false) {
      if (state.modal.type === "address") {
        return (
          <Modal
            open={state.modal.isOn}
            size="small"
            basic
            closeOnDimmerClick={false}
            onClose={closeModal.bind(this)}
          >
            {step === 0 ? (
              <PathChoice closer={closeModal} next={triggerNext} />
            ) : (
              switchedModal()
            )}
          </Modal>
        );
      }
      return switchedModal();
    }

    return switchedModal();
  };
  return <div>{renderModal()}</div>;
};

export default connect(GlobalDialog);
/**
 *  <Modal
        open={state.modal.isOn}
        size="small"
        closeOnDimmerClick={false}
        onClose={closeModal.bind(this)}
      >
        {switchedModal()}
      </Modal>
 */
