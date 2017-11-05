import React, {Component} from 'react';
import {Link, Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Footer from '../../components/Footer/';

import Dashboard from '../../views/Dashboard/';
import AddBeacon from '../../views/AddBeacon/';
import ListBeacon from '../../views/ListBeacon/';
import Map from '../../views/ExcidentMap/';

class Full extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar {...this.props}/>
          <main className="main">
            <Breadcrumb />
            <Container fluid>
              <Switch>
                <Route path="/dashboard" name="Dashboard" component={Dashboard}/>
                <Route path="/dodavanje-prevoza" name="Dodavanje prevoza" component={AddBeacon}/>
                <Route path="/lista-prevoza" name="Lista prevoza" component={ListBeacon}/>
                <Route path="/mapa-nesreca" name="Mapa nesreca" component={Map}/>
                <Redirect from="/" to="/dashboard"/>
              </Switch>
            </Container>
          </main>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Full;
