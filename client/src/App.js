import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import Service from "./service/Auth_service";

//-----NAVIGATION COMPONENTS-----//
import NavigationBar from "./components/Navbar";

//-----CENTER COMPONENTS-----//
import CenterList from "./components/centers/center-list";
import CenterDetails from "./components/centers/center-details";
import CenterProfile from "./components/profiles/center-profile"

//-----DOG COMPONENTS-----//
import DogList from "./components/dogs/adoption-List";

//-----AUTH COMPONENTS-----//
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";


class App extends Component {
  constructor() {
    super();
    this.state = { loggedInUser: null };
    this._service = new Service();
  }

  setTheUser = user => {
    this.setState({ loggedInUser: user });
  };

  fetchUser = () => {
    if (this.state.loggedInUser === null) {
      this._service
        .loggedin()
        .then(theLoggedInUserFromTheServer =>
          this.setState({ loggedInUser: theLoggedInUserFromTheServer.data })
        )
        .catch(err => {
          this.setState({ loggedInUser: false });
          console.log({ err });
        });
    }
  };

  render() {
    this.fetchUser();

    return (
      <>
        <NavigationBar
          loggedInUser={this.state.loggedInUser}
          setUser={this.setTheUser}
        />
        <Switch>
          <Route path="/centers/:id" component={CenterDetails} />
          <Route
            exact
            path="/centers-profile"
            render={() => <CenterProfile loggedInUser={this.state.loggedInUser} />}
          />
          <Route
            exact
            path="/centers"
            render={() => <CenterList loggedInUser={this.state.loggedInUser} />}
          />
          <Route
            exact
            path="/dogs"
            render={() => <DogList loggedInUser={this.state.loggedInUser} />}
          />
          <Route
            path="/signup"
            render={match => <Signup setUser={this.setTheUser} {...match} />}
          />
          <Route
            path="/login"
            render={match => <Login setUser={this.setTheUser} {...match} />}
          />
          <Route path="/logout" />
        </Switch>
      </>
    );
  }
}

export default App;
