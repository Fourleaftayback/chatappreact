import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "reactstrap";
import history from "../../history/History";
import NewChatButton from "../buttons/NewChatButton";
import ProfileImageModal from "../auth/ProfileImageModal";
import ChatList from "../list/ChatList";

const ExistingChats = ({ currentChats, user, joinExistingRoom }) => {
  return (
    <React.Fragment>
      <Row>
        <Col xs={{ size: 2, order: 2, offset: 9 }}>
          <NewChatButton
            onClick={() => history.push("/createchat")}
            iconType="fab fa-rocketchat fa-2x icon-button fixed-button"
            tooltipContainer="tooltip-right"
            tooltipClass="tooltip-right-text"
            toolTipText="New Chat"
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col sm={{ size: 6, order: 2, offset: 3 }}>
          <ChatList
            chatList={currentChats}
            userId={user.id}
            onClick={joinExistingRoom}
          />
        </Col>
      </Row>

      <ProfileImageModal />
    </React.Fragment>
  );
};
ExistingChats.propTypes = {
  user: PropTypes.object.isRequired,
  currentChats: PropTypes.array.isRequired,
  joinExistingRoom: PropTypes.func.isRequired
};

export default ExistingChats;
