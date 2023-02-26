import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { getAllUsersList } from "../../app/serviceApi";
const Admin = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [numDoctors, setNumDoctors] = useState(0);
  const [numAdmins, setNumAdmins] = useState(0);
  const [numReceptors, setNumReceptors] = useState(0);
  const [numPatients, setNumPatients] = useState(0);
  const [numAppointments, setNumAppointments] = useState(0);
  const [numTreatments, setNumTreatments] = useState(0);
  useEffect(() => {
    getAllUsersList().then((data) => {
      setUsers(data.users);
      setNumAdmins(data.num_admin);
      setNumDoctors(data.num_doctors);
      setNumPatients(data.num_patients);
      setNumReceptors(data.num_receptors);
      setNumAppointments(data.num_treatments);
      setNumTreatments(data.num_appointments);
    });
  }, []);
  const columns = [
    {
      field: "first_name",
      headerName: "Customer",
      width: 200,
      height: 200,
      renderCell: ({ row: { first_name, last_name, image, user } }) => {
        return (
          <Box className="flex gap-4 items-center py-2 w-full h-full">
            <Link to={`/user/${user}`}>
              <img
                className="h-[60px] w-[60px] pointer rounded-[50%]"
                src={image}
                alt={`${first_name}-${last_name}`}
              />
            </Link>
            <Link to={`/user/${user}`}>
              <Typography>
                {first_name} {last_name}
              </Typography>
            </Link>
          </Box>
        );
      },
    },
    {
      field: "username",
      headerName: "Username",
      width: 100,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
    },
    { field: "sex", headerName: "Sex", width: 100 },
    { field: "birthday", headerName: "Birthday", width: 200 },
  ];
  return (
    <Box className="w-full flex flex-col gap-4">
      <Box className="flex flex-col md:flex-row gap-4 w-full justify-center">
        <Card className="w-full">
          <CardHeader title="Total Users" />
          <CardContent>
            <Typography variant="h3" fontWeight="bold">
              {numPatients + numDoctors + numReceptors + numAdmins}+
            </Typography>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader title="Total Paitient" />
          <CardContent>
            <Typography variant="h3" fontWeight="bold">
              {numPatients}+
            </Typography>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader title="Total Doctor" />
          <CardContent>
            <Typography variant="h3" fontWeight="bold">
              {numDoctors}+
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Box className="flex flex-col md:flex-row gap-4 w-full">
        <Box className="flex flex-col gap-4  justify-center">
          <Card>
            <CardHeader title="Total Admins" />
            <CardContent>
              <Typography variant="h3" fontWeight="bold">
                {numAdmins}+
              </Typography>
            </CardContent>
          </Card>
          <Card>
            <CardHeader title="Total Receptor" />
            <CardContent>
              <Typography variant="h3" fontWeight="bold">
                {numReceptors}+
              </Typography>
            </CardContent>
          </Card>
          <Card>
            <CardHeader title="Total Treatment" />
            <CardContent>
              <Typography variant="h3" fontWeight="bold">
                {numTreatments}+
              </Typography>
            </CardContent>
          </Card>
          <Card>
            <CardHeader title="Total Appointment" />
            <CardContent>
              <Typography variant="h3" fontWeight="bold">
                {numAppointments}+
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Box className="w-full">
          <Typography variant="h5" fontWeight={"bold"}>
            Recent Users
          </Typography>
          <Box className={`w-full`}>
            <Box
              height="80vh"
              className="h-[80vh] rounded-lg p-4 w-full"
              sx={{
                "& .MuiDataGrid-root": {
                  border: "none",
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: "none",
                },
                "& .MuiDataGrid-columnHeaders": {
                  borderBottom: "none",
                },
              }}
            >
              <DataGrid
                density="comfortable"
                rows={users}
                columns={columns}
                autoPageSize
                checkboxSelection
                components={{ Toolbar: GridToolbar }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Admin;
