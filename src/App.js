import React, { Component, Fragment } from "react";

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  //validate formerrors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  //validate form was fill out
  Object.values(rest).forEach(val => {
    val === "" && (valid = false);
  });

  return valid;
};

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      formErrors: {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      }
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
      console.log(`
      ---SUBMITTING---
      First Name: ${this.state.firstName}
      Last Name: ${this.state.lastName}
      Email: ${this.state.email}
      Password: ${this.state.password}
      `);
    } else {
      console.error(`Error: Check your details`);
    }
  };

  handleChange = e => {
    const { name, value } = e.target;
    let Errors = this.state.formErrors;

    this.setState({
      [name]: value
    });

    switch (name) {
      case "firstName":
        Errors.firstName =
          value.length < 3 ? "minimum 3 characters required" : "";
        break;

      case "lastName":
        Errors.lastName =
          value.length < 2 ? "minimum 2 characters required" : "";
        break;

      case "email":
        Errors.email =
          emailRegex.test(value) && value.length > 0
            ? ""
            : "Enter a valid email address";
        break;

      case "password":
        Errors.password =
          value.length < 6 ? "password should be of minimum 6 characters" : "";
        break;

      default:
        break;
    }

    this.setState({
      formErrors: Errors
    });

    e.preventDefault();
  };

  render() {
    const { formErrors } = this.state;

    return (
      <Fragment>
        <div className="wrapper">
          <div className="form-wrapper">
            <h1>Create Account</h1>
            <form onSubmit={this.handleSubmit} noValidate>
              <div className="firstName">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  className={formErrors.firstName.length > 0 ? "error" : ""}
                  name="firstName"
                  value={this.state.firstName}
                  onChange={this.handleChange}
                  placeholder="Enter First Name here"
                  noValidate
                />
                {formErrors.firstName.length > 0 && (
                  <span className="errorMessage">{formErrors.firstName}</span>
                )}
              </div>

              <div className="lastName">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  className={formErrors.lastName.length > 0 ? "error" : ""}
                  name="lastName"
                  value={this.state.lastName}
                  onChange={this.handleChange}
                  placeholder="Enter Last Name here"
                  noValidate
                />
                {formErrors.lastName.length > 0 && (
                  <span className="errorMessage">{formErrors.lastName}</span>
                )}
              </div>

              <div className="email">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className={formErrors.email.length > 0 ? "error" : ""}
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  placeholder="Enter Email here"
                  noValidate
                />
                {formErrors.email.length > 0 && (
                  <span className="errorMessage">{formErrors.email}</span>
                )}
              </div>

              <div className="password">
                <label htmlFor="password">password</label>
                <input
                  type="password"
                  className={formErrors.password.length > 0 ? "error" : ""}
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  placeholder="password"
                  noValidate
                />
                {formErrors.password.length > 0 && (
                  <span className="errorMessage">{formErrors.password}</span>
                )}
              </div>

              <div className="createAccount">
                <button type="submit">Create Account</button>
                <small>Already Have an Account?</small>
              </div>
            </form>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default App;
