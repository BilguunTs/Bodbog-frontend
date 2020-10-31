import React from "react";
import { Form } from "semantic-ui-react-form-validator";
import { connect } from "../Context";
export const withForm = formType => Input => {
  return class FormWrap extends React.Component {
    render() {
      return (
        <Form
          name={formType}
          onSubmit={async e => {
            e.persist();
            this.props.context.openModal("address");
          }}
        >
          <Input {...this.props} targetForm={formType} />
        </Form>
      );
    }
  };
};
