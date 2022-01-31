import { api } from "../api/api"

const setProductList = (products, totalProductsCount) => ({type: 'SET_PRODUCTS', products, totalProductsCount})
const setProductData = (productData) => ({type: 'SET_CURRENT_PRODUCT', productData})
const setMessageAndCode = (message, code) => ({type: 'SET_MESSAGE_AND_CODE', message, code})
const setAllProductsLoading = (mode) => ({type: 'SET_ALL_PRODUCTS_LOADING', mode})
const setOneProductLoading = (mode) => ({type: 'SET_ONE_PRODUCT_LOADING', mode})
export const setFilterConfig = (filterConfig={}, searchValue='') => ({type: 'SET_FILTER_CONFIG', filterConfig, searchValue})
export const clearMessageAndCode = () => ({type: 'CLEAR_MESSAGE_AND_CODE'})
export const clearCurrentProductAC = () => ({type: 'CLEAR_CURRENT_PRODUCT'})
export const setCurrentPage = (page) => ({type: 'SET_CURRENT_PAGE', page})
export const setSearchValue = (searchValue) => ({type: 'SET_SEARCH_VALUE', searchValue})

export const getProductsThunk = () => async (dispatch, getState) => {
    try{
        dispatch(setAllProductsLoading(true))
        const config = {...getState().content.filterConfig, title: getState().content.searchValue}
        const productsList = await api.getProducts(getState().content.currentPage, config)
        
        // if(!value) {productsList = await api.getProductsList(getState().content.currentPage)}
        // if(value) {productsList = await api.getSearchProducts({config: getState().content.filterConfig, title: value}, getState().content.currentPage)}
        dispatch(setProductList(productsList.data.data, productsList.data.totalProductsCount))
    }catch(err){
        dispatch(setMessageAndCode("Server error", 1))
    }
    dispatch(setAllProductsLoading(false))
}
export const getFilteredProductsThunk = (formArr) => async (dispatch, getState) => {
    dispatch(setAllProductsLoading(true))
    const productsList = await api.getAdvancedSearchProducts(formArr, getState().content.currentPage)
    dispatch(setProductList(productsList.data.data, productsList.data.totalProductsCount))
    dispatch(setAllProductsLoading(false))
}
export const getProductByIdThunk = (id) => async (dispatch) => {
    try{
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
export const purchaseProductThunk = (id) => async (dispatch) => {
    try{
        const {data} = await api.purchaseProduct(id)
        dispatch(setMessageAndCode(data.message, data.code))
        dispatch(getProductByIdThunk(id))
    }catch({response}){
        dispatch(setMessageAndCode(response.data.message, response.data.code))
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