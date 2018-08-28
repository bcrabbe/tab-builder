import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
  },
  strings: {
    strokeWidth: "0.001rem",
    stroke: "#000",
    fill: "none"
  },
  background: {
    fill: "#fff"
  }
});

class FretBoard extends Component {

  /**
   * Object detailing the frets played on each string of the guitar.
   * eg
   *  ```
   * notes[] = [
   *   [{fret: 2}],
   *   [{fret: 'X'}],
   *   ....
   * ]
   *
   *```
   * @type Array(6)<Object<Object<string, Array<Object<string, (number|string)>>>
   */

  static propTypes = {
    notes: PropTypes.array.isRequired,

  };

  constructor(props) {
    super(props);
    //view box max coordinates:
    const X=1, Y=1;
    const padding = {
      left: X/20,
      right: X/20,
      top: Y/10,
      bottom: Y/20
    };
    this.state = {
      X: X,
      Y: Y,
      padding,
      topFret: 0,
      bottomFret: Y,
      numberOfStrings: this.props.notes.length,
    };
    this.state = {
      ...this.state,
      stringPositions: this.stringPositions(),
      frets: this.fretPositions()

    };
    console.log(this.state.stringPositions);
  }

  stringPositions = () => {
    const {X, Y, padding, numberOfStrings} = this.state;
    const widthFretboard = Y - padding.left - padding.right;
    const x_s = (s) => padding.left + s*(widthFretboard/(numberOfStrings-1));
    return R.map(x_s, R.range(0, numberOfStrings));
  }

  findFretsInNotes = () => {
    const {notes} = this.props;
    const initAcc = {min:24, max:0};
    const noteReducer = ({min, max}, {fret}) => fret==="X" ? ({min, max}) : ({
      min: fret < min ? fret : min,
      max: fret > max ? fret : max
    });
    const stringReducer = (acc, string) => R.reduce(noteReducer, acc, string);
    return R.reduce(stringReducer, initAcc, notes);
  }

  fretPositions = () => {
    const {min, max} = this.findFretsInNotes();
    console.log(min, max);
    const fretsToDisplay = {
      min: min <= 2 ? 0 : min - 2,
      max: max + 1
    };
    console.log(fretsToDisplay);
  }

  drawChord = (chord) => {
    for(var string in chord) {
      if(chord.hasOwnProperty(string)) {
        chord[string].forEach(note => {
          var fret = note.fret;
          if(fret==="X") {
            this.markStringNotPlayed(string);
          } else {
            this.drawNote(string, fret, note.label);
          }
        });
      }
    }
  }


  stringsJSX = () => {
    const stringJSX = (s) => (
      <line y2={this.state.topFret} y1={this.state.bottomFret}
            x1={this.state.stringPositions[s]}
            x2={this.state.stringPositions[s]}
            className={this.props.classes.strings}
            />
    );
    return R.map(stringJSX, R.range(0, this.state.numberOfStrings));
  }



  fretsJSX = () => {

  }

  render() {
    const {classes} = this.props;
    const {X, Y, padding, numberOfStrings} = this.state;
    const canvasCoords = {
      x: 0,
      y: 0,
      width: X,
      height: Y
    };
  //consolelog(this.state.barWidth);
    return (
      <svg
        className={this.props.className || classes.root}
        viewBox={`0 0 ${this.state.X}  ${this.state.Y}`}
        xmlns="http://www.w3.org/2000/svg"
        >
        <g>
          <rect
            className={classes.background}
            {...canvasCoords}
            />
        </g>
        <g>
          <title>vertical</title>
          {this.stringsJSX()}

          <title> horizontal</title>
          {this.fretsJSX()}
        </g>
      </svg>
    );
  }
}

export default withStyles(styles)(FretBoard);
