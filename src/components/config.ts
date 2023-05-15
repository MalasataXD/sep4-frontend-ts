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

interface ImageItem {
  url: string;
  alt: string;
}
export const CarouselImages: ImageItem[] = [
  {url: "https://media.istockphoto.com/id/177228186/photo/young-capybara.jpg?s=612x612&w=0&k=20&c=MaLAlTZA3N5fa2Gp2FeCdZCwSbCLXkVVeKTks7IJIgM=", alt: "Image of a cuty capybara"},
  {url: "https://media.istockphoto.com/id/177228186/photo/young-capybara.jpg?s=612x612&w=0&k=20&c=MaLAlTZA3N5fa2Gp2FeCdZCwSbCLXkVVeKTks7IJIgM=", alt: "Image of a cuty capybara"},
  {url: "https://media.istockphoto.com/id/177228186/photo/young-capybara.jpg?s=612x612&w=0&k=20&c=MaLAlTZA3N5fa2Gp2FeCdZCwSbCLXkVVeKTks7IJIgM=", alt: "Image of a cuty capybara"}
]

