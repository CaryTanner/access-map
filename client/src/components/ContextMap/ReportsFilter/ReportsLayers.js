

import circle2 from "../../../images/circle2.png";
import roadblock2 from "../../../images/roadblock2.png";
import triangle2 from "../../../images/triangle2.png";
import square2 from "../../../images/square2.png";



export const addReportsLayers = (map, featuresSource) =>{

    if(featuresSource && map){
        map.addSource("reports-markers", {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: featuresSource,
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
            featuresSource.forEach((feature) => {
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


    }

}