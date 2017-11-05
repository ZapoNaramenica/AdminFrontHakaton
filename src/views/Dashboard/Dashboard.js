import React, { Component } from 'react';
import {Row, Col, Card, CardFooter, CardBody, CardHeader} from 'reactstrap';
import api from '../../utils/api';

class Dashboard extends Component {

  constructor(props){
    super(props);
    this.state={
      numberOfBuses : 0
    };
  }

    handleGetAllBuses(){
        api.getAllBuses()
            .then((response) => {
                this.setState(()=>{
                    return ({
                        numberOfBuses: response.length
                    })
                })
            })
    }

    componentDidMount(){
      this.handleGetAllBuses();
    }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="6" md="4">
            <Card>
              <CardHeader>
                Trenutno autobusa
              </CardHeader>
              <CardBody className="text-center">
                  {this.state.numberOfBuses ? this.state.numberOfBuses : null}
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="6" md="4">
            <Card>
              <CardHeader>
                Trenutno aktivnih korisnika
              </CardHeader>
              <CardBody className="text-center">
                55
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="6" md="4">
            <Card>
              <CardHeader>
                Ukupno saobraćajnih nesreća ovegodine
              </CardHeader>
              <CardBody className="text-center">
                15000
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Dashboard;
