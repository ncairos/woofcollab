import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import Service from "./service/Auth_service";

//-----NAVIGATION COMPONENTS-----//
import NavigationBar from "./components/navbar";

//-----INDEX COMPONENTS-----//
import IndexPage from "./components/index-page";

//-----CENTER COMPONENTS-----//
import CenterList from "./components/centers/center-list";
import CenterDetails from "./components/centers/center-details";
import MyCalendar from "./components/calendar/calendar";

//-----PROFILES COMPONENTS-----//
import CenterProfile from "./components/profiles/center-profile";
import UserProfile from "./components/profiles/user-profile";
import DogProfile from "./components/profiles/dog-profile";

//-----DOG COMPONENTS-----//
import DogList from "./components/dogs/adoption-List";

//-----AUTH COMPONENTS-----//
import Signup from "./components/auth/Signup";
import LoginUser from "./components/auth/Login-user";
import LoginCenter from "./components/auth/Login-center";

class App extends Component {
  constructor() {
    super();
    this.state = { loggedInUser: null };
    this._service = new Service();
  }

  setTheUser = user => {
    console.log(user);
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
          <Route exact path="/" component={IndexPage} />
          <Route
            path="/signup"
            render={match => <Signup setUser={this.setTheUser} {...match} />}
          />
          <Route
            path="/loginUser"
            render={match => <LoginUser setUser={this.setTheUser} {...match} />}
          />
          <Route
            path="/loginCenter"
            render={match => (
              <LoginCenter setUser={this.setTheUser} {...match} />
            )}
          />
          <Route path="/newCalendar/:id" component={MyCalendar} />
          <Route path="/centers/:id" component={CenterDetails} />
          <Route path="/dog/:id" component={DogProfile} />
          <Route exact path="/user-profile/:id" component={UserProfile} />
          <Route exact path="/center-profile/:id" component={CenterProfile} />
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
        </Switch>
      </>
    );
  }
}

export default App;

//render={() => this.state.loggedInUser.role === "center" ? <CenterList loggedInUser={this.state.loggedInUser} /> : <Redirect to="/" />}
