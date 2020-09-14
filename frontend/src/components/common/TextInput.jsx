import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { red, pink } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  textField: {
    background: "white",
    boxShadow: theme.shadows[7],
    borderRadius: 0,
  },
  textFieldNoShadow: {
    background: "white",
    borderRadius: 0,
  },
  whiteOutline: {
    borderWidth: "1px",
    borderColor: "white !important",
  },
  errorOutline: {
    borderWidth: "2px",
    borderColor: `${red[300]} !important`,
  },
  errorOutlineOnPrimary: {
    borderWidth: "2px",
    borderColor: `${pink[100]} !important`,
  },
  errorText: {
    fontStyle: "italic",
    fontWeight: 500,
    color: red[300],
    fontSize: "85%",
    margin: "10px 0 0 0",
  },
  errorTextOnPrimary: {
    fontStyle: "italic",
    fontWeight: 500,
    color: pink[100],
    fontSize: "85%",
    margin: "10px 0 0 0",
  },
}));

const TextInput = ({
  placeholder = "",
  startAdornment = "",
  errorText = null,
  autoFocus = false,
  password = false,
  multiline = false,
  onChange,
  defaultValue,
  name,
  outline = false,
  noShadow = false,
  onPrimaryBackground = false,
}) => {
  const classes = useStyles();

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    (password && (
      <>
        <OutlinedInput
          className={!noShadow ? classes.textField : classes.textFieldNoShadow}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          autoFocus={autoFocus}
          onChange={onChange}
          name={name}
          classes={{
            notchedOutline:
              !outline &&
              ((errorText &&
                (onPrimaryBackground
                  ? classes.errorOutlineOnPrimary
                  : classes.errorOutline)) ||
                classes.whiteOutline),
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
        {errorText && (
          <p
            className={
              onPrimaryBackground
                ? classes.errorTextOnPrimary
                : classes.errorText
            }
          >
            {errorText}
          </p>
        )}
      </>
    )) || (
      <>
        <TextField
          className={!noShadow ? classes.textField : classes.textFieldNoShadow}
          placeholder={placeholder}
          variant="outlined"
          multiline={multiline}
          autoFocus={autoFocus}
          onChange={onChange}
          name={name}
          defaultValue={defaultValue}
          InputProps={{
            startAdornment: startAdornment && (
              <InputAdornment position="start">{startAdornment}</InputAdornment>
            ),
            classes: {
              notchedOutline:
                !outline &&
                ((errorText &&
                  (onPrimaryBackground
                    ? classes.errorOutlineOnPrimary
                    : classes.errorOutline)) ||
                  classes.whiteOutline),
            },
          }}
        />
        {errorText && (
          <p
            className={
              onPrimaryBackground
                ? classes.errorTextOnPrimary
                : classes.errorText
            }
          >
            {errorText}
          </p>
        )}
      </>
    )
  );
};

export default TextInput;
