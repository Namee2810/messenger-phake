import $ from "jquery";
import io from "socket.io-client";

const socket = io(process.env.REACT_APP_API_URL);

socket.on("sendMessage", data => handleSendMessage(data));
const handleSendMessage = (data) => {
  let uid = localStorage.getItem("uid").split("-")[0];
  let messages = $(".ChatMain_messages");
  let className = uid === data.uid ? "ChatMain_message_right" : "ChatMain_message_left";
  let avatarUrl = `https://ui-avatars.com/api/?background=random&name=${data.fullname}`;

  messages.append(`<div class="ChatMain_message ${className}">
  ${uid !== data.uid ? `<div class="ChatMain_message_avatar"><img src=${avatarUrl}/></div>` : ""}
  <div class="ChatMain_message_detail">${uid !== data.uid ? `<span>${data.fullname}</span>` : ""}
  <span><abbr title='${data.createTime}'>${data.message}</abbr></span>
  </div>
  </div>`);
  let message = $(".ChatMain_message").last();
  if (message.position().top + 100 > messages.height()) {
    messages.animate({ scrollTop: messages.prop('scrollHeight') }, 100);
  };
};

socket.on("off", user => handleDisconnect(user));
const handleDisconnect = (user) => {
  if (localStorage.getItem("uid")) {
    let messages = $(".ChatMain_messages");
    messages.append(`<div class="ChatMain_message ChatMain_message_noti">
      <span class="ChatMain_message_noti_left">${user.fullname} đã rời nhóm chat</span>
    </div>`);
    let message = $(".ChatMain_message").last();
    if (message.position().top + 100 > messages.height()) {
      messages.animate({ scrollTop: messages.prop('scrollHeight') }, 100);
    };
  }
}
socket.on("on", user => handleConnect(user));
const handleConnect = (user) => {
  if (localStorage.getItem("uid")) {
    let messages = $(".ChatMain_messages");
    messages.append(`<div class="ChatMain_message ChatMain_message_noti">
      <span class="ChatMain_message_noti_join">${user.fullname} đã tham gia nhóm chat</span>
    </div>`);
    let message = $(".ChatMain_message").last();
    if (message.position().top + 100 > messages.height()) {
      messages.animate({ scrollTop: messages.prop('scrollHeight') }, 100);
    };
  }
}
socket.on("online", online => handleOnline(online));
const handleOnline = (online) => {
  if (localStorage.getItem("uid")) {
    let e = $(".ChatMain_messages_online");
    e.text(`Đang online: ${online}`);
  }
}

export default socket;