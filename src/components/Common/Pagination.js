import { useDispatch, useSelector } from "react-redux"
import { setCurrentPage } from "../../actions/content-actions"

const Pagination = () => {

    const totalProductsCount = useSelector(state => state.content.totalProductsCount)
    const currentPage = useSelector(state => state.content.currentPage)
    const dispatch = useDispatch()

    const pagesNumber = Math.ceil(totalProductsCount / 5)

    let pagesArr = []
    const pagesRender = () => {
        for(let i = 1; i <= pagesNumber; i++){
            pagesArr.push(<div key={i} style={{border: 'black solid 0.5px', cursor: 'pointer', width: '25px', fontWeight: `${i == currentPage ? '600' : '400'}`}}
                onClick={() => dispatch(setCurrentPage(i))}
            >
                {i}
            </div>)
        }
    }
    pagesRender()

    if(totalProductsCount == 0) return <></>
    return (
        <div style={{border: 'black solid 1px', display: 'flex', width: `${pagesNumber * 25}px`, margin: '25px auto'}}>
            {pagesArr}
        </div>
    )
}

export default Pagination