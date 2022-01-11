import React, { useState } from 'react'
import { Button, Col, FormControl, InputGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsThunk } from '../../redux-store/content-reducer'
import { setEditItem } from '../../redux-store/modal-modes-reducer'

const ContentHeader = ({role}) => {

    const dispatch = useDispatch()
    const filterConfig = useSelector(state => state.content.filterConfig)
    const [searchValue, setSearchValue] = useState('')

    return(
        <Row style={{display: "flex", justifyContent: "space-between"}}> 
            <Col>
                {role === "admin"
                &&<Button style={{width: "60%"}} variant="outline-primary" onClick={() => dispatch(setEditItem(true))}>Add product</Button>}
            </Col>
            <Col>
                <InputGroup className="mb-3" style={{width: "75%", marginLeft: "auto"}}>
                    <FormControl
                    value={searchValue}
                    onChange={(e) => {
                        setSearchValue(e.target.value)
                    }}
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="basic-addon2"
                    />
                    <Button variant="outline-primary" id="button-addon2" 
                        onClick={() => {
                            dispatch(getProductsThunk(searchValue, filterConfig))
                        }}
                    >
                        Search
                    </Button>
                </InputGroup>
            </Col>
        </Row>
    )
}
export default ContentHeader