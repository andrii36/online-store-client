import { Row } from "react-bootstrap"
import CardItem from "../Card/CardItem"
import Loader from '../Common/Loader'

const ContentList = ({handleShow, productList, allProductsLoading, userRole}) => {

    //const currentPage = useSelector(state => state.content.currentPage)

    if(allProductsLoading){
        return <Loader message='Data is loading...'/>
    }
    if(productList.length == 0 && !allProductsLoading){
        return <h3>No products were found</h3>
    }
    return(
            <Row>
                {productList.map((el) => {
                    //if(ind < currentPage * 5 && ind >= currentPage * 5 - 5) 
                    return <CardItem 
                                        key={el._id} role={userRole} title={el.title} 
                                        id={el._id} image={el.image} description={el.description} 
                                        price={el.price} rating={el.rating} handleShow={handleShow}
                                        />})}
            </Row>
    )
}
export default ContentList