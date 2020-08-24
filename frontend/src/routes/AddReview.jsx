import React from "react";
import { Link } from "react-router-dom";
import useWindowDimensions from '../misc/useWindowDimensions';
import AddReviewButton from "../components/AddReviewButton";
import StyledButton from "../components/common/StyledButton";
import ErrorIcon from "@material-ui/icons/Error";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useHistory } from "react-router-dom";

import {
  makeStyles,
  Grid,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Slider,
  ButtonGroup,
} from '@material-ui/core'



const useStyles = makeStyles((theme) => ({
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  margin: {
    //margin: theme.spacing(1),
    margin: "10px 0 0 0",
  },

  p: {
    textAlign: "center",
    // color: grey[700],
    fontSize: "100%",
  },
  pageStyles: {
    height: "100vh",
    weight: '100vh',
    background: theme.palette.secondary.main,
  },

  paperStyles: {
    height: "90vh",
    background: "white",
    boxShadow: "10px 10px 0px 0px rgba(0,0,0,0.15)",
    borderRadius: 16,
  },
  inputStyles: {
    height: "80vh",
    background: "white",
    borderRadius: 16,
  },

  tableStyles: {
    height: "60vh",
    [theme.breakpoints.between('xs', 'sm')]: {
      width: '30vh',
      font: '9px',
    },
    [theme.breakpoints.between('sm', 'md')]: {
      width: '54vh',
    },
    [theme.breakpoints.between('md', 'lg')]: {
      width: '84vh',
    },
    [theme.breakpoints.between('lg', 'xl')]: {
      width: '115vh',
    },
    [theme.breakpoints.up('xl')]: {
      width: '140vh',
    },
    // width: '130vh',
    background: "white",
    borderRadius: 16,
  },
  notFound: {
    padding: "0 50px 0 50px",
    textAlign: "center",
    fontWeight: 500,
    fontStyle: "italic",
    color: theme.palette.secondary.dark,
  },
  errorIcon: {
    color: theme.palette.primary.main,
    [theme.breakpoints.down("md")]: {
      fontSize: "200px",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "300px",
    },
  },
}));

function valuetext(value) {
  return `{value}`;
}

export default function EditReview() {
  const classes = useStyles();
  const { height, width } = useWindowDimensions();
  const [isLoggedIn] = React.useState(true);
  const history = useHistory();

  const [autocompLength] = width < 460 ? ("37vh") : "50vh";

  const newDate = new Date();
  const thisYear = newDate.getFullYear();
  const years = ['' + (thisYear - 3), '' + (thisYear - 2), '' + (thisYear - 1), '' + thisYear, '' + (thisYear+1)]
  const terms = ['Fall', 'Winter', 'Spring', 'December'];
  const departments = [ "CMSC Computer Science", "ECON Economics", "MUTH Music Theory", "PSYC Psychology", "SPAN Spanish" ];
  const [valueTerm, setValueTerm] = React.useState(terms[0]);
  const [valueYear, setValueYear] = React.useState(years[3]);
  const [valueDept, setValueDept] = React.useState(departments[0]);
  const [inputValueTerm, setInputValueTerm] = React.useState('');
  const [inputValueYear, setInputValueYear] = React.useState('');
  const [inputValueDept, setInputValueDept] = React.useState('');

  console.log(years);
  console.log(terms);
  console.log(typeof years[0]);

  if (!isLoggedIn) {
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
          sm={8}
          md={6}
          lg={4}
          container
          className={classes.paperStyles}
          justify="center"
          alignItems="center"
          direction="column"
        >
          <Typography className={classes.notFound} variant="h4">
            Oops, you need to log in first to leave a review.
          </Typography>
          <Grid container type="row" justify="center">
            <ErrorIcon className={classes.errorIcon} />
          </Grid>
          <StyledButton text="Back to Home" onClick={() => history.push("/")} />
        </Grid>
      </Grid>
    );

  } else {
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
          xs={11}
          sm={8}
          container
          className={classes.paperStyles}
          justify="center"
          alignItems="center"
          direction="column"
        >
          <Grid
            container
            xs={11}
            sm={8}
            className={classes.inputStyles}
          >
            <Typography
              variant={width < 460 ? ("caption") : "body1"}
              gutterBottom
            >
              Leave your review
          </Typography>
            <Grid
              container
              spacing={2}
              direction="row"
              justify="flex-start"
              alignItems="baseline"
            >
              <Grid item xs={6} sm={6}>
              <Autocomplete
                  value={valueDept}
                  onChange={(event, newValue) => {
                    setValueDept(newValue);
                  }}
                  inputValue={inputValueDept}
                  onInputChange={(event, newInputValue) => {
                    setInputValueDept(newInputValue);
                  }}
                  id="controllable-states-demo"
                  options={departments}
                  style={{ width: autocompLength }}
                  renderOption={(option) => (
                    <React.Fragment>
                      <span>{option}</span>
                    </React.Fragment>
                  )}
                  renderInput={(params) =>
                    <TextField {...params}
                      label="Department"
                      variant="outlined"
                      size={width < 460 ? ("small") : "normal"}
                    />}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <TextField
                  required
                  id="course_id"
                  name="course_id"
                  label="Course #"
                  autoComplete="course_id"
                  variant="outlined"
                  fullWidth
                  size={width < 460 ? ("small") : "normal"}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <Autocomplete
                  value={valueTerm}
                  onChange={(event, newValue) => {
                    setValueTerm(newValue);
                  }}
                  inputValue={inputValueTerm}
                  onInputChange={(event, newInputValue) => {
                    setInputValueTerm(newInputValue);
                  }}
                  id="controllable-states-demo"
                  options={terms}
                  style={{ width: autocompLength }}
                  renderInput={(params) =>
                    <TextField {...params}
                      label="Term"
                      variant="outlined"
                      size={width < 460 ? ("small") : "normal"}
                    />}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <Autocomplete
                  value={valueYear}
                  onChange={(event, newValue) => {
                    setValueYear(newValue);
                  }}
                  inputValue={inputValueYear}
                  onInputChange={(event, newInputValue) => {
                    setInputValueYear(newInputValue);
                  }}
                  id="controllable-states-demo"
                  options={years}
                  style={{ width: autocompLength }}
                  renderInput={(params) => <TextField {...params} label="Year" variant="outlined" size={width < 460 ? ("small") : "normal"}/>}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="instructor"
                  name="instructor"
                  label="Instructor"
                  fullWidth
                  autoComplete="instructor"
                  variant="outlined"
                  size={width < 460 ? ("small") : "normal"}
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography
                  id="discrete-slider"
                  gutterBottom
                  variant={width < 460 ? ("caption") : "body1"}
                >
                  Workload
              </Typography>
                <Typography
                  id="discrete-slider"
                  gutterBottom
                  variant={width < 460 ? ("caption") : "body1"}
                >
                  (1: light - 5: heavy)
              </Typography>
                <Slider
                  defaultValue={3}
                  getAriaValueText={valuetext}
                  aria-labelledby="discrete-slider"
                  valueLabelDisplay="auto"
                  step={0.1}
                  marks
                  min={1}
                  max={5}
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography
                  id="discrete-slider"
                  gutterBottom
                  variant={width < 460 ? ("caption") : "body1"}
                >
                  Grading
              </Typography>
                <Typography
                  id="discrete-slider"
                  gutterBottom
                  variant={width < 460 ? ("caption") : "body1"}
                >
                  (1: easy - 5: hard)
              </Typography>
                <Slider
                  defaultValue={3}
                  getAriaValueText={valuetext}
                  aria-labelledby="discrete-slider"
                  valueLabelDisplay="auto"
                  step={0.1}
                  marks
                  min={1}
                  max={5}
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography
                  id="discrete-slider"
                  gutterBottom
                  variant={width < 460 ? ("caption") : "body1"}
                >
                  Enthusiasm
              </Typography>
                <Typography
                  id="discrete-slider"
                  gutterBottom
                  variant={width < 460 ? ("caption") : "body1"}
                >
                  (1: little - 5: lot)
              </Typography>
                <Slider
                  defaultValue={3}
                  getAriaValueText={valuetext}
                  aria-labelledby="discrete-slider"
                  valueLabelDisplay="auto"
                  step={0.1}
                  marks
                  min={1}
                  max={5}
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography
                  id="discrete-slider"
                  gutterBottom
                  variant={width < 460 ? ("caption") : "body1"}
                >
                  Textbook Usage
              </Typography>
                <Typography
                  id="discrete-slider"
                  gutterBottom
                  variant={width < 460 ? ("caption") : "body1"}
                >
                  (1: light - 5: heavy)
              </Typography>
                <Slider
                  defaultValue={3}
                  getAriaValueText={valuetext}
                  aria-labelledby="discrete-slider"
                  valueLabelDisplay="auto"
                  step={0.1}
                  marks
                  min={1}
                  max={5}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="review_text"
                  name="review_text"
                  label="Comment"
                  fullWidth
                  autoComplete="review_text"
                  variant="outlined"
                  size={width < 460 ? ("small") : "normal"}
                  rows={2}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={<Checkbox color="secondary" name="anonymous" value="yes" />}

                  label="Stay anonymous"
                />
              </Grid>
              <Grid item xs={6}>
                <AddReviewButton text={width < 960 ? ("Submit Review") : 'Submit your review'} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
