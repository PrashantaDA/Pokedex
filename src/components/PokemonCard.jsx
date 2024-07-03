/* eslint-disable react/prop-types */
import { useState } from "react";
import "../styles/PokemonCard.scss";
import Pokeball from "../assets/pokeball.png";
import typeColors from "../styles/typeColors";
import Modal from "./Modal";

const PokemonCard = ({ id, name, image, type, height, weight, stats, statsName, abilities }) => {
	const pokemon = { id, name, image, type, height, weight, stats, statsName, abilities };

	const [modalIsOpen, setModalIsOpen] = useState(false);

	const modalHandler = () => {
		setModalIsOpen(!modalIsOpen);
	};

	return (
		<>
			<div
				className="container"
				style={{ backgroundColor: typeColors[type] }}
				onClick={modalHandler}
			>
				<img
					className="image-title"
					src={image}
					alt={name}
				/>
				<div className="right">
					<div className="pokemon-id">No. {id}</div>
					<div className="pokemon-name">
						<img
							src={Pokeball}
							alt="pokeball"
						/>
						{name}
					</div>
					<div
						className="pokemon-type"
						style={{ textTransform: "capitalize", backgroundColor: typeColors[type] }}
					>
						{type}
					</div>
				</div>
			</div>
			<Modal
				isOpen={modalIsOpen}
				onClose={modalHandler}
				pokemon={pokemon}
			/>
		</>
	);
};

export default PokemonCard;
