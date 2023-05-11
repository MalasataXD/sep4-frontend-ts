import { LoginStatus_Login, LoginStatus_Profil, JWTLocation } from "../config"
import "./LoginStatus.css"
import { Link } from "react-router-dom";
import profile from '../../img/profile.svg';

export function LoginStaus() {

    const token = localStorage?.getItem(JWTLocation)

    if (token === null) {
        return (
            <Link to={LoginStatus_Login}><button className="Login-Button">Login</button></Link>
        )
    } else {
        return (
            <Link to={LoginStatus_Profil}><img src={profile} className="Profile-img"></img></Link>
        )
    }

}

export default LoginStaus;