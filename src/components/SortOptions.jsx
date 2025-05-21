import { useState } from "react";
import "../styles/SortOptions.scss";

const SortOptions = ({ onSort }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [currentSort, setCurrentSort] = useState("id-asc");

	const sortOptions = [
		{ value: "id-asc", label: "ID (Low to High)" },
		{ value: "id-desc", label: "ID (High to Low)" },
		{ value: "name-asc", label: "Name (A to Z)" },
		{ value: "name-desc", label: "Name (Z to A)" },
		{ value: "type-asc", label: "Type (A to Z)" },
		{ value: "type-desc", label: "Type (Z to A)" },
		{ value: "height-asc", label: "Height (Low to High)" },
		{ value: "height-desc", label: "Height (High to Low)" },
		{ value: "weight-asc", label: "Weight (Low to High)" },
		{ value: "weight-desc", label: "Weight (High to Low)" },
	];

	const handleSort = (value) => {
		setCurrentSort(value);
		onSort(value);
		setIsOpen(false);
	};

	return (
		<div className="sort-container">
			<button
				className="sort-button"
				onClick={() => setIsOpen(!isOpen)}
				aria-expanded={isOpen}
			>
				<span>Sort by</span>
				<svg
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					className={isOpen ? "open" : ""}
				>
					<path d="M6 9l6 6 6-6" />
				</svg>
			</button>
			{isOpen && (
				<div className="sort-dropdown">
					{sortOptions.map((option) => (
						<button
							key={option.value}
							className={`sort-option ${currentSort === option.value ? "active" : ""}`}
							onClick={() => handleSort(option.value)}
						>
							{option.label}
						</button>
					))}
				</div>
			)}
		</div>
	);
};

export default SortOptions;
