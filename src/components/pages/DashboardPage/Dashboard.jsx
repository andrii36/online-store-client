import News from "../../components/News"
import TopEmployeeList from "../../components/TopEmployeeList"
import PlannerContainer from "../../components/PlannerContainer"
import AnnouncementsContainer from "../../components/AnnouncementsContainer"

const DashboardPage = () => {

    return <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <PlannerContainer />
        <News />
        <AnnouncementsContainer />
        <TopEmployeeList />
    </div>
}

export default DashboardPage