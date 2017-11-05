import React, { Component } from 'react';
import axios from 'axios';
import {Badge, Row, Col} from 'reactstrap';
import {
    withGoogleMap,
    GoogleMap,
    Marker,
} from "react-google-maps";

class ExcidentMap extends Component {

  constructor(props){
    super(props);
    this.state ={
        markers:[
            { lat: 44.7866, lng: 20.4489 },
            { lat: 44.789, lng: 20.4491 }
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
      const MapWithAMarker = withGoogleMap(props =>
          <GoogleMap
              defaultZoom={12}
              defaultCenter={{ lat: 44.7866, lng: 20.4489 }}
          >
              {
                  this.state.markers.length > 0 ?
                      this.state.markers.map((marker, id)=>
                          <Marker key={id} position={marker}/>
                      )
                      :
                      null
              }
          </GoogleMap>
      );
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
              <MapWithAMarker
                  containerElement={<div style={{ height: `400px` }} />}
                  mapElement={<div style={{ height: `100%` }} />}
              />
          </Col>
        </Row>
      </div>
    )
  }
}

export default ExcidentMap;
