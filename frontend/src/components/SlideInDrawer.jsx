import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import ScrollableGrid from "./common/ScrollableGrid";

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.down("sm")]: {
      width: "100vw",
    },
    [theme.breakpoints.up("md")]: {
      width: "50vw",
    },
    height: "100vh",
    background: `linear-gradient(${theme.palette.primary.light}, ${theme.palette.secondary.main})`,
  },
  button: {
    boxShadow: "5px 5px 0px 0px rgba(0,0,0,0.15)",
    fontFamily: "Inter",
    fontWeight: "300",
  },
  close: {
    position: "absolute",
    top: theme.spacing(2),
    left: theme.spacing(2),
    color: "white",
  },
  scroll: {
    height: "80%",
  },
}));

const SlideInDrawer = ({ onClose, content }) => {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <IconButton
        aria-label="close"
        className={classes.close}
        onClick={onClose}
      >
        <CloseIcon />
      </IconButton>
      <Grid
        container
        className={classes.drawer}
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid
          className={classes.scroll}
          item
          xs={10}
          sm={8}
          container
          direction="column"
          justify="center"
        >
          <ScrollableGrid>{content}</ScrollableGrid>
        </Grid>
      </Grid>
    </>
  );
};

export default SlideInDrawer;
