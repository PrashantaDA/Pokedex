/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard";
import Modal from "./Modal";
import "../styles/PokeList.scss";

const POKEMON_PER_PAGE = 18; // Updated to show 18 Pokémon per page

const PokeList = () => {
	const [pokemon, setPokemon] = useState([]);
	const [selectedPokemon, setSelectedPokemon] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [totalCount, setTotalCount] = useState(0);
	const [showScrollTop, setShowScrollTop] = useState(false);

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

	// Fetch Pokémon with pagination
	useEffect(() => {
		const fetchPokemon = async () => {
			try {
				setLoading(true);
				const offset = (page - 1) * POKEMON_PER_PAGE;
				const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${POKEMON_PER_PAGE}&offset=${offset}`);
				const data = await response.json();

				// Set total count on first load
				if (page === 1) {
					setTotalCount(data.count);
				}

				// Check if we have more Pokémon to load
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

				if (page === 1) {
					setPokemon(pokemonData);
				} else {
					setPokemon((prev) => [...prev, ...pokemonData]);
				}
				setError(null);
			} catch (err) {
				setError("Failed to fetch Pokémon data. Please try again.");
			} finally {
				setLoading(false);
			}
		};

		fetchPokemon();
	}, [page]);

	const handleLoadMore = () => {
		if (!loading && hasMore) {
			setPage((prev) => prev + 1);
		}
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
					}}
				>
					Try Again
				</button>
			</div>
		);
	}

	return (
		<div className="poke-list">
			<div className="progress-indicator">
				Loaded {pokemon.length} of {totalCount} Pokémon
			</div>
			<div className="pokemon-grid">
				{pokemon.map((poke) => (
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
					<p className="loading-text">Loading more Pokémon...</p>
				</div>
			)}
			{hasMore && !loading && (
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
