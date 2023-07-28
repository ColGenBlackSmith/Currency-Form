import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

interface Props {
  willShow: boolean;
}

export default function BackdropComponent({ willShow }: Props) {
  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={willShow}
      >
        <CircularProgress
          size="20px"
          color="inherit"
          style={{ marginRight: "0.5rem" }}
        />
        Loading...
      </Backdrop>
    </div>
  );
}
