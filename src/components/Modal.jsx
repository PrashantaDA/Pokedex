/* eslint-disable react/prop-types */
import typeColors from "../styles/typeColors";
import "../styles/Modal.scss";

const Modal = ({ isOpen, onClose, pokemon }) => {
	if (!isOpen) return null;

	const { id, name, image, type, height, weight, stats, statsName, abilities } = pokemon;

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

	return (
		<div
			className={`modal-overlay ${isOpen ? "open" : ""}`}
			onClick={onClose}
		>
			<div
				className="modal"
				onClick={(e) => e.stopPropagation()}
			>
				<button
					className="close-button"
					onClick={onClose}
				>
					×
				</button>
				<img
					className="modal-image"
					src={image}
					alt={name}
				/>
				<h2>
					No. {id} - {name}
				</h2>
				<p>
					Type:{" "}
					<span
						className="pokemon-type"
						style={{ textTransform: "capitalize", backgroundColor: typeColors[type] }}
					>
						{type}
					</span>
				</p>
				<div className="pokemon-physical">
					<p>Height: {height} m</p>
					<p>Weight: {Math.floor(weight / 2.2)} kg</p>
				</div>
				<div style={{ backgroundColor: typeColors[type], padding: "10px", borderRadius: "10px" }}>
					<h3>Abilities</h3>
					<ul className="pokemon-abilities">{renderAbilities()}</ul>

					<h3>Stats</h3>
					<div className="stats">
						{statsName.map((statName, index) => (
							<div
								key={index}
								className="stat"
							>
								<span className="stat-name">{statName}</span>
								<span className="stat-value">{stats[index]}</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Modal;
