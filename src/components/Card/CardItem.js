import { Card, Col, Image, Button, Row } from 'react-bootstrap'
import { FaStar } from 'react-icons/fa'
import { useNavigate } from 'react-router'
import s from './Card.module.css'

const CardItem = (props) => {

  const navigate = useNavigate()

    return (
      <Row>
        <Card style={{margin: '9px auto', width: '80%'}}>
          <div style={{cursor: "pointer"}} onClick={() => navigate(`item-details/${props.id}`)}>
            <div>
              <Image height={150} src={props.image || 'https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png'} style={{position: "relative"}}/>
              <div style={{position: "absolute", top: "125px", left: "35px"}}>
                {[...Array(Math.round(props.rating)||1)].map((el, i) => <FaStar size="15" key={i} style={{color: "#f2da3d"}}/>)}
              </div>
            </div>
            <div>
              <div className={s.card_title}>{props.title}</div>
              <div className={s.card_description}>{props.description}</div>
            </div>
          </div>
          <div className={s.card_bottom}>
            <div style={{fontWeight: "600", margin: "auto", fontSize: "19px"}}>${props.price}</div>
            <div>
              {props.role === "admin"
              &&<Button style={{padding: 0}} variant="outline-secondary" onClick={() => props.handleShow(props.id)}>Delete</Button>}
              <Button style={{padding: 0}} variant="outline-secondary" onClick={() => navigate(`/item-details/${props.id}`)}>Details</Button>
            </div>
          </div>
        </Card>
      </Row>
        
    )
}
export default CardItem