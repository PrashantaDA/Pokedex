/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import "../styles/SearchBar.scss";

const SearchBar = ({ onSearch }) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [suggestions, setSuggestions] = useState([]);
	const [showSuggestions, setShowSuggestions] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const searchTimeout = useRef(null);
	const suggestionsRef = useRef(null);

	useEffect(() => {
		const fetchSuggestions = async () => {
			if (!searchTerm.trim()) {
				setSuggestions([]);
				return;
			}

			try {
				setIsLoading(true);
				const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10000`);
				const data = await response.json();
				const searchTermLower = searchTerm.toLowerCase();

				const matchingPokemon = data.results.filter((poke) => poke.name.toLowerCase().includes(searchTermLower)).slice(0, 5); // Limit to 5 suggestions

				setSuggestions(matchingPokemon);
			} catch (error) {
				console.error("Error fetching suggestions:", error);
				setSuggestions([]);
			} finally {
				setIsLoading(false);
			}
		};

		// Debounce the search
		if (searchTimeout.current) {
			clearTimeout(searchTimeout.current);
		}

		searchTimeout.current = setTimeout(fetchSuggestions, 300);

		return () => {
			if (searchTimeout.current) {
				clearTimeout(searchTimeout.current);
			}
		};
	}, [searchTerm]);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
				setShowSuggestions(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const handleInputChange = (e) => {
		const value = e.target.value;
		setSearchTerm(value);
		setShowSuggestions(true);
		onSearch(value);
	};

	const handleSuggestionClick = (suggestion) => {
		setSearchTerm(suggestion.name);
		setShowSuggestions(false);
		onSearch(suggestion.name);
	};

	const handleClearSearch = () => {
		setSearchTerm("");
		setSuggestions([]);
		setShowSuggestions(false);
		onSearch("");
	};

	return (
		<div
			className="search-container"
			ref={suggestionsRef}
		>
			<div className="search-input-container">
				<input
					type="text"
					placeholder="Search Pokémon by name or ID..."
					value={searchTerm}
					onChange={handleInputChange}
					onFocus={() => setShowSuggestions(true)}
					className="search-input"
				/>
				{searchTerm && (
					<button
						className="clear-button"
						onClick={handleClearSearch}
						aria-label="Clear search"
					>
						×
					</button>
				)}
				{isLoading && <div className="search-spinner" />}
			</div>
			{showSuggestions && suggestions.length > 0 && (
				<ul className="suggestions-list">
					{suggestions.map((suggestion) => (
						<li
							key={suggestion.name}
							onClick={() => handleSuggestionClick(suggestion)}
							className="suggestion-item"
						>
							{suggestion.name}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default SearchBar;
