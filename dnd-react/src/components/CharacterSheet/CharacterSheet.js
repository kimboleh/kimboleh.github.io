import React from 'react';
import { StyledSheet } from './CharacterSheet.styled';

class CharacterSheet extends React.Component {
  constructor(props) {
    super(props);
    if (!localStorage.getItem('characterObject')) {
      localStorage.setItem('characterObject', '{"name": "name", "level": 0, "class": "Wizard", "spells": [], "weapons": []}');
    }
    var localChar = localStorage.getItem('characterObject');

    this.state = {
      name: JSON.parse(localChar).name,
      level: JSON.parse(localChar).level,
      class: JSON.parse(localChar).class,
      spells: JSON.parse(localChar).spells,
      weapons: JSON.parse(localChar).weapons
    }
    this.saveCharacter = this.saveCharacter.bind(this);
  }

  saveCharacter() {
    var currentChar = { name: "new name", level: this.state.level,
      class: this.state.class, spells: this.state.spells, weapons: this.state.weapons };
    localStorage.setItem('characterObject', JSON.stringify(currentChar));
    console.log(JSON.parse(localStorage.getItem('characterObject')));
  }

  render() {
    return(
      <div id="charSheet">
        <StyledSheet>
          <div id="charName">{this.state.name}</div>
          <div id="charLvl">{this.state.level}</div>
          <div id="charClass">{this.state.class}</div>
          <div id="charSpells">{this.state.spells}</div>
          <div id="charWeapons">{this.state.weapons}</div>
          <button onClick={this.saveCharacter}>Save</button>
        </StyledSheet>
      </div>
    );
  }
}

export default CharacterSheet;
