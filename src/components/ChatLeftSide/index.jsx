import { PoweroffOutlined } from "@ant-design/icons";
import { notification } from "antd";
import React from 'react';
import { useHistory } from "react-router-dom";
import "./style.scss";

function ChatLeftSide(props) {
  let history = useHistory();
  const { user, socket } = props;
  const avatarUrl = `https://ui-avatars.com/api/?background=random&name=${user.fullname}`

  const handleClickSignout = () => {
    localStorage.clear();
    socket.emit("off", { fullname: user.fullname })
    history.push("/");
    notification.info({
      message: "Bạn đã đăng xuất!"
    })
  }

  return (
    <div className="ChatLeftSide">
      <h1>Chat
        <img src="https://res.cloudinary.com/db2nhrkkl/hoadao.webp" alt=""
          style={{ width: "48px", position: "absolute", top: "5px" }} />
      </h1>
      <div className="ChatLeftSide_item">
        <img src={avatarUrl} alt="Avatar" className="ChatLeftSide_item_icon" />
        <span className="ChatLeftSide_item_title">{user.fullname}</span>
      </div>
      <div className="ChatLeftSide_item" style={{ background: "red", color: "white" }}
        onClick={handleClickSignout}
      >
        <PoweroffOutlined className="ChatLeftSide_item_icon" />
        <span className="ChatLeftSide_item_title"> Đăng xuất</span>
      </div>
    </div>
  );
}

export default ChatLeftSide;