import React from "react";
import { AppBar, Toolbar, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  navtxt: {
    display: "flex",
    justifyContent: "space-between",
    color: "white",
  },
  navbar: {
    backgroundColor: "#0e1128",
  },
}));

export default function NavBar() {
  const classes = useStyles();
  return (
    <AppBar position="sticky" className={classes.navbar}>
      <Toolbar className={classes.navtxt}>
        <Typography variant="h6">Explore</Typography>
        <Typography variant="h6">Home</Typography>
        <Typography variant="h6">Contact</Typography>
      </Toolbar>
    </AppBar>
  );
}
