
import {Col, Row} from 'antd'
import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";

import mapboxgl from "mapbox-gl";
import { mapbox_public_key } from "../../../api/reportsAPI";
import { useDispatch, useSelector } from "react-redux";
import {fetchAllReports} from '../../../redux/slices/reportSlice'

import styles from './Map.module.css'
import MapContext from '../../../MapContext';
import ReportsList from '../ReportsList/ReportsList'
import ReportsFilter from '../ReportsFilter/ReportsFilter'
import { setMapStyle } from '../../../redux/slices/mapSlice';

mapboxgl.accessToken = mapbox_public_key;




export default function Map(){
 
   
   
    
    const dispatch = useDispatch()

    //api call to get reports from DB 
    useEffect(() => {
        dispatch(fetchAllReports());
      }, []); // eslint-disable-line react-hooks/exhaustive-deps

// div in DOM
const mapContainerRef = useRef();

// state to store map for context api
const [map, setMap] = useState('')

//keep map around Stockholm
const bounds = [
  [17.77461405663, 59.125781], //southwest
  [18.4248425, 59.479973], //northeast
];

// array of layer id names
const allLayers = [
  "Reported-layer",
  "Scheduled-layer",
  "Fixed-layer",
  "Unresolved-layer",
];

//create map instance and add all styles/markers
useEffect(() => {
  const map = new mapboxgl.Map({
    container: mapContainerRef.current,
    style: "mapbox://styles/mapbox/light-v10",
    center: [18.07178990362403, 59.323730425969565],
    zoom: 10,
    maxBounds: bounds,
  });

  // add zoom buttons && fullscreen
  map.addControl(
    new mapboxgl.NavigationControl({ showCompass: false }),
    "bottom-right"
  );
  map.addControl(new mapboxgl.FullscreenControl());

  
 map.on("load", () => { 
  //set initial style object in redux 
  console.log(map.getStyle())
  //dispatch(setMapStyle(map.getStyle()))

  
  setMap(map)
 })
  }, [])

  //track the style object in redux 
  const {mapStyle} = useSelector(state => state.mapSlice)

  useEffect(()=>{
      if(mapStyle === "init") return
      map.setStyle(mapStyle)
   
  }, [mapStyle, map])

      return (
        <Row justify="space-between" gutter={16}>   
         <Col md={8} sm={24}>
         <MapContext.Provider value={map}>
             <ReportsFilter />
             <ReportsList />

         </MapContext.Provider>
            
            
        </Col> 
         <Col md={16} sm={24}> 
         <div className={styles.mapContainer} ref={mapContainerRef} id="map" />;
        </Col> 
        </Row>
    )


}