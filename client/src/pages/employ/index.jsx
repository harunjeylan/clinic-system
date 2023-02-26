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
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Model from "../../components/Model";

const Employees = () => {
  const [isGridMode, setIsGridMode] = useState(true);
  const navigate = useNavigate();
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [employDetail, setEmployDetail] = useState({});
  const employees = [
    {
      id: 1,
      name: "employ name 1",
      last_check: "2/12/2022",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium, iusto! Sed voluptas, consequatur suscipit maiores deserunt ut corporis libero id!",
    },
    {
      id: 2,
      name: "employ name 2",
      last_check: "2/12/2022",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium, iusto! Sed voluptas, consequatur suscipit maiores deserunt ut corporis libero id!",
    },
    {
      id: 3,
      name: "employ name 3",
      last_check: "2/12/2022",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium, iusto! Sed voluptas, consequatur suscipit maiores deserunt ut corporis libero id!",
    },
    {
      id: 4,
      name: "employ name 4",
      last_check: "2/12/2022",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium, iusto! Sed voluptas, consequatur suscipit maiores deserunt ut corporis libero id!",
    },
    {
      id: 5,
      name: "employ name 5",
      last_check: "2/12/2022",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium, iusto! Sed voluptas, consequatur suscipit maiores deserunt ut corporis libero id!",
    },
  ];
  const showHandle = (employId) => {
    setEmployDetail(employees.find((employ) => employ.id === employId));
    setIsModelOpen(true);
  };
  return (
    <Box className="">
      <Model
        isModelOpen={isModelOpen}
        setIsModelOpen={setIsModelOpen}
        className="max-w-lg mt-10 p-4"
      >
        <Box>
          <Box className="w-full flex justify-center items-center">
            <Box className=" bg-slate-400 rounded-full w-[140px] h-[140px]">
              image
            </Box>
          </Box>
          <Box>
            <Typography>{employDetail.name}</Typography>
            <Typography>{employDetail.last_check}</Typography>
            <Typography>{employDetail.description}</Typography>
          </Box>
          <Box>
            <Button>Reject</Button>
            <Button>Accept</Button>
          </Box>
        </Box>
      </Model>
      <Box className="my-4 py-4 flex justify-between items-center">
        <Typography>New Employees</Typography>
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
        {employees.map((employ) => (
          <Card key={employ.id}>
            <CardActionArea onClick={() => showHandle(employ.id)}>
              <CardHeader title={employ.name} />
            </CardActionArea>
            <CardContent>{employ.description}</CardContent>
            <CardContent>
              <Button>Reject</Button>
              <Button>Accept</Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Employees;
