import React from 'react'
import styles from './Footer.module.css'
import {Layout, Typography, Grid} from 'antd'

export default function Footer(){
    const { useBreakpoint } = Grid;
  const { xs } = useBreakpoint();
    const {Footer} = Layout

    return(
        <>
        <Footer style={{maxWidth: "1920px", margin: "0 auto", padding: xs ? "0 20px" : null}}>

        <Typography.Title level={4}> Footer goes here!</Typography.Title>
        </Footer>
        </>
    )
}