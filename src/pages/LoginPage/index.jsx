import LoginForm from 'components/Form/LoginForm';
import SignupForm from 'components/Form/SignupForm';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import "./style.scss";

function LoginPage(props) {
  return (
    <div className="LoginPage">
      <h1 className="LoginPage_header">Messenger Phakè</h1>
      <div className="LoginPage_main">
        <Switch>
          <Route exact path="/">
            <LoginForm />
          </Route>
          <Route exact path="/signup">
            <SignupForm />
          </Route>
        </Switch>

        <span className="LoginForm_bubble" />
        <span className="LoginForm_bubble" />
      </div>

    </div>
  );
}

export default LoginPage;