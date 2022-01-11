import { useFormik } from 'formik'
import { useEffect } from 'react'
import { Button, CloseButton, Col, Form, Modal, Row } from "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux'
import { addProductThunk, getProductByIdThunk, updateProductThunk } from '../../redux-store/content-reducer'
import * as Yup from 'yup'
import InputText from '../Common/InputText'
import InputTextArea from '../Common/InputTextArea'
import DropdownMenu from '../Common/DropdownMenu'
import { setEditItem, setEditItemSuccess } from '../../redux-store/modal-modes-reducer'

const EditItemModal = ({ productId, addProduct}) => {

    const numberRegexp = /^[0-9.]*$/
    const ratingRegexp = /^[1-5]*$/
    const onChange = (e, regexp) => {
        regexp.test(e.target.value)
        && formik.handleChange(e)
    }

    const role = useSelector(state => state.auth.currentUser.role)
    const {title, description, price, gender, available, category, itemsSold, rating, image} = useSelector(state => state.content.currentProduct)
    const { message, code } = useSelector(state => state.content)
    const dispatch = useDispatch() 

    const formik = useFormik({
        initialValues: {
            title: title || '',
            description: description || '',
            price: price || '',
            gender: gender || 'Select',
            available: available || 'Select',
            category: category || 'Select',
            itemsSold: itemsSold || '',
            rating: rating || '',
            image: image || ''
        },
        onSubmit: (data) => onSubmit(data),
        
        validationSchema: Yup.object({
            title: Yup.string().max(100, 'Maximum length is 100 symbols').required('Required'),
            description: Yup.string().max(800, 'Maximum length is 800 symbols').required('Required'),
            price: Yup.number().required("Required").positive("Price must be positive number"),
            rating: Yup.number().typeError("Must be a number").required("Required").equals([1,2,3,4,5], "Must be from 1 to 5")
        })
    })  

    useEffect(() => {
        if(!addProduct && !title){
            dispatch(getProductByIdThunk(productId))
        }
    }, [])
    useEffect(() => {
        if(code === 0) {
            dispatch(setEditItem(false))
            dispatch(setEditItemSuccess(true))
        }
    }, [code])

    const onSubmit = (data) => {
        let formData = {...data}
        formData = {...formData, 
                       title: formData.title.trim(),
                       description: formData.description.trim()
                    }
        addProduct && dispatch(addProductThunk(formData))
        !addProduct && dispatch(updateProductThunk(formData, productId))
    }

    if(role !== "admin"){
        return <h1>Please login as admin</h1>
    }
    return(
        <>
            <Modal show={true} fullscreen={true}>
                <Modal.Header>
                    <Modal.Title>
                        <div>{addProduct ? "Create new product" : "Edit item"}</div>
                    </Modal.Title>
                    {code === 1 
                    && 
                    <div style={{color: "red", margin: "auto", fontSize: "25px"}}>
                        {message}
                    </div>}
                    <CloseButton onClick={() => dispatch(setEditItem(false))}/>
                </Modal.Header>
                <Modal.Body>
                        <Form onSubmit={formik.handleSubmit}>
                            <Row>
                                <Col>
                                    <Row style={{position: "relative"}}>
                                        <InputText 
                                            label="Image URL:" id="ratingInput" placeholder="URL"
                                            name="image" value={formik.values.image} onChange={formik.handleChange}
                                        />
                                        <img style={{height: '45vh', width: '90%'}} 
                                            src={formik.values.image || `https://toppng.com/uploads/preview/add-camera-icon-icon-add-11553485583calilemiyg.png`}/>
                                    </Row>
                                    <Row style={{textAlign: 'left', display: 'flex', justifyContent: 'space-between'}}>
                                        <Col style={{textAlign: "center"}}>
                                            <div>
                                                <InputText label="Rating:" id="ratingInput" placeholder="From 1 to 5" onBlur={formik.handleBlur}
                                                    name="rating" value={formik.values.rating} onChange={(e) => onChange(e, ratingRegexp)}
                                                />
                                                <div>{formik.touched.rating && formik.errors.rating && <p style={{color: "red"}}>{formik.errors.rating}</p>}</div>
                                            </div>
                                            <div>
                                                <InputText label="Price:" id="priceInput" placeholder="US dollars"
                                                    name="price" value={formik.values.price} onChange={(e) => onChange(e, numberRegexp)} onBlur={formik.handleBlur}
                                                />
                                                <div>{formik.touched.price && formik.errors.price && <p style={{color: "red"}}>{formik.errors.price}</p>}</div>
                                            </div>
                                        </Col>
                                        <Col style={{textAlign: "center"}}>
                                            <DropdownMenu itemsArr={["Select", "Yes", "No"]} label="Available:" id="available" title="Yes"
                                                          name="available" value={formik.values.available} onChange={formik.handleChange}
                                            />
                                            <DropdownMenu itemsArr={["Select", "Male", "Female", "Unisex"]} label="Gender:" id="gender" title="Male"
                                                          name="gender" value={formik.values.gender} onChange={formik.handleChange}
                                            />
                                        </Col>
                                        <Col  style={{textAlign: "center"}}>
                                            <InputText label="Items sold:" id="itemsSoldInput" placeholder="Number of items sold"
                                                       name="itemsSold" value={formik.values.itemsSold} onChange={(e) => onChange(e, numberRegexp)}
                                            />
                                            <DropdownMenu itemsArr={["Select", "Cheap", "Super cheap", "Expensive"]} label="Category:" id="category" title="Cheap"
                                                          name="category" value={formik.values.category} onChange={formik.handleChange}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                                <Col>
                                    <Row>
                                        <InputText style={{width: "90%"}} label="Title:" id="titleInput" placeholder="Name of product"
                                                   name="title" value={formik.values.title} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.title && formik.errors.title && <p style={{color: "red"}}>{formik.errors.title}</p>}
                                    </Row>
                                    <Row style={{marginTop: '30px'}}>
                                        <InputTextArea label="Description:" id="descriptionInput" placeholder="Describe product"
                                                       name="description" value={formik.values.description} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.description && formik.errors.description ? <p style={{color: "red"}}>{formik.errors.description}</p> : null}
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <div style={{height: '100px', marginTop: "50px"}}>
                                    <Row style={{width: "50%", margin: "0 auto"}}>
                                        <Col>
                                            <Button disabled={Object.keys(formik.errors).length !== 0} style={{width: "100%"}} variant="outline-success" type="submit">{addProduct ? "Save" : "Update"}</Button>
                                        </Col>
                                        <Col>
                                            <Button style={{width: "100%"}} variant="outline-secondary" onClick={() => dispatch(setEditItem(false))}>Cancel</Button>
                                        </Col>
                                    </Row>
                                </div>
                            </Row>
                        </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default EditItemModal