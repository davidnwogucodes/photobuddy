import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  bod: {
    display: "block",
    justifyContent: "center",
    height: "100vh",
    width: "100%",
    backgroundImage: "url('p3.jpg')",
    backgroundSize: "cover",

    filter: "blur(3px)",
  },
  txt: {
    fontSize: "125px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    position: "relative",
    zIndex: "5",
    top: "-486px",
  },
}));

export default function Body() {
  const classes = useStyles();
  return (
    <>
      <div className={classes.bod}></div>
      <div className={classes.txt}>Photobuddy</div>
    </>
  );
}
