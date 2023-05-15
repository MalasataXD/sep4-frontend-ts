export const LINK: string = "http://localhost:8080";
export const GetData: string = "/data-service/data";
export const EditValuesPost: string = "/data-service/data";

export const JWTLocation: string = "jwt";

//LoginStatus local
export const LoginStatus_Login: string = "/test";
export const LoginStatus_Profil: string = "/test";

//CollapsibleMenu
export const CollapsibleMenuItems: MenuItem[] = [
  { name: "Link 1", url: "/test" },
  { name: "Link 2", url: "/test" },
];
export interface MenuItem {
  name: string;
  url: string;
}
