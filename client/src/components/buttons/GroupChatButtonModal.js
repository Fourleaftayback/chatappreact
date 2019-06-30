import React from "react";
import PropTypes from "prop-types";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";

import FormItem from "../form/FormItem";

const GroupChatButtonModal = ({ toggle, isOpen }) => {
  const toggleModal = () => {
    toggle("groupchatcreator");
  };
  return (
    <React.Fragment>
      <Button outline color="primary" onClick={toggleModal}>
        <i className="fas fa-users fa-lg" />
      </Button>
      <Modal isOpen={isOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          <FormItem
            type="text"
            name="search"
            placeholder="search user"
            value={""}
            error={""}
            onChange={() => console.log("changing")}
          />
        </ModalHeader>
        <ModalBody className="mt-1">
          <br />
          list of users here
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

GroupChatButtonModal.propTypes = {
  toggle: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired
};

export default GroupChatButtonModal;
