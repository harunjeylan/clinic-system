import React, { useEffect, useState } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import {
  selectCurrentToken,
  selectCurrentUser,
} from "../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../features/auth/authSlice";
import useNavigateToDashboard from "../utils/useNavigateToDashboard";
import SideBar from "./SideBar";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import NovBar from "./NovBar";
import Model from "../components/Model";

const Layout = ({ children }) => {
  const accessToken = useSelector(selectCurrentToken);
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navigateToDashboard = useNavigateToDashboard();
  const [isOpen, setIsOpen] = useState(true);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [register_login, setRegister_login] = useState("REGISTER");
  useEffect(() => {
    if (accessToken && isModelOpen) {
      setIsModelOpen(false);
    }
  }, [accessToken]);
  return (
    <main className="">
      <NovBar
        saidBarToggler={
          accessToken &&
          (user?.is_doctor || user?.is_superuser) && (
            <IconButton onClick={() => setIsOpen((prev) => !prev)}>
              =
            </IconButton>
          )
        }
        authButton={
          accessToken ? (
            <Box className="">
              <Button onClick={() => dispatch(logOut())}>logout</Button>
            </Box>
          ) : (
            <>
              <Box className="">
                <Button
                  onClick={() => {
                    setRegister_login("LOGIN");
                    setIsModelOpen(true);
                  }}
                >
                  login
                </Button>
              </Box>
              <Box className="">
                <Button
                  onClick={() => {
                    setRegister_login("REGISTER");

                    setIsModelOpen(true);
                  }}
                >
                  register
                </Button>
              </Box>
            </>
          )
        }
      />
      <Model
        isModelOpen={isModelOpen}
        setIsModelOpen={setIsModelOpen}
        className="max-w-md mt-10 p-4"
      >
        {register_login === "REGISTER" && (
          <>
            <Typography fontWeight="bold">Register Form</Typography>
            <RegisterForm />
          </>
        )}
        {register_login === "LOGIN" && (
          <>
            <Typography fontWeight="bold">Login Form</Typography>
            <LoginForm />
          </>
        )}
      </Model>
      <Box className="flex justify-between ">
        {accessToken && (user?.is_doctor || user?.is_superuser) && (
          <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
        )}
        <Box className={`w-full mx-4 md:max-w-[80%] md:mx-auto`}>
          {children}
        </Box>
      </Box>
      <Box className="fixed bottom-0 "></Box>
    </main>
  );
};

export default Layout;
