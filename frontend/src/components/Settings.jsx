import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import TextInput from "./common/TextInput";
import StyledButton from "./common/StyledButton";
import DrawerHeader from "./common/DrawerHeader";
import StyledAccordion from "./common/StyledAccordion";
import grey from "@material-ui/core/colors/grey";

const Settings = () => {
  const [expanded, setExpanded] = React.useState("");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <>
      <DrawerHeader>Settings</DrawerHeader>
    </>
  );
};

export default Settings;
