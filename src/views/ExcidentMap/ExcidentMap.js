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
        markers:[]
    }
  };

    handleGetAllMarkers(){
      axios.get('http://192.168.100.100:8000/api/v1/accidents/')
          .then((response) => {
              this.setState(()=>{
                  return ({
                      markers : response.data
                  })
              });
              console.log(response.data)
          })
          .catch((error) => {
              console.log(error)
          });
  }

  componentDidMount(){
    this.handleGetAllMarkers();
  }

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
                          key={marker.id}
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
