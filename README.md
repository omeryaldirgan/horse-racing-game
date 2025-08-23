# Horse Racing Game Trial Day

An interactive horse racing game built with Vue.js, demonstrating clean code principles and scalable architecture.

## 🎯 Features

- **Dynamic Horse Generation**: Randomly generates 1-20 horses with unique colors and conditions
- **Race Schedule Management**: Creates 6 rounds with increasing distances (1200m to 2200m)
- **Interactive Racing**: Start/pause functionality with animated horse movement
- **Real-time Results**: Live display of race results as they complete
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🏗️ Architecture

### Component Structure
- `App.vue` - Main application container
- `GameControls.vue` - Game control buttons and status
- `HorseList.vue` - Display of available horses
- `RaceTrack.vue` - Animated race track with horses
- `RaceProgram.vue` - Race schedule and participants
- `RaceResults.vue` - Completed race results

### State Management
- **Vuex Store** with modular architecture:
  - `horses` - Horse data and selection
  - `races` - Race scheduling and execution
  - `game` - Game state and controls

### Utilities
- `horseGenerator.js` - Horse creation and management
- `raceCalculator.js` - Race simulation and calculations
- `constants.js` - Game configuration and constants

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm run serve

# Build for production
npm run build

# Run unit tests
npm run test:unit

# Run e2e tests
npm run test:e2e
```

## 🎮 How to Play

1. **Generate Program**: Click "GENERATE PROGRAM" to create horses and race schedule
2. **Start Race**: Click "START" to begin the current race
3. **Watch Progress**: Observe horses moving across the track
4. **View Results**: See race results appear in real-time
5. **Continue**: Races proceed automatically through all 6 rounds

## 🏁 Game Rules

- **Horses**: 1-20 horses generated randomly with unique colors
- **Rounds**: 6 rounds with distances: 1200m, 1400m, 1600m, 1800m, 2000m, 2200m
- **Participants**: 10 horses randomly selected for each race
- **Conditions**: Horse condition scores range from 1-100, affecting performance

## 🧪 Testing

### Unit Tests
- Component testing with Vue Test Utils
- Store module testing
- Utility function testing

### E2E Tests
- Cypress integration tests
- Full game flow testing
- Cross-browser compatibility

## 🎨 Design Principles

- **Clean Code**: Readable, maintainable, and well-documented
- **Component-Based**: Modular Vue components with single responsibilities
- **State Management**: Centralized Vuex store with clear data flow
- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox
- **Performance**: Optimized animations and efficient state updates

## 🔧 Technical Stack

- **Frontend**: Vue.js 3 with Composition API
- **State Management**: Vuex 4
- **Styling**: CSS3 with modern features
- **Build Tool**: Vue CLI
- **Testing**: Jest + Cypress
- **Linting**: ESLint with Vue rules

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

This project demonstrates senior-level frontend development practices:

1. **Code Organization**: Clear separation of concerns
2. **Error Handling**: Graceful error management
3. **Performance**: Optimized rendering and updates
4. **Accessibility**: Semantic HTML and ARIA support
5. **Testing**: Comprehensive test coverage
6. **Documentation**: Clear code comments and README

## 📄 License

MIT License - see LICENSE file for details

---

Built with ❤️ using Vue.js and modern web technologies
