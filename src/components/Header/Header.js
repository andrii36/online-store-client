import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { logoutAC } from '../../redux-store/auth-reducer'
import Logo from '../Common/Logo'
import s from './Header.module.css'

export default function Header() {
    const dispatch = useDispatch()
    const selector = useSelector((state) => state.auth)

    return(
        <header className={s.app_header}>
            <NavLink style={{textDecoration: "none", color: "black"}} to="/"><Logo/></NavLink>
            {selector.isAuthorised
            ? <div>Welcome, 
                {selector.currentUser.userName}
                <Button variant="light" onClick={() => {
                    localStorage.removeItem('authtoken')
                    dispatch(logoutAC())
                }}>Logout</Button>
            </div>
            : <div className={s.header_auth}>
                <NavLink to='/login'>Sign in</NavLink>
                <NavLink to='/registration'>Sign up</NavLink>
            </div>}
        </header>
    )
}