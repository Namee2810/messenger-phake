import { Col, notification, Row } from 'antd';
import loginAPI from "api/loginAPI";
import ChatLeftSide from 'components/ChatLeftSide';
import ChatMain from 'components/ChatMain';
import ChatRightSide from 'components/ChatRightSide';
import authenticateToken from 'global/functions/authenticateToken';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socket from "socket";
import { SET_USER } from 'store/slice';
import "./style.scss";


function ChatPage(props) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decoded = authenticateToken(token); // undefined or string
    if (decoded) {
      loginAPI.validate({ decoded })
        .then(res => {
          switch (res.code) {
            case 200: {
              dispatch(SET_USER({ uid: decoded.uid, fullname: decoded.fullname, email: decoded.email }))
              socket.emit("on", { fullname: decoded.fullname })
              break;
            }
            case 400: {
              localStorage.clear();
              notification.warning({
                message: "Phiên đăng nhập không hợp lệ, vui lòng đăng nhập lại!"
              })
              break;
            }
            default: {
              localStorage.clear();
              notification.warning({
                message: "Đã xảy ra lỗi, vui lòng đăng nhập lại!"
              })
            }
          }
        })
        .catch(err => {
          localStorage.clear();
          notification.warning({
            message: "Đã xảy ra lỗi, vui lòng đăng nhập lại!"
          })
        })
    }

  }, [dispatch])

  return (
    <div className="ChatPage">
      <Row>
        <Col span={5}><ChatLeftSide socket={socket} user={user} /></Col>
        <Col span={14}><ChatMain socket={socket} user={user} /></Col>
        <Col span={5}><ChatRightSide /></Col>
      </Row>
    </div>
  );
}

export default ChatPage;