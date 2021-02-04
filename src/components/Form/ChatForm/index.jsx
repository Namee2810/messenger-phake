import { SendOutlined } from "@ant-design/icons";
import $ from "jquery";
import React from 'react';
import { useForm } from "react-hook-form";
import "./style.scss";

function ChatForm(props) {
  const { register, handleSubmit } = useForm();
  const { socket, user } = props;

  const onSubmit = (data, e) => {
    let now = new Date();
    $("#ChatForm_input").val("");
    socket.emit("sendMessage", { uid: user.uid, fullname: user.fullname, message: data.message, createTime: now.toLocaleString('vi-VN') })
  }

  return (
    <div className="ChatForm">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <input className="ChatForm_input"
          id="ChatForm_input"
          name="message"
          type="text"
          placeholder="Aa"
          ref={register({
            required: true,
          })}
        />
        <SendOutlined className="ChatForm_send" onClick={handleSubmit(onSubmit)} />
      </form>
    </div>
  );
}

export default ChatForm;