/* eslint-disable react/prop-types */
import "../styles/Header.scss";

const Header = () => {
	return (
		<header className="topbar">
			<div className="logo">
				<img
					src="/pokeball-icon.png"
					alt="Pokédex Logo"
				/>
				<div className="title">
					<h1>Pokédex</h1>
					<span>Gotta catch &apos;em all!</span>
				</div>
			</div>
		</header>
	);
};

export default Header;
