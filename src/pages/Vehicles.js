import React from 'react'
// import Grid from 'react-bootstrap/Grid';
import { Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import {getAllBrand, getByBrand} from '../services/api'
import Dropdown from '../components/Dropdown/Dropdown'

class VehiclesContainer extends React.Component {
  state = {
    labelType: {
      typeSelect: '',
      value: 'Selecione um tipo de veiculo',
      label: {
        name: [
          'carros',
          'motos',
          'caminhoes' 
        ]
      },
    },
    labelBrand: {
      brandSelect: '',
      value: 'Selecione uma Marca',
      label: {
        name: []
      },
      list:{}
    },
    labelYear: {
      yearSelect:'',
      value: 'Selecione um Ano',
      label: {
        name: []
      },
      list:{}
    },
    labelPrice: {
      value: 'Selecione por Preço',
      priceSelect: 'fdiowfj'
    },
    models: []
  }
  getType = (value) => {
    let labelType = Object.assign({}, this.state.labelType);
    labelType.typeSelect = value
    this.setState((state,props) => ({
      labelType,
    }))
    this.getAllBrand(value)
  }
  getBrand = (value) => {
    let labelBrand = Object.assign({}, this.state.labelBrand);
    labelBrand.brandSelect = value
    this.setState((state, props) => ({
      labelBrand,
    }))
    this.getIdBrand(value)
  }
  getYear = (value) => {
    let labelYear = Object.assign({}, this.state.labelYear);
    labelYear.yearSelect = value
    this.setState((state, props) => ({
      labelYear,
    }))
  }
  getPrice = (value) => {
    let labelPrice = Object.assign({}, this.state.labelPrice);
    labelPrice.priceSelect = value
    this.setState((state, props) => ({
      labelPrice,
    }))
  }
  getAllBrand = async (value) => {
    const response = await getAllBrand(value)
    let brands = []
    let itens = []
    let labelBrand = Object.assign({}, this.state.labelBrand);
    response.data.forEach(index => {
      brands.push(index.nome)
      itens.push(index)
    });
    labelBrand.label.name = brands
    labelBrand.list = itens
    this.setState((state, props) => ({
      labelBrand
    }))
  }

  getIdBrand = (brand) => {
    let list = this.state.labelBrand.list
    let id = ''
    list.forEach(index => {
      if(index.nome === brand) {
        id = index.codigo
      }
    })
    if(id) {this.getByBrand(id)}
  }

  getByBrand = async (id) => {
    let labelYear = Object.assign({}, this.state.labelYear);
    let years = []
    let itens = []
    const response = await getByBrand(this.state.labelType.typeSelect, id)
    response.data.anos.forEach(index => {
      years.push(index.nome)
      itens.push(index)
    })
    this.setState((state, props) => ({
      models: response.data.modelos
    }))
    labelYear.label.name = years
    labelYear.list = itens
    this.setState((state, props) => ({
      labelYear
    }))
    console.log(this.state.models)
  }


  render() {
    return (
      <Row>
        <Container className="container">
          <Row>
            <h1>Vehicles</h1>
            <p  style={{ width: '100%' }}>Veiculo: {this.state.labelType.typeSelect} </p>
            <p  style={{ width: '100%' }}>Marca: {this.state.labelBrand.brandSelect} </p>
            <p  style={{ width: '100%' }}>Marca: {this.state.labelYear.yearSelect} </p>
            {/* <p  style={{ width: '100%' }}>Marca: {this.state.labelPrice.priceSelect} </p> */}
            <Dropdown types={this.state.labelType.label.name} selectType={(String) => this.getType(String)} label={this.state.labelType.value}/>
            <Dropdown types={this.state.labelBrand.label.name} selectType={(String) => this.getBrand(String)} label={this.state.labelBrand.value}/>
            <Dropdown types={this.state.labelYear.label.name} selectType={(String) => this.getYear(String)} label={this.state.labelYear.value}/>
            
          </Row>
        </Container>
      </Row>
    )
  }
}
export default VehiclesContainer