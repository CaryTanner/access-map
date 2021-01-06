import React, { useEffect, useRef } from "react";
import styles from "./ReportMap.module.css";
import mapboxgl from "mapbox-gl";
import { mapbox_public_key } from "../../api/reportsAPI";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllReports } from "../../redux/slices/reportSlice";

mapboxgl.accessToken = mapbox_public_key;

export default function ReportMap() {
  const dispatch = useDispatch();
  const { reportsById } = useSelector((state) => state.reports);

  let featuresList = [];

  useEffect(() => {
    dispatch(fetchAllReports());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (reportsById) {
      const reportsArr = Object.entries(reportsById);

      reportsArr.forEach(([key, value]) => {
        featuresList.push({
          type: "Feature",
          id: value._id,
          geometry: value.data.geometry,
          properties: value.data.properties,
        });
      });
    }
  }, [reportsById]); // eslint-disable-line react-hooks/exhaustive-deps

  const mapContainerRef = useRef();
  const bounds = [
    [17.87461405663, 59.225781],
    [18.3248425, 59.479973],
  ];

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [18.07178990362403, 59.323730425969565],
      zoom: 12,
      maxBounds: bounds,
    });

    // add zoom buttons && fullscreen
    map.addControl(
      new mapboxgl.NavigationControl({ showCompass: false }),
      "bottom-right"
    );
    map.addControl(new mapboxgl.FullscreenControl());

    //add markers from redux state
    map.on("load", () => {
      map.addSource("reports-markers", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: featuresList,
        },
      });

      map.addLayer({
        id: "report-circles",
        type: "circle",
        source: "reports-markers",

        paint: {
          // make circles larger as the user zooms from z12 to z22
          "circle-radius": {
            base: 1.75,
            stops: [
              [12, 20],
              [22, 180],
            ],
          },
          // color circles by status, using a match expression
          
          "circle-color": [
            "match",
            ["get", "status"],
            "Reported",
            "#fbb03b",
            "Scheduled",
            "#223b53",
            "Fixed",
            "#e55e5e",
            "Unresolved",
            "#3bb2d0",
            /* other */ "#ccc",
          ],
        },
      });
    });

    return () => map.remove();
  }, [reportsById]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className={styles.mapContainer} ref={mapContainerRef} />;
    </>
  );
}
