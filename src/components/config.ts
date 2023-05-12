export const LINK : string = "localhost:8000";
export const GetData : string = "/data";
export const EditValuesPost : string = "/data";

export const JWTLocation : string = "jwt";

//LoginStatus local
export const LoginStatus_Login : string = "/test";
export const LoginStatus_Profil : string = "/test";


//CollapsibleMenu
export const CollapsibleMenuItems : MenuItem[] = [
    {name: "name", url: "link"}, 
    {name: "name2", url: "link2"}, 
]
export interface MenuItem {
    name : string
    url : string
}