import LoginPageContainer from "../pages/LoginPage/LoginPageContainer"
import DashboardPage from "../pages/DashboardPage/Dashboard"
import SignupPageContainer from "../SignupPage/SignupPageContainer"
import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout"
import TeamPageContainer from "../pages/TeamPage/TeamPageContainer"
import FleetPageContainer from "../pages/FleetPage/FleetPageContainer"

export const routes = [
    {path: '/login', exact: true, element: <LoginPageContainer />},
    {path: '/signup', exact: true, element: <SignupPageContainer />},
    {path: '/dashboard', exect: true, element: (
        <DefaultLayout>
            <DashboardPage/>
        </DefaultLayout>
    )},
    {path: '/team', exact: true, element: (
        <DefaultLayout>
            <TeamPageContainer/>
        </DefaultLayout>
    )},
    {path: '/fleet', exact: true, element: (
        <DefaultLayout>
            <FleetPageContainer/>
        </DefaultLayout>
    )},
]

export default routes