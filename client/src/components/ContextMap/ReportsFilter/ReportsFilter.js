import React, {useEffect, useContext} from "react";
import styles from "./ReportsFilter.module.css";
import { Typography,  Radio } from "antd";
import {useDispatch, useSelector} from 'react-redux'

import MapContext from "../../../MapContext";
import {addReportsLayers} from './ReportsLayers'

export default function ReportFilter() {
 const dispatch = useDispatch()
 const {reportsInGeojson }  = useSelector(state => state.reports)
 const map = useContext(MapContext)

 useEffect(() => {
   console.log('adding reports')
    addReportsLayers(map,reportsInGeojson)
 }, [])

 
 const dispatchFilter = (event) =>{
    
    // send button value as an array redux state 
    //written as "status2 + "-layer" for layer filter  
    let filter = event.target.value.split(' ')
    
    //dispatch(setReportsFilter(filter))
 }
    
  return (
    
    <>
    <Typography.Title level={3}>Accessibility Reports</Typography.Title>
    <div style={{display: "flex", justifyContent: "center", margin: "1.5rem 0 .5rem 0"}}>
    <Radio.Group tabIndex={0} size="small" onChange={dispatchFilter} defaultValue='Reported-layer Scheduled-layer Fixed-layer Unresolved-layer' buttonStyle="solid">
      <Radio.Button  value="Reported-layer Scheduled-layer Fixed-layer Unresolved-layer">Show all</Radio.Button>
      <Radio.Button  value="Reported-layer">Reported</Radio.Button>
      <Radio.Button   value="Scheduled-layer">Scheduled</Radio.Button>
      <Radio.Button  value="Fixed-layer">Fixed</Radio.Button>
      <Radio.Button  value="Unresolved-layer">Unresolved</Radio.Button>
    </Radio.Group>
    </div>
    </>
  );
}
