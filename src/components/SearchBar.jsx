/* eslint-disable react/prop-types */
// SearchBar Component
import { useState } from "react";
import "../styles/SearchBar.scss";

const SearchBar = ({ onSearch }) => {
	const [searchId, setSearchId] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		if (searchId.trim()) {
			onSearch(searchId.trim());
		}
	};

	const handleClear = () => {
		setSearchId("");
		onSearch("");
	};

	return (
		<form
			className="search-bar"
			onSubmit={handleSubmit}
		>
			<div className="search-icon">🔍</div>
			<input
				type="number"
				value={searchId}
				onChange={(e) => setSearchId(e.target.value)}
				placeholder="Search Pokémon by ID (1-151)..."
				min="1"
				max="151"
			/>
			{searchId && (
				<button
					type="button"
					className="clear-button"
					onClick={handleClear}
				>
					×
				</button>
			)}
		</form>
	);
};

export default SearchBar;
