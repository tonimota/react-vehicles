import React from 'react'
import { Card } from 'react-bootstrap';
import './Card.scss'
import noimage from '../../assets/imgs/noimage.png'

class CardDetail extends React.Component{
  render() {
    return (
      <Card>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>{this.props.modelo}</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the bulk of
            the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
    )
  }
}

export default CardDetail