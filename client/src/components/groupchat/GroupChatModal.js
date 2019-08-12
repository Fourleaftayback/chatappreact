import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { toggle } from "../../redux/actions/viewsActions";
import { createGroup } from "../../redux/actions/messageActions";

import FormItem from "../form/FormItem";

import { Modal, ModalHeader, ModalBody, Button, Form } from "reactstrap";

const GroupChatModal = ({
  errors,
  groupChatModalIsOpen,
  toggle,
  groupList,
  createGroup
}) => {
  const [chatName, setChatName] = useState("");
  const toggleModal = () => {
    toggle("groupchatcreator");
  };

  const createGroupChat = () => {
    let data = {
      chat_name: chatName,
      userList: groupList
    };
    createGroup(data);
  };

  return (
    <React.Fragment>
      <Modal isOpen={groupChatModalIsOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Group Name</ModalHeader>
        <ModalBody className="mt-3">
          <Form>
            <FormItem
              type="text"
              name="chat_name"
              placeholder="Group Name"
              value={chatName}
              error={errors.chat_name}
              onChange={e => setChatName(e.target.value)}
            />
            <Button
              className="cus-button-blue mt-2 mb-1"
              block={true}
              onClick={createGroupChat}>
              Create Group
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

GroupChatModal.propTypes = {
  errors: PropTypes.object.isRequired,
  groupChatModalIsOpen: PropTypes.bool.isRequired,
  groupList: PropTypes.array.isRequired,
  createGroup: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  errors: state.errors,
  groupChatModalIsOpen: state.views.groupChatModalIsOpen
});

const mapDispatchToProps = {
  toggle: toggle,
  createGroup: createGroup
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupChatModal);
