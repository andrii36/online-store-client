import s from './ItemDetails.module.css'
import { useEffect, useRef, useState } from "react"
import { Col, Container, Row, Button, DropdownButton, Dropdown, Form, Modal } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { updateProductThunk, getProductByIdThunk } from "../../redux-store/content-reducer"
import { useLocation } from "react-router-dom"
import DropdownMenu from '../Common/DropdownMenu'
import InputText from '../Common/InputText'
import InputTextArea from '../Common/InputTextArea'
import { Formik } from 'formik'

const EditItem = () => {

    //const [mode, setMode] = useState(editMode||addMode)

    const {title, description, image, price, rating, gender, category, available, itemsSold} = useSelector(state => state.content.currentProduct)
    const role = useSelector(state => state.auth.currentUser.role)
    const message = useSelector(state => state.content.message)
    const dispatch = useDispatch()
    const location = useLocation()
    const fileInput = useRef()
    const [file, setFile] = useState(null)
    const [formData, setFormData] = useState({})
    const [fullscreen, setFullscreen] = useState(true)
    const [show, setShow] = useState(false)

    const productId = location.pathname.split('/')[2]

    useEffect(() => {
        if(!title){
            dispatch(getProductByIdThunk(productId))
        }
        
    }, [])

    const onSubmit = (data) => {
        dispatch(updateProductThunk(data, productId))
    }
    const handleShow = (breakpoint) => {
        setFullscreen(breakpoint);
        setShow(true);
      }
    handleShow(true)
    if(role !== "admin"){
        return <div>Please login as admin</div>
    }
    return(
        <div style={{padding: '18px'}}>
            
                    <Formik 
                        onSubmit={(data) => onSubmit(data)}
                        initialValues={{
                        title,
                        description,
                        price,
                        gender,
                        available,
                        category,
                        itemsSold,
                        rating,
                        image
                        }}
                    >
                    {({
                        handleSubmit,
                        handleChange,
                        handleBlur,
                        values,
                        touched,
                        isValid,
                        errors,
                    }) => (
                        <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                            <Modal.Header closeButton>
                                <Modal.Title>Modal</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                            <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col>
                                    <Row style={{position: "relative"}}>
                                        <InputText 
                                            label="Image URL:" id="ratingInput" placeholder="URL"
                                            name="image" value={values.image} onChange={handleChange}
                                        />
                                        <img style={{height: '45vh', width: '90%'}} 
                                            src={image || `https://toppng.com/uploads/preview/add-camera-icon-icon-add-11553485583calilemiyg.png`}/>
                                    </Row>
                                    <Row style={{textAlign: 'left', display: 'flex', justifyContent: 'space-between'}}>
                                        <Col style={{textAlign: "center"}}>
                                            <InputText label="Rating:" id="ratingInput" placeholder="From 1 to 5"
                                                    name="rating" value={values.rating} onChange={handleChange}
                                            />
                                            <InputText label="Price:" id="priceInput" placeholder="US dollars"
                                                    name="price" value={values.price} onChange={handleChange}
                                            />
                                        </Col>
                                        <Col style={{textAlign: "center"}}>
                                            <DropdownMenu itemsArr={["Select", "Yes", "No"]} label="Available:" id="available" title="Yes"
                                                          name="available" value={values.available} onChange={handleChange}
                                            />
                                            <DropdownMenu itemsArr={["Select", "Male", "Female", "Unisex"]} label="Gender:" id="gender" title="Male"
                                                          name="gender" value={values.gender} onChange={handleChange}
                                            />
                                        </Col>
                                        <Col  style={{textAlign: "center"}}>
                                            <InputText label="Items sold:" id="itemsSoldInput" placeholder="Number of items sold"
                                                       name="itemsSold" value={values.itemsSold} onChange={handleChange}
                                            />
                                            <DropdownMenu itemsArr={["Select", "Cheap", "Super cheap", "Expensive"]} label="Category:" id="category" title="Cheap"
                                                          name="category" value={values.category} onChange={handleChange}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                                <Col>
                                    <Row>
                                        <InputText style={{width: "90%"}} label="Title:" id="titleInput" placeholder="Name of product"
                                                   name="title" value={values.title} onChange={handleChange}
                                        />
                                    </Row>
                                    <Row style={{marginTop: '30px'}}>
                                        <InputTextArea label="Description:" id="descriptionInput" placeholder="Describe product"
                                                       name="description" value={values.description} onChange={handleChange}
                                        />
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <div style={{height: '100px', marginTop: "50px"}}>
                                    <Row style={{width: "50%", margin: "0 auto"}}>
                                        <Col>
                                            <Button style={{width: "100%"}} variant="outline-success" type="submit">Save</Button>
                                        </Col>
                                        <Col>
                                            <Button style={{width: "100%"}} variant="outline-secondary" >Cancel</Button>
                                        </Col>
                                    </Row>
                                </div>
                                <div style={{color: message==="Failed" ? "red" : "green"}}>{message}</div>
                            </Row>
                        </Form>
                            </Modal.Body>
                        </Modal>
                        )}
                    </Formik>
                
        </div>
    )
}

export default EditItem

 {/* <div>
                <Formik
                    initialValues={{
                        image: null,
                        // rating: '',
                        // price: '',
                        // available: null,
                        // gender: '',
                        // itemsSold: '',
                        // category: '',
                        // title: '',
                        // description: ''
                    }}
                    onSubmit={(values) => onSub(values)}
                >
                    {({values, errors, touched, handleChange, handleSubmit, }) => (
                        <div>
                            <label>Picture:</label>
                            <input
                                type="file"
                                name="image"
                                onChange={handleChange}
                                value={values.image}
                            /><br/>
                             <label>Rating:</label>
                            <input
                                type="text"
                                name="rating"
                                onChange={handleChange}
                                value={values.rating}
                            /><br/>
                            <label>Price:</label>
                            <input
                                type="text"
                                name="price"
                                onChange={handleChange}
                                value={values.price}
                            /><br/>
                            <label>Available:</label>
                            <input
                                type="text"
                                name="available"
                                onChange={handleChange}
                                value={values.available}
                            /><br/>
                            <label>Gender:</label>
                            <input
                                type="text"
                                name="gender"
                                onChange={handleChange}
                                value={values.gender}
                            /><br/>
                            <label>Items sold:</label>
                            <input
                                type="text"
                                name="itemsSold"
                                onChange={handleChange}
                                value={values.itemsSold}
                            /><br/>
                            <label>Category:</label>
                            <input
                                type="text"
                                name="category"
                                onChange={handleChange}
                                value={values.category}
                            /><br/>
                            <label>Title:</label>
                            <input
                                type="text"
                                name="title"
                                onChange={handleChange}
                                value={values.title}
                            /><br/>
                            <label>Description:</label>
                            <input
                                type="text"
                                name="description"
                                onChange={handleChange}
                                value={values.description}
                            /><br/>
                            <button type="submit" onClick={handleSubmit}>Submit</button>
                    </div>
                    )}
                </Formik>
            </div> */}