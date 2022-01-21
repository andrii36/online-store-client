import { Row } from "react-bootstrap"
import CardItem from "../Card/CardItem"
import Loader from '../Common/Loader'

const ContentList = ({handleShow, productList, allProductsLoading, userRole}) => {

    if(allProductsLoading){
        return <Loader message='Data is loading...'/>
    }
    if(productList.length == 0 && !allProductsLoading){
        return <h3>No products were found</h3>
    }
    return(
            <Row className='d-flex' lg={4}>
                {productList.map(el => <CardItem 
                                        key={el._id} role={userRole} title={el.title} 
                                        id={el._id} image={el.image} description={el.description} 
                                        price={el.price} rating={el.rating} handleShow={handleShow}
                                        />)}
            </Row>
    )
}
export default ContentList