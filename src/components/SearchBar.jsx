/* eslint-disable react/prop-types */
// SearchBar Component
import { useState, useEffect, useCallback } from "react";
import "../styles/SearchBar.scss";
import { debounce } from "../utils/debounce";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
	const [inputValue, setInputValue] = useState(searchTerm);

	const debouncedSetSearchTerm = useCallback(debounce(setSearchTerm, 300), [setSearchTerm]);

	useEffect(() => {
		debouncedSetSearchTerm(inputValue);
	}, [inputValue, debouncedSetSearchTerm]);

	const handleChange = (e) => {
		setInputValue(e.target.value);
	};

	return (
		<div className="search-bar">
			<input
				type="text"
				placeholder="Search Pokémon"
				value={inputValue}
				onChange={handleChange}
			/>
		</div>
	);
};

export default SearchBar;
