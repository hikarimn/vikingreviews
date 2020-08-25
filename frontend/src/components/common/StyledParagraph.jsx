import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";

const useStyles = (theme) => ({
  p: {
    color: grey[800],
  },
  pClickable: {
    color: theme.palette.primary.dark,
    cursor: "pointer",
    textDecoration: "underline",
  },
});

class StyledParagraph extends Component {
  render() {
    const {
      classes,
      children,
      onClick,
      color = grey[800],
      textAlign = "left",
    } = this.props;
    if (onClick)
      return (
        <p
          className={classes.pClickable}
          onClick={onClick}
          style={{ color, textAlign }}
        >
          {children}
        </p>
      );
    return (
      <p className={classes.p} style={{ color }}>
        {children}
      </p>
    );
  }
}

export default withStyles(useStyles)(StyledParagraph);
