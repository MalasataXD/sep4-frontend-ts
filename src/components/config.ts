import aboutUs from "../img/TitleCardImages/About Us.jpg";
import contact from "../img/TitleCardImages/Contact.jpg";
import ourProject from "../img/TitleCardImages/Our Project.jpg";
import breadProfile from "../img/TitleCardImages/Bread Profile.jpg";
import history from "../img/TitleCardImages/History.jpg";
import live from "../img/TitleCardImages/Live.jpg";

// # API LINKS
export const LINK: string = "LINK";
export const GetData: string = "/data-service/data";
export const EditValuesPost: string = "/data-service/target";
export const BreadProfiles: string = "/data-service/bread";

// # PAGES
export const Landing: string = "/";
export const Live: string = "/live";
export const BreadProfile: string = "/breadprofile";
export const History: string = "/history";
export const Login: string = "/login";

// # DROPDOWN MENU
export const CollapsibleMenuItems: MenuItem[] = [
  { name: "Home", url: Landing },
  { name: "Live information", url: Live },
  { name: "Bread profiles", url: BreadProfile },
  { name: "History", url: History },
];

// # INTERFACES
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

interface ImageItem {
  url: string;
  alt: string;
}

interface TitleCards {
  title: string;
  description: string;
  url: string;
  link: string;
}

// # CAROUSEL IMAGES (ON LANDING PAGE)
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

// # TITLE CARDS (ON LANDING PAGE)
export const TitleCards: TitleCards[] = [
  {
    title: "Our Project",
    description: "You can read about our project here!",
    url: `${ourProject}`,
    link: "/test",
  },
  {
    title: "About Us",
    description: "Meet the creators of this site here!",
    url: `${aboutUs}`,
    link: "/test",
  },
  {
    title: "Contact",
    description: "Feel free to contact us we don't bite!",
    url: `${contact}`,
    link: "/test",
  },
  {
    title: "Live information",
    description: "Read and adjust your bread environment here!",
    url: `${live}`,
    link: Live,
  },
  {
    title: "Bread profiles",
    description: "Create and start your own bread profiles here!",
    url: `${breadProfile}`,
    link: BreadProfile,
  },
  {
    title: "History",
    description:
      "View the history of your recent uses of the bread profiles here!",
    url: `${history}`,
    link: History,
  },
];
