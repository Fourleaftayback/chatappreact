import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";

import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

import ProfileImage from "../common/ProfileImage";
import { uploadProfileImage } from "../../redux/actions/authActions";
import { toggle } from "../../redux/actions/viewsActions";

const ProfileImageModal = ({
  errors,
  profileImageModalIsOpen,
  toggle,
  user,
  uploadProfileImage
}) => {
  const [image, setImage] = useState(null);

  const onSubmit = e => {
    const formData = new FormData();
    formData.append("image", image);
    uploadProfileImage(formData);
  };

  const changeImage = e => {
    setImage(e.target.files[0]);
  };

  const toggleModal = () => {
    toggle("profileimage");
  };

  return (
    <React.Fragment>
      <Modal isOpen={profileImageModalIsOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          {user.profile_image_url === undefined ||
          user.profile_image_url === "" ? (
            <i className="fas fa-user-circle fa-3x" />
          ) : (
            <ProfileImage imageUrl={user.profile_image_url} size="4rem" />
          )}
        </ModalHeader>
        <ModalBody className="mt-3">
          <Form>
            <FormGroup>
              <Label>Profile Image</Label>
              <Input
                type="file"
                name="image"
                className={classnames("form-control", {
                  "is-invalid": errors.image
                })}
                onChange={changeImage}
              />
              {errors.image && (
                <div className="invalid-feedback">{errors.image}</div>
              )}
            </FormGroup>
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
  profileImageModalIsOpen: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  uploadProfileImage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  errors: state.errors,
  profileImageModalIsOpen: state.views.profileImageModalIsOpen
});

const mapDispatchToProps = {
  toggle: toggle,
  uploadProfileImage: uploadProfileImage
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileImageModal);
