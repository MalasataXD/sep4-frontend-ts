export const LINK: string = "localhost:8000";
export const GetData: string = "/data";
export const EditValuesPost: string = "/data";

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

//TargetCard
export const TargetCardUpdate: string = "/test";
