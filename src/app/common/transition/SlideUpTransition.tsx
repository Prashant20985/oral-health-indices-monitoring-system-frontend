import { Slide, SlideProps } from "@mui/material";

export default function SlideUpTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}
