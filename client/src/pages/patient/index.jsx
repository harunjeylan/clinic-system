import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { useEffect, useState } from "react";
import { getPatientDetails } from "../../app/serviceApi";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser, setUserData } from "../../features/auth/authSlice";

const Patient = () => {
  const [isGridMode, setIsGridMode] = useState(true);
  const [showTreatment, setShowTreatment] = useState(false);

  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  useEffect(() => {
    getPatientDetails(user.id).then((res) => {
      dispatch(setUserData({ user: { ...user, ...res } }));
    });
  }, []);
  return (
    <Box className="">
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
      <Box></Box>
      <Box
        className={`grid grid-cols-1 ${
          isGridMode && "md:grid-cols-2 lg:grid-cols-3"
        } gap-4`}
      >
        {showTreatment
          ? user.treatments?.map((treatment) => (
              <Card key={treatment.id}>
                <CardHeader title={`${treatment.created}`} />
                <CardContent>
                  <Typography>status: {treatment.status}</Typography>
                  <Typography>doctor: {treatment.doctor_full_name}</Typography>
                </CardContent>
              </Card>
            ))
          : user.appointments?.map((appointment) => (
              <Card key={appointment.id}>
                <CardHeader title={`${appointment.created}`} />
                <CardContent>
                  <Typography>
                    doctor: {appointment.doctor_full_name}
                  </Typography>
                  <Typography>{appointment.description}</Typography>
                </CardContent>
              </Card>
            ))}
      </Box>
    </Box>
  );
};

export default Patient;
