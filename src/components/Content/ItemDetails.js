import s from './ItemDetails.module.css'
import { useEffect } from "react"
import { Col, Container, Row, Button } from "react-bootstrap"
import { FaStar } from 'react-icons/fa'
import { useDispatch, useSelector } from "react-redux"
import { clearCurrentProductAC, clearMessageAndCode, getProductByIdThunk } from "../../redux-store/content-reducer"
import { useLocation, useNavigate } from "react-router-dom"
import EditItemModal from './EditItemModal'
import EditItemSuccessModal from './EditItemSuccessModal'
import { setEditItem } from '../../redux-store/modal-modes-reducer'
import Loader from '../Common/Loader'

const ItemDetails = (props) => {

    const {title, description, image, price, rating, gender, category, itemsSold, available} = useSelector(state => state.content.currentProduct)
    const role = useSelector(state => state.auth.currentUser.role)
    const code = useSelector(state => state.content.code)
    const message = useSelector(state => state.content.message)
    const successModalMode = useSelector(state => state.modalModes.editItemSuccess)
    const editItem = useSelector(state => state.modalModes.editItem)
    const oneProductLoading = useSelector(state => state.content.oneProductLoading)
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    const productId = location.pathname.split('/')[2]

    useEffect(() => {
        dispatch(getProductByIdThunk(productId))
        return () => {
            dispatch(clearCurrentProductAC())
            dispatch(clearMessageAndCode())
        }
    }, [])

    if(oneProductLoading){
        return <Loader message='Data is loading...'/>
    }
    if(code == 1){
        return <h3>{message}</h3>
    }
    return(
        <Container style={{padding: '18px'}}>
            <div>
            <Button style={{position: "absolute", top: "90px", left: "12px"}} variant="outline-secondary" onClick={() => navigate(-1)}>Back</Button>
            <Row md={2}>
                <Col>
                    <div>
                        <img style={{height: '350px', width: '500px'}} src={image}/>
                    </div>
                    <div style={{textAlign: 'left', display: 'flex', justifyContent: 'space-around'}}>
                        <div style={{display: "flex"}}>
                            <div>
                                {[...Array(Math.round(rating)||1)].map((el, i) => <FaStar size="20" key={i} style={{color: "#f2da3d"}}/>)}
                            </div>
                            <div style={{marginLeft: "5px", fontSize: "19px", fontWeight: "500"}}>{rating}</div>
                        </div>
                        <div className={s.font17} style={{color: available==="Yes" && 'green'}}>
                            {available === "Yes" ? "Available now" : "Not available"}
                        </div>
                        <div className={s.font17} style={{color: 'red'}}>
                            <span style={{fontSize: '19px'}} >{itemsSold}</span> items sold
                        </div>
                    </div>
                        <div style={{display: 'flex', margin: '50px auto'}}>
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
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <h1>{title}</h1>
                        <div>
                            {role === "admin" && <Button variant="outline-primary" onClick={(e) => dispatch(setEditItem(true))}>Edit</Button>}
                        </div>
                    </div>
                    <div style={{marginTop: '30px'}}>{description}</div>
                </Col>
            </Row>
            <Row>
                <div style={{height: '100px'}}>
                    <Row>
                        <Button variant="outline-success" style={{width: '25%', margin: '15px auto'}}>Buy</Button>
                    </Row>
                </div>
            </Row>
            </div>
            {editItem && <EditItemModal editMode={editItem} productId={productId}/>}
            {code === 0 && successModalMode && <EditItemSuccessModal updated="updated"/>}
        </Container>
    )
}

export default ItemDetails