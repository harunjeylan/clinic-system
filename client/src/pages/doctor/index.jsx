import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPendingTreatment, setPatientTreated } from "../../app/serviceApi";

const Doctor = () => {
  const [isGridMode, setIsGridMode] = useState(true);
  const navigate = useNavigate();
  const [pendingTreatment, setPendingTreatment] = useState([]);

  useEffect(() => {
    getPendingTreatment().then((data) => {
      console.log(data);
      setPendingTreatment(data);
    });
    // let interval = setInterval(() => {
    // }, 1000 * 60 * 2);
    // return () => clearInterval(interval);
  }, []);
  const handleOpen = (treatment) => {
    setPatientTreated(treatment.id).then((res) => {
      navigate(`/patient/${treatment.patient.id}`);
    });
  };
  return (
    <Box className="">
      <Box className="my-4 py-4 flex justify-between items-center">
        <Typography>DOCTOR DASHBOARD</Typography>
        <ButtonGroup>
          <Button onClick={() => setIsGridMode(true)}>Grid</Button>
          <Button onClick={() => setIsGridMode(false)}>List</Button>
        </ButtonGroup>
      </Box>
      <Box
        className={`grid grid-cols-1 ${
          isGridMode && "md:grid-cols-2 lg:grid-cols-3"
        } gap-4`}
      >
        {pendingTreatment.map((treatment) => (
          <Card key={treatment.id}>
            <CardActionArea onClick={() => handleOpen(treatment)}>
              <CardHeader
                title={`${treatment.patient.first_name} ${treatment.patient.last_name}`}
              />
            </CardActionArea>
            <CardContent>
              <Typography>username: {treatment.patient.username}</Typography>
              <Typography>sex: {treatment.patient.sex}</Typography>
              <Typography>{treatment.created}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Doctor;
