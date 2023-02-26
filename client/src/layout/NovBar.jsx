import { Box, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const NovBar = ({ saidBarToggler, authButton }) => {
  return (
    <Box className="w-full flex justify-between items-center px-10 py-2 drop-shadow-md shadow">
      <Box className="flex justify-around items-center gap-4">
        {saidBarToggler}
        <Button>LOGO</Button>
      </Box>
      <Box className="flex justify-around items-center gap-4">
        <Box className="hidden md:flex justify-around items-center gap-4">
          <Box className="">
            <Link to="#home">home</Link>
          </Box>
          <Box className="">
            <Link to="#about">about</Link>
          </Box>
          <Box className="">
            <Link to="#service">service</Link>
          </Box>
          <Box className="">
            <Link to="#contact">contact</Link>
          </Box>
        </Box>
        {authButton}
      </Box>
    </Box>
  );
};

export default NovBar;
