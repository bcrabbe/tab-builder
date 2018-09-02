import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { withStyles } from '@material-ui/core/styles';
import StrokedText from './StrokedText.jsx';
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
    stroke: "#000",
  },
  noteLabel:{
    fontSize: '0.01rem',
    fill: "#000",
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
      top: Y/7,
      bottom: Y/20
    };
    this.state = {
      X: X,
      Y: Y,
      padding,
      topFret: 0,
      bottomFret: Y,
      numberOfStrings: this.props.notes.length,
      fretsToDisplay: this.fretsToDisplay(),
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
    const noteReducer = ({min, max}, {fret}) => fret==="X" || fret===0 ? ({min, max}) : ({
      min: fret < min ? fret : min,
      max: fret > max ? fret : max
    });
    const stringReducer = (acc, string) => R.reduce(noteReducer, acc, string);
    return R.reduce(stringReducer, initAcc, notes);
  }

  fretsToDisplay = () => {
    const {min, max} = this.findFretsInNotes();
    console.log(min, max);
    return {
      min: min <= 2 ? 0 : min - 2,
      max: max + 1
    };
  }

  fretPositions = () => {
    const {X, Y, padding, fretsToDisplay} = this.state;
    const heightFretboard = Y - padding.top - padding.bottom;
    const numberOfFrets = fretsToDisplay.max - fretsToDisplay.min + 1;
    const y_f = f => padding.top + (f-fretsToDisplay.min) * (heightFretboard/(numberOfFrets-1));
    return R.map(y_f, R.range(0, fretsToDisplay.max+1));
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
    const {min, max} = this.state.fretsToDisplay;
    const stringJSX = (s) => (
      <line
        y2={this.state.frets[min]}
        y1={this.state.frets[max]}
        x1={this.state.strings[s]}
        x2={this.state.strings[s]}
        className={this.props.classes.strings}
        key={s}
        />
    );
    return <g>{R.map(stringJSX, R.range(0, this.state.strings.length))}</g>;
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
    const {min, max} = this.state.fretsToDisplay;
    return <g>{R.map(fretJSX, R.range(min, max+1))}</g>;
  }

  positioningUtils = () => {
    const {min, max} = this.state.fretsToDisplay;
    const y_f = R.flip(R.nth)(this.state.frets);
    const f_n = R.prop('fret');
    const y_n = R.pipe(
      f_n,
      R.ifElse(
        R.converge(R.or, [R.equals(0), R.equals('X')]),
        R.compose(y_f, R.always(min)),
        R.compose(y_f)
      )
    );
    const y_nsub1 = R.ifElse(
      R.pipe(f_n, R.converge(R.or, [R.equals(0), R.equals('X')])),
      y_n,
      R.compose(y_f, R.dec, f_n)
    );
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
      return this.noteLabelJSX(s, n);
    });
    return R.reduce(stringReducer, [], Object.entries(this.props.notes));
  }

  noteLabelJSX = (s, n) => {
    const {strings, frets} = this.state;
    const {notes, classes} = this.props;
    const {y_f, f_n, y_n, y_nsub1, cy_n} = this.positioningUtils();
    const text = (
      <text
        xmlns="http://www.w3.org/2000/svg"
        textAnchor="middle"
        x={strings[s]}
        y={cy_n(n)}
        className={classes.noteLabel}>
        {f_n(n)}
      </text>
    );
    return (
      <StrokedText
        key={R.join('',[s, f_n(n)])}
        text={text} />
    );
  }

  noteCircleJSX = (s, n) => {
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
    console.log(this.notesJSX());
    return (
      <svg
        className={this.props.className || classes.root}
        viewBox={`0 0 ${this.state.X} ${this.state.Y}`}
        xmlns="http://www.w3.org/2000/svg"
        >
        <title>fretboard</title>
        <g>
          <rect
            className={classes.background}
            {...canvasCoords}
            />
          {this.stringsJSX()}
          {this.fretsJSX()}
        </g>
        <title>notes</title>
        <g>
          {this.notesJSX()}
        </g>
      </svg>
    );
  }
}

export default withStyles(styles)(FretBoard);
