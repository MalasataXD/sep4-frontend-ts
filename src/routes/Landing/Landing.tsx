import styles from "./Landing.module.css";
import Carousel from "../../components/Carousel/Carousel";
import TitleCard from "../../components/TitleCard/TitleCard";
import { useEffect, useState } from "react";
import { TitleCards } from "../../components/config";
import LoginHandler from "../../components/login";

export default function LandingPage() {
  const [Titel1, setTitel1] = useState("");
  const [Description1, setDescription1] = useState("");
  const [Image1, setImage1] = useState("");
  const [Link1, setLink1] = useState("");

  const [Titel2, setTitel2] = useState("");
  const [Description2, setDescription2] = useState("");
  const [Image2, setImage2] = useState("");
  const [Link2, setLink2] = useState("");

  const [Titel3, setTitel3] = useState("");
  const [Description3, setDescription3] = useState("");
  const [Image3, setImage3] = useState("");
  const [Link3, setLink3] = useState("");

  const [IsLoggedIn, setIsLoggedIn] = useState(LoginHandler.isLoggedIn());

  const observer = {
    update: (data: boolean) => {
      setIsLoggedIn(data);
    },
  };

  useEffect(() => {
    LoginHandler.addObserver(observer);
    return () => {
      LoginHandler.removeObserver(observer);
    };
  }, []);

  useEffect(() => {
    if (IsLoggedIn) {
      setTitel1(TitleCards[3].title);
      setDescription1(TitleCards[3].description);
      setImage1(TitleCards[3].url);
      setLink1(TitleCards[3].link);

      setTitel2(TitleCards[4].title);
      setDescription2(TitleCards[4].description);
      setImage2(TitleCards[4].url);
      setLink2(TitleCards[4].link);

      setTitel3(TitleCards[5].title);
      setDescription3(TitleCards[5].description);
      setImage3(TitleCards[5].url);
      setLink3(TitleCards[5].link);
    } else {
      setTitel1(TitleCards[0].title);
      setDescription1(TitleCards[0].description);
      setImage1(TitleCards[0].url);
      setLink1(TitleCards[0].link);

      setTitel2(TitleCards[1].title);
      setDescription2(TitleCards[1].description);
      setImage2(TitleCards[1].url);
      setLink2(TitleCards[1].link);

      setTitel3(TitleCards[2].title);
      setDescription3(TitleCards[2].description);
      setImage3(TitleCards[2].url);
      setLink3(TitleCards[2].link);
    }
  }, [IsLoggedIn]);

  return (
    <div>
      <div className={styles.carousel}>
        <Carousel></Carousel>
      </div>

      <div className={styles.titleCardContainer}>
        <TitleCard
          title={Titel1}
          description={Description1}
          color={"red"}
          image={Image1}
          link={Link1}
        />

        <TitleCard
          title={Titel2}
          description={Description2}
          color={"green"}
          image={Image2}
          link={Link2}
        />

        <TitleCard
          title={Titel3}
          description={Description3}
          color={"blue"}
          image={Image3}
          link={Link3}
        />
      </div>
    </div>
  );
}
