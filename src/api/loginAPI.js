const { default: axiosClient } = require("./axiosClient");

const loginAPI = {
  login: (params) => {
    const url = "/login";
    return axiosClient.post(url, params);
  },
  signup: (params) => {
    const url = "/signup";
    return axiosClient.post(url, params);
  },
  validate: (params) => {
    const url = "/validate";
    return axiosClient.post(url, params);
  },
};

export default loginAPI;