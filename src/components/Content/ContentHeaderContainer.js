import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { setCurrentPage, setSearchValue } from '../../actions/content-actions'
import ContentHeader from './ContentHeader'

const ContentHeaderContainer = (props) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const addProductClick = () => {
        navigate('/add-new-product')
    }
    return(
        <>
            <ContentHeader addProductClick={addProductClick} {...props} searchClick={(searchValue) => {
                            dispatch(setSearchValue(searchValue))
                            dispatch(setCurrentPage(1))
                        }}/>
        </>
    )
}
export default ContentHeaderContainer