import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import styles from "./ReportMap.module.css";
import mapboxgl from "mapbox-gl";
import { mapbox_public_key } from "../../api/reportsAPI";
import { useDispatch, useSelector } from "react-redux";
import {
  setVisibleReports,
} from "../../redux/slices/reportSlice";


import circle2 from "../../images/circle2.png";
import roadblock2 from "../../images/roadblock2.png";
import triangle2 from "../../images/triangle2.png";
import square2 from "../../images/square2.png";

mapboxgl.accessToken = mapbox_public_key;

export default function ReportMap() {
  const dispatch = useDispatch();
  const { reportsInGeojson, reportsFilter, popupCoor } = useSelector((state) => state.reports);

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

    //add data saved in state in redux
    map.on("load", () => {
      map.addSource("reports-markers", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: reportsInGeojson,
        },
      });

      //custom marker for each status
      const images = [
        { url: circle2, id: "circle-img" }, //fixed
        { url: square2, id: "square-img" }, //scheduled
        { url: roadblock2, id: "roadblock-img" }, //reported
        { url: triangle2, id: "triangle-img" }, //unresolved
      ];

      //make all marker images available
      Promise.all(
        images.map(
          (img) =>
            new Promise((resolve, reject) => {
              map.loadImage(img.url, function (error, res) {
                map.addImage(img.id, res);
                resolve();
              });
            })
        )
      ).then(
        reportsInGeojson.forEach((feature) => {
          //map images to status
          const symbols = {
            Reported: "roadblock-img",
            Fixed: "circle-img",
            Scheduled: "square-img",
            Unresolved: "triangle-img",
          };

          let layerId = feature.properties.status;
          let symbol = symbols[layerId];

          if (!map.getLayer(layerId)) {
            map.addLayer({
              id: layerId + "-layer",
              type: "symbol",
              source: "reports-markers",
              layout: {
                "icon-image": symbol,
                "icon-allow-overlap": true,
                "icon-size": [
                  "interpolate",
                  ["linear"],
                  ["zoom"],
                  10,
                  1,
                  15,
                  1.5,
                ],
              },

              filter: ["==", "status", layerId],
            });
          }
        })
      );

      // send reports to reports list value in redux state
      dispatch(setVisibleReports([...reportsInGeojson]));

      //set map to state to filter later (set on load so all styles finish loading)
      setMapState(map);
    });

  

    let popup = new mapboxgl.Popup({
      closeButton: false,
    });

    //show title pop up on hover
    allLayers.forEach((layer) =>
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

    allLayers.forEach((layer) =>
      map.on("mouseleave", layer, () => {
        map.getCanvas().style.cursor = "";
        popup.remove();
      })
    );

    
    
    return () => map.remove();
  }, [reportsInGeojson]); // eslint-disable-line react-hooks/exhaustive-deps

  //filter map markers according filter list from redux(set by ReportFilter.js UI)
  useEffect(() => {
    filterMarkers();
    // if (mapState) {
    //   let features = mapState.queryRenderedFeatures({
    //     layers: reportsFilter,
    //   });
    //   console.log(reportsFilter);      <-- this  and moveEnd cause state mutation according to redux???
    //   console.log(features);
    //   if (features) {
    //     dispatch(setVisibleReports(features));
    //   }
    // }
  }, [reportsFilter]); // eslint-disable-line react-hooks/exhaustive-deps

  const filterMarkers = () => {
    if (mapState && reportsFilter) {
      allLayers.forEach((layer) => {
        mapState.setLayoutProperty(
          layer,
          "visibility",
          reportsFilter.includes(layer) ? "visible" : "none"
        );
      });
    }
  };
  

  // useEffect(() => {
  //   if (mapState) {
  //     mapState.on("moveend", (event) => {
  //       if (event.originalEvent){
  //       let features = mapState.queryRenderedFeatures({
  //         layers: allLayers,
  //       });

  //       if (features) {
        
  //         dispatch(setVisibleReports(features));
  //       }
  //       }
  //     });
  //   }
  // });

  const popUpRef = useRef(new mapboxgl.Popup({ closeButton: false}));


  useEffect(()=> {
    if (popupCoor == null && popUpRef.current) {popUpRef.current.remove()}
    else if (mapState && popupCoor) {
    
    const popupNode = document.createElement('div');
    ReactDOM.render((<h4>{popupCoor.title}</h4>), popupNode);
    // set popup on map
    popUpRef.current.setLngLat(popupCoor.coordinates).setDOMContent(popupNode).addTo(mapState);
    }
   
  }, [popupCoor])

  return (
    <>
      <div className={styles.mapContainer} ref={mapContainerRef} id="map" />;
    </>
  );
}
