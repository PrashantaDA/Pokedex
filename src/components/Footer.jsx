import "../styles/Footer.scss";
import BackToTop from "./BackToTop";

const Footer = () => {
	return (
		<footer className="bottom">
			<div className="bottom-btn">
				<p className="bg-circle-white">A</p>
				<p>See Details</p>
			</div>
			<div className="bottom-btn">
				<p className="bg-circle-white">X</p>
				<p>Habitat</p>
			</div>
			<div className="bottom-btn">
				<p className="bg-circle-white">Y</p>
				<p>View Evolutions</p>
			</div>
			<div className="bottom-btn">
				<p className="bg-circle-white">B</p>
				<p>Back</p>
			</div>
			<BackToTop />
		</footer>
	);
};

export default Footer;
