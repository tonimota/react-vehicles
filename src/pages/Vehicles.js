import React from 'react'
// import Grid from 'react-bootstrap/Grid';
import { Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import {getByType, getByBrand, getYearByModel, getPrice} from '../services/api'
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
      id: '',
      value: 'Selecione uma Marca',
      label: {
        name: []
      },
      list:{}
    },
    labelYear: {
      yearSelect:'',
      id: '',
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
    labelModel: {
      selectedModel: '',
      id: '',
      value: 'Selecione um modelo',
      label: {
        name: []
      },
      models: [],
    },
    detail: {}
  }
  getModel = (value) => {
    let labelModel = Object.assign({}, this.state.labelModel);
    let id = ''
    labelModel.models.forEach(index => {
      if(index.nome === value) {
        id = index.codigo
      }
    })
    labelModel.id = id
    this.setState((state,props) => ({
      labelModel,
    }))
    this.getYearByModel(id)
  }
  getType = (value) => {
    let labelType = Object.assign({}, this.state.labelType);
    labelType.typeSelect = value
    this.setState((state,props) => ({
      labelType,
    }))
    this.getByType(value)
  }
  getBrand = (value) => {
    let labelBrand = Object.assign({}, this.state.labelBrand);
    let brand = ''
    labelBrand.list.forEach(index => {
      if(index.nome === value) {
        brand = index.codigo
      }
    })
    labelBrand.brandSelect = value
    labelBrand.id = brand
    this.setState((state, props) => ({
      labelBrand,
    }))
    this.getByBrand(brand)
  }
  getPrice = async (value) => {
    const type = this.state.labelType.typeSelect
    const brand = this.state.labelBrand.id
    const model = this.state.labelModel.id
    let id = ''
    this.state.labelYear.list.forEach(index => {
      if(index.nome === value) {
        id = index.codigo
      }
    })
    const response = await getPrice(type, brand, model, id )
    this.setState((state, props) => ({
      detail: response.data
    }))
    console.log(response.data)
  }
  getByType = async (value) => {
    const response = await getByType(value)
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
  getByBrand = async (id) => {
    let labelModel = Object.assign({}, this.state.labelModel);
    let itens = []
    const response = await getByBrand(this.state.labelType.typeSelect, id)
    response.data.modelos.forEach(index => {
      itens.push(index.nome)
    })
    labelModel.label.name = itens
    labelModel.models = response.data.modelos
    this.setState((state, props) => ({
      labelModel
    }))
  }
  getYearByModel = async (model) => {
    let labelYear = Object.assign({}, this.state.labelYear);
    const type = this.state.labelType.typeSelect
    const brand = this.state.labelBrand.id
    const response = await getYearByModel(type, brand, model )
    let years = []
    let itens = []
    response.data.forEach(index => {
      years.push(index.nome)
      itens.push(index)
    })
    labelYear.label.name = years
    labelYear.list = itens
    this.setState((state, props) => ({
      labelYear,
    }))
  }
  componentDidUpdate() {
    console.log(this.state.labelModel);
    // console.log(this.state.labelYear);
  }
  render() {
    return (
      <Row>
        <Container className="container">
          <Row>
            <h1>Vehicles</h1>
            <p  style={{ width: '100%' }}>Veiculo: {this.state.labelType.typeSelect} </p>
            <p  style={{ width: '100%' }}>Marca: {this.state.labelBrand.brandSelect} </p>
            <p  style={{ width: '100%' }}>Ano: {this.state.labelYear.yearSelect} </p>
            {/* <p  style={{ width: '100%' }}>Marca: {this.state.labelPrice.priceSelect} </p> */}
            <Dropdown types={this.state.labelType.label.name} selectType={(String) => this.getType(String)} label={this.state.labelType.value}/>
            <Dropdown types={this.state.labelBrand.label.name} selectType={(String) => this.getBrand(String)} label={this.state.labelBrand.value}/>
            <Dropdown types={this.state.labelModel.label.name} selectType={(String) => this.getModel(String)} label={this.state.labelModel.value}/>
            <Dropdown types={this.state.labelYear.label.name} selectType={(String) => this.getPrice(String)} label={this.state.labelYear.value}/>
          </Row>
          <Row>
          </Row>
        </Container>
      </Row>
    )
  }
}
export default VehiclesContainer