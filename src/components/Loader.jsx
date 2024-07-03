import PokeLoader from "../assets/pokeball.png";
import "../styles/Loader.scss";

const Loader = () => {
	return (
		<div className="loading-spinner">
			<img
				src={PokeLoader}
				alt="pokeball"
			/>
		</div>
	);
};

export default Loader;
