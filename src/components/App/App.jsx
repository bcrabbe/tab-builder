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
    height: "50rem"
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [
        [{fret:'X'}],
        [{fret:0}],
        [{fret:2}],
        [{fret:2}],
        [{fret:2}],
        [{fret:3}]
      ]
    };
  }

  render() {
    const {classes} = this.props;
    //consolelog(this.state.barWidth);
    return (
      <div>
        <header>
          <h1>tab-builder</h1>
        </header>
        <FretBoard
          className={classes.chord}
          notes={this.state.notes}
          />
        <Scraper/>
      </div>
    );
  }
}

export default withStyles(styles)(App);
