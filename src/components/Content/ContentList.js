import { useEffect, useState } from "react"
import { Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import CardItem from "../Card/CardItem"
import Loader from '../Common/Loader'
import DeleteProductModal from "./DeleteProductModal"
import { deleteProductThunk, getProductsThunk } from "../../redux-store/content-reducer"
import EditItemModal from "./EditItemModal"
import EditItemSuccessModal from "./EditItemSuccessModal"
import { setShowDeleteModal } from "../../redux-store/modal-modes-reducer"

const ContentList = () => {
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

    if(allProductsLoading){
        return <Loader message='Data is loading...'/>
    }
    if(productList.length == 0 && !allProductsLoading){
        return <h3>No products were found</h3>
    }
    return(
        <div>
            <Row className='d-flex' lg={4}>
                {productList.map(el => <CardItem 
                                        key={el._id} role={userRole} title={el.title} 
                                        id={el._id} image={el.image} description={el.description} 
                                        price={el.price} rating={el.rating} handleShow={handleShow}
                                        />)}
            </Row>
            {showDeleteModal && <DeleteProductModal handleClose={handleClose} confirmDelete={confirmDelete}/>}
            {editItem && <EditItemModal addProduct={true}/>}
            {code === 0 && successModalMode && <EditItemSuccessModal created="created"/>}
        </div>
    )
}
export default ContentList