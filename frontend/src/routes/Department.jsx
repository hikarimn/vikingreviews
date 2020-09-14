import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import courses from "../services/courseService";
import { Link } from "react-router-dom";

const useStyles = (theme) => ({
  pageStyles: {
    height: "100vh",
    background: theme.palette.secondary.main,
  },
});

class Department extends Component {
  state = { courses: [] };

  async componentDidMount() {
    const departmentId = this.props.match.params.id;
    const data = await courses.getByDepartment(departmentId);
    this.setState({ courses: data });
  }

  render() {
    const { classes, user, draw, ...other } = this.props;
    return this.state.courses.map((course) => {
      return (
        <Link
          to={{
            pathname: `/courses/${course._id}`,
            state: { detail: course },
          }}
          key={course._id}
        >
          <Typography>{course.title}</Typography>
        </Link>
      );
    });
  }
}

export default withStyles(useStyles)(Department);
