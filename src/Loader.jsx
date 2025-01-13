import { Backdrop, CircularProgress } from "@mui/material";

export default function Loader() {
  return (
    <Backdrop open={true} style={{ color: "#fff", backgroundColor: "#1a1a19" }}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
