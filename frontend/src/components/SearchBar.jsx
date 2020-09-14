import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Autocomplete } from "@material-ui/lab";
import courses from "../services/courseService";
import departments from "../services/departmentService";
import instructors from "../services/instructorService";

const useStyles = (theme) => ({
  margin: {
    margin: "10px 0 0 0",
  },
  textField: {
    background: "white",
    boxShadow: theme.shadows[7],
    //fontStyle: "italic",
  },
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "white",
  },
  textFieldPosition: {
    position: "fixed",
    width: 280,
    [theme.breakpoints.down("xs")]: {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    [theme.breakpoints.up("sm")]: {
      top: theme.spacing(2),
      right: theme.spacing(12),
    },
  },
  option: {
    fontSize: 15,
    "& > span": {
      marginRight: 10,
      fontSize: 18,
      fontWeight: "bold",
    },
  },
  customOption: {
    fontSize: 15,
  },
});

// const choices = [
//   // sort groups before display
//   { left: "CMSC", right: "Computer Science", type: "Department", _id: 0 },
//   { left: "ECON", right: "Economics", type: "Department", _id: 1 },
//   { left: "MUTH", right: "Music Theory", type: "Department", _id: 2 },
//   { left: "PSYC", right: "Psychology", type: "Department", _id: 3 },
//   { left: "SPAN", right: "Spanish", type: "Department", _id: 4 },
//   {
//     left: "CMSC 150",
//     right: "Intro to Computer Science",
//     type: "Course",
//     _id: 5,
//   },
//   { left: "ECON 120", right: "Some Kind of Economics", type: "Course", _id: 6 },
//   { left: "MUTH 420", right: "Schenkerian Analysis", type: "Course", _id: 7 },
//   { left: "PSYC 270", right: "Social Psychology", type: "Course", _id: 8 },
//   {
//     left: "SPAN 100",
//     right: "Introduction to Spanish",
//     type: "Course",
//     _id: 9,
//   },
//   { left: "Joseph Gregg", right: "CMSC", type: "Instructor", _id: 10 },
//   { left: "Barack Obama", right: "ECON", type: "Instructor", _id: 11 },
//   { left: "Ian Bates", right: "MUTH", type: "Instructor", _id: 12 },
//   { left: "Cardi B", right: "PSYC", type: "Instructor", _id: 13 },
//   { left: "Ariana Grande", right: "SPAN", type: "Instructor", _id: 14 },
// ];

class SearchBar extends Component {
  filterChoices = (types) => {
    let all = [];
    types.map((type) => {
      all = [
        ...all,
        ...this.props.choices.filter(
          (choice) => choice.type.toLowerCase() === type
        ),
      ];
    });
    return all;
  };

  render() {
    const {
      home = false,
      classes,
      types,
      inherit = false,
      children,
      options = null,
      value,
      onChange,
      name,
      choices,
      disabled,
    } = this.props;
    return (
      (options && (
        <Autocomplete
          className={(!inherit && !home && classes.textFieldPosition) || ""}
          disabled={disabled}
          options={options}
          getOptionLabel={(option) => option}
          classes={{
            option: classes.customOption,
          }}
          name={name}
          value={value}
          onChange={onChange}
          renderOption={(option) => option}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={children}
              variant="outlined"
              className={classes.textField}
              InputProps={{
                ...params.InputProps,
                classes: {
                  notchedOutline: classes.notchedOutline,
                },
              }}
            />
          )}
        />
      )) || (
        <Autocomplete
          className={(!inherit && !home && classes.textFieldPosition) || ""}
          disabled={disabled}
          options={types ? this.filterChoices(types) : choices}
          getOptionLabel={(option) => `${option.left} ${option.right}`}
          groupBy={(option) => option.type}
          classes={{
            option: classes.option,
          }}
          name={name}
          value={value}
          onChange={onChange}
          renderOption={(option) => (
            <React.Fragment>
              <span>{option.left}</span>
              {option.right}
            </React.Fragment>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={
                children ||
                (home && "Search for department, class, or professor...") ||
                "Search..."
              }
              variant="outlined"
              className={classes.textField}
              InputProps={{
                ...params.InputProps,
                classes: {
                  notchedOutline: classes.notchedOutline,
                },
              }}
            />
          )}
        />
      )
    );
  }
}

export default withStyles(useStyles)(SearchBar);
