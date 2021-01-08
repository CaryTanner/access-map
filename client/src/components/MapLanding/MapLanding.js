import React from 'react'
import styles from './MapLanding.module.css'
import ReportMap from '../ReportMap/ReportMap'
import ReportList from '../ReportList/ReportList'
import ReportFilter from '../ReportFilter/ReportFilter'
import {Col, Row, Grid } from 'antd'


export default function MapLanding(){
    const { useBreakpoint } = Grid;
  const { xs, sm } = useBreakpoint();

    
    return (
        <Row justify="space-between" gutter={16}>   
         <Col md={8} sm={24}>
         <a href="#map" className={styles.skipToMap}>
          Skip to Map
        </a>  
            
            <ReportFilter />
            <ReportList />
        </Col> 
         <Col md={16} sm={24}> 
        <ReportMap />
        </Col> 
        </Row>
    )
}