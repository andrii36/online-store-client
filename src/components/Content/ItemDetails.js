import s from './ItemDetails.module.css'
import { Col, Container, Row, Button, Alert } from "react-bootstrap"
import { FaStar } from 'react-icons/fa'
import Loader from '../Common/Loader'
const ItemDetails = (props) => {

    const { title, description, image, price, rating, gender, category, itemsSold, available } = props.currentProduct

    if (props.oneProductLoading) {
        return <Loader message='Data is loading...' />
    }
    if (props.code == 1) {
        return <h3>{props.message}</h3>
    }
    return (
        <Container style={{ padding: '18px' }}>
            <Alert show={props.code == 0 ? true : false} variant='success' onClose={props.onSuccessAlertClose} dismissible>
                Success! Thank you for purchase!
            </Alert>
            <Alert show={available == 'Yes' | Number(available) > 0 ? false : true} variant='danger'>
                This item is not available right now
            </Alert>
            <div>
                <Row md={2}>
                    <Col>
                        <div>
                            <img style={{ width: '100%' }} src={image || 'https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png'} />
                        </div>
                        <div style={{ textAlign: 'left', display: 'flex', justifyContent: 'space-around' }}>
                            <div style={{ display: "flex" }}>
                                <div>
                                    {[...Array(Math.round(rating) || 1)].map((el, i) => <FaStar size="20" key={i} style={{ color: "#f2da3d" }} />)}
                                </div>
                                <div style={{ marginLeft: "5px", fontSize: "19px", fontWeight: "500" }}>{rating}</div>
                            </div>
                            <div className={s.font17} style={{ color: available === "Yes" | Number(available) > 0 && 'green' }}>
                                {available === "Yes" | Number(available) > 0 ? `Available now ${available} items` : "Not available"}
                            </div>
                            <div className={s.font17} style={{ color: 'red' }}>
                                <span style={{ fontSize: '19px' }} >{itemsSold}</span> items sold
                            </div>
                        </div>
                        <div style={{ display: 'flex', margin: '50px auto' }}>
                            <div className={s.border}>
                                <label className={s.gray}>Price:</label>
                                <div className={s.font25}>${price}</div>
                            </div>
                            <div className={s.border}>
                                <label className={s.gray}>Gender:</label>
                                <div className={s.font25}>{gender}</div>
                            </div>
                            <div className={s.border}>
                                <label className={s.gray}>Category:</label>
                                <div className={s.font25}>{category}</div>
                            </div>
                        </div>
                    </Col>
                    <Col>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h1>{title}</h1>
                            <div>
                                {props.role === "admin" && <Button variant="outline-primary" onClick={props.onEditClick}>Edit</Button>}
                            </div>
                        </div>
                        <div style={{ marginTop: '30px' }}>{description}</div>
                    </Col>
                </Row>
                <Row>
                    <div style={{ height: '100px' }}>
                        <Row>
                            {available == 'Yes' | Number(available) > 0 ? <Button variant="outline-success" style={{ width: '25%', margin: '15px auto' }} onClick={props.onPurchaseClick}>Buy</Button> : null}
                        </Row>
                    </div>
                </Row>
            </div>
        </Container>
    )
}

export default ItemDetails