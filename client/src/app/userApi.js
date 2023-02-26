import { baseQuery, baseMount } from "./baseUrl";

export const getUser = () => {
  return baseQuery("user/profile/");
};
export const getUserDetails = (userId) => {
  return baseQuery(`user/profile/${userId}`);
};
export const login = (data) => {
  return baseMount("api/token/", data);
};
export const register = async (formData) => {
  return baseMount("user/register/", formData);
};
export const updateProfile = (formData) => {
  return baseMount("user/profile/update", formData);
};
