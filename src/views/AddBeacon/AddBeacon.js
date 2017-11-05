import React, { Component } from 'react';
import axios from 'axios';
import {Card,  CardHeader, CardBody, FormGroup, Input, Label, Button, CardFooter, Form, Col, Alert} from 'reactstrap';
import api from './../../utils/api'

class AddBeacon extends Component {

    constructor(props){
        super(props);
        this.state={
            unique_id : "",
            vehicle_name : "",
            trace : "",
            instructions: "",
            message : ""
        }
    }

    handleOnChange(e, field){
        this.setState({
            ...this.state,
            [field] : e.target.value
        });
    }

    handleSubmit(e){
        e.preventDefault();
        let bus = {
            unique_id : this.state.unique_id,
            vehicle_name : this.state.vehicle_name,
            trace : this.state.trace,
            instructions: this.state.instructions
        };
        axios.post('http://192.168.100.100:8000/api/v1/beacons/', bus)
            .then((response) => {
                this.setState(()=>{
                    return ({
                        message: 'Uspešno ste dodali novo vozilo.'
                    })
                });
                this.handleDelete();
                setTimeout(()=>this.handleAlert(), 3000);
            })
            .catch((error) => {
                console.log(error)
            });
    }

    handleDelete(){
        this.setState({
            ...this.state,
            unique_id : "",
            vehicle_name : "",
            trace : "",
            instructions: ""
        });
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
                            <Alert className="alert-success text-center">
                                {this.state.message}
                            </Alert>
                        </Col>
                        :
                        null
                }

                <Card>
                    <CardHeader>
                        <strong>Dodavanje autobusa</strong>
                    </CardHeader>
                    <CardBody>
                        <Form method="post">
                            <FormGroup>
                                <Label htmlFor="id">ID</Label>
                                <Input type="text" id="id" value={this.state.unique_id} onChange={(e) => this.handleOnChange(e, 'unique_id')} placeholder="Unesite id"/>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="number">Broj Linije</Label>
                                <Input type="text" id="number" value={this.state.vehicle_name} onChange={(e) => this.handleOnChange(e, 'vehicle_name')} placeholder="Unesite broj linije"/>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="trace">Trasa linije</Label>
                                <Input type="text" id="trace" value={this.state.trace} onChange={(e) => this.handleOnChange(e, 'trace')} placeholder="Unesite trasu linije"/>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="instructions">Instrukcije</Label>
                                <Input type="text" id="instructions" value={this.state.instructions} onChange={(e) => this.handleOnChange(e, 'instructions')} placeholder="Unesite trasu linije"/>
                            </FormGroup>
                        </Form>
                    </CardBody>
                    <CardFooter>
                        <Button type="button" onClick={(e)=>this.handleSubmit(e)} size="sm" color="success">Sačuvaj</Button>
                        <Button type="button" onClick={()=>this.handleDelete()} size="sm" color="danger">Resetuj</Button>
                    </CardFooter>
                </Card>
            </div>
        )
    }
}

export default AddBeacon;
