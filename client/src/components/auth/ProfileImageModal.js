import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Modal, ModalHeader, ModalBody, Button, Form } from "reactstrap";
import { toggle } from "../../redux/actions/viewsActions";

const ProfileImageModal = ({ profileImageModalIsOpen, toggle }) => {
  const onSubmit = e => {
    console.log("profile image function clicked");
  };
  const toggleModal = () => {
    toggle("profileimage");
  };
  return (
    <React.Fragment>
      <Modal isOpen={profileImageModalIsOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Profile Image</ModalHeader>
        <ModalBody className="mt-3">
          <Form>
            <Button color="info" block={true} onClick={onSubmit}>
              Upload
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

ProfileImageModal.propTypes = {
  errors: PropTypes.object.isRequired,
  profileImageModalIsOpen: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  profileImageModalIsOpen: state.views.profileImageModalIsOpen
});

const mapDispatchToProps = {
  toggle: toggle
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileImageModal);
