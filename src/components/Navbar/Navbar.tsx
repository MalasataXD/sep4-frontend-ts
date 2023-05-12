import "./Navbar.css"
import LoginStaus from "../LoginStatus/LoginStatus"
import { Outlet } from "react-router-dom";
export default function Navbar() {

    return (
        <div>
            <div className="navbar">
                <div className="Drop-down">
                    Burger   
                </div>
                <div className="logo">
                    logo
                </div>
                <div className="login">
                    <LoginStaus/>
                </div>
            </div>
            <Outlet/>
        </div>
    )
}


