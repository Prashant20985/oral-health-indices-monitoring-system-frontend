import { Slide, SlideProps } from "@mui/material";

/**
 * SlideUpTransition component.
 *
 * This component is responsible for rendering a slide transition with an upward direction.
 *
 * @param props - The props for the SlideUpTransition component.
 * @returns The rendered SlideUpTransition component.
 */
export default function SlideUpTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}
