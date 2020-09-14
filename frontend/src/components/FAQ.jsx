import React, { Component } from "react";
import DrawerHeader from "./common/DrawerHeader";
import StyledAccordion from "./common/StyledAccordion";
import ScrollableGrid from "./common/ScrollableGrid";
import StyledParagraph from "./common/StyledParagraph";

class FAQ extends Component {
  state = { expanded: "" };

  handleChange = (panel) => (event, newExpanded) => {
    const expanded = newExpanded ? panel : false;
    this.setState({ expanded });
  };

  render() {
    const { expanded } = this.state;
    return (
      <>
        <DrawerHeader>FAQ</DrawerHeader>
        <StyledAccordion
          header="Who are the creators of this project?"
          expanded={expanded === "panel1"}
          onChange={this.handleChange("panel1")}
        >
          <StyledParagraph>
            This project was created by Hikari Miné '20 and Kiet Nguyen '21 in
            the summer of 2020. You can reach out to us using the "Contact us"
            form.
          </StyledParagraph>
        </StyledAccordion>
        <StyledAccordion
          header="How can I use the search bar?"
          expanded={expanded === "panel2"}
          onChange={this.handleChange("panel2")}
        >
          <StyledParagraph>
            You can search for a course using the search bar, after which you
            can read all the reviews for that course or add a new one. You can
            also search for courses in a department or those taught by an
            instructor.
          </StyledParagraph>
        </StyledAccordion>
        <StyledAccordion
          header="Can I compare courses?"
          expanded={expanded === "panel3"}
          onChange={this.handleChange("panel3")}
        >
          <StyledParagraph>
            We are working on this feature, and will get back to you soon about
            it!
          </StyledParagraph>
        </StyledAccordion>
      </>
    );
  }
}

export default FAQ;
