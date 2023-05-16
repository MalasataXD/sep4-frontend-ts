import { LINK, EditValuesPost } from "../config";
import { useState } from "react";
import { Link } from "react-router-dom";

import "./TitleCard.css";

export default function TitleCard(props: any) {
  return (
    <Link to={props.link}>
      <div className="TitleCard">
        <div className="ImageContainer">
          <img src={props.image} alt="TitleCard" className={props.color} />
          <div className={`TextContainer ${props.color}`}>
            <h3>{props.title}</h3>
            <textarea value={props.description} readOnly></textarea>
          </div>
        </div>
      </div>
    </Link>
  );
}

//EXAMPLE TO CREATE TitleCard:

/* <TitleCard
title={"Livepage"}
description={
  "Dette er et link til de nyeste værdier fra dit klima køle anlæg :)"
}
image={
  "https://lh3.googleusercontent.com/pw/AJFCJaWn751DzAU67z_RAiGDpz0S_kLRahQ4TcLLNjkg7u3Y3Q6hGGCYMsIUTJgNWCjvlMlJi0c0eW6jXacPk_CKWmzi3aSM_kY-4kc3M4qcD3MWE6uZQkk=w2400"
}
link={"/test"}
/> 
*/

//color can be red, green, blue or nothing;
