import React from 'react';
import { Link } from 'react-router-dom';
import "./style.scss";

function PageNotFound(props) {
  return (
    <div className="PageNotFound">
      <p>Opps !!!<br />Trang không tồn tại 😢</p>
      <Link to="/"><button className="button button__animation">Trang chủ</button></Link>
    </div >
  );
}

export default PageNotFound;