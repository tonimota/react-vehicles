import React from 'react'
import { Card } from 'react-bootstrap';
import './Card.scss'
import noimage from '../../assets/imgs/noimage.png'

class CardDetail extends React.Component{
  render() {
    let detail = this.props.detail
    let el = ''
    if(Object.values(detail).length > 0) {
      el = <Card>
            <Card.Img variant="top" src={noimage} />
            <Card.Body>
              <h3>{detail.Modelo}</h3>
              <p>
                <strong>AnoModelo: </strong>
                <span>{detail.AnoModelo}</span>
              </p>
              <p>
                <strong>CodigoFipe: </strong>
                <span>{detail.CodigoFipe}</span>
              </p>
              <p>
                <strong>Combustivel: </strong>
                <span>{detail.Combustivel}</span>
              </p>
              <p>
                <strong>Marca: </strong>
                <span>{detail.Marca}</span>
              </p>
              <p>
                <strong>MesReferencia: </strong>
                <span>{detail.MesReferencia}</span>
              </p>
              <p>
                <strong>Valor: </strong>
                <span>{detail.Valor}</span>
              </p>
          </Card.Body>
        </Card>
    }
    return (
      <div>
        {el}
      </div>
    )
  }
}

export default CardDetail