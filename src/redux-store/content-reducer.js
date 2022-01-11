import { api } from "../api/api"

const initialState = {
    productList: [],
    currentProduct: {},
    message: '',
    code: null,
    filterConfig: {}
}

const deviceReducer = (state = initialState, action) => {
    switch(action.type){
        case 'SET_PRODUCTS': {
            return {
                ...state,
                productList: action.products
            }
        }
        case 'SET_CURRENT_PRODUCT': {
            return {
                ...state,
                currentProduct: action.productData
            }
        }
        case 'SET_MESSAGE_AND_CODE': {
            return {
                ...state,
                message: action.message,
                code: action.code
            }
        }
        case 'CLEAR_MESSAGE_AND_CODE': {
            return {
                ...state,
                message: '',
                code: null
            }
        }
        case 'CLEAR_CURRENT_PRODUCT': {
            return {
                ...state,
                currentProduct: {}
            }
        }
        case 'SET_FILTER_CONFIG': {
            return {
                ...state,
                filterConfig: action.filterConfig
            }
        }
    }
    return state
}

const setProductList = (products) => ({type: 'SET_PRODUCTS', products})
const setProductData = (productData) => ({type: 'SET_CURRENT_PRODUCT', productData})
const setMessageAndCode = (message, code) => ({type: 'SET_MESSAGE_AND_CODE', message, code})
export const setFilterConfig = (filterConfig) => ({type: 'SET_FILTER_CONFIG', filterConfig})
export const clearMessageAndCode = () => ({type: 'CLEAR_MESSAGE_AND_CODE'})
export const clearCurrentProductAC = () => ({type: 'CLEAR_CURRENT_PRODUCT'})

export const getProductsThunk = (value, config={}) => async (dispatch) => {
    let productsList
    if(!value) {productsList = await api.getProductsList()}
    if(value) {productsList = await api.getSearchProducts({...config, title: value})}
    dispatch(setProductList(productsList.data))
}
export const getFilteredProductsThunk = (formArr) => async (dispatch) => {
    const productsList = await api.getAdvancedSearchProducts(formArr)
    dispatch(setProductList(productsList.data))
}
export const getProductByIdThunk = (id) => async (dispatch) => {
    const product = await api.getProductDetails(id)
    dispatch(setProductData(product.data))
}
export const deleteProductThunk = (id) => async (dispatch) => {
    const {data} = await api.deleteProduct(id)
    if(data.code === 0){
        dispatch(getProductsThunk())
    }
}
export const addProductThunk = (formData) => async (dispatch) => {
    try{
        const {data} = await api.addProduct(formData)
        dispatch(setMessageAndCode(data.message, data.code))
        dispatch(getProductsThunk())
    }catch({response}){
        dispatch(setMessageAndCode(response.data.message, response.data.code))
    }
}
export const updateProductThunk = (formData, id) => async (dispatch) => {
    try{
        const {data} = await api.updateProduct(formData, id)
        dispatch(setMessageAndCode(data.message, data.code))
        dispatch(getProductByIdThunk(id))
    }catch({response}){
        dispatch(setMessageAndCode(response.data.message, response.data.code))
    }
}

export default deviceReducer