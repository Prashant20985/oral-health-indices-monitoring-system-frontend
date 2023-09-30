import { Box, Skeleton } from "@mui/material";

export default function SkeletonLoadingComponent() {
  return (
    <Box ml="1rem" mr="1rem" height="100vh">
      <Skeleton variant="text" height="15vh" />
      <Skeleton variant="rounded" height="40vh" />
      <Skeleton variant="rounded" height="40vh" sx={{ mt: "1.5rem" }} />
    </Box>
  );
}
