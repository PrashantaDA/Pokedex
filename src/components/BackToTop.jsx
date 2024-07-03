// BackToTop.js
import { useState, useEffect } from "react";
import "../styles/BackToTop.scss";

const BackToTop = () => {
	const [isVisible, setIsVisible] = useState(false);

	const toggleVisibility = () => {
		if (window.pageYOffset > 300) {
			setIsVisible(true);
		} else {
			setIsVisible(false);
		}
	};

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	useEffect(() => {
		window.addEventListener("scroll", toggleVisibility);
		return () => window.removeEventListener("scroll", toggleVisibility);
	}, []);

	return (
		<div className="back-to-top">
			{isVisible && (
				<button
					onClick={scrollToTop}
					className="scroll-button"
				>
					↑
				</button>
			)}
		</div>
	);
};

export default BackToTop;
