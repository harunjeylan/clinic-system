import { Box, IconButton } from "@mui/material";
import React from "react";

const Model = ({ isModelOpen, setIsModelOpen, className, children }) => {
  return (
    isModelOpen && (
      <Box className="fixed top-0 left-0 bottom-0 w-full h-full bg-black/60 z-10 overflow-y-auto">
        <Box
          className={`bg-white mx-auto my-auto h-fit min-h-full md:min-h-fit md:h-auto rounded-t-lg md:rounded-md ${className}`}
        >
          <Box className="flex justify-end">
            <IconButton
              onClick={() => setIsModelOpen(false)}
              className="w-8 h-8"
            >
              x
            </IconButton>
          </Box>
          {children}
        </Box>
      </Box>
    )
  );
};

export default Model;
