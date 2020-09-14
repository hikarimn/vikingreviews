import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import ErrorIcon from "@material-ui/icons/Error";
import StyledButton from "../components/common/StyledButton";
import Login from "../components/Login";
import DrawerHeader from "../components/common/DrawerHeader";
import StyledAccordion from "../components/common/StyledAccordion";
import SearchBar from "../components/SearchBar";
import LoginError from "../components/LoginError";
import ScrollableGrid from "../components/common/ScrollableGrid";
import AddReview from "../components/AddReview";
import courses from "../services/courseService";

const useStyles = (theme) => ({
  pageStyles: {
    height: "100vh",
    background: theme.palette.secondary.main,
  },
});

class AddReviewPage extends Component {
  render() {
    const { classes, user, draw, ...other } = this.props;
    return (
      (!user && <LoginError draw={draw} {...other} />) || (
        <Grid
          container
          className={classes.pageStyles}
          justify="center"
          alignItems="center"
        >
          <StyledButton
            onClick={() => draw(other)(AddReview)}
            text="Add Review"
          />
        </Grid>
      )
    );
  }
}

export default withStyles(useStyles)(AddReviewPage);
