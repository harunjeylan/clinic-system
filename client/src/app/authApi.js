import {setCredentials,logOut} from '../features/auth/authSlice'

export const refreshAccessToken = async () => {
  let response = await fetch(
    "http://127.0.0.1:8000/token/refresh/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: store.getState().auth.refresh }),
    }
  );
  let data = await response.json();

  if (response.status === 200) {
    store.dispatch(setCredentials(data));
  } else {
    store.dispatch(logOut());
  }
};

