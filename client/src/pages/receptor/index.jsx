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
  TextField,
  Divider,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { useState, useRef } from "react";
import {
  searchPatients,
  getDoctorsList,
  addTreatment,
} from "../../app/serviceApi";
import { useNavigate } from "react-router-dom";
import Model from "../../components/Model";
const Receptor = () => {
  const [isGridMode, setIsGridMode] = useState(true);
  const navigate = useNavigate();
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [userDetail, setUserDetail] = useState({});
  const [isAttached, setIsAttached] = useState(false);
  const searchRef = useRef("");
  const [searchedUsers, setSearchUsers] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const handleSearch = (e) => {
    e.preventDefault();
    console.log(searchRef.current.value);
    searchPatients(searchRef.current.value)
      .then((result) => {
        console.log(result);
        setSearchUsers(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showHandle = (userId) => {
    setIsAttached(false);
    setUserDetail(searchedUsers.find((user) => user.id === userId));
    setIsModelOpen(true);
  };
  const handleAttach = (doctorId) => {
    console.log(doctorId);
    console.log(userDetail.id);
    addTreatment({ doctor: doctorId, patient: userDetail.id }).then((res) => {
      console.log(res);
      setIsModelOpen(false);
      setIsAttached(false);
    });
  };
  const showDoctors = () => {
    getDoctorsList()
      .then((result) => {
        console.log(result);
        setDoctors(result);
        setIsAttached(true);
      })
      .catch((err) => console.log(err));
  };
  return (
    <Box className="flex flex-col justify-center items-center">
      <Model
        isModelOpen={isModelOpen}
        setIsModelOpen={setIsModelOpen}
        className="max-w-2xl mt-10 p-4"
      >
        {isAttached ? (
          <Box>
            <Box
              className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4`}
            >
              {doctors.map((doctor) => (
                <Card key={doctor.id}>
                  <CardHeader
                    title={`${doctor.first_name} ${doctor.last_name}`}
                  />
                  <CardContent>
                    <Typography>Profession: {doctor.profession}</Typography>
                    <Typography>
                      Pending: {doctor.pending_treatments}
                    </Typography>
                    <Typography>treats: {doctor.treated_treatments}</Typography>
                  </CardContent>
                  <CardContent>
                    <Button onClick={() => handleAttach(doctor.id)}>
                      Attach
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        ) : (
          <Box>
            <Box className="w-full flex justify-center items-center">
              <Typography variant="h5" fontWeight={"bold"}>
                {userDetail.first_name} {userDetail.last_name}
              </Typography>
            </Box>
            <Box className="mb-6 p-4">
              <Divider />
              <Box className="flex flex-col md:flex-row gap-10">
                <Box>
                  <Typography variant="h6" fontWeight={"bold"} className="py-2">
                    Personal Information
                  </Typography>

                  <Typography>Username: {userDetail.username}</Typography>
                  <Typography>Sex: {userDetail.birthday}</Typography>
                  <Typography>
                    Phone Number: {userDetail.phone_number}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h6" fontWeight={"bold"} className="py-2">
                    Services
                  </Typography>
                  <Typography>Treatments: {userDetail.treatments}</Typography>
                  <Typography>
                    Appointments: {userDetail.appointments}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h6" fontWeight={"bold"} className="py-2">
                    Address
                  </Typography>
                  <Typography>City: {userDetail.city}</Typography>
                  <Typography>State: {userDetail.state},</Typography>
                  <Typography>Country: {userDetail.country}</Typography>
                </Box>
              </Box>
            </Box>
            <Box>
              <Button>Reject</Button>
              <Button onClick={() => showDoctors()}>Attach To</Button>
            </Box>
          </Box>
        )}
      </Model>
      <Box className="flex flex-col md:flex-row justify-between items-center my-10 w-full  gap-4">
        <form onSubmit={handleSearch}>
          <ButtonGroup>
            <TextField
              fullWidth
              label="Search by username"
              inputRef={searchRef}
              className="min-w-[80%]"
            />
            <Button type="submit" className="w-fill">
              Search
            </Button>
          </ButtonGroup>
        </form>
        <ButtonGroup className="hidden md:flex">
          <Button onClick={() => setIsGridMode(true)}>Grid</Button>
          <Button onClick={() => setIsGridMode(false)}>List</Button>
        </ButtonGroup>
      </Box>
      {searchedUsers.length ? (
        <Box
          className={`grid grid-cols-1 w-full ${
            isGridMode && "md:grid-cols-2 lg:grid-cols-3"
          } gap-4`}
        >
          {searchedUsers.map((user) => (
            <Card key={user.id}>
              <CardActionArea onClick={() => showHandle(user.id)}>
                <CardHeader title={`${user.first_name} ${user.last_name}`} />
              </CardActionArea>
              <CardContent>
                <Typography>
                  Username:<strong> {userDetail.username}</strong>
                </Typography>
                <Typography>
                  Sex:<strong> {userDetail.birthday}</strong>
                </Typography>
                <Typography>
                  Phone Number: <strong>{userDetail.phone_number}</strong>
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : (
        <Box className="flex justify-center items-center w-full h-full py-10">
          <Typography variant="h5" fontWeight={"bold"}>
            Search for...
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Receptor;
