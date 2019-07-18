import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";

import { getAllUsers } from "../../redux/actions/userListAction";
import { setActiveChat } from "../../redux/actions/messageActions";

import UserList from "../list/UserList";

const AddGroupMember = ({
  toggleModal,
  modalIsOpen,
  existingMember,
  getAllUsers,
  allUsers,
  socket,
  activeChatRoom,
  setActiveChat
}) => {
  const [membersIds, setMemberIds] = useState([]);
  const [otherUsers, setOtherUsers] = useState([]);

  const userSelect = id => {
    let newArr = otherUsers.map(item => {
      if (item._id === id) {
        item.isSelected = !item.isSelected;
      }
      return item;
    });
    setOtherUsers(newArr);
  };

  const addUsers = () => {
    let users = otherUsers.filter(item => item.isSelected);
    let data = {
      roomId: activeChatRoom._id,
      users: users
    };
    socket.emit("addGroupMemebers", data);
  };
  useEffect(() => {
    socket.on("updateGroup", data => {
      toggleModal();
      setActiveChat(data);
    });
  }, []);
  useEffect(() => {
    let ids = existingMember.map(item => item._id);
    setMemberIds(ids);
  }, [existingMember]);

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  useEffect(() => {
    let filteredUsers = allUsers
      .filter(item => !membersIds.includes(item._id))
      .map(item => {
        item.isSelected = false;
        return item;
      });
    setOtherUsers(filteredUsers);
  }, [allUsers, membersIds]);

  return (
    <React.Fragment>
      <Button color="primary" outline onClick={toggleModal}>
        Add New Member
      </Button>
      <Modal isOpen={modalIsOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Add New Member</ModalHeader>
        <ModalBody className="mt-3">
          <UserList userList={otherUsers} selectUser={userSelect} />
          <Button color="info" onClick={addUsers}>
            Add
          </Button>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};
AddGroupMember.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  modalIsOpen: PropTypes.bool.isRequired,
  existingMember: PropTypes.array.isRequired,
  allUsers: PropTypes.array.isRequired,
  socket: PropTypes.object.isRequired,
  activeChatRoom: PropTypes.object.isRequired,
  setActiveChat: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  allUsers: state.users.userList,
  activeChatRoom: state.messages.activeChatRoom
});

const mapDispatchToProps = {
  getAllUsers: getAllUsers,
  setActiveChat: setActiveChat
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddGroupMember);
