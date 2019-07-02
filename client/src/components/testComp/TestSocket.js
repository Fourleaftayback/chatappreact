import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import io from "socket.io-client";

function TestSocket({ user }) {
  const socket = io("localhost:5000");
  //socket.emit("create", "room1");
  socket.on("connect", function() {
    // call the server-side function 'adduser' and send one parameter (value of prompt)
    socket.emit("adduser", [user.user_name, user.id]);
  });
  // listener, whenever the server emits 'updatechat', this updates the chat body
  /*
  socket.on("updatechat", function(username, data) {
    
    $('#conversation').append('<b>'+username + ':</b> ' + data + '<br>');
    
  });
  // listener, whenever the server emits 'updateusers', this updates the username list
  socket.on("updateusers", function(data) {
    
		$('#users').empty();
		$.each(data, function(key, value) {
			$('#users').append('<div>' + key + '</div>');
    });
    
  });
  
  // on load of page
	$(function(){
		// when the client clicks SEND
		$('#datasend').click( function() {
			var message = $('#data').val();
			$('#data').val('');
			// tell server to execute 'sendchat' and send along one parameter
			socket.emit('sendchat', message);
		});

		// when the client hits ENTER on their keyboard
		$('#data').keypress(function(e) {
			if(e.which == 13) {
				$(this).blur();
				$('#datasend').focus().click();
			}
		});
	}); */
  return (
    <React.Fragment>
      <p>testing socket</p>
    </React.Fragment>
  );
}

TestSocket.propTypes = {
  user: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  user: state.auth.user
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestSocket);
