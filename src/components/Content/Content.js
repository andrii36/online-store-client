import { useEffect, useState } from "react"
import { Container, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import CardItem from "../Card/CardItem"
import s from './Content.module.css'
import FilterArea from "./FilterArea"
import Loader from '../Common/Loader'
import { deleteProductThunk, getProductsThunk } from "../../redux-store/content-reducer"
import ContentHeader from "./ContentHeader"
import ContentList from "./ContentList"

const Content = () => {

    const userRole = useSelector(state => state.auth.currentUser.role)

    return(
        <Container>
            <FilterArea/>
            <ContentHeader role={userRole}/>
            <ContentList/>
        </Container>
    )
}
export default Content