import { baseQuery, baseMount } from "./baseUrl";
export const searchPatients = (keyword) => {
  return baseQuery(`search-patients?q=${keyword}`);
};

export const getDoctorDetails = (doctorId) => {
  return baseQuery(`doctor/${doctorId}`);
};

export const getEmployeesList = () => {
  return baseQuery(`employ/`);
};
export const getReceptorsList = () => {
  return baseQuery(`receptor/`);
};
export const getDoctorsList = () => {
  return baseQuery(`doctor/`);
};
export const getPatientsList = () => {
  return baseQuery(`patient/`);
};
export const getAllUsersList = () => {
  return baseQuery(`users/`);
};
export const addTreatment = (data) => {
  return baseMount(`treatment/add/`, data);
};
export const getPendingTreatment = () => {
  return baseQuery(`pending-treatment/`);
};
export const getPatientDetails = (patientId) => {
  return baseQuery(`patient/${patientId}`);
};
export const addAppointment = (patientId, data) => {
  return baseMount(`patient/${patientId}/add-appointment`, data);
};
export const setPatientTreated = (treatmentId) => {
  return baseMount(`treatment/treated/`, { treatment_id: treatmentId });
};
