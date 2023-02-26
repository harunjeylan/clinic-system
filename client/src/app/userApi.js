import { baseQuery, baseMount } from "./baseUrl";

export const getUser = () => {
  return baseQuery("user/profile/");
};
export const login = (data) => {
  return baseMount("api/token/", data);
};
export const register = async (formData) => {
  return baseMount("user/register/", formData);
};
