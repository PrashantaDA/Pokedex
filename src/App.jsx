import Header from "./components/Header";
import Footer from "./components/Footer";
import PokeList from "./components/PokeList";
import ErrorBoundary from "./components/ErrorBoundary";

const App = () => {
	return (
		<>
			<Header />
			<ErrorBoundary>
				<PokeList />
			</ErrorBoundary>
			<Footer />
		</>
	);
};

export default App;
