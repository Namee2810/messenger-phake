import ChatForm from 'components/Form/ChatForm';
import React from 'react';
import "./style.scss";

function ChatMain(props) {
  const { socket, user } = props;

  return (
    <div className="ChatMain">
      <div className="ChatMain_messages">
        <div className="ChatMain_messages_online" />
      </div>
      <div className="ChatMain_input"><ChatForm socket={socket} user={user} /></div>
    </div>
  );
}

export default ChatMain;