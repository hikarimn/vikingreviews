import React from "react";
import Slider from "@material-ui/core/Slider";
import Grid from "@material-ui/core/Grid";
import StyledParagraph from "./StyledParagraph";
import { makeStyles } from "@material-ui/core/styles";

const markLabelInherit = (theme) => ({
  '&[data-index="0"]': {
    transform: "translateX(0%)",
  },
  '&[data-index="10"]': {
    transform: "translateX(-100%)",
  },
});

const useStyles = makeStyles((theme) => ({
  markLabel: {
    ...markLabelInherit(theme),
    color: theme.palette.secondary.light,
  },
  markLabelDisabled: {
    ...markLabelInherit(theme),
    color: theme.palette.primary.light,
  },
  markLabelActive: {
    color: "white",
  },
  markLabelActiveDisabled: {
    color: theme.palette.primary.light,
  },
  valueLabel: {
    color: theme.palette.primary.dark,
  },
  disabled: {
    color: theme.palette.primary.light,
  },
  root: {
    "&$disabled": {
      color: theme.palette.primary.light,
    },
  },
}));

const StyledSlider = ({ children, textColor, marks, disabled }) => {
  const classes = useStyles();
  return (
    <>
      <StyledParagraph color={textColor}>{children}</StyledParagraph>
      <Slider
        className={classes.root}
        defaultValue={5}
        valueLabelDisplay="auto"
        step={1}
        marks={marks}
        min={0}
        max={10}
        track={false}
        color="secondary"
        disabled={disabled}
        classes={{
          markLabel: disabled ? classes.markLabelDisabled : classes.markLabel,
          valueLabel: classes.valueLabel,
          markLabelActive: disabled
            ? classes.markLabelActiveDisabled
            : classes.markLabelActive,
          disabled: classes.disabled,
        }}
      />
    </>
  );
};

export default StyledSlider;
