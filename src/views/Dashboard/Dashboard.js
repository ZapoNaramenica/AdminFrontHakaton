import React, { Component } from 'react';
import {Row, Col, Card, CardFooter, CardBody, CardHeader} from 'reactstrap';

class Dashboard extends Component {

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
                55
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
                Ukupno analiziranih problema
              </CardHeader>
              <CardBody className="text-center">
                732
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Dashboard;
