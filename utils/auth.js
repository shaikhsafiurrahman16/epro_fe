import Cookies from "js-cookie";

export const getToken = () => {
  return Cookies.get("token"); 
};

export const getUser = () => {
  return Cookies.get("user"); 
};
