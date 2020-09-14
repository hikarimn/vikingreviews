import React from "react";
import Slide from "@material-ui/core/Slide";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import {
  faArrowRight,
  faSignInAlt,
  faSignOutAlt,
  faUserPlus,
  faQuestion,
  faCommentDots,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchBar from "./SearchBar";
import SlideInDrawer from "./SlideInDrawer";
import Login from "./Login";
import SignUp from "./SignUp";
import FAQ from "./FAQ";
import Settings from "./Settings";
import ContactUs from "./ContactUs";
import auth from "../services/authService";

const useStyles = makeStyles((theme) => ({
  speedDial: {
    position: "fixed",
    top: theme.spacing(2),
    right: theme.spacing(2),
  },
  textField: {
    background: "white",
    fontStyle: "italic",
    boxShadow: theme.shadows[4],
  },
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "white",
  },
  tooltip: {
    whiteSpace: "nowrap",
    fontSize: "0.8rem",
    borderRadius: 0,
    boxShadow: theme.shadows[4],
  },
}));

const Menu = (props) => {
  const {
    home,
    handleDialClick,
    toggleDrawer,
    draw,
    open,
    openDrawer,
    drawerContent,
    searchValue,
    handleSearchChange,
    updateSearchChoices,
    searchChoices,
    ...other
  } = props;
  const user = auth.currentUser();

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

  const guestActions = [
    {
      icon: <FontAwesomeIcon icon={faArrowRight} />,
      name: "Search",
      highlighted: true,
      action: handleClick,
    },
    {
      icon: <FontAwesomeIcon icon={faSignInAlt} />,
      name: "Login",
      highlighted: false,
      action: () => draw(other)(Login),
    },
    {
      icon: <FontAwesomeIcon icon={faUserPlus} />,
      name: "Sign Up",
      highlighted: false,
      action: () => draw(other)(SignUp),
    },
    {
      icon: <FontAwesomeIcon icon={faQuestion} />,
      name: "FAQ",
      highlighted: false,
      action: () => draw(other)(FAQ),
    },
    {
      icon: <FontAwesomeIcon icon={faCommentDots} />,
      name: "Contact Us",
      highlighted: false,
      action: () => draw(other)(ContactUs),
    },
  ];

  const memberActions = [
    {
      icon: <FontAwesomeIcon icon={faArrowRight} />,
      name: "Search",
      highlighted: true,
      action: handleClick,
    },
    {
      icon: <FontAwesomeIcon icon={faCog} />,
      name: "Settings",
      highlighted: false,
      action: () => draw(other)(Settings),
    },
    {
      icon: <FontAwesomeIcon icon={faSignOutAlt} />,
      name: "Logout",
      highlighted: false,
      action: () => {
        auth.logout();
        if (other.location) window.location = other.location.pathname;
        else window.location = "/";
      },
    },
    {
      icon: <FontAwesomeIcon icon={faQuestion} />,
      name: "FAQ",
      highlighted: false,
      action: () => draw(other)(FAQ),
    },
    {
      icon: <FontAwesomeIcon icon={faCommentDots} />,
      name: "Contact Us",
      highlighted: false,
      action: () => draw(other)(ContactUs),
    },
  ];

  const handleActionClick = (action) => () => {
    if (action.action) {
      action.action();
    }
  };

  const theme = useTheme();
  const actions = user ? memberActions : guestActions;
  const classes = useStyles();
  return (
    <>
      {!home && (
        <Slide in={open} direction="down" mountOnEnter unmountOnExit>
          <SearchBar
            home={false}
            value={searchValue}
            onChange={handleSearchChange}
            update={updateSearchChoices}
            choices={searchChoices}
          />
        </Slide>
      )}
      <SpeedDial
        ariaLabel="Menu"
        className={classes.speedDial}
        icon={<MenuIcon />}
        openIcon={<CloseIcon />}
        onClick={handleDialClick}
        direction="down"
        open={open}
        FabProps={{
          style: {
            boxShadow: theme.shadows[5],
          },
        }}
      >
        {actions.map(
          (action) =>
            !(home && action.highlighted) && (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={handleActionClick(action)}
                tooltipOpen
                classes={{ staticTooltipLabel: classes.tooltip }}
                FabProps={{
                  style: action.highlighted
                    ? {
                        backgroundColor: theme.palette.secondary.dark,
                        color: "white",
                        boxShadow: theme.shadows[4],
                      }
                    : {
                        boxShadow: theme.shadows[4],
                      },
                }}
              />
            )
        )}
      </SpeedDial>
      <Drawer anchor="right" open={openDrawer} onClose={toggleDrawer(false)}>
        <SlideInDrawer onClose={toggleDrawer(false)} content={drawerContent} />
      </Drawer>
    </>
  );
};

export default Menu;
