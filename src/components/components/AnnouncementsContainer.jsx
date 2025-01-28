import { useDispatch, useSelector } from "react-redux";
import Announcements from "./Announcements"
import { useEffect } from "react";
import { addAnnouncementThunk, getAllAnnouncementsThunk, removeAnnouncementThunk, updateAnnouncementThunk } from "../../actions/company-actions";

const AnnouncementsContainer = () => {
    const announcements = useSelector(state => state.company.announcements)
    const company = useSelector(state => state.user.currentUser.company)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllAnnouncementsThunk())
    }, [])

    const updateAnnouncement = (announcement) => {
        dispatch(updateAnnouncementThunk(announcement))
    }

    const addAnnouncement = (announcement) => {
        dispatch(addAnnouncementThunk({ ...announcement, companyId: company.id }))
    }

    const removeAnnouncement = (id) => {
        console.log(id)
        dispatch(removeAnnouncementThunk(id))
    }

    return (
        <Announcements
            announcements={announcements}
            updateAnnouncement={updateAnnouncement}
            addAnnouncement={addAnnouncement}
            removeAnnouncement={removeAnnouncement}
        />
    )
}

export default AnnouncementsContainer;