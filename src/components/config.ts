export const LINK: string = "http://localhost:8080";
export const GetData: string = "/data-service/data";
export const EditValuesPost: string = "/data-service/target";

export const JWTLocation: string = "jwt";

//LoginStatus local
export const LoginStatus_Login: string = "/test";
export const LoginStatus_Profil: string = "/test";

//CollapsibleMenu
export const CollapsibleMenuItems: MenuItem[] = [
  { name: "Link 1", url: "/test" },
  { name: "Link 2", url: "/test" },
];


//BreadProfilesPage
export const BreadProfiles: string = "/data-service/bread";
export interface MenuItem {
  name: string;
  url: string;
}
export interface BreadProfile {
  id?: number;
  title?: string;
  description?: string;
  targets?: target[];
}

export interface target {
  id?: number;
  temp?: string;
  humidity?: string;
  co2?: string;
  offset?: string;
}


//Carousel
interface ImageItem {
  url: string;
  alt: string;
}
export const CarouselImages: ImageItem[] = [
  {
    url: "https://www.design.svgbackgrounds.com/wp-content/uploads/2021/05/rose-petals-gradient-overlapping-circle-background.jpg",
    alt: "Image of a cute capybara",
  },
  {
    url: "https://i.natgeofe.com/n/566ed88f-7ee4-4a57-be2e-aa312a5f65a1/capybara.jpg?w=1272&h=846",
    alt: "Image of a cute capybara",
  },
  {
    url: "https://images.immediate.co.uk/production/volatile/sites/23/2021/12/what-is-a-capybara-a9bac69.jpg",
    alt: "Image of a cute capybara",
  },
];
