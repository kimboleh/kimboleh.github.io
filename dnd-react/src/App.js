import React from 'react';
import { CharacterSetup, CharacterSheet } from './components';
import { ThemeProvider } from 'styled-components';
import logo from './logo.svg';
import { theme } from './theme';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      char: {name: "tu madre", level: 0, class: "Artificer", spells: [], weapons: []},
      userCharExists: false
    }
  }

  componentDidMount() {
    if (!this.state.userCharExists) { console.log("there's no character already"); }
    if (localStorage.getItem('characterObject')) { this.setState({ char: JSON.parse(localStorage.getItem('characterObject')) }); }
    // if (localStorage.getItem('characterObject')) { console.log(JSON.parse(localStorage.getItem('characterObject'))); }
  }

  render() {
    return (
      <div className="App">
        <ThemeProvider theme={theme}>
          <CharacterSetup />
          <CharacterSheet char={this.state.char} />
        </ThemeProvider>
      </div>
    );
  }
}


export default App;
