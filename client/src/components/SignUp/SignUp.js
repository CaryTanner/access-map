import React, {useEffect} from "react";
import styles from "./SignUp.module.css";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Typography,
  Alert,
  message
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import QueueAnim from "rc-queue-anim";
import {useDispatch, useSelector} from 'react-redux'
import {fetchRegisterUser} from '../../redux/slices/authSlice'
import {useRouter} from '../../utils/useRouter'


export default function SignUp() {
const dispatch = useDispatch()
const {error, isAuthenticated} = useSelector(state => state.auth)

  
    const onFinish = (values) => {
    
    dispatch(fetchRegisterUser(values))
  };

  // @TODO push to previous page if successful login
  const router = useRouter()

  useEffect(()=> {
    if(!error){
      if(isAuthenticated){
        success()
        
        router.push("/")
      }
    }
  }, [isAuthenticated, error])

  //success pop message 
const success = () => {
  message.success('Sign up successful');
};



  return (
    <>
      <div className={styles.container}>
        <Row justify="center">
          <Col
            lg={8}
            md={12}
            sm={16}
            xs={24}
            style={{
              boxShadow: "1px 1px 5px rgba(0, 0, 0, .15)",
              padding: "10px 10px 100px 10px",
              borderRadius: "15px",
            }}
          >
            <Typography.Title level={3}>Sign Up</Typography.Title>
            <QueueAnim>
            <Form
              name="login"
              className="form"
              layout="vertical"
              onFinish={onFinish}
              size="large"
              key="a"
            >
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please enter name",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Name"
                  aria-label="Name"
                />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "Not a valid email",
                  },
                  {
                    required: true,
                    message: "Please enter email",
                  },
                ]}
              >
                <Input autoComplete="email" prefix="@" placeholder="Email" aria-label="Email" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: "Password required" }]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  autoComplete="new-password"
                  type="password"
                  placeholder="Password"
                  aria-label="Password"
                />
              </Form.Item>
              <Form.Item
                name="confirm"
                autoComplete="new-password"
                dependencies={["password"]}
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password",
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }

                      return Promise.reject("Passwords do not match");
                    },
                  }),
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Confirm Password"
                  aria-label="Confirm Password"
                />
              </Form.Item>
              {error && <Form.Item>
                  <Alert type="error" showIcon message={error}></Alert>
                </Form.Item>}

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  style={{ width: "100%", marginBottom: "1rem" }}
                  aria-label="Log In"
                >
                  Sign Up
                </Button>
                <Typography.Text type="secondary">
                  Already have an account?
                </Typography.Text>{" "}
                <Typography.Link tabindex={0} href="/login">Log In</Typography.Link>
              </Form.Item>
            </Form>
            </QueueAnim>
          </Col>
        </Row>
      </div>
    </>
  );
}
