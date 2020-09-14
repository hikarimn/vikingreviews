import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import StyledButton from "../components/common/StyledButton";
import DrawerHeader from "../components/common/DrawerHeader";
import Login from "./Login";

const useStyles = (theme) => ({
  pageStyles: {
    height: "100vh",
    background: theme.palette.secondary.main,
  },
  paperStyles: {
    height: "70vh",
    background: "white",
    boxShadow: theme.shadows[10],
    borderRadius: 16,
    overflow: "auto",
  },
  halfHeight: {
    height: "50%",
  },
});

class LoginError extends Component {
  render() {
    const { classes, draw, ...other } = this.props;
    console.log("LoginError", other);
    return (
      <Grid
        container
        className={classes.pageStyles}
        justify="center"
        alignItems="center"
        direction="row"
      >
        <Grid
          item
          xs={10}
          sm={6}
          md={4}
          container
          justify="center"
          alignItems="center"
          direction="column"
        >
          <Card className={classes.paperStyles}>
            <CardMedia
              component="img"
              alt="Lawrence 404"
              style={{ height: "50%" }}
              image="https://www.lawrence.edu/sites/default/files/bss/desktop/ref_db20.jpg"
              title="Lawrence 404"
            />
            <CardContent style={{ height: "40%" }}>
              <Grid
                container
                direction="column"
                alignItems="center"
                spacing={2}
              >
                <Grid item>
                  <DrawerHeader primary>Error</DrawerHeader>
                </Grid>
                <Grid item>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    style={{ textAlign: "center" }}
                  >
                    You have to be logged in to leave a review.
                  </Typography>
                </Grid>
                <Grid item>
                  <StyledButton
                    text="Log in"
                    onClick={() => {
                      console.log("LoginError", other);
                      draw(other)(Login);
                    }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(useStyles)(LoginError);
