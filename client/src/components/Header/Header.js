import React, { useState } from "react";
//import styles from './Header.module.css'
import {
  Menu,
  Row,
  Col,
  Grid,
  Typography,
  Layout,
  Popconfirm,
  message,
  Avatar,
  Dropdown,
  Button,
} from "antd";
import { useRouter } from "../../utils/useRouter";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/slices/authSlice";
import { MenuOutlined } from "@ant-design/icons";

export default function Header() {
  const router = useRouter();

  const { Header } = Layout;
  //breakpoints from Antd for mobile layout
  const { useBreakpoint } = Grid;
  const { xs, sm } = useBreakpoint();

  //navigation functions
  const clickLink = (page) => {
    router.push(page);
  };
  const handleKeyPress = (event) => {
    if (event.keyCode === 13) event.currentTarget.click();
  };

  //dispatch logout redux action & show success
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
    success();
  };

  //success pop message
  const success = () => {
    message.success("Logged out");
  };

  //state for dynamic nav & avatar
  const { user } = useSelector((state) => state.auth);
  const avatarInitial = user ? user.name.charAt(0).toUpperCase() : null;

  const avatarMenu = (
    <Menu>
      <Menu.Item tabindex={0} key="1">
        user details!
      </Menu.Item>
      <Menu.Item key="2">
        <Button tabindex={0} onClick={handleLogout} key="2" type="primary">
          Logout
        </Button>
      </Menu.Item>
    </Menu>
  );

  const loggedOutMenu = [
    <Menu
      mode="horizontal"
      defaultSelectedKeys={["home"]}
      id="nav"
      key="nav"
      style={{ border: "none" }}
    >
      <Menu.Item key="home" tabindex={0} onClick={() => clickLink("/")}>
        
          Home
        
      </Menu.Item>
      <Menu.Item tabindex={0} onClick={() => clickLink("/map")}key="map">
        
          See Map
       
      </Menu.Item>
      <Menu.Item key="report" tabindex={0} onClick={() => clickLink("/makereport")}>
        
          Make Report
        
      </Menu.Item>
      <Menu.Item tabindex={0} onClick={() => clickLink("/about")} key="about">
        About
      </Menu.Item>

      <Menu.Item
        tabindex={0}
        onClick={() => clickLink("/signup")}
        key="sign up"
      >
        Sign Up
      </Menu.Item>
      <Menu.Item tabindex={0} key="login" onClick={() => clickLink("/login")}>
        Login
      </Menu.Item>
    </Menu>,
  ];

  const loggedInMenu = [
    <Menu
      mode="horizontal"
      defaultSelectedKeys={["home"]}
      id="nav"
      key="nav"
      style={{ border: "none" }}
    >
      <Menu.Item tabindex={0} onClick={() => clickLink("/")} key="home">
        Home
      </Menu.Item>
      <Menu.Item tabindex={0} key="map">
        See Map
      </Menu.Item>
      <Menu.Item
        tabindex={0}
        onClick={() => clickLink("/makereport")}
        key="report"
      >
        Make Report
      </Menu.Item>
      <Menu.Item tabindex={0} onClick={() => clickLink("/about")} key="about">
        About
      </Menu.Item>

      <Dropdown overlay={avatarMenu} trigger={["click"]}>
        <Avatar
          tabindex={0}
          aria-haspopup="true"
          style={{
            backgroundColor: "#154d42 ",
            verticalAlign: "middle",
            marginLeft: "20px",
          }}
          size="large"
        >
          {avatarInitial}
        </Avatar>
      </Dropdown>
    </Menu>,
  ];
  const mobileMenu = () => {
    return (
      <Menu
        mode="horizontal"
        defaultSelectedKeys={["home"]}
        id="nav"
        key="nav"
        style={{ border: "none" }}
      >
        <Menu.Item tabindex={0} onClick={() => clickLink("/")} key="home">
          Home
        </Menu.Item>
        <Menu.Item tabindex={0} key="map">
          See Map
        </Menu.Item>
        <Menu.Item
          tabindex={0}
          onClick={() => clickLink("/makereport")}
          key="report"
        >
          Make Report
        </Menu.Item>
        <Menu.Item tabindex={0} onClick={() => clickLink("/about")} key="about">
          About
        </Menu.Item>

        <Menu.Item
          tabindex={0}
          onClick={() => clickLink("/signup")}
          key="sign up"
        >
          Sign Up
        </Menu.Item>
        <Menu.Item tabindex={0} onClick={() => clickLink("/login")} key="login">
          Login
        </Menu.Item>
      </Menu>
    );
  };

  return (
    <>
      <Header
        style={{
          backgroundColor: "#fff",
          maxWidth: "1920px",
          margin: "0 auto",
          padding: xs ? " 0 20px" : " 0 50px",
        }}
      >
        <Row align="bottom">
          <Col lg={4} md={5} sm={8} xs={8}>
            <a href="/" id="logo">
              <Typography.Title level={3} style={{ lineHeight: ".8" }}>
                Accessible Stockholm
              </Typography.Title>
            </a>
          </Col>
          <Col lg={20} md={19} sm={0} xs={0}>
            <Row justify="end">{user ? loggedInMenu : loggedOutMenu}</Row>
          </Col>
          <Col lg={0} md={0} sm={16} xs={16}>
            <Row justify="end" style={{ minHeight: "65px" }}>
              <Dropdown overlay={mobileMenu} trigger={["click"]}>
                <MenuOutlined
                  tabindex={0}
                  aria-haspopup="true"
                  style={{ fontSize: "1.5rem", verticalAlign: "bottom" }}
                />
              </Dropdown>
            </Row>
          </Col>
        </Row>
      </Header>
    </>
  );
}
