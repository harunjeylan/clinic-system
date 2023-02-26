import React from "react";
import { Box, TextField, Typography } from "@mui/material";
import background from "../assets/background.jpg";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
const Home = () => {
  const from = location.state?.from?.pathname || "/";
  const accessToken = useSelector(selectCurrentToken);

  return (
    <Box>
      <Box
        sx={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
        }}
        className="w-full"
      >
        <Box
          id="home"
          className="w-full min-h-[60vh] flex flex-col md:flex-row gap-4 justify-center items-center"
        >
          <Box className="">
            <Typography variant="h2" fontWeight="bold">
              We Serve You Fast And Modern Way
            </Typography>
            <Typography variant="subtitle1" fontWeight="bold">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, ex
              inventore? Assumenda numquam minus fuga odit qui dolorem tempore?
              Sed?
            </Typography>
          </Box>
          <Box></Box>
        </Box>
      </Box>
      <Box
        id="about"
        className="w-full min-h-[60vh] flex flex-col md:flex-row gap-4 justify-center items-center"
      >
        <Box></Box>
        <Box>
          <Typography variant="h5" fontWeight={"bold"}>
            About
          </Typography>
          <Typography>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut
            praesentium at tempore autem minus explicabo, asperiores nostrum
            sunt excepturi! Nostrum maxime consequatur corporis et repudiandae
            quis quasi, deleniti blanditiis quae corrupti laborum soluta a
            tempora aspernatur velit recusandae accusantium architecto porro ea
            provident voluptatum assumenda. Tempora, id corporis incidunt ipsum
            libero minus dolores ducimus dignissimos ullam veniam, ab atque
            delectus earum. Sapiente error laudantium voluptatem dicta! Dolore,
            ipsa. Similique delectus, debitis magni iure quaerat corporis a ut
            id quae, sapiente sit quod mollitia! Officiis voluptatum numquam,
            neque aliquid ex perspiciatis. Provident eveniet aliquid quasi a
            suscipit esse nobis exercitationem laborum.
          </Typography>
        </Box>
      </Box>
      <Box
        id="service"
        className="w-full min-h-[60vh] flex flex-col md:flex-row gap-4 justify-center items-center"
      >
        <Box>
          <Typography variant="h5" fontWeight={"bold"}>
            Service
          </Typography>
          <Typography>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut
            praesentium at tempore autem minus explicabo, asperiores nostrum
            sunt excepturi! Nostrum maxime consequatur corporis et repudiandae
            quis quasi, deleniti blanditiis quae corrupti laborum soluta a
            tempora aspernatur velit recusandae accusantium architecto porro ea
            provident voluptatum assumenda. Tempora, id corporis incidunt ipsum
            libero minus dolores ducimus dignissimos ullam veniam, ab atque
            delectus earum. Sapiente error laudantium voluptatem dicta! Dolore,
            ipsa. Similique delectus, debitis magni iure quaerat corporis a ut
            id quae, sapiente sit quod mollitia! Officiis voluptatum numquam,
            neque aliquid ex perspiciatis. Provident eveniet aliquid quasi a
            suscipit esse nobis exercitationem laborum.
          </Typography>
        </Box>
        <Box></Box>
      </Box>
      <Box className="w-full flex flex-col md:flex-row gap-4 justify-center items-center">
        <Typography variant="h5" fontWeight={"bold"}>
          --- Git Tach ---
        </Typography>
      </Box>
      <Box
        id="contact"
        className="w-full flex flex-col md:flex-row gap-4 justify-center py-4"
      >
        <Box className="w-full p-8 h-full">
          <Typography variant="h5" fontWeight={"bold"}>
            Contact
          </Typography>
          <Typography>+23-45435-4534-534</Typography>
          <Typography>example@gmail.com</Typography>
        </Box>
        <Box className="flex flex-col gap-4 p-8 w-full">
          <TextField variant="standard" label="full name" />
          <TextField variant="standard" label="email" />
          <TextField variant="standard" label="phone number" />
          <TextField variant="outlined" label="messege" multiline minRows={4} />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
