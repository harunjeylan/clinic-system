import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { getUser, getUserDetails, updateProfile } from "../../app/userApi";
import { useNavigate, useParams } from "react-router-dom";
import {
  Typography,
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
const UpdateUserInfo = () => {
  const [userDetails, setUserDetails] = useState({});
  const { userId } = useParams();
  const navigate = useNavigate();

  const checkoutSchema = Yup.object().shape({
    first_name: Yup.string().required("required"),
    last_name: Yup.string().required("required"),
    username: Yup.string().required("required"),
    phone_number: Yup.string().required("required"),
    sex: Yup.string().required("required"),
    birthday: Yup.date().required("required"),
    email: Yup.string(),
  });
  const initialValues = {
    user: userId,
    first_name: userDetails?.first_name ? userDetails?.first_name : "",
    last_name: userDetails?.last_name ? userDetails?.last_name : "",
    username: userDetails?.username ? userDetails?.username : "",
    email: userDetails?.email ? userDetails?.email : "",
    phone_number: userDetails.phone_number ? userDetails.phone_number : "",
    birthday: userDetails?.birthday ? userDetails?.birthday : new Date(),
    sex: userDetails?.sex ? userDetails?.sex : "",
    city: userDetails?.city ? userDetails?.city : "",
    state: userDetails?.state ? userDetails?.state : "",
    country: userDetails?.country ? userDetails?.country : "",
    position: userDetails?.position ? userDetails?.position : "",
    profession: userDetails?.profession ? userDetails?.profession : "",
  };

  const handleSubmit = (data) => {
    updateProfile({
      ...userDetails.user,
      ...data,
      birthday:
        typeof data?.birthday === "string"
          ? data?.birthday
          : data?.birthday?.format("YYYY-MM-DD"),
    })
      .then((res) => {
        console.log(res);
        navigate(`/employ/`);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const userForm = useFormik({
    initialValues,
    validationSchema: checkoutSchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    getUserDetails(userId)
      .then((newData) => {
        setUserDetails(newData.user);
        userForm.setFieldValue("user", userId);
        userForm.setFieldValue(
          "first_name",
          newData.user.first_name ? newData.user.first_name : ""
        );
        userForm.setFieldValue(
          "last_name",
          newData.user.last_name ? newData.user.last_name : ""
        );
        userForm.setFieldValue(
          "username",
          newData.user.username ? newData.user.username : ""
        );
        userForm.setFieldValue(
          "email",
          newData.user.email ? newData.user.email : ""
        );
        userForm.setFieldValue(
          "phone_number",
          newData.user.phone_number ? newData.user.phone_number : ""
        );
        userForm.setFieldValue(
          "birthday",
          newData.user.birthday ? newData.user.birthday : ""
        );
        userForm.setFieldValue("sex", newData.user.sex ? newData.user.sex : "");
        userForm.setFieldValue(
          "city",
          newData.user.city ? newData.user.city : ""
        );
        userForm.setFieldValue(
          "state",
          newData.user.state ? newData.user.state : ""
        );
        userForm.setFieldValue(
          "country",
          newData.user.country ? newData.user.country : ""
        );
        userForm.setFieldValue(
          "position",
          newData.user.position ? newData.user.position : ""
        );
        userForm.setFieldValue(
          "profession",
          newData.user.profession ? newData.user.profession : ""
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(userDetails);

  return (
    <form onSubmit={userForm.handleSubmit} className="py-4">
      <Box className="flex flex-col md:flex-row gap-4 px-4">
        <Box className="w-full flex flex-col gap-4">
          <Typography variant="h6" fontWeight={"bold"} className="py-2">
            Personal Information {userDetails.first_name}
          </Typography>
          <TextField
            fullWidth
            variant="standard"
            type="text"
            label="First Name"
            onBlur={userForm.handleBlur}
            onChange={userForm.handleChange}
            value={userForm.values.first_name}
            defaultValue={userDetails.first_name}
            name={"first_name"}
            error={
              !!userForm.touched.first_name && !!userForm.errors.first_name
            }
            helperText={
              userForm.touched.first_name && userForm.errors.first_name
            }
          />

          <TextField
            fullWidth
            variant="standard"
            type="text"
            label="Last Name"
            onBlur={userForm.handleBlur}
            onChange={userForm.handleChange}
            value={userForm.values.last_name}
            name={"last_name"}
            error={!!userForm.touched.last_name && !!userForm.errors.last_name}
            helperText={userForm.touched.last_name && userForm.errors.last_name}
          />
          <TextField
            fullWidth
            variant="standard"
            type="username"
            label="Username"
            onBlur={userForm.handleBlur}
            onChange={userForm.handleChange}
            value={userForm.values.username}
            name={"username"}
            error={!!userForm.touched.username && !!userForm.errors.username}
            helperText={userForm.touched.username && userForm.errors.username}
          />
          <TextField
            fullWidth
            variant="standard"
            type="email"
            label="Email"
            onBlur={userForm.handleBlur}
            onChange={userForm.handleChange}
            value={userForm.values.email}
            name={"email"}
            error={!!userForm.touched.email && !!userForm.errors.email}
            helperText={userForm.touched.email && userForm.errors.email}
          />
          <TextField
            fullWidth
            variant="standard"
            type="tel"
            label="Phone Number"
            onBlur={userForm.handleBlur}
            onChange={userForm.handleChange}
            value={userForm.values.phone_number}
            name={"phone_number"}
            error={
              !!userForm.touched.phone_number && !!userForm.errors.phone_number
            }
            helperText={
              userForm.touched.phone_number && userForm.errors.phone_number
            }
          />
          <FormControl fullWidth variant="standard">
            <InputLabel id="sex-select-label">Sex</InputLabel>
            <Select
              labelId="sex-select-label"
              id="sex-select"
              label="Sex"
              name={"sex"}
              value={userForm.values.sex ? userForm.values.sex : ""}
              onBlur={userForm.handleBlur}
              onChange={userForm.handleChange}
              error={!!userForm.touched.sex && !!userForm.errors.sex}
              helpertext={userForm.touched.sex && userForm.errors.sex}
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
              inputFormat="DD/MM/YYYY"
              openTo="year"
              views={["year", "month", "day"]}
              value={userForm.values.birthday}
              onChange={(newValue) =>
                userForm.setFieldValue("birthday", newValue)
              }
              renderInput={(params) => (
                <TextField
                  fullWidth
                  variant="standard"
                  onBlur={userForm.handleBlur}
                  error={
                    !!userForm.touched.birthday && !!userForm.errors.birthday
                  }
                  helpertext={
                    userForm.touched.birthday && userForm.errors.birthday
                  }
                  name={"birthday"}
                  {...params}
                />
              )}
            />
          </LocalizationProvider>
        </Box>
        <Box className="w-full flex flex-col gap-4">
          <Typography variant="h6" fontWeight={"bold"} className="py-2">
            Address
          </Typography>
          <TextField
            fullWidth
            variant="standard"
            type="city"
            label="City"
            onBlur={userForm.handleBlur}
            onChange={userForm.handleChange}
            value={userForm.values.city}
            name={"city"}
            error={!!userForm.touched.city && !!userForm.errors.city}
            helperText={userForm.touched.city && userForm.errors.city}
          />
          <TextField
            fullWidth
            variant="standard"
            type="state"
            label="State"
            onBlur={userForm.handleBlur}
            onChange={userForm.handleChange}
            value={userForm.values.state}
            name={"state"}
            error={!!userForm.touched.state && !!userForm.errors.state}
            helperText={userForm.touched.state && userForm.errors.state}
          />
          <TextField
            fullWidth
            variant="standard"
            type="country"
            label="Country"
            onBlur={userForm.handleBlur}
            onChange={userForm.handleChange}
            value={userForm.values.country}
            name={"country"}
            error={!!userForm.touched.country && !!userForm.errors.country}
            helperText={userForm.touched.country && userForm.errors.country}
          />
          <Typography variant="h6" fontWeight={"bold"} className="py-2">
            User Position
          </Typography>
          <FormControl fullWidth variant="standard">
            <InputLabel id="position-select-label">Position</InputLabel>
            <Select
              labelId="position-select-label"
              id="position-select"
              label="Position"
              name={"position"}
              value={userForm.values.position ? userForm.values.position : ""}
              onBlur={userForm.handleBlur}
              onChange={userForm.handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="doctor">Doctor</MenuItem>
              <MenuItem value="receptor">Receptor</MenuItem>
              <MenuItem value="patient">Patient</MenuItem>
            </Select>
          </FormControl>
          <TextField
            minRows={3}
            multiline
            fullWidth
            variant="outlined"
            type="profession"
            label="Profession"
            onBlur={userForm.handleBlur}
            onChange={userForm.handleChange}
            value={userForm.values.profession}
            name={"profession"}
            error={
              !!userForm.touched.profession && !!userForm.errors.profession
            }
            helperText={
              userForm.touched.profession && userForm.errors.profession
            }
          />
        </Box>
      </Box>
      <Button type="submit" className="my-4">
        Save User Information
      </Button>
    </form>
  );
};

export default UpdateUserInfo;
