import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import DrawerHeader from "./common/DrawerHeader";
import StyledAccordion from "./common/StyledAccordion";
import SearchBar from "./SearchBar";
import _ from "lodash";
import StyledSlider from "./common/StyledSlider";
import TextInput from "./common/TextInput";
import StyledButton from "./common/StyledButton";
import StyledCheckbox from "./common/StyledCheckbox";
import { addReviewSchema, maxComment } from "../utils/validationSchemas";
import * as validation from "../utils/validation";
import { pink } from "@material-ui/core/colors";

const terms = [
  { key: "Fall", value: "F" },
  { key: "Winter", value: "W" },
  { key: "Spring", value: "S" },
  { key: "December", value: "D" },
];

class AddReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: "",
      checkboxes: { anonymous: false, lab: false },
      data: {
        course: this.props.detail,
        instructor: null,
        comment: "",
        workload: null,
        lab: null,
        homework: null,
        classParticipation: null,
        instructorEnthusiasm: null,
        grading: null,
        flexibility: null,
        textbookUse: null,
        term: null,
        year: null,
      },
      errors: {},
    };
    this.schema = addReviewSchema;
    this.validate = validation.validate.bind(this);
    this.validateProperty = validation.validateProperty.bind(this);
    this.handleChange = validation.handleChange.bind(this);
  }

  handlePanelExpand = (panel) => (event, newExpanded) => {
    const expanded = newExpanded ? panel : false;
    this.setState({ expanded });
  };

  getYearsArray = () => {
    const currentYear = new Date().getFullYear();
    return _.range(currentYear - 10, currentYear + 1)
      .reverse()
      .map((year) => year.toString());
  };

  generateMarks = (zero, five, ten) => {
    return [
      { value: 0, label: zero },
      { value: 1, label: "" },
      { value: 2, label: "" },
      { value: 3, label: "" },
      { value: 4, label: "" },
      { value: 5, label: five },
      { value: 6, label: "" },
      { value: 7, label: "" },
      { value: 8, label: "" },
      { value: 9, label: "" },
      { value: 10, label: ten },
    ];
  };

  handleCheckbox = (event) => {
    const checkboxes = { ...this.state.checkboxes };
    checkboxes[event.target.name] = event.target.checked;
    this.setState({ checkboxes });
  };

  handleInputChange = (name) => (event, newValue) => {
    const data = { ...this.state.data };
    data[name] = newValue;
    this.setState({ data });
  };

  render() {
    const { expanded, checkboxes, data, errors } = this.state;
    return (
      <>
        <DrawerHeader>Add Review</DrawerHeader>
        <Grid container direction="column" spacing={2} alignItems="center">
          <Grid item container direction="column">
            <StyledAccordion
              header="Course Information"
              expanded={expanded === "panel1"}
              onChange={this.handlePanelExpand("panel1")}
              highlighted
            >
              <Grid container justify="center" style={{ width: "100%" }}>
                <Grid
                  item
                  direction="column"
                  alignItems="stretch"
                  container
                  spacing={3}
                  style={{
                    padding: "10px 0px",
                  }}
                >
                  <Grid item>
                    <SearchBar
                      types={["course"]}
                      inherit
                      value={data.course}
                      onChange={this.handleInputChange("course")}
                      choices={this.props.searchChoices}
                      disabled={this.props.detail !== null}
                    >
                      Course...
                    </SearchBar>
                  </Grid>
                  <Grid item>
                    <SearchBar
                      options={["Fall", "Winter", "Spring", "December"]}
                      inherit
                      value={data.term}
                      onChange={this.handleInputChange("term")}
                    >
                      Term...
                    </SearchBar>
                  </Grid>
                  <Grid item>
                    <SearchBar
                      options={this.getYearsArray()}
                      inherit
                      value={data.year}
                      onChange={this.handleInputChange("year")}
                    >
                      Year...
                    </SearchBar>
                  </Grid>
                </Grid>
              </Grid>
            </StyledAccordion>
            <StyledAccordion
              header="Instructor"
              expanded={expanded === "panel2"}
              onChange={this.handlePanelExpand("panel2")}
              highlighted
            >
              <Grid container justify="center" style={{ width: "100%" }}>
                <Grid
                  item
                  direction="column"
                  alignItems="stretch"
                  container
                  spacing={3}
                  style={{
                    padding: "10px 0px",
                  }}
                >
                  <Grid item>
                    <SearchBar
                      types={["instructor"]}
                      inherit
                      value={data.instructor}
                      onChange={this.handleInputChange("instructor")}
                      choices={this.props.searchChoices}
                    >
                      Instructor...
                    </SearchBar>
                  </Grid>
                  <Grid item>
                    <StyledSlider
                      textColor="white"
                      marks={this.generateMarks(
                        "Very unenthusiastic",
                        "OK",
                        "Very enthusiastic"
                      )}
                    >
                      Enthusiasm:
                    </StyledSlider>
                  </Grid>
                  <Grid item>
                    <StyledSlider
                      textColor="white"
                      marks={this.generateMarks(
                        "Very lenient",
                        "OK",
                        "Very strict"
                      )}
                    >
                      Grading:
                    </StyledSlider>
                  </Grid>
                  <Grid item>
                    <StyledSlider
                      textColor="white"
                      marks={this.generateMarks(
                        "Very flexible",
                        "OK",
                        "Very rigid"
                      )}
                    >
                      Flexibility:
                    </StyledSlider>
                  </Grid>
                  <Grid item>
                    <SearchBar
                      options={["Never", "Sometimes", "Always"]}
                      inherit
                      value={data.textbookUse}
                      onChange={this.handleInputChange("textbookUse")}
                    >
                      Textbook usage...
                    </SearchBar>
                  </Grid>
                </Grid>
              </Grid>
            </StyledAccordion>
            <StyledAccordion
              header="Workload"
              expanded={expanded === "panel3"}
              onChange={this.handlePanelExpand("panel3")}
              highlighted
            >
              <Grid container justify="center" style={{ width: "100%" }}>
                <Grid
                  item
                  direction="column"
                  alignItems="stretch"
                  container
                  spacing={3}
                  style={{
                    padding: "10px 0px",
                  }}
                >
                  <Grid item>
                    <StyledSlider
                      textColor="white"
                      marks={this.generateMarks("None", "Weekly", "Daily")}
                    >
                      Homework:
                    </StyledSlider>
                  </Grid>
                  <Grid item>
                    <StyledSlider
                      textColor="white"
                      marks={this.generateMarks(
                        "Not required",
                        "Occasional",
                        "Strict"
                      )}
                    >
                      Class Participation:
                    </StyledSlider>
                  </Grid>
                  <Grid item container direction="column">
                    <StyledSlider
                      textColor="white"
                      marks={this.generateMarks("Very easy", "OK", "Very hard")}
                      disabled={checkboxes.lab}
                    >
                      Lab:
                    </StyledSlider>
                    <Grid item container justify="flex-end">
                      <StyledCheckbox
                        checked={checkboxes.lab}
                        onChange={this.handleCheckbox}
                        name="lab"
                        label="Not applicable"
                        onPrimaryBackground
                      />
                    </Grid>
                  </Grid>
                  <Grid item>
                    <StyledSlider
                      textColor="white"
                      marks={this.generateMarks("Very easy", "OK", "Very hard")}
                    >
                      Overall:
                    </StyledSlider>
                  </Grid>
                </Grid>
              </Grid>
            </StyledAccordion>
            <StyledAccordion
              header="Review"
              expanded={expanded === "panel4"}
              onChange={this.handlePanelExpand("panel4")}
              highlighted
            >
              <Grid item container direction="column" justify="center">
                <p
                  style={{
                    color:
                      (data.comment.length >= maxComment - 10 && pink[100]) ||
                      "white",
                    fontStyle: "italic",
                    textAlign: "right",
                    margin: "0 0 5px 0",
                    fontSize: "85%",
                  }}
                >{`${maxComment - data.comment.length}/${maxComment}`}</p>
                <TextInput
                  placeholder="Any other specific thing you want to say about this course?"
                  multiline
                  name="comment"
                  defaultValue=""
                  onChange={this.handleChange}
                  errorText={errors && errors.comment ? errors.comment : null}
                  onPrimaryBackground
                />
              </Grid>
            </StyledAccordion>
          </Grid>
          <Grid item container justify="center" alignItems="center">
            <StyledCheckbox
              checked={checkboxes.anonymous}
              onChange={this.handleCheckbox}
              name="anonymous"
              label="Stay anonymous"
            />
          </Grid>
          <Grid item container justify="center" alignItems="center">
            <StyledButton text="Submit" />
          </Grid>
        </Grid>
      </>
    );
  }
}

export default AddReview;
