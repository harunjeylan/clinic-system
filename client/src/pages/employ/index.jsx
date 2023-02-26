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
} from "@mui/material";
import { Dayjs } from "dayjs";

import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { searchPatients } from "../../app/serviceApi";

const Employees = () => {
  const [isGridMode, setIsGridMode] = useState(true);
  const navigate = useNavigate();
  const [searchedUsers, setSearchUsers] = useState([]);
  const searchRef = useRef("");

  const handleSearch = (e) => {
    e?.preventDefault();
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

  return (
    <Box className="w-full h-fit p-4">
      <Box className="my-4 py-4 flex justify-between items-center">
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
        <ButtonGroup>
          <Button onClick={() => setIsGridMode(true)}>Grid</Button>
          <Button onClick={() => setIsGridMode(false)}>List</Button>
        </ButtonGroup>
      </Box>
      {searchedUsers.length ? (
        <Box
          className={`grid grid-cols-1 ${
            isGridMode && "md:grid-cols-2 lg:grid-cols-3"
          } gap-4`}
        >
          {searchedUsers.map((user) => (
            <Card key={user.id}>
              <CardActionArea
                onClick={() => navigate(`/admin/update-user/${user.id}`)}
              >
                <CardHeader title={`${user.first_name} ${user.last_name}`} />
              </CardActionArea>
              <CardContent>
                <Typography>
                  Username:<strong> {user.username}</strong>
                </Typography>
                <Typography>
                  Sex:<strong> {user.sex}</strong>
                </Typography>
                <Typography>
                  Phone Number: <strong>{user.phone_number}</strong>
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

export default Employees;
