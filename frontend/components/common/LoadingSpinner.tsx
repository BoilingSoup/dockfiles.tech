import { Box, Loader } from "@mantine/core";
import { PAGE_SIZE } from "../../config/config";
import { envListItemHeight } from "./styles";

export const LoadingSpinner = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        width: "100%",
        maxWidth: "730px",
        height: `${envListItemHeight * PAGE_SIZE}px`,
      }}
    >
      <Loader />
    </Box>
  );
};
