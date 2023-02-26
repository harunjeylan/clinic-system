import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, Breadcrumbs, useTheme } from "@mui/material";
import { getEmployeesList } from "../../app/serviceApi";

const EmployeesList = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    getEmployeesList().then((data) => {
      console.log(data);
      setEmployees(data);
    });
  }, []);
  const columns = [
    {
      field: "first_name",
      headerName: "Employ",
      width: 200,
      height: 200,
      renderCell: ({
        row: { first_name, last_name, image, user, username },
      }) => {
        return (
          <Box
            key={`${first_name}-${username}`}
            className="flex gap-4 items-center py-2 w-full h-full"
          >
            <Link to={`/patient/${user}`}>
              <img
                className="h-[60px] w-[60px] pointer rounded-[50%]"
                src={image}
                alt={`${first_name}-${last_name}`}
              />
            </Link>
            <Link to={`/patient/${user}`}>
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
    {
      field: "position",
      headerName: "Position",
      width: 200,
      // renderCell: ({
      //   row: { username, first_name, is_superuser, is_doctor, is_receptor },
      // }) => {
      //   return (
      //     <Box key={`${first_name}-${username}`}>
      //       {is_superuser && <Typography>Admin</Typography>}
      //       {is_doctor && <Typography>Doctor</Typography>}
      //       {is_receptor && <Typography>Receptor</Typography>}
      //     </Box>
      //   );
      // },
    },
  ];
  return (
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
          rows={employees}
          columns={columns}
          autoPageSize
          checkboxSelection
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default EmployeesList;
