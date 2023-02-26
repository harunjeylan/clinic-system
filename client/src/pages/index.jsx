import React from "react";
import { Box, Typography } from "@mui/material";
import background from "../assets/background.jpg";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
const Home = () => {
  const from = location.state?.from?.pathname || "/";
  const accessToken = useSelector(selectCurrentToken);

  return (
    <Box>
      <Box
        id="home"
        className="w-full min-h-screen flex gap-4 justify-center items-center"
      >
        <Box>
          <Typography variant="h2" fontWeight="bold">
            Doctor Apointment
          </Typography>
          <Typography variant="subtitle1" fontWeight="bold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, ex
            inventore? Assumenda numquam minus fuga odit qui dolorem tempore?
            Sed?
          </Typography>
        </Box>
        <Box></Box>
      </Box>
      <Box
        id="about"
        className="w-full min-h-screen flex gap-4 justify-center items-center"
      >
        <Box></Box>
        <Box>
          <Typography>About</Typography>
        </Box>
      </Box>
      <Box
        id="service"
        className="w-full min-h-screen flex gap-4 justify-center items-center"
      >
        <Box>
          <Typography>Service</Typography>
        </Box>
        <Box></Box>
      </Box>
      <Box
        id="contact"
        className="w-full min-h-screen flex gap-4 justify-center items-center"
      >
        <Box></Box>
        <Box>
          <Typography>Contact</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
