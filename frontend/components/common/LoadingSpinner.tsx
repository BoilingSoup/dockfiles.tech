import { Box, Loader } from "@mantine/core";

export const LoadingSpinner = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        width: "95%",
        maxWidth: "730px",
        height: "90%",
      }}
    >
      <Loader />
    </Box>
  );
};
