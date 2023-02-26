import {
  Box,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
const DoctorMenu = () => {
  const navigate = useNavigate();
  return (
    <List>
      <ListItem>
        <ListItemButton onClick={() => navigate("/")}>Home</ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton onClick={() => navigate("/patient/list")}>
          Patients lest
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton onClick={() => navigate("/service/treatment/list")}>
          Treatment lest
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton onClick={() => navigate("/service/appointment/list")}>
          Appointment lest
        </ListItemButton>
      </ListItem>
    </List>
  );
};
const AdminMenu = () => {
  const navigate = useNavigate();
  return (
    <List>
      <ListItem>
        <ListItemButton onClick={() => navigate("/")}>Home</ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton onClick={() => navigate("/employ")}>
          New Employees
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton onClick={() => navigate("/employ/list")}>
          Employees list
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton onClick={() => navigate("/doctor/list")}>
          Doctors lest
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton onClick={() => navigate("/receptor/list")}>
          Receptors lest
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton onClick={() => navigate("/patient/list")}>
          Patients lest
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton onClick={() => navigate("/service/treatment/list")}>
          Treatment lest
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton onClick={() => navigate("/service/appointment/list")}>
          Appointment lest
        </ListItemButton>
      </ListItem>
    </List>
  );
};
const SideBar = ({ isOpen, setIsOpen }) => {
  const user = useSelector(selectCurrentUser);
  return (
    <Box
      className={`fixed md:relative top-0 left-0 bottom-0 z-10
                 ${
                   isOpen ? "w-full md:w-[200px]" : "w-0"
                 } md:bg-transparent  duration-75 ease-in-out  bg-black/60 overflow-x-hidden`}
    >
      <Box className="h-fit w-[200px] md:w-full duration-75 ease-in-out  bg-slate-200 md:bg-transparent min-h-full">
        <Box className="flex justify-end md:hidden">
          <IconButton onClick={() => setIsOpen(false)}>X</IconButton>
        </Box>
        <Box className="flex flex-col gap-4 justify-center items-center text-center bg-slate-300">
          <Typography fontWeight={"bold"} variant="subtitle1" className="mt-10">
            {user.first_name} {user.last_name}
          </Typography>
          <Typography fontWeight={"bold"} variant="subtitle2">
            {user.username}
          </Typography>
          <Typography>{user.profession}</Typography>
        </Box>
        {user?.is_doctor && <DoctorMenu />}
        {user?.is_superuser && <AdminMenu />}
      </Box>
    </Box>
  );
};

export default SideBar;
