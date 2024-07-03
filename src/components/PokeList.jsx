import { useEffect, useState, useCallback, useRef } from "react";
import "../styles/PokeList.scss";
import axios from "axios";
import PokemonCard from "./PokemonCard";
import SearchBar from "./SearchBar";
import BackToTop from "./BackToTop";
import Loader from "./Loader";

const PokeList = () => {
	const [allPokemons, setAllPokemons] = useState([]);
	const [filteredPokemons, setFilteredPokemons] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [offset, setOffset] = useState(0);
	const [loading, setLoading] = useState(false);
	const [initialLoading, setInitialLoading] = useState(true);
	const cache = useRef({});

	const getAllPokemons = async (loadMore = false) => {
		setLoading(true);
		const limit = 20;
		const cacheKey = `pokemons_${offset}`;

		if (cache.current[cacheKey]) {
			const cachedData = cache.current[cacheKey];
			setAllPokemons((prev) => (loadMore ? [...prev, ...cachedData] : cachedData));
			setOffset((prev) => prev + limit);
			setLoading(false);
			setInitialLoading(false);
			return;
		}

		try {
			const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
			const pokemonUrls = res.data.results.map((pokemon) => `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
			const pokemonPromises = pokemonUrls.map((url) => axios.get(url));
			const pokemonResponses = await Promise.all(pokemonPromises);
			const newPokemons = pokemonResponses.map((res) => res.data).sort((a, b) => a.id - b.id);

			cache.current[cacheKey] = newPokemons;

			setAllPokemons((prev) => (loadMore ? [...prev, ...newPokemons] : newPokemons));
			setOffset((prev) => prev + limit);
			setLoading(false);
			setInitialLoading(false);
		} catch (error) {
			console.error("Error fetching Pokémon data:", error);
			setLoading(false);
			setInitialLoading(false);
		}
	};

	const handleScroll = useCallback(() => {
		if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) return;
		getAllPokemons(true);
	}, [loading]);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [handleScroll]);

	useEffect(() => {
		getAllPokemons();
	}, []);

	useEffect(() => {
		const filtered = allPokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()));
		setFilteredPokemons(filtered);
	}, [searchTerm, allPokemons]);

	if (initialLoading) {
		return <Loader />;
	}

	return (
		<div className="app-container">
			<SearchBar
				searchTerm={searchTerm}
				setSearchTerm={setSearchTerm}
			/>
			<div className="poke-container">
				<div className="all-container">
					{filteredPokemons.map((pokemon) => (
						<PokemonCard
							key={pokemon.id}
							id={pokemon.id.toString().padStart(3, "0")}
							name={pokemon.name}
							image={pokemon.sprites.other.dream_world.front_default || pokemon.sprites.front_default}
							type={pokemon.types[0].type.name}
							weight={pokemon.weight}
							height={pokemon.height}
							abilities={pokemon.abilities.map((ability) => ability.ability.name)}
							stats={pokemon.stats.map((stat) => stat.base_stat)}
							statsName={pokemon.stats.map((stat) => stat.stat.name)}
						/>
					))}
				</div>
				{loading && <div className="loading">Loading...</div>}
				{!loading && <button onClick={() => getAllPokemons(true)}>Load More</button>}
			</div>
			<BackToTop />
		</div>
	);
};

export default PokeList;
