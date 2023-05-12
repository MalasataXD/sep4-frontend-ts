import { LoginStatus_Login, LoginStatus_Profil, JWTLocation } from "../config"
import "./LoginStatus.css"
import { Link } from "react-router-dom";
import profile from '../../img/profile.svg';
import jwt_decode from "jwt-decode"; //64 base

export default function LoginStaus() {
    
    if (isLoggedIn()) {
        return (
            <Link to={LoginStatus_Profil}><img src={profile} className="Profile-img" aria-label="Profile-img"></img></Link>
        )
    } else {
        return (
            <Link to={LoginStatus_Login}><button className="Login-Button" >Login</button></Link>
        )
    }
    
    // Check if user is logged in and token has not expired
    function isLoggedIn() {
        const token = localStorage.getItem(JWTLocation);
        return token !== null && !isTokenExpired(token);
    }

    function isTokenExpired(token : string) {
        const decoded : any = jwt_decode(token);
      
        // If the 'exp' field does not exist, assume the token does not expire
        if (decoded?.exp==null) {
          return false;
        }
      
        const now : number = Date.now() / 1000;
        return decoded.exp < now;
    }
}