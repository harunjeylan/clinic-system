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
  ButtonGroup,
  MenuItem,
} from "@mui/material";

import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { addAppointment, getPatientDetails } from "../../app/serviceApi";

const PatientDetails = () => {
  const { patientId } = useParams();
  const [isGridMode, setIsGridMode] = useState(true);
  const [isAddingAppointment, setIsAddingAppointment] = useState(false);
  const [isEditingPatientInfo, setIsEditingPatientInfo] = useState(false);
  const [patient, setPatient] = useState({});
  const [showTreatment, setShowTreatment] = useState(false);
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
  return (
    <Box className="">
      <Box>
        <Box className="m-4 p-4 w-full mx-auto flex flex-col md:flex-row gap-4 bg-slate-50">
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
              <Typography>Treatments: {patient.treatments?.length}</Typography>
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
        </Box>
        <Box className="flex w-full justify-start items-start">
          <Button
            onClick={() => navigate(`/patient/${patient.user}/update`)}
            type="submit"
            className="my-4"
          >
            Edit Patient Information
          </Button>
        </Box>
      </Box>
      <Box className="my-4 py-4 w-full">
        <Box className="my-4 py-4 flex justify-between items-center">
          <ButtonGroup>
            <Button onClick={() => setShowTreatment(false)}>Appointment</Button>
            <Button onClick={() => setShowTreatment(true)}>Treatment</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button onClick={() => setIsGridMode(true)}>Grid</Button>
            <Button onClick={() => setIsGridMode(false)}>List</Button>
          </ButtonGroup>
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
        <Box
          className={`grid grid-cols-1 ${
            isGridMode && "md:grid-cols-2 lg:grid-cols-3"
          } gap-4`}
        >
          {showTreatment
            ? patient.treatments?.map((treatment) => (
                <Card key={treatment.id}>
                  <CardContent>
                    <Typography>{treatment.created}</Typography>
                  </CardContent>
                  <CardContent>
                    <Typography>status: {treatment.status}</Typography>
                    <Typography>
                      doctor: {treatment.doctor_full_name}
                    </Typography>
                  </CardContent>
                </Card>
              ))
            : patient.appointments?.map((appointment, index) => (
                <Card key={appointment.id}>
                  <CardContent>
                    <Typography>{appointment.created}</Typography>
                    <Typography>
                      treated bay:{" "}
                      <strong>{appointment.doctor_full_name}</strong>
                    </Typography>
                  </CardContent>
                  <CardContent>
                    <Typography></Typography>
                    <Typography>{appointment.description}</Typography>
                  </CardContent>
                </Card>
              ))}
        </Box>
      </Box>
    </Box>
  );
};

export default PatientDetails;
