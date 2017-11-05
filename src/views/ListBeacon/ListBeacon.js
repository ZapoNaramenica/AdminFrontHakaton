import React, { Component } from 'react';
import axios from 'axios';
import {Badge, Row, Col, Card, CardHeader, CardBody, Table, Pagination, PaginationItem, PaginationLink, Button, Alert} from 'reactstrap';
import api from '../../utils/api';

class ListBeacon extends Component {

  constructor(props){
    super(props);
    this.state ={
        details:[],
        message: ""
    }
  };

  handleGetAllBuses(){
    api.getAllBuses()
        .then((response) => {
          this.setState(()=>{
            return ({
              details: response
            })
          })
        })
  }

  handleDelete(id){
      axios.delete('http://192.168.100.100:8000/api/v1/beacons/' + id)
          .then((response) => {
              this.setState(()=>{
                  return ({
                      message: 'Uspešno ste obrisali vozilo.'
                  })
              });
              this.handleDeleteFromState(id);
              setTimeout(()=>this.handleAlert(), 3000);
          })
          .catch((error) => {
              console.log(error)
          });
  }

  handleDeleteFromState(id){

    let newDetails = this.state.details.filter((detail)=>{
      return detail.id !==id;
    });

    this.setState({
        ...this.state,
        details: newDetails
    });
  }



  componentDidMount(){
    this.handleGetAllBuses();
  }

  handleAlert(){
      this.setState({
          ...this.state,
          message: ""
      });
  }

  render() {
    return (
      <div className="animated fadeIn">
          {
              this.state.message !== "" ?
                  <Col xs="12">
                    <Alert className="alert-danger text-center">
                        {this.state.message}
                    </Alert>
                  </Col>
                  :
                  null
          }
        <Row>
          <Col xs="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Lista prevoza
              </CardHeader>
              <CardBody>
                <Table responsive striped>
                  <thead>
                  <tr>
                    <th>id</th>
                    <th>Beacon ID</th>
                    <th>Broj Linije</th>
                    <th>Trasa linije</th>
                    <th>Novo polje</th>
                    <th>Akcije</th>
                  </tr>
                  </thead>
                  <tbody>
                  {
                    this.state.details.length > 0 ?
                        this.state.details.map((one, id) =>
                          <tr key={id}>
                            <td>{one.id}</td>
                            <td>{one.unique_id}</td>
                            <td>{one.vehicle_name}</td>
                            <td>{one.trace}</td>
                            <td>{one.instructions}</td>
                            <td><Button size="sm" color="danger" onClick={()=>this.handleDelete(one.id)}>Obriši</Button></td>
                          </tr>)
                        :
                        null
                  }
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default ListBeacon;
