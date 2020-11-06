import React from 'react';
import { StyledSheet } from './CharacterSetup.styled';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import bgimg from './bground.png';

class CharacterSetup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props,
      valueText: null,
      classHTML: []
    };
    this.getClasses = this.getClasses.bind(this);
  }

  async componentDidMount() {
    var classJSON;
    const response = await fetch('https://www.dnd5eapi.co/api/classes/');
    const json = await response.json();
    console.log("json: " + await json);

    for (var i of await json) {
      var classes = this.state.classHTML;
      classes += "<input type='checkbox' id=" + i.name + " name=" + i.name +
          " value=" + i.name + "> <label for=" + i.name + ">"
          + i.name + "</label><br>";
      this.setState({ classHTML: classes });
    }


    console.log(this.state.classHTML);
  }

  getClasses() {
    var classes = [];

    var request = new XMLHttpRequest();
    request.open('GET', 'https://www.dnd5eapi.co/api/classes/', true);

    request.onload = function() {
      if (this.status >= 200 && this.status < 400) {
        var resp = JSON.parse(this.response).results;
        for (var i of resp) {
          classes.push("<input type='checkbox' id=" + i.name + " name=" + i.name +
              " value=" + i.name + "> <label for=" + i.name + ">"
              + i.name + "</label><br>");
          // console.log(i);
        }
      } else { console.log("Target server reached, but returned error: " + this.response); }
    };
    request.onerror = function() { console.log("Connection error."); };
    request.send();

    return <div>{classes}</div>;
  }

  render() {
    return(
      <StyledSheet>
        <Carousel
            interval={null}
          >
          <Carousel.Item>
            <img src={bgimg} className="max-vh-100 min-vw-100" />
            <Carousel.Caption>
                <h3>Welcome to D&D Combat!</h3>
                <p>I love <em>Dungeons & Dragons</em>; the thing is, I don't super love
                the formatting of the character sheets.</p>
                <p>One of my biggest annoyances is in-game combat. I don't have all my character's
                spells memorized (<em>I know, I know, I guess I'm not a real gamer</em>), and those are
                on a separate page from my weapons, which are on a separate page from my feats &
                miscellaneous abilities - all of which I'd like to be able to see in front of me
                when I'm figuring out what to do for my next turn.</p>
                <p>Enter: this web app! Just enter your character's stats, select the proper spells,
                and you'll have everything you need for combat laid nicely in front of you.</p>
                <p>Press the right arrow to get started.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src={bgimg} class="max-vh-100 min-vw-100" />
            <Carousel.Caption>
              <h3>Name</h3>
              <input type="text" id="charName" name="charName" /><br/><br/>
              <h3>Level</h3>
              <input type="number" max={20} min={1} id="charLevel" name="charLevel" /><br/><br/>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src={bgimg} class="max-vh-100 min-vw-100" />
            <Carousel.Caption>
              <h3>Class</h3>
              <div>
              {this.state.classHTML.map(charClass => (
                <div>
                <input type='checkbox' id={charClass.name} name={charClass.name} value={charClass.name}/>
                <label for={charClass.name}>{charClass.name}</label>
                </div>
                ))}
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </StyledSheet>
    );
  }
}

export default CharacterSetup;
