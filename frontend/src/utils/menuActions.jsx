import React from "react";
import Menu from "../components/Menu";
import Login from "../components/Login";
import SignUp from "../components/SignUp";

function handleDialClick() {
  this.setState({ open: !this.state.open });
}

function toggleDrawer(open) {
  return () => {
    // if (
    //   event &&
    //   event.type === "keydown" &&
    //   (event.key === "Tab" || event.key === "Shift")
    // ) {
    //   return;
    // }
    this.setState({ openDrawer: open });
  };
}

function draw(props) {
  return (Component) => {
    if (Component === Login)
      this.setDrawerContent(
        <Component
          switch={this.switchTo(SignUp)}
          user={this.state.user}
          {...props}
        />
      );
    else this.setDrawerContent(<Component user={this.state.user} {...props} />);
  };
}

function setDrawerContent(content) {
  this.setState({ drawerContent: content });
  this.toggleDrawer(true)();
}

function switchTo(Component, props) {
  return () => {
    this.toggleDrawer(false)();
    setTimeout(() => {
      this.setDrawerContent(<Component {...props} />);
    }, 500);
  };
}

function addMenu(Component, home = false) {
  return (props) => (
    <div>
      <Menu
        home={home}
        user={this.state.user}
        handleDialClick={this.handleDialClick}
        toggleDrawer={this.toggleDrawer}
        switchTo={this.switchTo}
        draw={this.draw}
        open={this.state.open}
        openDrawer={this.state.openDrawer}
        drawerContent={this.state.drawerContent}
        handleSearchChange={!home && this.handleSearchChange}
        searchValue={!home && this.state.searchValue}
        updateSearchChoices={!home && this.updateSearchChoices}
        searchChoices={!home && this.state.searchChoices}
        {...props}
      />
      <Component
        user={this.state.user}
        draw={this.draw}
        handleSearchChange={home && this.handleSearchChange}
        searchValue={home && this.state.searchValue}
        updateSearchChoices={home && this.updateSearchChoices}
        searchChoices={this.state.searchChoices}
        {...props}
      />
    </div>
  );
}

export default {
  handleDialClick,
  toggleDrawer,
  draw,
  setDrawerContent,
  switchTo,
  addMenu,
};
