import { api } from "../api/api"

const setAnnouncementsAC = (announcements) => ({type: 'SET_ANNOUNCEMENTS', announcements})
const addAnnouncementAC = (announcement) => ({type: 'ADD_ANNOUNCEMENT', announcement})

export const getAllAnnouncementsThunk = () => async (dispatch, getState) => {
    try{
        const response = await api.getAllAnnouncementsByCompany(getState().user.currentUser.company.id)
        dispatch(setAnnouncementsAC(response.data))
    }catch(e){
        console.log(e.response.data.message)
    }
}

export const addAnnouncementThunk = (announcement) => async (dispatch) => {
    try{
        const response = await api.addAnnouncement(announcement)
        dispatch(addAnnouncementAC(response.data))
    }catch(e){
        console.log(e.response.data.message)
    }
}

export const updateAnnouncementThunk = (announcement) => async (dispatch, getState) => {
    try{
        const response = await api.updateAnnouncement(announcement)
        const announcements = getState().company.announcements.map(item => item._id === response.data._id ? response.data : item)
        dispatch(setAnnouncementsAC(announcements))
    }catch(e){
        console.log(e.response.data.message)
    }
}

export const removeAnnouncementThunk = (id) => async (dispatch, getState) => {
    try{
        await api.removeAnnouncement(id)
        const announcements = getState().company.announcements.filter(item => item._id !== id)
        dispatch(setAnnouncementsAC(announcements))
    }catch(e){
        console.log(e.response.data.message)
    }
}