//IMORTING LIBRARYS
import React, { useMemo, useEffect, useRef, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
//IMPORTING APP SETUP
import PrivateRoutes from "./utils/PrivateRoutes";
import HomeRoutes from "./utils/HomeRoutes";
import Layout from "./layout/Layout";

import {
  selectCurrentToken,
  selectCurrentRefresh,
  selectCurrentUser,
} from "./features/auth/authSlice";

import { refreshAccessToken } from "./app/baseUrl";
import { setUserData } from "./features/auth/authSlice";
import { getUser } from "./app/userApi";

//IMPORTING  PAGE COMPONENTS
import Admin from "./pages/admin";

import Employees from "./pages/employ";
import EmployeesList from "./pages/employ/EmployeesList";

import Doctor from "./pages/doctor";
import DoctorsList from "./pages/doctor/DoctorsList";
import DoctorDetails from "./pages/doctor/DoctorDetails";

import Patient from "./pages/patient";
import PatientsList from "./pages/patient/PatientsList";
import PatientDetails from "./pages/patient/PatientDetails";

import Receptor from "./pages/receptor";
import ReceptorsList from "./pages/receptor/ReceptorsList";
import ReceptorDetails from "./pages/receptor/ReceptorDetails";

import Home from "./pages";
// import UpdateProfile from "./pages/admin/updateProfile";
import UpdateUser from "./pages/admin/UpdateUser";
import UpdatePatientInfo from "./pages/patient/UpdatePatientInfo";
import TreatmentList from "./pages/service/TreatmentList";
import AppointmentList from "./pages/service/AppointmentList";

function App() {
  const accessToken = useSelector(selectCurrentToken);
  const refreshToken = useSelector(selectCurrentRefresh);
  const dispatch = useDispatch();
  const timeOutRef = useRef(1000 * 60 * 58);

  useEffect(() => {
    getUser()
      .then((res) => {
        dispatch(setUserData(res));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [accessToken]);

  useEffect(() => {
    timeOutRef.current = accessToken
      ? dayjs.unix(jwt_decode(accessToken).exp).diff(dayjs()) - 30000
      : 1000 * 60 * 58;
  }, [accessToken]);

  useEffect(() => {
    let timeOut = timeOutRef.current < 0 ? 3000 : timeOutRef.current;
    let interval = setInterval(() => {
      if (refreshToken) {
        refreshAccessToken();
      }
    }, timeOut);
    return () => clearInterval(interval);
  }, [accessToken]);

  return (
    <Layout>
      <CssBaseline />
      <Routes>
        <Route element={<HomeRoutes />} path="/">
          <Route index element={<Home />} />
        </Route>
        <Route element={<PrivateRoutes />} path="/service">
          <Route path="appointment/list" element={<AppointmentList />} />
          <Route path="treatment/list" element={<TreatmentList />} />
        </Route>
        <Route element={<PrivateRoutes />} path="/admin">
          <Route index element={<Admin />} />
          <Route path="update-user/:userId" element={<UpdateUser />} />
        </Route>
        <Route element={<PrivateRoutes />} path="employ">
          <Route index element={<Employees />} />
          <Route path="list" element={<EmployeesList />} />
        </Route>
        <Route element={<PrivateRoutes />} path="/doctor">
          <Route index element={<Doctor />} />
          <Route path="list" element={<DoctorsList />} />
          <Route path=":doctorId" element={<DoctorDetails />} />
        </Route>
        <Route element={<PrivateRoutes />} path="/patient">
          <Route index element={<Patient />} />
          <Route path="list" element={<PatientsList />} />
          <Route path=":patientId" element={<PatientDetails />} />
          <Route path=":patientId/update" element={<UpdatePatientInfo />} />
        </Route>
        <Route element={<PrivateRoutes />} path="/receptor">
          <Route index element={<Receptor />} />
          <Route path="list" element={<ReceptorsList />} />
          <Route path=":receptorId" element={<ReceptorDetails />} />
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;
