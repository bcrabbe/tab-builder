import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
  },
  strings: {
    strokeWidth: "0.0007rem",
    stroke: "#000",
    fill: "none"
  },
  background: {
    fill: "#fff"
  },
  noteCircle: {
    r: "0.02rem",
    fill: "#fff",
    strokeWidth: "0.0007rem",
    stroke: "#000",
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
      strings: this.strings(),
      frets: this.fretPositions()

    };
    console.log(this.state.strings);
    console.log(this.state.frets);
  }

  strings = () => {
    const {X, Y, padding, numberOfStrings} = this.state;
    const widthFretboard = X - padding.left - padding.right;
    const x_s = s => padding.left + s * (widthFretboard/(numberOfStrings-1));
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
    const {X, Y, padding} = this.state;
    const heightFretboard = Y - padding.top - padding.bottom;
    const numberOfFrets = R.converge(
      R.subtract,
      [R.prop('max'), R.prop('min')],
    )(fretsToDisplay);
    const y_f = f => padding.top + f * (heightFretboard/(numberOfFrets-1));
    return R.map(y_f, R.range(0, numberOfFrets));
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
      <line
        y2={this.state.frets[0]}
        y1={this.state.frets[this.state.frets.length-1]}
        x1={this.state.strings[s]}
        x2={this.state.strings[s]}
        className={this.props.classes.strings}
        key={s}
        />
    );
    return R.map(stringJSX, R.range(0, this.state.strings.length));
  }

  fretsJSX = () => {
    const fretJSX = (f) => (
      <line
        y2={this.state.frets[f]} y1={this.state.frets[f]}
        x1={this.state.strings[0]}
        x2={this.state.strings[this.state.strings.length-1]}
        className={this.props.classes.strings}
        key={f}
        />
    );
    return R.map(fretJSX, R.range(0, this.state.frets.length));
  }

  positioningUtils = () => {
    const y_f = R.flip(R.nth)(frets);
    const f_n = R.prop('fret');
    const y_n = R.compose(y_f, f_n);
    const y_nsub1 = R.compose(y_f, R.dec, f_n);
    const cy_n = n => y_nsub1(n) + (y_n(n) - y_nsub1(n))/2;
    return {
      y_f, f_n, y_n, y_nsub1, cy_n
    };
  }

  notesJSX = () => {
    const {notes, classes} = this.props;
    const {strings, frets} = this.state;
    const stringReducer = (acc, [string, notes]) => R.concat(
      acc,
      R.map(noteJSX(string), notes),
    );
    const noteJSX = R.curry((s, n) => {

    });
    return R.reduce(stringReducer, [], Object.entries(this.props.notes));
  }

  notesCircleJSX = (s, n) => {
    const {strings, frets} = this.state;
    const {notes, classes} = this.props;
    const {y_f, f_n, y_n, y_nsub1, cy_n} = this.positioningUtils();
    return (
      <cirle
        xmlns="http://www.w3.org/2000/svg"
        key={R.concat([s], [f_n(n)])}
        cx={strings[s]}
        cy={cy_n(n)}
        className={classes.noteCircle}/>
    );
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

          <title>horizontal</title>
          {this.fretsJSX()}

          <title>notes</title>
          {this.notesJSX()}

        </g>
      </svg>
    );
  }
}

export default withStyles(styles)(FretBoard);
