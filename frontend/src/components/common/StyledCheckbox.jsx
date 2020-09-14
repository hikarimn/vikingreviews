import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";

const labelInherit = {
  fontStyle: "italic",
};

const useStyles = makeStyles((theme) => ({
  label: {
    ...labelInherit,
    color: theme.palette.secondary.dark,
  },
  labelChecked: {
    ...labelInherit,
    color: grey[700],
  },
  labelOnPrimary: {
    ...labelInherit,
    color: theme.palette.secondary.main,
  },
  labelCheckedOnPrimary: {
    ...labelInherit,
    color: "white",
  },
  root: {
    margin: "0 0 0 -11px",
  },
  checkbox: {
    color: theme.palette.secondary.dark,
  },
  checkboxOnPrimary: {
    color: theme.palette.secondary.main,
  },
}));

const StyledCheckbox = ({
  checked,
  name,
  onChange,
  label,
  onPrimaryBackground,
}) => {
  const classes = useStyles();
  const labelStyle =
    (onPrimaryBackground &&
      (checked ? classes.labelCheckedOnPrimary : classes.labelOnPrimary)) ||
    (checked ? classes.labelChecked : classes.label);
  return (
    <FormControlLabel
      control={
        <Checkbox
          className={
            onPrimaryBackground ? classes.checkboxOnPrimary : classes.checkbox
          }
          checked={checked}
          onChange={onChange}
          name={name}
          color={onPrimaryBackground ? "secondary" : "primary"}
        />
      }
      label={label}
      classes={{
        label: labelStyle,
        root: classes.root,
      }}
    />
  );
};

export default StyledCheckbox;
