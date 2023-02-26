import { useEffect, useMemo } from "react";
import { setCredentials, logOut } from "../features/auth/authSlice";
import store from "./store";

const SERVER_HOST = "http://127.0.0.1:8000/";

export const refreshAccessToken = async () => {
  try {
    let response = await fetch(SERVER_HOST + "api/token/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: store.getState()?.auth?.refresh }),
    });
    let data = await response.json();
    if (response.status === 200) {
      store.dispatch(setCredentials(data));
    } else {
      store.dispatch(logOut());
    }
  } catch (error) {
    console.log(error);
  }
};

export const baseQuery = async (path) => {
  const token = store.getState()?.auth?.token;
  const refresh = store.getState()?.auth?.refresh;
  if (!token && refresh) {
    refreshAccessToken();
  }
  let response = await fetch(SERVER_HOST + path, {
    method: "GET",
    headers: token
      ? {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      : { "Content-Type": "application/json" },
  });
  let data = await response.json();
  if (response.status === 200) {
    return data;
  } else if (response.status === 401 && refresh) {
    refreshAccessToken();
  } else {
    throw data;
  }
};

export const baseMount = async (path, bodyData = {}) => {
  const token = store.getState()?.auth?.token;
  const refresh = store.getState()?.auth?.refresh;
  if (!token && refresh) {
    refreshAccessToken();
  }
  let response = await fetch(SERVER_HOST + path, {
    method: "POST",
    headers: token
      ? {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      : { "Content-Type": "application/json" },
    body: JSON.stringify(bodyData),
  });
  let data = await response.json();
  if (response.status >= 200 && response.status < 300) {
    return data;
  } else if (response.status === 401 && refresh) {
    refreshAccessToken();
  } else {
    throw data;
  }
};
// const useQuery = (path)=>{
//     const newData = useMemo(() => {
//       return baseQuery(path);
//     }, [path, oldData]);

//     useEffect(() => {
//       if (newUserData) dispatch(setUserData(newUserData));
//       console.log(newUserData);
//     }, [refreshToken, userData]);
// }
