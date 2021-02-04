import { EyeInvisibleOutlined, EyeOutlined, LoadingOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { notification } from "antd";
import loginAPI from "api/loginAPI";
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import "./style.scss";

function LoginForm(props) {
  const { register, handleSubmit, errors } = useForm();
  const [eye, setEye] = useState(false);
  const [logging, setLogging] = useState(false);
  let history = useHistory();

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

  const handleClickEye = () => {
    setEye(!eye);
  }
  const onSubmit = (data, e) => {
    setLogging(true);
    loginAPI.login({ email: data.email, password: data.password })
      .then(res => {
        switch (res.code) {
          case 200: {
            notification.success({
              message: "Đăng nhập thành công!"
            });
            localStorage.setItem("token", res.token);
            localStorage.setItem("uid", res.uid);
            history.push("/chat");
            break;
          }
          case 201: {
            notification.error({
              message: "Email hoặc mật khẩu không chính xác!"
            });
            break;
          }
          case 202: {
            notification.error({
              message: "Email chưa được xác minh, hãy kiểm tra hòm thư!"
            });
            break;
          }
          case 400: {
            notification.error({
              message: "Lỗi đăng nhập!"
            });
            break;
          }
          default: {
            notification.error({
              message: "Lỗi không xác định!"
            });
          }
        }
        setLogging(false);
      });
  }

  return (
    <div className="LoginForm">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="form_control">
          <MailOutlined />
          <input className="form_input"
            name="email"
            type="email"
            placeholder="Email"
            ref={register({
              required: true,
              pattern: {
                //eslint-disable-next-line
                value: /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/,
                message: "Email không hợp lệ !"
              }
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

          <span style={{ cursor: "pointer" }} onClick={handleClickEye}>
            {eye ? <EyeOutlined /> : <EyeInvisibleOutlined />}
          </span>
          {errors.password && <span className="form_error">
            {errors.password.message ? errors.password.message : "Vui lòng nhập mật khẩu!"}
          </span>}
        </div>
        <button type="submit" className="form_submit">
          {logging ? <LoadingOutlined /> : "Đăng nhập"}
        </button>
        <div style={{ marginTop: "20px", fontSize: "16px", textAlign: "center" }}>
          Chưa có tài khoản? <Link to="/signup">Đăng kí ngay</Link>
        </div>
      </form>
    </div >
  );
}

export default LoginForm;