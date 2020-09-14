import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const themeObject = (theme) => ({
  header: {
    color: theme.palette.secondary.light,
    fontWeight: "300",
    fontStyle: "italic",
    [theme.breakpoints.down("md")]: {
      fontSize: theme.typography.h3.fontSize,
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: theme.typography.h2.fontSize,
    },
  },
});

const useStyles = (theme) => ({
  ...themeObject(theme),
  headerPrimary: {
    ...themeObject(theme).header,
    color: theme.palette.primary.main,
  },
});

class DrawerHeader extends Component {
  render() {
    const { children, classes, primary } = this.props;
    return (
      <Typography className={primary ? classes.headerPrimary : classes.header}>
        {children}
      </Typography>
    );
  }
}

export default withStyles(useStyles)(DrawerHeader);
