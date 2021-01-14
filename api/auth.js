import axios from "axios";

const BASE_URL = "http://192.168.1.2:3000/api/v1/users";

const login = async (email, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${BASE_URL}/login`,
      data: { email, password },
    });
    if (res.data.status === "success") {
      return {
        status: res.data.status,
        user: res.data.user,
        token: res.data.token,
      };
    }
  } catch (err) {
    console.log(err);
    return {
      status: "fail",
    };
  }
};

const signup = async (name, email, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${BASE_URL}/signup`,
      data: { name, email, password, passwordConfirm },
    });
    if (res.data.status === "success") {
      return {
        status: res.data.status,
        user: res.data.user,
        token: res.data.token,
      };
    }
  } catch (err) {
    console.log(err);
    return {
      status: "fail",
    };
  }
};

export default {
  login,
  signup,
};
