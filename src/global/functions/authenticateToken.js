const jwt = require("jsonwebtoken");
function authenticateToken(token) {
  let user = "";
  jwt.verify(token, process.env.REACT_APP_SECRET_KEY, (err, decoded) => {
    user = decoded;
  });
  return user
};
export default authenticateToken;