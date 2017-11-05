import React, { Component } from 'react';
import axios from 'axios';
const { compose, withProps, withHandlers } = require("recompose");
import {
    withGoogleMap,
    GoogleMap,
    Marker,
    withScriptjs,
} from "react-google-maps";

const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");

class ExcidentMap extends Component {
  constructor(props){
    super(props);
    this.state ={
        markers:[
            { lat: 44.7866, lng: 20.4489 },
            { lat: 44.789, lng: 20.4491 },
            { lat: 44.789, lng: 20.5 },
            { lat: 44.789, lng: 20.51 }
        ]
    }
  };

    handleGetAllMarkers(){
      axios.get('http://192.168.100.100:8000/api/')
          .then((response) => {
              this.setState(()=>{
                  return ({
                      markers : response.data
                  })
              });
          })
          .catch((error) => {
              console.log(error)
          });
  }

  // componentDidMount(){
  //   this.handleGetAllMarkers();
  // }

  render() {
      const MapWithAMarkerClusterer = compose(
          withProps({
              googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBx_NeMo8_IQJAGO5YZkKa5pY2k1f9cGUc",
              loadingElement: <div style={{ height: `100%` }} />,
              containerElement: <div style={{ height: `600px` }} />,
              mapElement: <div style={{ height: `100%` }} />,
          }),
          withHandlers({
              onMarkerClustererClick: () => (markerClusterer) => {
                  const clickedMarkers = markerClusterer.getMarkers()
                  console.log(`Current clicked markers length: ${clickedMarkers.length}`)
                  console.log(clickedMarkers)
              },
          }),
          withScriptjs,
          withGoogleMap
      )(props =>
          <GoogleMap
              defaultZoom={12}
              defaultCenter={{ lat: 44.7866, lng: 20.4489 }}
          >
              <MarkerClusterer
                  onClick={props.onMarkerClustererClick}
                  averageCenter
                  enableRetinaIcons
                  gridSize={60}
              >
                  {this.state.markers.map(marker => (
                      <Marker
                          key={marker.lat}
                          position={{ lat: marker.lat, lng: marker.lng }}
                      />
                  ))}
              </MarkerClusterer>
          </GoogleMap>
      );

      return (
          <MapWithAMarkerClusterer/>
      )
  }
}
export default ExcidentMap;
