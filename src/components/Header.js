import React from "react";
import {Button, Typography, AppBar, Toolbar } from '@mui/material';
import {makeStyles} from '@mui/styles';
import {StyledEngineProvider} from "@mui/material";

const useStyles = makeStyles({
  leftNav: {
    marginRight: 'auto'
  },

  rightNav: {
    marginLeft: 'auto',
    marginRight: '3rem'
  },

  propertyBtn: {
    backgroundColor: "green",
    color: "white",
    width: "12rem",
    fontSize: "1.1rem",
    marginRight: "1rem",
    '&:hover': {
      backgroundColor: "white",
      color: "black",
    }
  },

  loginBtn: {
    backgroundColor: "green",
    color: "white",
    width: "7rem",
    fontSize: "1.1rem",
    marginRight: "1rem",
    '&:hover': {
      backgroundColor: "white",
      color: "black",
    }
  }
})

function Navbar() {
  const classes = useStyles();

  return (
      <StyledEngineProvider injectFirst>
        <AppBar position="static" style={{backgroundColor: "black"}}>
          <Toolbar>
            <div className={classes.leftNav}><Button color="inherit"><Typography variant={"h4"}>YUYU</Typography></Button></div>
            <div>
              <Button color="inherit"><Typography variant={"h6"}>Listings</Typography></Button>
              <Button color="inherit"><Typography variant={"h6"}>Agencies</Typography></Button>
            </div>
            <div className={classes.rightNav}>
              <Button color="inherit" className={classes.propertyBtn}>Add Property</Button>
              <Button color="inherit" className={classes.loginBtn}>Login</Button>
            </div>
          </Toolbar>
        </AppBar>

      </StyledEngineProvider>
  )
      ;
}

export default Navbar;