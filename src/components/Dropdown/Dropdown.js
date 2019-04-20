import React from 'react'
import { Dropdown } from 'react-bootstrap';
import '../Dropdown/Dropdown.scss';

class DropdownBtn extends React.Component{
  state = {
    label: "Selecione um tipo de veiculo",
    vehicleType: ""
  }

  selectedVehicle = (value) => {
    let label = value.charAt(0).toUpperCase() + value.slice(1);
    this.setState({
      label: label,
      vehicleType: value
    })
  }

  render() {
    return (
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
        {this.state.label}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => this.selectedVehicle("carro")}>Carro</Dropdown.Item>
          <Dropdown.Item onClick={() => this.selectedVehicle("moto")}>Moto</Dropdown.Item>
          <Dropdown.Item onClick={() => this.selectedVehicle("caminhao")}>Caminhão</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    )
  }
}
export default DropdownBtn