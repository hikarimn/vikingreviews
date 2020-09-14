import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { useHistory } from "react-router-dom";
import StyledButton from "../components/common/StyledButton";
import DrawerHeader from "../components/common/DrawerHeader";

const useStyles = makeStyles((theme) => ({
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
}));

const NotFound = () => {
  const classes = useStyles();
  const history = useHistory();
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
              justify="space-evenly"
              alignItems="center"
              spacing={2}
            >
              <Grid item>
                <DrawerHeader primary>404</DrawerHeader>
              </Grid>
              <Grid item>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  style={{ textAlign: "center" }}
                >
                  This page has been taken over by river bugs.
                </Typography>
              </Grid>
              <Grid item>
                <StyledButton
                  text="Back to Home"
                  onClick={() => history.push("/")}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default NotFound;
