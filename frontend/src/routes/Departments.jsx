import React, { Component } from "react";
import axios from "axios";
import config from "./config.json";

class Departments extends Component {
  state = {
    departments: [],
  };

  async componentDidMount() {
    const departments = await axios.get(config.uri + "/api/departments");
    this.setState({ departments: departments.data });
  }

  render() {
    return (
      <ul>
        {this.state.departments.map((department) => (
          <li
            key={department._id}
          >{`${department.code} ${department.name}`}</li>
        ))}
      </ul>
    );
  }
}

export default Departments;
