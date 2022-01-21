import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import DeleteProductModal from "./DeleteProductModal"
import EditItemModal from "./EditItemModal"
import EditItemSuccessModal from "./EditItemSuccessModal"
import { deleteProductThunk, getProductsThunk } from "../../actions/content-actions"
import { setShowDeleteModal } from "../../actions/modal-modes-actions"
import ContentList from "./ContentList"

const ContentListContainer = () => {
    const productList = useSelector(state => state.content.productList)
    const userRole = useSelector(state => state.auth.currentUser.role)
    const code = useSelector(state => state.content.code)
    const successModalMode = useSelector(state => state.modalModes.editItemSuccess)
    const editItem = useSelector(state => state.modalModes.editItem)
    const showDeleteModal = useSelector(state => state.modalModes.showDeleteModal)
    const allProductsLoading = useSelector(state => state.content.allProductsLoading)
    const dispatch = useDispatch()
    const [deleteItemId, setDeleteItemId] = useState(null)
    
    useEffect(() => {
        dispatch(getProductsThunk())
    }, [])

    const handleShow = (id) => {
        dispatch(setShowDeleteModal(true))
        setDeleteItemId(id)
    }
    const handleClose = () => dispatch(setShowDeleteModal(false))
    const confirmDelete = () => {
        dispatch(deleteProductThunk(deleteItemId))
        dispatch(setShowDeleteModal(false))
    }
    
    return(
        <div>
            <ContentList handleShow={handleShow} allProductsLoading={allProductsLoading} productList={productList} userRole={userRole}/>
            {showDeleteModal && <DeleteProductModal handleClose={handleClose} confirmDelete={confirmDelete}/>}
            {editItem && <EditItemModal addProduct={true}/>}
            {code === 0 && successModalMode && <EditItemSuccessModal created="created"/>}
        </div>
    )
}
export default ContentListContainer