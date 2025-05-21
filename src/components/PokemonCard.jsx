/* eslint-disable react/prop-types */
import { useState } from "react";
import "../styles/PokemonCard.scss";
import Pokeball from "../assets/pokeball.png";
import typeColors from "../styles/typeColors";
import Modal from "./Modal";

const PokemonCard = ({ id, name, image, type, height, weight, stats, statsName, abilities }) => {
	const pokemon = { id, name, image, type, height, weight, stats, statsName, abilities };
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	const [imageError, setImageError] = useState(false);

	const modalHandler = () => {
		setModalIsOpen(!modalIsOpen);
	};

	const handleImageError = () => {
		setImageError(true);
	};

	return (
		<>
			<div
				className={`container ${isHovered ? "hovered" : ""}`}
				style={{ backgroundColor: typeColors[type] }}
				onClick={modalHandler}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				<div className="image-container">
					{!imageError ? (
						<img
							className="image-title"
							src={image}
							alt={name}
							onError={handleImageError}
						/>
					) : (
						<div className="image-fallback">
							<img
								src={Pokeball}
								alt="pokeball"
								className="pokeball-fallback"
							/>
						</div>
					)}
				</div>
				<div className="right">
					<div className="pokemon-id">#{id}</div>
					<div className="pokemon-name">
						<img
							src={Pokeball}
							alt="pokeball"
							className="pokeball-icon"
						/>
						<span>{name}</span>
					</div>
					<div
						className="pokemon-type"
						style={{ backgroundColor: `${typeColors[type]}80` }}
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
