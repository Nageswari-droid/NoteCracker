import { Backdrop, CircularProgress } from "@mui/material";

export default function Loader() {
  return (
    <Backdrop open={true}>
      <CircularProgress color="white" />
    </Backdrop>
  );
}
