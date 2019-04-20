import React from 'react'
// import Grid from 'react-bootstrap/Grid';
import { Button, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import {getAllCars} from '../services/api'
import Dropdown from '../components/Dropdown/Dropdown'

class VehiclesContainer extends React.Component {
  state = {
    vehicleType: '',
    vehicleBrand: '',
    vehicleYear: '',
    vehicleValue: '',
  }
  getAllCars = async () => { 
    const response = await getAllCars('7') 
    console.log(response.data) 
  }
  render() {
    return (
      <Row>
        <Container className="container"
        style={{ margin: '0 auto' }}>
          <Row>
            <Dropdown/>
            <Button onClick={this.getAllCars}> Get All Cars for Model </Button>
          </Row>
        </Container>
        </Row>
    )
  }
}
export default VehiclesContainer