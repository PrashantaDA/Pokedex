/* eslint-disable react/prop-types */
import { useState } from "react";
import typeColors from "../styles/typeColors";
import "../styles/Modal.scss";
import Pokeball from "../assets/pokeball.png";

const Modal = ({ isOpen, onClose, pokemon }) => {
	const [imageError, setImageError] = useState(false);
	const [imageLoading, setImageLoading] = useState(true);

	if (!isOpen) return null;

	const { id, name, image, type, height, weight, stats, statsName, abilities } = pokemon;

	const formatWeight = (weight) => {
		return (weight / 10).toFixed(1) + " kg";
	};

	const formatHeight = (height) => {
		return (height / 10).toFixed(1) + " m";
	};

	const renderAbilities = () => {
		return abilities.map((ability, index) => (
			<li
				className="pokemon-ability"
				key={index}
			>
				{ability}
			</li>
		));
	};

	const handleImageLoad = () => {
		setImageLoading(false);
	};

	const handleImageError = () => {
		setImageError(true);
		setImageLoading(false);
	};

	return (
		<div
			className={`modal-overlay ${isOpen ? "open" : ""}`}
			onClick={onClose}
		>
			<div
				className="modal"
				onClick={(e) => e.stopPropagation()}
				style={{ backgroundColor: `${typeColors[type]}10` }}
			>
				<button
					className="close-button"
					onClick={onClose}
				>
					×
				</button>
				<div className="modal-header">
					<div className="pokemon-info">
						<h2 className="pokemon-name">
							<img
								src={Pokeball}
								alt="pokeball"
								className="pokeball-icon"
							/>
							{name}
						</h2>
						<div className="pokemon-id">#{id}</div>
					</div>
					<div
						className="pokemon-type"
						style={{ backgroundColor: typeColors[type] }}
					>
						{type}
					</div>
				</div>
				<div className="modal-content">
					<div className="image-section">
						<div className="image-container">
							{imageLoading && (
								<div className="image-loading">
									<img
										src={Pokeball}
										alt="loading"
										className="loading-spinner"
									/>
								</div>
							)}
							{!imageError ? (
								<img
									className={`modal-image ${imageLoading ? "loading" : ""}`}
									src={image}
									alt={name}
									onLoad={handleImageLoad}
									onError={handleImageError}
								/>
							) : (
								<div className="image-fallback">
									<img
										src={Pokeball}
										alt="pokeball"
										className="pokeball-fallback"
									/>
									<span>Image not available</span>
								</div>
							)}
						</div>
						<div className="physical-stats">
							<div className="stat-item">
								<span className="stat-label">Height</span>
								<span className="stat-value">{formatHeight(height)}</span>
							</div>
							<div className="stat-item">
								<span className="stat-label">Weight</span>
								<span className="stat-value">{formatWeight(weight)}</span>
							</div>
						</div>
					</div>
					<div className="details-section">
						<div className="abilities-section">
							<h3>Abilities</h3>
							<ul className="pokemon-abilities">{renderAbilities()}</ul>
						</div>
						<div className="stats-section">
							<h3>Base Stats</h3>
							<div className="stats">
								{statsName.map((statName, index) => (
									<div
										key={index}
										className="stat"
									>
										<span className="stat-name">{statName}</span>
										<div className="stat-bar-container">
											<div
												className="stat-bar"
												style={{
													width: `${(stats[index] / 255) * 100}%`,
													backgroundColor: typeColors[type],
												}}
											/>
										</div>
										<span className="stat-value">{stats[index]}</span>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Modal;
