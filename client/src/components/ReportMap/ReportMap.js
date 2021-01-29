import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import styles from "./ReportMap.module.css";
import mapboxgl from "mapbox-gl";
import { mapbox_public_key } from "../../api/reportsAPI";
import { useDispatch, useSelector } from "react-redux";
import { setVisibleReports } from "../../redux/slices/mapSlice";

import { addReportsLayers } from "./addReports";

mapboxgl.accessToken = mapbox_public_key;

export default function ReportMap() {
  const dispatch = useDispatch();
  const { reportsInGeojson } = useSelector((state) => state.reports);
  const { reportsFilter, popupCoor } = useSelector((state) => state.map);

  //local state for filtering report
  const [mapState, setMapState] = useState(null);

  // div in DOM
  const mapContainerRef = useRef();

  //keep map around Stockholm
  const bounds = [
    [17.77461405663, 59.125781], //southwest
    [18.4248425, 59.479973], //northeast
  ];

  // array of layer id names
  const reportMarkerLayers = [
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

    //add data saved in state in redux
    map.on("load", () => {
      // add all markers and report layers
      addReportsLayers(map, reportsInGeojson);

      

      //set map to state to filter later (set on load so all styles finish loading)
      setMapState(map);
    });

    

    //show title pop up on hover

    let popup = new mapboxgl.Popup({
      closeButton: false,
    });
    reportMarkerLayers.forEach((layer) =>
      map.on("mousemove", layer, (event) => {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = "pointer";

        // Populate the popup and set its coordinates based on the feature.
        let feature = event.features[0];
        popup
          .setLngLat(feature.geometry.coordinates)
          .setText(feature.properties.title)
          .addTo(map);
      })
    );

    reportMarkerLayers.forEach((layer) =>
      map.on("mouseleave", layer, () => {
        map.getCanvas().style.cursor = "";
        popup.remove();
      })
    );

    
      // send reports to reports list value in redux state
    dispatch(setVisibleReports(reportsInGeojson));
      


    return () => map.remove();
  }, [reportsInGeojson]); // eslint-disable-line react-hooks/exhaustive-deps

  //filter map markers according filter list from redux(set by ReportFilter.js UI)
  useEffect(() => {
    filterMarkers();
  }, [reportsFilter]); // eslint-disable-line react-hooks/exhaustive-deps

  const filterMarkers = () => {
    
    if (mapState && reportsFilter) {
      reportMarkerLayers.forEach((layer) => {
        mapState.setLayoutProperty(
          layer,
          "visibility",
          reportsFilter.includes(layer) ? "visible" : "none"
        );
      });
    }
  };

  useEffect(() => {
    if (mapState) {
      mapState.on("moveend", (event) => {
        if (event.originalEvent) {
          let features = mapState.queryRenderedFeatures({
            layers: reportMarkerLayers,
          });

          if (features) {
            dispatch(setVisibleReports(features));
          }
        }
      });
    }
  });

  const popUpRef = useRef(new mapboxgl.Popup({ closeButton: false }));

  useEffect(() => {
    if (popupCoor == null && popUpRef.current) {
      popUpRef.current.remove();
    } else if (mapState && popupCoor) {
      const popupNode = document.createElement("div");
      ReactDOM.render(<h4>{popupCoor.title}</h4>, popupNode);
      // set popup on map
      popUpRef.current
        .setLngLat(popupCoor.coordinates)
        .setDOMContent(popupNode)
        .addTo(mapState);
    }
  }, [popupCoor]);

  return (
    <>
      <div className={styles.mapContainer} ref={mapContainerRef} id="map" />;
    </>
  );
}
