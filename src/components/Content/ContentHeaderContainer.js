import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsThunk } from '../../actions/content-actions'
import { setEditItem } from '../../actions/modal-modes-actions'
import ContentHeader from './ContentHeader'

const ContentHeaderContainer = (props) => {

    const dispatch = useDispatch()
    const filterConfig = useSelector(state => state.content.filterConfig)

    return(
        <>
            <ContentHeader addProductClick={() => dispatch(setEditItem(true))} {...props} searchClick={(searchValue) => {
                            dispatch(getProductsThunk(searchValue, filterConfig))
                        }}/>
        </>
    )
}
export default ContentHeaderContainer