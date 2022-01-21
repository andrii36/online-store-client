import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import EditItemModal from './EditItemModal'
import EditItemSuccessModal from './EditItemSuccessModal'
import { clearCurrentProductAC, clearMessageAndCode, getProductByIdThunk } from '../../actions/content-actions'
import { setEditItem } from '../../actions/modal-modes-actions'
import ItemDetails from './ItemDetails'

const ItemDetailsContainer = (props) => {

    const currentProduct = useSelector(state => state.content.currentProduct)
    const role = useSelector(state => state.auth.currentUser.role)
    const code = useSelector(state => state.content.code)
    const message = useSelector(state => state.content.message)
    const successModalMode = useSelector(state => state.modalModes.editItemSuccess)
    const editItem = useSelector(state => state.modalModes.editItem)
    const oneProductLoading = useSelector(state => state.content.oneProductLoading)
    const dispatch = useDispatch()
    const location = useLocation()

    const productId = location.pathname.split('/')[2]

    useEffect(() => {
        dispatch(getProductByIdThunk(productId))
        return () => {
            dispatch(clearCurrentProductAC())
            dispatch(clearMessageAndCode())
        }
    }, [])

    const onEditClick = () => dispatch(setEditItem(true))

    return(
        <>
            <ItemDetails currentProduct={currentProduct} oneProductLoading={oneProductLoading} 
            code={code} message={message} role={role} onEditClick={onEditClick}/>
            {editItem && <EditItemModal productId={productId}/>}
            {code === 0 && successModalMode && <EditItemSuccessModal updated="updated"/>}
        </>
    )
}

export default ItemDetailsContainer