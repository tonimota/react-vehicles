import React from 'react'
// import Grid from 'react-bootstrap/Grid';
import { Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import {getByType, getByBrand, getYearByModel, getPrice} from '../services/api'
import Dropdown from '../components/Dropdown/Dropdown'
import Card from '../components/Card/CardDetail'
import './Vehicle.scss'

class VehiclesContainer extends React.Component {
  
  state = {
    labelType: {
      typeSelect: '',
      value: 'Selecione um Tipo',
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
      priceSelect: ''
    },
    labelModel: {
      selectedModel: '',
      id: '',
      value: 'Selecione um Modelo',
      label: {
        name: []
      },
      models: [],
    },
    detail: {}
  }
  labelItens = (itens) => {
    let list = []
    itens.forEach(index => {
      list.push(index.nome)
    })
    return list
  }
  getId = (name, list) => {
    let id = ''
    list.forEach(index => {
      if(index.nome === name) {
        id = index.codigo
      }
    })
    return id
  }
  getModel = (value) => {
    let labelModel = Object.assign({}, this.state.labelModel);
    labelModel.selectedModel = value
    labelModel.id = this.getId(value, labelModel.models)
    this.setState((state,props) => ({
      labelModel,
    }))
    this.getYearByModel(labelModel.id)
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
    labelBrand.brandSelect = value
    labelBrand.id = this.getId(value, labelBrand.list)
    this.setState((state, props) => ({
      labelBrand,
    }))
    this.getByBrand(labelBrand.id)
  }
  getPrice = async (value) => {
    let labelYear = Object.assign({}, this.state.labelYear);
    labelYear.yearSelect = value
    const type = this.state.labelType.typeSelect
    const brand = this.state.labelBrand.id
    const model = this.state.labelModel.id
    let id =  this.getId(value, this.state.labelYear.list)
    const response = await getPrice(type, brand, model, id )
    this.setState((state, props) => ({
      labelYear: labelYear,
      detail: response.data
    }))
  }
  getByType = async (value) => {
    const response = await getByType(value)
    let labelBrand = Object.assign({}, this.state.labelBrand);
    labelBrand.label.name = this.labelItens(response.data)
    labelBrand.list = response.data
    this.setState((state, props) => ({
      labelBrand
    }))
  }
  getByBrand = async (id) => {
    let labelModel = Object.assign({}, this.state.labelModel);
    const response = await getByBrand(this.state.labelType.typeSelect, id)
    labelModel.label.name = this.labelItens(response.data.modelos)
    labelModel.models = response.data.modelos
    this.setState((state, props) => ({
      labelModel
    }))
  }
  getYearByModel = async (model) => {
    let labelYear = Object.assign({}, this.state.labelYear);
    const type = this.state.labelType.typeSelect
    const brand = this.state.labelBrand.id
    const response = await getYearByModel(type, brand, model)
    labelYear.label.name = this.labelItens(response.data)
    labelYear.list = response.data
    this.setState((state, props) => ({
      labelYear,
    }))
  }
  render() {
    return (
      <Row>
        <Container className="container">
          <Row>
            <h1>Veículos</h1>
            <p>Tipo: {this.state.labelType.typeSelect} </p>
            <p>Marca: {this.state.labelBrand.brandSelect} </p>
            <p>Modelo: {this.state.labelModel.selectedModel} </p>
            <p>Ano: {this.state.labelYear.yearSelect} </p>
            <Dropdown types={this.state.labelType.label.name} selectType={(String) => this.getType(String)} label={this.state.labelType.value}/>
            <Dropdown types={this.state.labelBrand.label.name} selectType={(String) => this.getBrand(String)} label={this.state.labelBrand.value}/>
            <Dropdown types={this.state.labelModel.label.name} selectType={(String) => this.getModel(String)} label={this.state.labelModel.value}/>
            <Dropdown types={this.state.labelYear.label.name} selectType={(String) => this.getPrice(String)} label={this.state.labelYear.value}/>
          </Row>
          <Row>
            <Card detail={this.state.detail}></Card>
          </Row>
        </Container>
      </Row>
    )
  }
}
export default VehiclesContainer