import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";

class ScrollableGrid extends Component {
  render() {
    return (
      <Grid
        container
        direction="column"
        wrap="nowrap"
        style={{
          width: "100%",
          overflow: "auto",
          padding: "10px",
        }}
      >
        {this.props.children}
      </Grid>
    );
  }
}

export default ScrollableGrid;
