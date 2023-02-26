import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { useState } from "react";

const Patient = () => {
  const [isGridMode, setIsGridMode] = useState(true);
  return (
    <Box className="">
      <Box className="my-4 py-4 flex justify-between items-center">
        <Typography>Patient DASHBOARD</Typography>
        <ButtonGroup>
          <Button onClick={() => setIsGridMode(true)}>Grid</Button>
          <Button onClick={() => setIsGridMode(false)}>List</Button>
        </ButtonGroup>
      </Box>
      <Box
        className={`grid grid-cols-1 ${
          isGridMode && "md:grid-cols-2 lg:grid-cols-3"
        } gap-4`}
      >
        <Card>
          <CardHeader>Patient name </CardHeader>
          <CardContent>sample text</CardContent>
        </Card>
        <Card>
          <CardHeader>Patient name </CardHeader>
          <CardContent>sample text</CardContent>
        </Card>
        <Card>
          <CardHeader>Patient name </CardHeader>
          <CardContent>sample text</CardContent>
        </Card>
        <Card>
          <CardHeader>Patient name </CardHeader>
          <CardContent>sample text</CardContent>
        </Card>
        <Card>
          <CardHeader>Patient name </CardHeader>
          <CardContent>sample text</CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Patient;
