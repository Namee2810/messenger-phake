import 'antd/dist/antd.css';
import Loading from 'components/Loading';
import PrivateRoute from 'components/routes/PrivateRoute';
import PublicRoute from "components/routes/PublicRoute";
import "global/style.scss";
import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

const LoginPage = React.lazy(() => import("pages/LoginPage"));
const PageNotFound = React.lazy(() => import("pages/PageNotFound"));
const ChatPage = React.lazy(() => import("pages/ChatPage"));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<Loading />}>
        <Router>
          <Switch>
            <PublicRoute component={LoginPage} exact path="/" />
            <PublicRoute component={LoginPage} exact path="/signup" />
            <PrivateRoute component={ChatPage} exact path="/chat" />
            <Route path="*">
              <PageNotFound />
            </Route>
          </Switch>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
