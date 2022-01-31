import { useFormik } from "formik"
import React from "react"
import { Col, Form, Row, Button, Accordion } from "react-bootstrap"
import { useDispatch } from "react-redux"
import * as Yup from 'yup'
import { setCurrentPage, setFilterConfig } from "../../actions/content-actions"

const FilterArea = React.memo((props) => {

    const priceRegexp = /^[0-9]*$/
    const priceChange = (e) => {
        priceRegexp.test(e.target.value)
            && formik.handleChange(e)
    }

    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            available: false,
            gender: 'Unisex',
            category: 'None',
            rating: '',
            priceFrom: '',
            priceTo: ''
        },
        onSubmit: (form) => {
            const data = { ...form }
            Object.keys(data).forEach(key => {
                if (!data[key] || data[key] === "None") {
                    delete data[key];
                }
            })
            if (data.available) data.available = "Yes"
            dispatch(setFilterConfig(data))
            dispatch(setCurrentPage(1))
            //dispatch(getFilteredProductsThunk(data))
        },
        validationSchema: Yup.object({
            rating: Yup.number().typeError("Must be a number").equals([1, 2, 3, 4, 5], "Must be from 1 to 5"),
            priceFrom: Yup.number()
                .test({
                    name: 'pricesCompare',
                    exclusive: false,
                    params: {},
                    message: "'price to' must be larger then 'price from'",
                    test: function (value) {
                        // You can access the price field with `this.parent`.
                        // if return false then will add error
                        return value && this.parent.priceTo ? value <= this.parent.priceTo : true
                    },
                }),
            priceTo: Yup.number()
        })
    })

    return (
        <>
            <Accordion style={{margin: '18px'}}>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Advanced search</Accordion.Header>
                    <Accordion.Body>
                        <Row style={{ margin: '12px 0', border: 'gray solid 1px', padding: "5px" }}>
                            <Col>
                                <Form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
                                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                        <div>
                                            <h5>Available only</h5>
                                            <div>
                                                <Form.Check checked={formik.values.available} onChange={formik.handleChange} name="available" type='checkbox' />
                                            </div>
                                        </div>
                                        <div>
                                            <h5>Gender</h5>
                                            <div>
                                                <Form.Check onChange={formik.handleChange} type="radio" name="gender" value="Male" label="Male" />
                                            </div>
                                            <div>
                                                <Form.Check onChange={formik.handleChange} type="radio" name="gender" value="Female" label="Female" />
                                            </div>
                                            <div>
                                                <Form.Check onChange={formik.handleChange} type="radio" name="gender" value="Unisex" label="Unisex" defaultChecked />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="cars">
                                                <h5>Category</h5>
                                            </label>
                                            <div>
                                                <Form.Select value={formik.values.category} onChange={formik.handleChange} name="category">
                                                    <option value="None">None</option>
                                                    <option value="Cheap">Cheap</option>
                                                    <option value="Super cheap">Super cheap</option>
                                                    <option value="Expensive">Expensive</option>
                                                </Form.Select>
                                            </div>
                                        </div>
                                        <div>
                                            <h5>Rating</h5>
                                            <div>
                                                <Form.Control value={formik.values.rating} onChange={formik.handleChange} id="rating" name="rating" type="text" placeholder="From 1 to 5" />
                                                {formik.errors.rating && <div style={{ color: "red" }}>{formik.errors.rating}</div>}
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                        <div style={{ textAlign: 'left' }}>
                                            <h5>Price</h5>
                                            <div style={{ display: "flex", justifyContent: "space-around" }}>
                                                <div>
                                                    <Form.Control value={formik.values.priceFrom}
                                                        onChange={priceChange}
                                                        id="priceFrom"
                                                        name="priceFrom" placeholder="From" style={{ margin: "5px 15px" }} />
                                                    { }
                                                </div>
                                                <div>
                                                    <Form.Control value={formik.values.priceTo}
                                                        onChange={priceChange}
                                                        id="priceTo"
                                                        name="priceTo" placeholder="To" style={{ margin: "5px 15px" }} />
                                                </div>
                                            </div>
                                            {!!formik.values.priceFrom && !!formik.values.priceTo ? <div style={{ color: "red" }}>{formik.errors.priceFrom}</div> : null}
                                        </div>
                                        <div>
                                            <Button variant="outline-secondary" type="submit" style={{ marginTop: "37px" }}>Apply</Button>
                                        </div>
                                        <div>
                                            <Button variant="outline-secondary" style={{ marginTop: "37px" }} type="reset" onClick={() => dispatch(setFilterConfig({}))}>Clear</Button>
                                        </div>
                                    </div>
                                </Form>
                            </Col>
                        </Row>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    )
})

export default FilterArea