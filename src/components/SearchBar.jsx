/* eslint-disable react/prop-types */
import { useState, useCallback } from "react";
import { debounce } from "../utils/debounce";
import "../styles/SearchBar.scss";

const SearchBar = ({ onSearch }) => {
	const [inputValue, setInputValue] = useState("");
	const [isFocused, setIsFocused] = useState(false);

	// Debounced search function
	const debouncedSearch = useCallback(
		debounce((value) => {
			onSearch(value);
		}, 300),
		[onSearch]
	);

	const handleInputChange = (e) => {
		const value = e.target.value;
		setInputValue(value);
		debouncedSearch(value);
	};

	const handleClear = () => {
		setInputValue("");
		onSearch("");
	};

	return (
		<form
			className="search-bar"
			onSubmit={(e) => e.preventDefault()}
		>
			<input
				type="text"
				value={inputValue}
				onChange={handleInputChange}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
				placeholder="Search Pokémon by name or ID..."
				className={isFocused ? "focused" : ""}
			/>
			{inputValue && (
				<button
					type="button"
					className="clear-button"
					onClick={handleClear}
					aria-label="Clear search"
				>
					×
				</button>
			)}
		</form>
	);
};

export default SearchBar;
