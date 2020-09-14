import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import TextInput from "./common/TextInput";
import StyledButton from "./common/StyledButton";
import DrawerHeader from "./common/DrawerHeader";
import auth from "../services/authService";
import { loginSchema } from "../utils/validationSchemas";
import * as validation from "../utils/validation";
import StyledParagraph from "./common/StyledParagraph";
import SignUp from "./SignUp";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { data: { email: "", password: "" }, errors: {} };
    this.schema = loginSchema;
    this.validate = validation.validate.bind(this);
    this.validateProperty = validation.validateProperty.bind(this);
    this.handleChange = validation.handleChange.bind(this);
  }

  handleSubmit = async (location) => {
    try {
      const { data } = this.state;
      await auth.login(data.email, data.password);
      if (location) window.location = location.pathname;
      else window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    const { errors } = this.state;
    const { location, switchTo, ...other } = this.props;
    console.log("Login location", location);
    console.log("Login other", other);
    return (
      <>
        <DrawerHeader>Login</DrawerHeader>
        <Grid item container direction="column" justify="center" spacing={2}>
          <Grid item container direction="column" justify="center">
            <TextInput
              placeholder="Email"
              name="email"
              autoFocus
              defaultValue=""
              onChange={this.handleChange}
              errorText={errors && errors.email ? errors.email : null}
            />
          </Grid>
          <Grid item container direction="column" justify="center">
            <TextInput
              placeholder="Password"
              name="password"
              password
              defaultValue=""
              onChange={this.handleChange}
              errorText={errors && errors.password ? errors.password : null}
            />
          </Grid>
          <Grid item container direction="row" justify="center">
            <StyledButton
              text="Log in"
              disabled={this.validate() ? true : false}
              onClick={() => this.handleSubmit(location)}
            />
          </Grid>
          <StyledParagraph
            onClick={() => switchTo(SignUp, other)}
            textAlign="center"
          >
            Don't have an account yet? Click here to sign up!
          </StyledParagraph>
        </Grid>
      </>
    );
  }
}

export default Login;
