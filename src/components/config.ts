import aboutUs from "../img/TitleCardImages/About Us.jpg";
import contact from "../img/TitleCardImages/Contact.jpg";
import ourProject from "../img/TitleCardImages/Our Project.jpg";

import breadProfile from "../img/TitleCardImages/Bread Profile.jpg";
import history from "../img/TitleCardImages/History.jpg";
import live from "../img/TitleCardImages/Live.jpg";

export const LINK: string = "http://localhost:8080";
export const GetData: string = "/data-service/data";
export const EditValuesPost: string = "/data-service/target";

export const JWTLocation: string = "jwt";

//LoginStatus local
export const LoginStatus_Login: string = "/login";
export const LoginStatus_Profil: string = "/test";
export const LandingPage: string = "/";
export const LivePage: string = "/live";
export const BreadProfilePage: string = "/breadprofile";
export const HistoryPage: string = "/history";

//CollapsibleMenu
export const CollapsibleMenuItems: MenuItem[] = [
  { name: "Home", url: LandingPage },
  { name: "Live information", url: LivePage },
  { name: "Bread profiles", url: BreadProfilePage },
  { name: "History", url: HistoryPage },
];
export interface MenuItem {
  name: string;
  url: string;
}

//TargetCard
export const TargetCardUpdate: string = "/test";

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

//TitleCards
interface TitelCardItem {
  titel: string;
  description: string;
  url: string;
  link: string;
}

export const TitleCards: TitelCardItem[] = [
  {
    titel: "Our Project",
    description: "You can read about our project here!",
    url: `${ourProject}`,
    link: "/test",
  },
  {
    titel: "About Us",
    description: "Meet the creators of this site here!",
    url: `${aboutUs}`,
    link: "/test",
  },
  {
    titel: "Contact",
    description: "Feel free to contact us we don't bite!",
    url: `${contact}`,
    link: "/test",
  },
  {
    titel: "Live information",
    description: "Read and adjust your bread environment here!",
    url: `${live}`,
    link: LivePage,
  },
  {
    titel: "Bread profiles",
    description: "Create and start your own bread profiles here!",
    url: `${breadProfile}`,
    link: BreadProfilePage,
  },
  {
    titel: "History",
    description:
      "View the history of your recent uses of the bread profiles here!",
    url: `${history}`,
    link: HistoryPage,
  },
];
