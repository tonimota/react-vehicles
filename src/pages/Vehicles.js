import React from 'react'
// import Grid from 'react-bootstrap/Grid';
import { Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import {getAllCars, getAllBrand} from '../services/api'
import Dropdown from '../components/Dropdown/Dropdown'

class VehiclesContainer extends React.Component {
  state = {
    vehicleType: [
      'carros',
      'motos',
      'caminhoes'
    ],
    vehicleBrand: [],
    vehicleSelect: '',
    brandSelect: '',
    vehicleYear: '',
    vehicleValue: '',
    labelType: {
      value: 'Selecione um tipo de veiculo'
    },
    labelBrand: {
      value: 'Selecione uma Marca'
    },
    labelYear: {
      value: 'Selecione um Ano'
    },
    labelPrice: {
      value: 'Selecione por Preço'
    },
  }
  getType = (value) => {
    this.setState({
      vehicleSelect: value,
    })
    this.getAllBrand(value)
  }
  getBrand = (value) => {
    this.setState({
      brandSelect: value,
    })
  }
  getAllBrand = async (value) => {
    const response = await getAllBrand(value)
    let brands = []
    response.data.forEach(index => {
      brands.push(index.nome)
    });
    this.setState({
      vehicleBrand: brands
    })
  }
  render() {
    return (
      <Row>
        <Container className="container">
          <Row>
            <p  style={{ width: '100%' }}>Veiculo: {this.state.vehicleSelect} </p>
            <p  style={{ width: '100%' }}>Marca: {this.state.brandSelect} </p>
            <Dropdown types={this.state.vehicleType} selectType={(String) => this.getType(String)} label={this.state.labelType.value}/>
            <Dropdown types={this.state.vehicleBrand} selectType={(String) => this.getBrand(String)} label={this.state.labelBrand.value}/>
            
          </Row>
        </Container>
      </Row>
    )
  }
}
export default VehiclesContainer