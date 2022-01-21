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

export default deviceReducer