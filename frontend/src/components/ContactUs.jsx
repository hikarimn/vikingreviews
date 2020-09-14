import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { grey, red } from "@material-ui/core/colors";
import { withStyles } from "@material-ui/core/styles";
import TextInput from "./common/TextInput";
import StyledButton from "./common/StyledButton";
import DrawerHeader from "./common/DrawerHeader";
import { contactUsSchema, maxContact } from "../utils/validationSchemas";
import * as validation from "../utils/validation";
import StyledParagraph from "./common/StyledParagraph";

const useStyles = () => ({
  counter: {
    fontStyle: "italic",
    color: grey[800],
    textAlign: "right",
    margin: "0 0 5px 0",
    fontSize: "85%",
  },
});

class ContactUs extends Component {
  constructor(props) {
    super(props);
    const state = { data: { email: "", comment: "" }, errors: {} };
    if (props.user) state.data.email = props.user.email;
    this.state = state;
    this.schema = contactUsSchema;
    this.validate = validation.validate.bind(this);
    this.validateProperty = validation.validateProperty.bind(this);
    this.handleChange = validation.handleChange.bind(this);
  }

  handleSubmit = () => {
    const errors = this.validate();
    console.log(errors);
    this.setState({ errors });
  };

  render() {
    const { classes } = this.props;
    const { data, errors } = this.state;

    return (
      <>
        <DrawerHeader>Contact Us</DrawerHeader>
        <StyledParagraph>
          Fill out this form if you want to report incorrect information, report
          a bug, or suggest new features.
        </StyledParagraph>
        <Grid container direction="column" justify="center" spacing={2}>
          <Grid item container direction="column" justify="center">
            <TextInput
              placeholder="Email"
              name="email"
              autoFocus
              defaultValue={data.email}
              onChange={this.handleChange}
              errorText={errors && errors.email ? errors.email : null}
            />
          </Grid>
          <Grid item container direction="column" justify="center">
            <p
              className={classes.counter}
              style={{
                color: data.comment.length >= maxContact - 10 && red[300],
              }}
            >{`${maxContact - data.comment.length}/${maxContact}`}</p>
            <TextInput
              placeholder="What do you want us to know about?"
              multiline
              name="comment"
              defaultValue=""
              onChange={this.handleChange}
              errorText={errors && errors.comment ? errors.comment : null}
            />
          </Grid>
          <Grid item container direction="row" justify="center">
            <StyledButton
              text="Submit"
              disabled={this.validate() ? true : false}
            />
          </Grid>
        </Grid>
      </>
    );
  }
}

export default withStyles(useStyles)(ContactUs);
