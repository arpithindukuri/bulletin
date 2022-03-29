import { Button, CircularProgress } from "@mui/material";
import React from "react";

interface SpinnerButtonProps {
  title: string;
  loading: boolean;
  onClick: any;
  className?: string;
  variant?: "text" | "contained" | "outlined" | undefined;
}
const SpinnerButton = ({
  title,
  onClick,
  loading,
  className,
  variant,
}: SpinnerButtonProps) => {
  return (
    <Button
      variant={variant ? variant : "contained"}
      onClick={onClick}
      disabled={loading}
      className={className ? className : ""}
    >
      {loading && <CircularProgress size={26} />}
      {!loading && title}
    </Button>
  );
};

export default SpinnerButton;
