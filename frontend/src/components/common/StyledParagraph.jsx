import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";

const useStyles = (theme) => ({
  clickable: {
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
          className={classes.clickable}
          onClick={onClick}
          style={{ color, textAlign }}
        >
          {children}
        </p>
      );
    return <p style={{ color, textAlign }}>{children}</p>;
  }
}

export default withStyles(useStyles)(StyledParagraph);
