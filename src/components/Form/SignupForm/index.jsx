import { EyeInvisibleOutlined, EyeOutlined, LeftOutlined, LoadingOutlined, LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { notification } from "antd";
import loginAPI from "api/loginAPI";
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import "./style.scss";

const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
  regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  regexFullname = /^[[A-Z]|[a-z]][[A-Z]|[a-z]|\\d|[_]]{7,29}$/;

function SignupForm(props) {
  let history = useHistory();
  const { register, handleSubmit, errors } = useForm();
  const [logging, setLogging] = useState(false);

  const [eye, setEye] = useState(false);
  const [eye2, setEye2] = useState(false);

  useEffect(() => {
    let form_control = document.getElementsByClassName("form_control");
    let form_input = document.getElementsByClassName("form_input");
    for (let i = 0; i < form_control.length; i++) {
      form_input[i].onfocus = () => {
        form_control[i].classList.add("form_control-focus");
      }
      form_input[i].onblur = () => {
        form_control[i].classList.remove("form_control-focus");
      }
    }
  }, []);
  const onSubmit = (data, e) => {
    if (!regexFullname.test(data.fullname)) {
      notification.error({
        message: 'Tên không hợp lệ',
      });
    }
    else if (!regexEmail.test(data.email)) {
      notification.error({
        message: 'Email không hợp lệ',
      });
    }
    else if (!regexPassword.test(data.password)) {
      notification.error({
        message: 'Mật khẩu cần tối thiểu 8 kí tự bao gồm chữ in hoa, chữ thường và số',
      });
      e.target[2].value = "";
      e.target[3].value = "";
    }
    else if (data.password !== data.repassword) {
      notification.error({
        message: 'Mật khẩu nhập lại không khớp',
      });
      e.target[2].value = "";
      e.target[3].value = "";
    }
    else {
      setLogging(true);
      loginAPI.signup({ fullname: data.fullname, email: data.email, password: data.password })
        .then(res => {
          switch (res.code) {
            case 200: {
              notification.success({
                message: `Một email xác minh đã được gửi tới ${data.email}!`
              })
              history.push("/");
              setLogging(false);
              break;
            }
            case 400: {
              notification.error({
                message: "Email đã được đăng kí!"
              })
              e.target[1].value = "";
              setLogging(false);
              break;
            }
            case 401: {
              notification.error({
                message: "Lỗi truy vấn!"
              })
              setLogging(false);
              break;
            }
            case 402: {
              notification.error({
                message: "Lỗi gửi email xác nhận!"
              })
              setLogging(false);
              break;
            }

            default: {
              notification.error({
                message: "Lỗi không xác định, vui lòng thử lại sau!"
              })
              console.log(res.message);
              setLogging(false);
              break;
            }
          }
        })
        .catch(err => {
          console.log(err);
          setLogging(false);
        })
    }
  }

  return (
    <div className="SignupForm">
      <Link to="/">
        <span className="SignupForm_back"><LeftOutlined /></span>
      </Link>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="form_control">
          <UserOutlined />
          <input className="form_input"
            name="fullname"
            type="text"
            placeholder="Tên đầy đủ"
            ref={register({
              required: true,
            })}
          />
          {errors.fullname && <span className="form_error">
            {errors.fullname.message ? errors.fullname.message : "Vui lòng nhập tên đầy đủ !"}
          </span>}
        </div>
        <div className="form_control">
          <MailOutlined />
          <input className="form_input"
            name="email"
            type="email"
            placeholder="Email"
            ref={register({
              required: true,
            })}
          />
          {errors.email && <span className="form_error">
            {errors.email.message ? errors.email.message : "Vui lòng nhập email !"}
          </span>}
        </div>
        <div className="form_control">
          <LockOutlined />
          <input className="form_input"
            name="password"
            type={eye ? "text" : "password"}
            placeholder="Mật khẩu"
            ref={register({
              required: true,
              minLength: {
                value: 8,
                message: "Mật khẩu cần tối thiểu 8 kí tự!"
              }
            })}
          />

          <span style={{ cursor: "pointer" }} onClick={() => setEye(!eye)}>
            {eye ? <EyeOutlined /> : <EyeInvisibleOutlined />}
          </span>
          {errors.password && <span className="form_error">
            {errors.password.message ? errors.password.message : "Vui lòng nhập mật khẩu!"}
          </span>}
        </div>
        <div className="form_control">
          <LockOutlined />
          <input className="form_input"
            name="repassword"
            type={eye2 ? "text" : "password"}
            placeholder="Nhập lại mật khẩu"
            ref={register({
              required: true,
              minLength: {
                value: 8,
                message: "Mật khẩu cần tối thiểu 8 kí tự!"
              }
            })}
          />

          <span style={{ cursor: "pointer" }} onClick={() => setEye2(!eye2)}>
            {eye2 ? <EyeOutlined /> : <EyeInvisibleOutlined />}
          </span>
          {errors.repassword && <span className="form_error">
            {errors.repassword.message ? errors.repassword.message : "Vui lòng nhập lại mật khẩu!"}
          </span>}
        </div>
        <button type="submit" className="form_submit">
          {logging ? <LoadingOutlined /> : "Đăng kí"}
        </button>
      </form>
    </div >
  );
}

export default SignupForm;