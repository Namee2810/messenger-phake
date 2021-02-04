
import { notification } from 'antd';
import authenticateToken from 'global/functions/authenticateToken';
import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';

function PrivateRoute({ component: Component, ...rest }) {
  const token = authenticateToken(localStorage.getItem("token"));

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      localStorage.clear();
      notification.warning({
        message: "Phiên đăng nhập không hợp lệ, vui lòng đăng nhập lại"
      });
    };
  })

  return (
    <Route
      {...rest}
      render={(props) => token
        ? <Component {...props} />
        : <Redirect to="/" />}
    />
  )
}

export default PrivateRoute;