import React from "react";
import { Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Logo from "../components/common/Logo";
import grey from "@material-ui/core/colors/grey";
import SearchBar from "../components/SearchBar";
import StyledButton from "../components/common/StyledButton";

const useStyles = makeStyles((theme) => ({
  pageStyles: {
    height: "100vh",
    background: theme.palette.secondary.main,
  },
  header: {
    textAlign: "center",
  },
  textField: {
    background: "white",
    boxShadow: theme.shadows[5],
    fontStyle: "italic",
  },
  p: {
    textAlign: "center",
    fontStyle: "italic",
    color: grey[600],
    fontSize: "85%",
  },
}));

const Home = ({
  handleSearchChange,
  searchValue,
  updateSearchChoices,
  searchChoices,
  ...other
}) => {
  const handleClick = () => {
    if (searchValue.type.toLowerCase() === "course") {
      other.history.push({
        pathname: `/courses/${searchValue._id}`,
        state: { detail: searchValue },
      });
    } else if (searchValue.type.toLowerCase() === "department") {
      other.history.push({
        pathname: `/departments/${searchValue._id}`,
        state: { detail: searchValue },
      });
    }
  };

  const classes = useStyles();
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
        sm={4}
        container
        justify="center"
        alignItems="stretch"
        direction="column"
      >
        <div className={classes.header}>
          <Logo />
        </div>
        <SearchBar
          home
          value={searchValue}
          onChange={handleSearchChange}
          update={updateSearchChoices}
          choices={searchChoices}
        />

        <p className={classes.p}>...or type "All" to compare all courses!</p>
        <Grid container type="row" justify="center">
          <StyledButton text="Search" onClick={handleClick} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Home;
