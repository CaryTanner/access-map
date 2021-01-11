import { createSlice } from "@reduxjs/toolkit";




const mapSlice = createSlice({
    name: "mapSlice",
    initialState: {
     mapStyle: "init"
    },
    reducers: {
        setMapStyle(state, action){
            state.mapStyle = action.payload
        },
        setLayerViz(state, action){
            
          // const { layer, visible } = action.payload
          // if (visible === true) {
          //       state.mapStyle.layers.find((layer) => layer.id === layer).layout.visibility = 'visible';
          //     } else {
          //       state.mapStyle.layers.find((layer) => layer.id === layer).layout.visibility = 'none';
          //     }
        },
        addLayer(){},
        addSource(){},
    }
})

export const {
setMapStyle,
setLayerViz
  } = mapSlice.actions;
  
  export default mapSlice.reducer;