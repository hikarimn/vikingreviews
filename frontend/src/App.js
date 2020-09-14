import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import EditReview from "./routes/EditReview";
import AddReviewPage from "./routes/AddReviewPage";
import Reviews from "./routes/Reviews";
import Courses from "./routes/Courses";
import Courses2 from "./routes/Courses2";
import Department from "./routes/Department";
import auth from "./services/authService";
import departments from "./services/departmentService";
import courses from "./services/courseService";
import instructors from "./services/instructorService";
import menuActions from "./utils/menuActions";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      open: false,
      openDrawer: false,
      drawerContent: <></>,
      searchChoices: [],
      searchValue: null,
    };
    this.handleDialClick = menuActions.handleDialClick.bind(this);
    this.toggleDrawer = menuActions.toggleDrawer.bind(this);
    this.draw = menuActions.draw.bind(this);
    this.setDrawerContent = menuActions.setDrawerContent.bind(this);
    this.switchTo = menuActions.switchTo.bind(this);
    this.addMenu = menuActions.addMenu.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.updateSearchChoices = this.updateSearchChoices.bind(this);
  }

  async updateSearchChoices(clearCache) {
    const allCourses = await courses.getAll(clearCache);
    const allDepartments = await departments.getAll(clearCache);
    const allInstructors = await instructors.getAll(clearCache);

    const searchChoices = [
      ...allDepartments.map((department) => ({
        _id: department._id,
        left: department.code,
        right: department.name,
        type: "Department",
      })),
      ...allCourses.map((course) => ({
        _id: course._id,
        left: `${course.department.code} ${course.number}`,
        right: course.title,
        type: "Course",
      })),
      ...allInstructors.map((instructor) => ({
        _id: instructor._id,
        left: `${instructor.firstName} ${instructor.lastName}`,
        right: instructor.department.code,
        type: "Instructor",
      })),
    ];
    this.setState({ searchChoices });
  }

  handleSearchChange(event, newValue) {
    this.setState({ searchValue: newValue });
  }

  async componentDidMount() {
    const user = auth.currentUser();
    this.setState({ user });
    await this.updateSearchChoices(true);
  }

  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/" render={this.addMenu(Home, true)} />
          <Route path="/404" render={this.addMenu(NotFound)} />
          <Route path="/reviews/edit" render={this.addMenu(EditReview)} />
          <Route path="/reviews/add" render={this.addMenu(AddReviewPage)} />
          <Route path="/profile/edit" render={this.addMenu(EditReview)} />
          <Route path="/departments/:id" render={this.addMenu(Department)} />
          <Route path="/courses/:id" render={this.addMenu(Courses2)} />
          {/* <Route exact path="/courses" render={this.addMenu(Courses)} /> */}
          <Route path="/reviews" render={this.addMenu(Reviews)} />
          <Redirect to="/404" />
        </Switch>
      </main>
    );
  }
}

export default App;
