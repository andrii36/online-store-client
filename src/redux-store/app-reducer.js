const initialState = {
    isInitialized: false
}

const appReducer = (state = initialState, action) => {
    switch(action.type){
        case 'INITIALIZE': {
            return {
                ...state,
                isInitialized: true
            }
        }
    }
    return state
}

export default appReducer