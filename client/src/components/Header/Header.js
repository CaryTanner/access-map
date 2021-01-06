import React, { useState } from "react";
import styles from "./Header.module.css";
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
import { handleEnterKey } from "../../utils/utils";


//@TODO- set menu keys to follow params 


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

  //menus for dynamic nav & avatar
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

  const loggedOut = () => {
    return (
      <>
        <Menu.Item
          key="sign up"
          tabindex={0}
          onClick={() => clickLink("/signup")}
          onKeyPress={() => handleEnterKey(clickLink("/signup"))}
        >
          Sign Up
        </Menu.Item>
        <Menu.Item
          tabindex={0}
          key="login"
          onClick={() => clickLink("/login")}
          onKeyPress={() => handleEnterKey(clickLink("/login"))}
        >
          Login
        </Menu.Item>
      </>
    );
  };
  const loggedIn = () => {
    return (
      <>
        <Dropdown overlay={avatarMenu} trigger={["click"]}>
          <Avatar
            className={styles.focus}
            tabindex={0}
            aria-haspopup="true"
            style={{
              backgroundColor: "#154d42 ",
              verticalAlign: "middle",
              marginLeft: "20px",
            }}
            size="large"
            //keyboard opens dropdown
            onKeyPress={(event) => handleEnterKey(event.currentTarget.click())}
          >
            {avatarInitial}
          </Avatar>
        </Dropdown>
      </>
    );
  };

  const links = () => {
    return (<>
    <Menu.Item
        key="home"
        tabindex={0}
        onClick={() => clickLink("/")}
        onKeyPress={() => handleEnterKey(clickLink("/"))}
      >
        Home
      </Menu.Item>
      <Menu.Item
        key="map"
        tabindex={0}
        onClick={() => clickLink("/map")}
        onKeyPress={() => handleEnterKey(clickLink("/map"))}
      >
        Map
      </Menu.Item>
      <Menu.Item
        key="report"
        tabindex={0}
        onClick={() => clickLink("/makereport")}
        onKeyPress={() => handleEnterKey(clickLink("/makereport"))}
      >
        Make Report
      </Menu.Item>
      <Menu.Item
        key="about"
        tabindex={0}
        onClick={() => clickLink("/about")}
        onKeyPress={() => handleEnterKey(clickLink("/about"))}
      >
        About
      </Menu.Item>
    </>)
  }

  const menu = () => {
    return (<Menu
      mode="horizontal"
      defaultSelectedKeys={["home"]}
      id="nav"
      key="nav"
      style={{ border: "none" }}
    >
      {links()}
      {user ? loggedIn() : loggedOut()}
    </Menu>
    )};

  const mobileMenu = () => {
    return (
      <Menu
        mode="horizontal"
        defaultSelectedKeys={["home"]}
        id="nav"
        key="nav"
        style={{ border: "none" }}
      >
        {links()}
        {user ? null : loggedOut()}
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
        <Row >
          <Col lg={4} md={5} sm={8} xs={12}>
            <a href="/" id="logo">
              <Typography.Title level={3} style={{ lineHeight: ".8", marginTop: "20px" }}>
                Accessible Stockholm
              </Typography.Title>
            </a>
          </Col>
          <Col lg={20} md={19} sm={0} xs={0}>
            <Row justify="end">{menu()}</Row>
          </Col>
          <Col lg={0} md={0} sm={16} xs={12}>
            <Row justify="end" style={{marginTop: "20px"}}>
              <Dropdown overlay={mobileMenu} trigger={["click"]}>
                <MenuOutlined
                  className={styles.focus}
                  tabindex={0}
                  aria-haspopup="true"
                  style={{ fontSize: "1.5rem", marginTop: "8px" }}
                  onKeyPress={(event) =>
                    handleEnterKey(event.currentTarget.click())
                  }
                />
              </Dropdown>
              {user && (
                <Dropdown overlay={avatarMenu} trigger={["click"]}>
                  <Avatar
                    tabindex={0}
                    aria-haspopup="true"
                    style={{
                      backgroundColor: "#154d42 ",
                      verticalAlign: "middle",
                      marginLeft: "20px",
                    }}
                    className={styles.focus}
                    size="large"
                    //keyboard opens dropdown
                    onKeyPress={(event) =>
                      handleEnterKey(event.currentTarget.click())
                    }
                  >
                    {avatarInitial}
                  </Avatar>
                </Dropdown>
              )}
            </Row>
          </Col>
        </Row>
      </Header>
    </>
  );
}
