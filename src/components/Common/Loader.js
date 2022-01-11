import { Spinner } from "react-bootstrap"

const Loader = (props) => {
    return(
        <>
        <Spinner size={props.size} animation="border" role="status" style={{marginTop: '35vh'}}/>
        <div>{props.message}</div>
        </>
    )
}

export default Loader