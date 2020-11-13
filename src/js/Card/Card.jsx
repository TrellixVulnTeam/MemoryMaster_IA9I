import React from "react";
import Image from "../Image";

export default function Card({imgURL, flipped, onClick}) {
	return <div className="card-container" onClick={onClick}>
		<div className={"card" + (flipped ? " flipped" : "")}>
			<Image className="side front" src={imgURL}/>
			<div className="side back"/>
		</div>
	</div>;
}