import React from 'react'
// import Grid from 'react-bootstrap/Grid';
import { Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import {getAllBrand, getByBrand} from '../services/api'
import Dropdown from '../components/Dropdown/Dropdown'

class VehiclesContainer extends React.Component {
  state = {
    typeSelect: '',
    brandSelect: '',
    yearSelect:'',
    priceSelect:'',
    
    labelType: {
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
      value: 'Selecione uma Marca',
      label: {
        name: []
      },
      list:{}
    },
    labelYear: {
      value: 'Selecione um Ano',
      label: {
        name: []
      },
      list:{}
    },
    labelPrice: {
      value: 'Selecione por Preço'
    },
  }
  getType = (value) => {
    this.setState((state,props) => ({
      typeSelect: value,
    }))
    this.getAllBrand(value)
  }
  getBrand = (value) => {
    this.setState((state, props) => ({
      brandSelect: value,
    }))
    this.getByBrand(value)
  }
  getYear = (value) => {
    this.setState((state, props) => ({
      yearSelect: value,
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

  getByBrand = async (brand) => {
    let labelYear = Object.assign({}, this.state.labelYear);
    let list = this.state.labelBrand.list
    let id = ''
    let years = []
    let itens = []
    list.forEach(index => {
      if(index.nome === brand) {
        id = index.codigo
      }
    })
    const response = await getByBrand(this.state.typeSelect, id)
    response.data.anos.forEach(index => {
      years.push(index.nome)
      itens.push(index)
    })
    labelYear.label.name = years
    labelYear.list = itens
    this.setState((state, props) => ({
      labelYear
    }))
  }


  render() {
    return (
      <Row>
        <Container className="container">
          <Row>
            <p  style={{ width: '100%' }}>Veiculo: {this.state.typeSelect} </p>
            <p  style={{ width: '100%' }}>Marca: {this.state.brandSelect} </p>
            <p  style={{ width: '100%' }}>Marca: {this.state.yearSelect} </p>
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