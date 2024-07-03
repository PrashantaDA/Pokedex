/* eslint-disable react/no-unescaped-entities */
import "../styles/Header.scss";
import Pokeball from "../assets/pokeball.png";
import { motion } from "framer-motion";

const Header = () => {
	return (
		<header className="topbar">
			<motion.div
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.9 }}
				className="header-logo"
			>
				<motion.img
					initial={{ rotate: 0 }}
					animate={{ rotate: 360 }}
					transition={{ duration: 0.78 }}
					className="logo"
					src={Pokeball}
					alt="Pokeball"
				/>
				<h1 className="title">PokédeX</h1>
			</motion.div>
			<motion.div
				initial={{ opacity: 0, x: -100 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.78 }}
				className="title-slogan"
			>
				<h1 className="slogan">Gotta catch 'em all</h1>
			</motion.div>
		</header>
	);
};

export default Header;
