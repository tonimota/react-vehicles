import React, { Component } from 'react';
import {Switch, Route} from 'react-router'
import VehiclesContainer from './pages/Vehicles'
import {Container} from 'react-bootstrap';
import 'bootstrap/scss/bootstrap.scss'


class App extends Component {
  render() {
    return (
      <Container>
        <Switch>
          <Route path="/" exact={true} component={VehiclesContainer} />
        </Switch>
      </Container>
    )
  }
}

export default App;
