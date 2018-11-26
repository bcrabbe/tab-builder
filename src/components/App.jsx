import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TabBar from './TabBar.jsx';
import FretBoard from './FretBoard.jsx';
import Scraper from './Scraper/Scraper.jsx';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/lab/Slider';
import Scalometer from './Scalometer.jsx';

class App extends Component {

  static propTypes = {
    name: PropTypes.string
  }

  static defaultProps = {
    name: PropTypes.string
  }


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

  chordJSX = notes => (
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
         {this.state.chords.map(this.chordJSX)}
        <Scalometer
          root='E'
          scale={[0, 3, 5, 6, 7, 10]}
          tuning={['E','A','D','G','B','E']}
        />
        <Scraper/>
      </div>
    );
  }
}

const styles = theme => ({
  tabBar: {
    display:"inline-block"
  },
  page: {
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

export default withStyles(styles)(App);
