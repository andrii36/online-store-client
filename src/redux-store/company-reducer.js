const initialState = {
    announcements: [],
}

const companyReducer = (state = initialState, action) => {
    switch(action.type){
        case 'SET_ANNOUNCEMENTS': {
            return { ...state, announcements: action.announcements }
        }
        case 'ADD_ANNOUNCEMENT': {
            return { ...state, announcements: [ ...state.announcements, action.announcement ]}
        }
    }
    return state
}

export default companyReducer;