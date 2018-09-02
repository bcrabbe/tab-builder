import React, { Component } from 'react';
import logo from './logo.svg';
import TabBar from '../TabBar/TabBar.jsx';
import FretBoard from '../FretBoard.jsx';
import Scraper from '../Scraper/Scraper.jsx';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/lab/Slider';


const barWidth = 15;
const styles = theme => ({
  tabBar: {
    width: `${barWidth}rem`,
    display:"inline-block"
  },
  page: {
    maxWidth: `${4*barWidth}rem`,
    borderStyle: 'solid',
    margin:"5%",
    padding:"5%",
    display: "inline-block" ,
  },
  chord: {
    width: "20rem",
    margin: 40
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chords: [
        [
          [{fret:'X'}],
          [{fret:0}],
          [{fret:2}],
          [{fret:2}],
          [{fret:2}],
          [{fret:3}]
        ],
        [
          [{fret:3}],
          [{fret:2}],
          [{fret:0}],
          [{fret:0}],
          [{fret:3}],
          [{fret:3}]
        ],
        [
          [{fret:'X'}],
          [{fret:0}],
          [{fret:9}],
          [{fret:8}],
          [{fret:7}],
          [{fret:7}]
        ],
        [
          [{fret:2}],
          [{fret:2}],
          [{fret:3}],
          [{fret:4}],
          [{fret:2}],
          [{fret:2}]
        ],
        [
          [{fret:3}],
          [{fret:3}],
          [{fret:4}],
          [{fret:5}],
          [{fret:5}],
          [{fret:3}]
        ],
        [
          [{fret:1},],
          [{fret:9}],
          [{fret:10}],
          [{fret:2}],
          [{fret:5}],
          [{fret:3}]
        ]
      ]
    };
  }

  chordJSX = (notes) => (
    <FretBoard
      className={this.props.classes.chord}
      notes={notes}
      />
  )

  render() {
    const {classes} = this.props;
    //consolelog(this.state.barWidth);
    return (
      <div>
        <header>
          <h1>tab-builder</h1>
        </header>
        {this.state.chords.map(this.chordJSX)}
        <Scraper/>
      </div>
    );
  }
}

export default withStyles(styles)(App);
