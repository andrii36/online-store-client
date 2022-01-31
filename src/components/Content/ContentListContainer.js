import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import DeleteProductModal from "./DeleteProductModal"
import EditItem from "./EditItem"
import EditItemSuccessModal from "./EditItemSuccessModal"
import { deleteProductThunk, getFilteredProductsThunk, getProductsThunk } from "../../actions/content-actions"
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
    const currentPage = useSelector(state => state.content.currentPage)
    const searchValue = useSelector(state => state.content.searchValue)
    const filterConfig = useSelector(state => state.content.filterConfig)
    const dispatch = useDispatch()
    const [deleteItemId, setDeleteItemId] = useState(null)
    
    useEffect(() => {
        dispatch(getProductsThunk())
        // !searchValue && Object.keys(filterConfig).length == 0 && dispatch(getProductsThunk())
        // Object.keys(filterConfig).length == 0 && searchValue && dispatch(getProductsThunk(searchValue))
        // Object.keys(filterConfig).length > 0 && !searchValue && dispatch(getFilteredProductsThunk(filterConfig))
        // Object.keys(filterConfig).length > 0 && searchValue && dispatch(getProductsThunk(searchValue))
    }, [currentPage, searchValue, filterConfig])

    // useEffect(() => {
    //     !searchValue && Object.keys(filterConfig).length == 0 && dispatch(getProductsThunk())
    //     searchValue && dispatch(getProductsThunk(searchValue))
    //     Object.keys(filterConfig).length > 0 && dispatch(getFilteredProductsThunk(filterConfig))
    // }, [searchValue])

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
            {editItem && <EditItem addProduct={true}/>}
            {code === 0 && successModalMode && <EditItemSuccessModal created="created"/>}
        </div>
    )
}
export default ContentListContainer