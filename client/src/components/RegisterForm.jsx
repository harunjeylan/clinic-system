import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Alert,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import { register } from "../app/userApi";
import { logOut, setCredentials } from "../features/auth/authSlice";
const RegisterForm = () => {
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

  const checkoutSchema = Yup.object().shape({
    first_name: Yup.string().required("required"),
    last_name: Yup.string().required("required"),
    username: Yup.string().required("required"),
    // sex: Yup.string().required("required"),
    // birthday: Yup.date().required("required"),
    password: Yup.string()
      .required("required")
      .matches(
        /(?=.*[a-z])/,
        "The string must contain at least 1 lowercase alphabetical character"
      )
      // .matches(
      //   /(?=.*[A-Z])/,
      //   "The string must contain at least 1 uppercase alphabetical character"
      // )
      .matches(
        /(?=.*[0-9])/,
        "The string must contain at least 1 numeric character"
      )
      .matches(
        /(?=.*[!@#%^&*<>/_?,.:"'$%^&*)=+()])/,
        "The string must contain at least one special character, but we are escaping reserved RegEx characters to avoid conflict"
      )
      .matches(/(?=.{8,})/, "The string must be eight characters or longer"),
    password2: Yup.string()
      .required("required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      username: "",
      // sex: "",
      // birthday: new Date(),
      password: "",
      password2: "",
    },
    validationSchema: checkoutSchema,
    onSubmit: () => console.log("submited"),
  });
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    register({ ...formik.values })
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
          variant="standard"
          type="text"
          label="First Name"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.first_name}
          name={"first_name"}
          error={!!formik.touched.first_name && !!formik.errors.first_name}
          helperText={formik.touched.first_name && formik.errors.first_name}
        />
        <TextField
          fullWidth
          variant="standard"
          type="text"
          label="Last Name"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.last_name}
          name={"last_name"}
          error={!!formik.touched.last_name && !!formik.errors.last_name}
          helperText={formik.touched.last_name && formik.errors.last_name}
        />
        <TextField
          fullWidth
          variant="standard"
          type="username"
          label="Username"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.username}
          name={"username"}
          error={!!formik.touched.username && !!formik.errors.username}
          helperText={formik.touched.username && formik.errors.username}
        />
        {/* <FormControl variant="standard">
          <InputLabel id="sex-select-label">Sex</InputLabel>
          <Select
            labelId="sex-select-label"
            id="sex-select"
            label="Sex"
            name={"sex"}
            value={formik.values.sex}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={!!formik.touched.sex && !!formik.errors.sex}
            helperText={formik.touched.sex && formik.errors.sex}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="male">Male</MenuItem>
          </Select>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Birthday"
            inputFormat="MM/DD/YYYY"
            openTo="year"
            views={["year", "month", "day"]}
            value={formik.values.birthday}
            onChange={(newValue) => formik.setFieldValue("birthday", newValue)}
            renderInput={(params) => (
              <TextField
                fullWidth
                variant="standard"
                onBlur={formik.handleBlur}
                name={"birthday"}
                error={!!formik.touched.birthday && !!formik.errors.birthday}
                helperText={formik.touched.birthday && formik.errors.birthday}
                {...params}
              />
            )}
          />
        </LocalizationProvider> */}
        <TextField
          fullWidth
          variant="standard"
          type="password"
          label="new Password"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.password}
          name={"password"}
          error={!!formik.touched.password && !!formik.errors.password}
          helperText={formik.touched.password && formik.errors.password}
        />
        <TextField
          fullWidth
          variant="standard"
          type="password"
          label="Password Confirmation"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.password2}
          name={"password2"}
          error={!!formik.touched.password2 && !!formik.errors.password2}
          helperText={formik.touched.password2 && formik.errors.password2}
        />
        <Box>
          <Button
            type="submit"
            variant="outlined"
            size="medium"
            color="secondary"
            className=""
          >
            Register
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default RegisterForm;
