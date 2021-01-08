import React, {useEffect, useState} from "react";
import styles from "./ReportFilter.module.css";
import { Typography, Button, Radio } from "antd";
import {useDispatch} from 'react-redux'
import {setReportsFilter} from '../../redux/slices/reportSlice'


export default function ReportFilter() {
 const dispatch = useDispatch()
 
 
 useEffect(()=>{
     // show all reports on loading
    dispatch(setReportsFilter(['Reported', 'Scheduled', 'Fixed', 'Unresolved']))
 }, [])
 
 const dispatchFilter = (event) =>{
    
    // send button value as an array redux state 
    let filter = event.target.value.split(' ')
    
    dispatch(setReportsFilter(filter))
 }
    
  return (
    
    <>
    <Typography.Title level={3}>Accessibility Reports</Typography.Title>
    <div style={{display: "flex", justifyContent: "center", margin: "1.5rem 0 .5rem 0"}}>
    <Radio.Group size="small" onChange={dispatchFilter} defaultValue='Reported-layer Scheduled-layer Fixed-layer Unresolved-layer' buttonStyle="solid">
      <Radio.Button value="Reported-layer Scheduled-layer Fixed-layer Unresolved-layer">Show all</Radio.Button>
      <Radio.Button value="Reported-layer">Reported</Radio.Button>
      <Radio.Button value="Scheduled-layer">Scheduled</Radio.Button>
      <Radio.Button value="Fixed-layer">Fixed</Radio.Button>
      <Radio.Button value="Unresolved-layer">Unresolved</Radio.Button>
    </Radio.Group>
    </div>
    </>
  );
}
