import { Box, Typography } from "@mui/material";

export default function NoRowsFound() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        flexDirection: "column",
      }}
    >
      <img
        src="/assets/noRowsFound.webp"
        alt="No Rows Found"
        loading="lazy"
        height={200}
        width={200}
      />
      <Typography variant="h6" fontWeight={600} textTransform="uppercase">
        No Rows Found
      </Typography>
    </Box>
  );
}
