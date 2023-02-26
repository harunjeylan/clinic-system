import React, { useState, useEffect, useRef } from "react";
import { Box, Alert, TextField, Button, Typography } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import { login } from "../app/userApi";
import { logOut, setCredentials } from "../features/auth/authSlice";
const LoginForm = () => {
  const userRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [errorMessage, setErrorMessage] = useState("");
  const accessToken = useSelector(selectCurrentToken);

  // useEffect(() => {
  //   // userRef.current.focus();
  // }, []);

  const loginSchema = Yup.object().shape({
    username: Yup.string().required("required"),
    password: Yup.string().required("required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: () => console.log("submited"),
  });
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(formik.values);
    login({ ...formik.values })
      .then((user) => {
        console.log(user);
        dispatch(setCredentials(user));
        setErrorMessage("");
        formik.resetForm();
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(err?.detail);
      });
  };

  return (
    <form onSubmit={handleFormSubmit} className="flex  flex-col gap-4 w-full">
      <Box className="flex flex-col gap-4 px-4 py-2 my-auto ">
        <Box>
          {errorMessage !== "" && (
            <Alert severity="error">{errorMessage}</Alert>
          )}
        </Box>
        <TextField
          fullWidth
          ref={userRef}
          variant="standard"
          type="username"
          label="User name"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.username}
          name={"username"}
          error={!!formik.touched.username && !!formik.errors.username}
          helperText={formik.touched.username && formik.errors.username}
        />
        <TextField
          fullWidth
          variant="standard"
          type="password"
          label="Password"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.password}
          name={"password"}
          error={!!formik.touched.password && !!formik.errors.password}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Box>
          <Button
            type="submit"
            variant="outlined"
            size="medium"
            color="secondary"
            className=""
          >
            Login
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default LoginForm;
