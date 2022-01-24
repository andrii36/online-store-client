import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { getProductsThunk } from '../../actions/content-actions'
import { setEditItem } from '../../actions/modal-modes-actions'
import ContentHeader from './ContentHeader'

const ContentHeaderContainer = (props) => {

    const dispatch = useDispatch()
    const filterConfig = useSelector(state => state.content.filterConfig)
    const navigate = useNavigate()

    const addProductClick = () => {
        navigate('/add-new-product')
    }
    return(
        <>
            <ContentHeader addProductClick={addProductClick} {...props} searchClick={(searchValue) => {
                            dispatch(getProductsThunk(searchValue, filterConfig))
                        }}/>
        </>
    )
}
export default ContentHeaderContainer