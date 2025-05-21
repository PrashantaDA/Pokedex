# Pokedex

A modern, responsive Pokedex web application built with React that allows users to explore and learn about Pokemon. The application features a sleek dark theme design with smooth animations and interactive elements.

## Features

- **Pokemon List**: Browse through a comprehensive list of Pokemon with pagination
- **Search Functionality**: Search Pokemon by name or ID with real-time suggestions
- **Detailed Pokemon Information**: View detailed information about each Pokemon including:
  - Physical stats (height, weight)
  - Abilities
  - Base stats with visual progress bars
  - High-quality Pokemon images
- **Sorting Options**: Sort Pokemon by various criteria:
  - ID (ascending/descending)
  - Name (A-Z/Z-A)
  - Type
  - Height
  - Weight
- **Responsive Design**: Fully responsive layout that works on all devices
- **Modern UI/UX**:
  - Smooth animations and transitions
  - Interactive elements with hover effects
  - Modal-based detailed views
  - Loading states and error handling

## Technologies Used

- React.js
- SCSS for styling
- PokeAPI for Pokemon data
- Modern JavaScript (ES6+)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/pokedex.git
```

2. Navigate to the project directory:

```bash
cd pokedex
```

3. Install dependencies:

```bash
npm install
# or
yarn install
```

4. Start the development server:

```bash
npm start
# or
yarn start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
src/
├── components/         # React components
│   ├── PokeList.jsx   # Main Pokemon list component
│   ├── SearchBar.jsx  # Search functionality
│   ├── SortOptions.jsx# Sorting functionality
│   └── Modal.jsx      # Pokemon details modal
├── styles/            # SCSS styles
│   ├── PokeList.scss
│   ├── SearchBar.scss
│   ├── SortOptions.scss
│   └── Modal.scss
└── App.jsx           # Main application component
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [PokeAPI](https://pokeapi.co/) for providing the Pokemon data
- Pokemon images and assets are property of Nintendo/Game Freak
