import React, {useEffect} from "react";
import styles from "./Login.module.css";
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
import {fetchLoginUser} from '../../redux/slices/authSlice'
import {useRouter} from '../../utils/useRouter'
import {useDispatch, useSelector} from 'react-redux'

export default function Login() {
  const dispatch = useDispatch()
  const {error, isAuthenticated, isLoading} = useSelector( state => state.auth)
  


const onFinish = (values) => {
    dispatch(fetchLoginUser(values))
    
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
  message.success('Login successful');
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
            <QueueAnim>
              <Typography.Title level={3}>Log In</Typography.Title>
              
              <Form
                name="login"
                className="form"
                layout="vertical"
                onFinish={onFinish}
                requiredMark={false}
                size="large"
                key="a"
              >
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
                  autoComplete="password"
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                    aria-label="Password"
                  />
                </Form.Item>

                {error && <Form.Item>
                  <Alert type="error" showIcon message="Incorrect email/password"></Alert>
                </Form.Item>}

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    style={{ width: "100%", marginBottom: "1rem" }}
                    aria-label="Log In"
                    loading={isLoading ? true : false}
                  >
                    Log in
                  </Button>
                  <Typography.Text type="secondary">
                    New to Accessible Stockholm?
                  </Typography.Text>{" "}
                  <Typography.Link tabindex={0} href="/signup">
                    Register Now!
                  </Typography.Link>
                </Form.Item>
              </Form>
            </QueueAnim>
          </Col>
        </Row>
      </div>
    </>
  );
}
