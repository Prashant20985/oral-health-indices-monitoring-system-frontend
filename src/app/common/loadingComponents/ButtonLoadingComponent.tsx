import { CircularProgress, Box } from "@mui/material";

interface Props {
  content?: string;
}

export default function ButtonLoadingComponent({
  content = "Loading...",
}: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <CircularProgress
        color="info"
        size={20}
        thickness={4}
        sx={{ mr: "4px" }}
      />
      <span>{content}</span>
    </Box>
  );
}
