import React, { useEffect, useState, useRef } from "react";
import {
  Typography,
  Box,
  Card,
  CardHeader,
  CardContent,
  Button,
  Divider,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import * as Yup from "yup";

import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { addAppointment, getPatientDetails } from "../../app/serviceApi";

const PatientDetails = () => {
  const { patientId } = useParams();
  const [isAddingAppointment, setIsAddingAppointment] = useState(false);
  const [isEditingPatientInfo, setIsEditingPatientInfo] = useState(false);
  const [patient, setPatient] = useState({});

  useEffect(() => {
    getPatientDetails(patientId).then((data) => {
      console.log(data);
      setPatient(data);
    });
  }, []);
  const navigate = useNavigate();
  const appointmentForm = useFormik({
    initialValues: {
      description: "",
    },
    onSubmit: (data) => {
      console.log(data);
      addAppointment(patientId, data)
        .then((res) => {
          console.log(res);
          setPatient((prev) => {
            return {
              ...prev,
              appointments: [res, ...prev.appointments],
            };
          });
          appointmentForm.resetForm();
          setIsAddingAppointment(false);
        })
        .catch((err) => console.log(err));
    },
  });
  const checkoutSchema = Yup.object().shape({
    first_name: Yup.string().required("required"),
    last_name: Yup.string().required("required"),
    username: Yup.string().required("required"),
    // sex: Yup.string().required("required"),
    // birthday: Yup.date().required("required"),
  });
  const patientForm = useFormik({
    initialValues: {
      first_name: patient.first_name,
      last_name: patient.last_name,
      username: patient.username,
      birthday: patient.birthday,
      sex: patient.sex ? patient.sex : "",
      city: patient.city,
      state: patient.state,
      country: patient.country,
    },
    validationSchema: checkoutSchema,
    onSubmit: (data) => {
      console.log(data);
      setIsEditingPatientInfo(false);
    },
  });

  return (
    <Box className="">
      <Box>
        <Box className="m-4  w-full mx-auto flex flex-col md:flex-row gap-4 bg-slate-50">
          <Box className="w-fit flex justify-center items-center">
            <Box className="m-10 bg-slate-400 rounded-full w-[140px] h-[140px]">
              image
            </Box>
          </Box>
          {isEditingPatientInfo ? (
            <form onSubmit={patientForm.handleSubmit} className="py-4">
              <Box className="flex flex-col md:flex-row gap-4 px-4">
                <Box>
                  <Typography variant="h6" fontWeight={"bold"} className="py-2">
                    Personal Information
                  </Typography>
                  <TextField
                    fullWidth
                    variant="standard"
                    type="text"
                    label="First Name"
                    onBlur={patientForm.handleBlur}
                    onChange={patientForm.handleChange}
                    defaultValue={patient.first_name}
                    name={"first_name"}
                    error={
                      !!patientForm.touched.first_name &&
                      !!patientForm.errors.first_name
                    }
                    helperText={
                      patientForm.touched.first_name &&
                      patientForm.errors.first_name
                    }
                  />
                  <TextField
                    fullWidth
                    variant="standard"
                    type="text"
                    label="Last Name"
                    onBlur={patientForm.handleBlur}
                    onChange={patientForm.handleChange}
                    defaultValue={patient.last_name}
                    name={"last_name"}
                    error={
                      !!patientForm.touched.last_name &&
                      !!patientForm.errors.last_name
                    }
                    helperText={
                      patientForm.touched.last_name &&
                      patientForm.errors.last_name
                    }
                  />
                  <TextField
                    fullWidth
                    variant="standard"
                    type="username"
                    label="Username"
                    onBlur={patientForm.handleBlur}
                    onChange={patientForm.handleChange}
                    defaultValue={patient.username}
                    name={"username"}
                    error={
                      !!patientForm.touched.username &&
                      !!patientForm.errors.username
                    }
                    helperText={
                      patientForm.touched.username &&
                      patientForm.errors.username
                    }
                  />
                  <FormControl fullWidth variant="standard">
                    <InputLabel id="sex-select-label">Sex</InputLabel>
                    <Select
                      labelId="sex-select-label"
                      id="sex-select"
                      label="Sex"
                      name={"sex"}
                      defaultValue={patient.sex ? patient.sex : ""}
                      onBlur={patientForm.handleBlur}
                      onChange={patientForm.handleChange}
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
                      defaultValue={patient.birthday}
                      onChange={(newValue) =>
                        patientForm.setFieldValue("birthday", newValue)
                      }
                      renderInput={(params) => (
                        <TextField
                          fullWidth
                          variant="standard"
                          onBlur={patientForm.handleBlur}
                          name={"birthday"}
                          {...params}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Box>
                <Box>
                  <Typography variant="h6" fontWeight={"bold"} className="py-2">
                    Personal Address
                  </Typography>
                  <TextField
                    fullWidth
                    variant="standard"
                    type="city"
                    label="City"
                    onBlur={patientForm.handleBlur}
                    onChange={patientForm.handleChange}
                    defaultValue={patient.city}
                    name={"city"}
                    error={
                      !!patientForm.touched.city && !!patientForm.errors.city
                    }
                    helperText={
                      patientForm.touched.city && patientForm.errors.city
                    }
                  />
                  <TextField
                    fullWidth
                    variant="standard"
                    type="state"
                    label="State"
                    onBlur={patientForm.handleBlur}
                    onChange={patientForm.handleChange}
                    defaultValue={patient.state}
                    name={"state"}
                    error={
                      !!patientForm.touched.state && !!patientForm.errors.state
                    }
                    helperText={
                      patientForm.touched.state && patientForm.errors.state
                    }
                  />
                  <TextField
                    fullWidth
                    variant="standard"
                    type="country"
                    label="Country"
                    onBlur={patientForm.handleBlur}
                    onChange={patientForm.handleChange}
                    defaultValue={patient.country}
                    name={"country"}
                    error={
                      !!patientForm.touched.country &&
                      !!patientForm.errors.country
                    }
                    helperText={
                      patientForm.touched.country && patientForm.errors.country
                    }
                  />
                </Box>
              </Box>
              <Button type="submit" className="my-4">
                Save Patient Information
              </Button>
            </form>
          ) : (
            <Box className="flex flex-col md:flex-row gap-10">
              <Box>
                <Typography variant="h6" fontWeight={"bold"} className="py-2">
                  Personal Information
                </Typography>
                <Typography>First Name: {patient.first_name}</Typography>
                <Typography>Last Name: {patient.last_name}</Typography>
                <Typography>Username: {patient.username}</Typography>
                <Typography>Sex: {patient.birthday}</Typography>
                <Typography>Phone Number: {patient.phone_number}</Typography>
              </Box>
              <Box>
                <Typography variant="h6" fontWeight={"bold"} className="py-2">
                  Services
                </Typography>
                <Typography>Treatments: {patient.treatments}</Typography>
                <Typography>
                  Appointments: {patient.appointments?.length}
                </Typography>
              </Box>
              <Box>
                <Typography variant="h6" fontWeight={"bold"} className="py-2">
                  Address
                </Typography>
                <Typography>City: {patient.city}</Typography>
                <Typography>State: {patient.state},</Typography>
                <Typography>Country: {patient.country}</Typography>
              </Box>
            </Box>
          )}
        </Box>
        <Box className="flex w-full justify-start items-start">
          {!isEditingPatientInfo && (
            <Button
              onClick={() => setIsEditingPatientInfo(true)}
              type="submit"
              className="my-4"
            >
              Edit Patient Information
            </Button>
          )}
        </Box>
      </Box>
      <Box className="my-4 py-4 w-full">
        <Box className="w-full my-4 flex justify-items-start gap-4">
          <Button>Appointment</Button>
          <Button>Libratory</Button>
          <Button>Drag</Button>
        </Box>

        {isAddingAppointment ? (
          <form onSubmit={appointmentForm.handleSubmit} className="p-4">
            <TextField
              fullWidth
              minRows={4}
              variant="outlined"
              type="description"
              label="Description"
              onBlur={appointmentForm.handleBlur}
              onChange={appointmentForm.handleChange}
              value={appointmentForm.values.description}
              name={"description"}
              multiline
            />
            <Button fullWidth type="submit" className="my-4">
              save appointment
            </Button>
          </form>
        ) : (
          <Button
            onClick={() => setIsAddingAppointment(true)}
            variant="outlined"
            fullWidth
            className="p-2 mb-4"
          >
            <Typography>+ New Appointment</Typography>
          </Button>
        )}
        {patient.appointments?.map((appointment, index) => (
          <Box key={index} className="mb-10">
            <Box className="flex items-center justify-between gap-4">
              <Typography>{appointment.created}</Typography>
              <hr className="bg-slate-600  w-full" />
            </Box>
            <Box className="my-4">
              <Typography>
                treated bay: <strong>{appointment.doctor_full_name}</strong>
              </Typography>
            </Box>
            <Box className="my-4">
              <Typography>{appointment.description}</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default PatientDetails;
