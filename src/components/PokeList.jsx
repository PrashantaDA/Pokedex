/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard";
import Modal from "./Modal";
import SearchBar from "./SearchBar";
import SortOptions from "./SortOptions";
import "../styles/PokeList.scss";

const POKEMON_PER_PAGE = 18; // Updated to show 18 Pokémon per page

const PokeList = () => {
	const [pokemon, setPokemon] = useState([]);
	const [filteredPokemon, setFilteredPokemon] = useState([]);
	const [selectedPokemon, setSelectedPokemon] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [totalCount, setTotalCount] = useState(0);
	const [showScrollTop, setShowScrollTop] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [isSearching, setIsSearching] = useState(false);
	const [sortBy, setSortBy] = useState("id-asc");

	// Handle scroll to top visibility
	useEffect(() => {
		const handleScroll = () => {
			const scrollPosition = window.scrollY;
			setShowScrollTop(scrollPosition > 300);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	// Sort Pokemon
	const sortPokemon = (pokemonList, sortType) => {
		const [field, direction] = sortType.split("-");
		return [...pokemonList].sort((a, b) => {
			let comparison = 0;
			if (field === "id") {
				comparison = a.id - b.id;
			} else if (field === "name") {
				comparison = a.name.localeCompare(b.name);
			} else if (field === "type") {
				comparison = a.type.localeCompare(b.type);
			} else if (field === "height") {
				comparison = a.height - b.height;
			} else if (field === "weight") {
				comparison = a.weight - b.weight;
			}
			return direction === "asc" ? comparison : -comparison;
		});
	};

	// Apply sorting when sortBy changes
	useEffect(() => {
		if (filteredPokemon.length > 0) {
			setFilteredPokemon(sortPokemon(filteredPokemon, sortBy));
		}
	}, [sortBy]);

	// Fetch Pokémon with pagination
	useEffect(() => {
		if (isSearching) return;

		const fetchPokemon = async () => {
			try {
				setLoading(true);
				const offset = (page - 1) * POKEMON_PER_PAGE;
				const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${POKEMON_PER_PAGE}&offset=${offset}`);
				const data = await response.json();

				if (page === 1) {
					setTotalCount(data.count);
				}

				setHasMore(offset + POKEMON_PER_PAGE < data.count);

				const pokemonData = await Promise.all(
					data.results.map(async (pokemon) => {
						const res = await fetch(pokemon.url);
						const pokemonDetails = await res.json();
						return {
							id: pokemonDetails.id,
							name: pokemonDetails.name,
							image: pokemonDetails.sprites.other["official-artwork"].front_default || pokemonDetails.sprites.front_default,
							type: pokemonDetails.types[0].type.name,
							height: pokemonDetails.height,
							weight: pokemonDetails.weight,
							stats: pokemonDetails.stats.map((stat) => stat.base_stat),
							statsName: pokemonDetails.stats.map((stat) => stat.stat.name),
							abilities: pokemonDetails.abilities.map((ability) => ability.ability.name),
						};
					})
				);

				const sortedPokemon = sortPokemon(pokemonData, sortBy);

				if (page === 1) {
					setPokemon(sortedPokemon);
					setFilteredPokemon(sortedPokemon);
				} else {
					setPokemon((prev) => [...prev, ...sortedPokemon]);
					setFilteredPokemon((prev) => [...prev, ...sortedPokemon]);
				}
				setError(null);
			} catch (err) {
				setError("Failed to fetch Pokémon data. Please try again.");
			} finally {
				setLoading(false);
			}
		};

		fetchPokemon();
	}, [page, isSearching, sortBy]);

	// Handle search
	useEffect(() => {
		const searchPokemon = async () => {
			if (!searchTerm.trim()) {
				setIsSearching(false);
				setFilteredPokemon(pokemon);
				return;
			}

			try {
				setIsSearching(true);
				setLoading(true);

				if (!isNaN(searchTerm)) {
					const id = parseInt(searchTerm);
					if (id > 0) {
						const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
						if (response.ok) {
							const data = await response.json();
							const pokemonData = {
								id: data.id,
								name: data.name,
								image: data.sprites.other["official-artwork"].front_default || data.sprites.front_default,
								type: data.types[0].type.name,
								height: data.height,
								weight: data.weight,
								stats: data.stats.map((stat) => stat.base_stat),
								statsName: data.stats.map((stat) => stat.stat.name),
								abilities: data.abilities.map((ability) => ability.ability.name),
							};
							setFilteredPokemon([pokemonData]);
							setTotalCount(1);
						} else {
							setFilteredPokemon([]);
							setTotalCount(0);
						}
					} else {
						setFilteredPokemon([]);
						setTotalCount(0);
					}
				} else {
					const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10000`);
					const data = await response.json();
					const searchTermLower = searchTerm.toLowerCase();
					const matchingPokemon = data.results.filter((poke) => poke.name.toLowerCase().includes(searchTermLower));

					if (matchingPokemon.length > 0) {
						const pokemonData = await Promise.all(
							matchingPokemon.map(async (pokemon) => {
								const res = await fetch(pokemon.url);
								const pokemonDetails = await res.json();
								return {
									id: pokemonDetails.id,
									name: pokemonDetails.name,
									image: pokemonDetails.sprites.other["official-artwork"].front_default || pokemonDetails.sprites.front_default,
									type: pokemonDetails.types[0].type.name,
									height: pokemonDetails.height,
									weight: pokemonDetails.weight,
									stats: pokemonDetails.stats.map((stat) => stat.base_stat),
									statsName: pokemonDetails.stats.map((stat) => stat.stat.name),
									abilities: pokemonDetails.abilities.map((ability) => ability.ability.name),
								};
							})
						);
						const sortedPokemon = sortPokemon(pokemonData, sortBy);
						setFilteredPokemon(sortedPokemon);
						setTotalCount(pokemonData.length);
					} else {
						setFilteredPokemon([]);
						setTotalCount(0);
					}
				}
				setError(null);
			} catch (err) {
				setError("Failed to search Pokémon. Please try again.");
				setFilteredPokemon([]);
				setTotalCount(0);
			} finally {
				setLoading(false);
			}
		};

		searchPokemon();
	}, [searchTerm, pokemon, sortBy]);

	const handleLoadMore = () => {
		if (!loading && hasMore) {
			setPage((prev) => prev + 1);
		}
	};

	const handleSearch = (term) => {
		setSearchTerm(term);
		setPage(1);
	};

	const handleSort = (sortType) => {
		setSortBy(sortType);
	};

	if (error) {
		return (
			<div className="error-container">
				<p className="error-message">{error}</p>
				<button
					className="retry-button"
					onClick={() => {
						setError(null);
						setPage(1);
						setIsSearching(false);
					}}
				>
					Try Again
				</button>
			</div>
		);
	}

	return (
		<div className="poke-list">
			<div className="search-sort-container">
				<SearchBar onSearch={handleSearch} />
				<SortOptions onSort={handleSort} />
			</div>
			<div className="progress-indicator">{isSearching ? `Found ${filteredPokemon.length} matching Pokémon` : `Loaded ${filteredPokemon.length} of ${totalCount} Pokémon`}</div>
			<div className="pokemon-grid">
				{filteredPokemon.map((poke) => (
					<PokemonCard
						key={poke.id}
						id={poke.id}
						name={poke.name}
						image={poke.image}
						type={poke.type}
						height={poke.height}
						weight={poke.weight}
						stats={poke.stats}
						statsName={poke.statsName}
						abilities={poke.abilities}
					/>
				))}
			</div>
			{loading && (
				<div className="loading-container">
					<div className="pokeball-loader">
						<div className="pokeball-top"></div>
						<div className="pokeball-middle"></div>
						<div className="pokeball-bottom"></div>
					</div>
					<p className="loading-text">{isSearching ? "Searching Pokémon..." : "Loading more Pokémon..."}</p>
				</div>
			)}
			{hasMore && !loading && !isSearching && (
				<div className="load-more-container">
					<button
						className="load-more-button"
						onClick={handleLoadMore}
					>
						Load More Pokémon
					</button>
				</div>
			)}
			<button
				className={`scroll-to-top ${showScrollTop ? "visible" : ""}`}
				onClick={scrollToTop}
				aria-label="Scroll to top"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
				>
					<path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
				</svg>
			</button>
			{selectedPokemon && (
				<Modal
					isOpen={!!selectedPokemon}
					onClose={() => setSelectedPokemon(null)}
					pokemon={selectedPokemon}
				/>
			)}
		</div>
	);
};

export default PokeList;
