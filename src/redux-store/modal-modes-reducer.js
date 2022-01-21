const initialState = {
    editItemSuccess: false,
    editItem: false,
    showDeleteModal: false
}

const modalModesReducer = (state = initialState, action) => {
    switch(action.type){
        case 'SET_EDIT_ITEM_SUCCESS': {
            return {
                ...state,
                editItemSuccess: action.mode
            }
        }
        case 'SET_EDIT_ITEM': {
            return {
                ...state,
                editItem: action.mode
            }
        }
        case 'SET_SHOW_DELETE_MODAL': {
            return {
                ...state,
                showDeleteModal: action.mode
            }
        }
    }
    return state
}

export default modalModesReducer