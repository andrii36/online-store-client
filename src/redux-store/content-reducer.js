import { api } from "../api/api"

const initialState = {
    productList: [],
    currentProduct: {},
    message: '',
    code: null,
    filterConfig: {},
    allProductsLoading: true,
    oneProductLoading: true
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
        case 'SET_ALL_PRODUCTS_LOADING': {
            return {
                ...state,
                allProductsLoading: action.mode
            }
        }
        case 'SET_ONE_PRODUCT_LOADING': {
            return {
                ...state,
                oneProductLoading: action.mode
            }
        }
    }
    return state
}

const setProductList = (products) => ({type: 'SET_PRODUCTS', products})
const setProductData = (productData) => ({type: 'SET_CURRENT_PRODUCT', productData})
const setMessageAndCode = (message, code) => ({type: 'SET_MESSAGE_AND_CODE', message, code})
const setAllProductsLoading = (mode) => ({type: 'SET_ALL_PRODUCTS_LOADING', mode})
const setOneProductLoading = (mode) => ({type: 'SET_ONE_PRODUCT_LOADING', mode})
export const setFilterConfig = (filterConfig) => ({type: 'SET_FILTER_CONFIG', filterConfig})
export const clearMessageAndCode = () => ({type: 'CLEAR_MESSAGE_AND_CODE'})
export const clearCurrentProductAC = () => ({type: 'CLEAR_CURRENT_PRODUCT'})

export const getProductsThunk = (value, config={}) => async (dispatch) => {
    try{
        dispatch(setAllProductsLoading(true))
        let productsList
        if(!value) {productsList = await api.getProductsList()}
        if(value) {productsList = await api.getSearchProducts({...config, title: value})}
        dispatch(setProductList(productsList.data))
    }catch(err){
        dispatch(setMessageAndCode("Server error", 1))
    }
    dispatch(setAllProductsLoading(false))
}
export const getFilteredProductsThunk = (formArr) => async (dispatch) => {
    dispatch(setAllProductsLoading(true))
    const productsList = await api.getAdvancedSearchProducts(formArr)
    dispatch(setProductList(productsList.data))
    dispatch(setAllProductsLoading(false))
}
export const getProductByIdThunk = (id) => async (dispatch) => {
    try{
        dispatch(setMessageAndCode('', 0))
        dispatch(setOneProductLoading(true))
        const product = await api.getProductDetails(id)
        dispatch(setProductData(product.data))
    }catch({response}){
        dispatch(setMessageAndCode(response.data.message, response.data.code))
    }
    dispatch(setOneProductLoading(false))
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