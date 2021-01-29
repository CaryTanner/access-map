import React, { useEffect } from "react";
import "./App.less";
import { Button, Grid, Layout, Menu } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer"
import SignUp from "./components/SignUp/SignUp"
import MakeReport from "./components/MakeReport/MakeReport"
import HomePage from "./components/HomePage/HomePage"
import MapLanding from "./components/MapLanding/MapLanding"
import ReportDetails from "./components/ReportDetails/ReportDetails"


function App() {
  const { Content } = Layout;

  const { useBreakpoint } = Grid;
  const { xs } = useBreakpoint();

  return (
    <>
      <Header />
      <Switch>
        <Content style={{backgroundColor: '#fff', maxWidth: "1920px", minHeight: "100vh", margin: "0 auto", padding:xs ? "0 20px" : "0 50px"}}>
          <Route path="/reports/:id">
            <ReportDetails />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/map/:sidepanelname">
            <MapLanding />
          </Route>
          
          
          <Route path="/users"></Route>
          <Route exact path="/">
            <HomePage/>
          </Route>


        </Content>
      </Switch>
      <Footer />
    </>
  );
}

export default App;
