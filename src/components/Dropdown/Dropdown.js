import React from 'react'
import { Dropdown } from 'react-bootstrap';
import '../Dropdown/Dropdown.scss';

class DropdownBtn extends React.Component{
 
  render() {
    let type = this.props.types;
    let itens = []
    type.forEach(index => {
      itens.push(<Dropdown.Item key={index} onClick={() => this.props.selectType(`${index}`)} >{index}</Dropdown.Item>)
    });

    return (
      <div>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
          {this.props.label}
          </Dropdown.Toggle>
          <Dropdown.Menu className="scrollable-menu">
            {itens}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    )
  }
}
export default DropdownBtn