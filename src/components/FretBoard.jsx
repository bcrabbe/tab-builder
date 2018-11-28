import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { withStyles } from '@material-ui/core/styles';
import BackedText from './BackedText.jsx';
import classnames from 'classnames';

const STROKE_WIDTH = 0.0007;

class FretBoard extends Component {
  /**
   * Object detailing the frets played on each string of the guitar.
   * eg
   *  ```
   * notes[numberOfStrings] = [
   *   [{fret: 2}],
   *   [{fret: 'X'}],
   *   ....
   * ]
   *
   *```
   * @type Array(int)<Object<Object<string, Array<Object<string, (number|string)>>>
   */

  static propTypes = {
    notes: PropTypes.array.isRequired,
  }

  static defaultProps = {

  }

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
      X,
      Y,
      padding,
      topFret: 0,
      bottomFret: Y,
      numberOfStrings: this.props.notes.length,
      fretsToDisplay: this.fretsToDisplay(),
    };
    this.state = {
      ...this.state,
      strings: this.strings(),
      frets: this.fretPositions(),
    };
    const positioningUtils = this.positioningUtils();
    this.state = {
      ...this.state,
      positioningUtils,
    };

    const fretSpacing = Math.abs(
      positioningUtils.yForFret(1) -
        positioningUtils.yForFret(2)
    );
    this.state = {
      ...this.state,
      fontSize: 0.66 * fretSpacing
    };
    //console.log(this.state.strings);
    console.log(this.state);
    console.log(this.props);
  }

  positioningUtils = _ => {
    const {min, max} = this.state.fretsToDisplay;
    const yForFret = R.flip(R.nth)(this.state.frets);
    const fretSpacing = Math.abs(yForFret(1) - yForFret(2));
    const fretOfNote = R.prop('fret');
    const yOfFretOfNote = R.pipe(
      fretOfNote,
      R.ifElse(
        R.converge(R.or, [R.equals(0), R.equals('X')]),
        R.compose(yForFret, R.always(min)),
        yForFret
      )
    );
    const yOfFretAboveNote = R.ifElse(
      R.pipe(fretOfNote, R.converge(R.or, [R.equals(0), R.equals('X')])),
      R.pipe(yOfFretOfNote, R.subtract(fretSpacing)),
      R.compose(yForFret, R.dec, fretOfNote)
    );
    const labelPositionForNote = n => yOfFretAboveNote(n) +
          (yOfFretOfNote(n) - yOfFretAboveNote(n))/2;
    return {
      yForFret,
      fretOfNote,
      yOfFretOfNote,
      yOfFretAboveNote,
      labelPositionForNote
    };
  }

  strings = _ => {
    const {X, Y, padding, numberOfStrings} = this.state;
    const widthFretboard = X - padding.left - padding.right;
    const x_s = s => padding.left + s * (widthFretboard/(numberOfStrings-1));
    return R.map(x_s, R.range(0, numberOfStrings));
  }

  findFretsInNotes = _ => {
    const {notes} = this.props;
    const initAcc = {
      min:24,
      max:0
    };
    return R.reduce(
      (acc, string) => R.reduce(
        ({min, max}, {fret}) => fret==="X" || fret===0 ?
          ({min, max}) : ({
            min: fret < min ? fret : min,
            max: fret > max ? fret : max
          }),
        acc,
        string
      ),
      initAcc,
      notes
    );
  }

  fretsToDisplay = _ => {
    const {min, max} = this.findFretsInNotes();
//    console.log(min, max);
    return {
      min: min <= 2 ? 0 : min - 2,
      max: max + 1
    };
  }

  fretPositions = _ => {
    const {X, Y, padding, fretsToDisplay} = this.state;
    const heightFretboard = Y - padding.top - padding.bottom;
    const numberOfFrets = fretsToDisplay.max - fretsToDisplay.min + 1;
    const yForFret = f => padding.top +
          (f-fretsToDisplay.min) *
          (heightFretboard/(numberOfFrets-1));
    return R.map(yForFret, R.range(0, fretsToDisplay.max+1));
  }

  stringsJSX = _ => {
    const {min, max} = this.state.fretsToDisplay;
    const lineWidth = (STROKE_WIDTH * this.state.fontSize) * 600;
    const stringJSX = string => (
      <line
        y2={this.state.frets[min] - (lineWidth/2)}
        y1={this.state.frets[max] + (lineWidth/2)}
        x1={this.state.strings[string]}
        x2={this.state.strings[string]}
        className={this.props.classes.strings}
        key={string}
      />
    );
    return (
      <g>
        {R.map(stringJSX, R.range(0, this.state.strings.length))}
      </g>
    );
  }

  fretJSX = fret => {
    return (
      <line
        y2={this.state.frets[fret]} y1={this.state.frets[fret]}
        x1={this.state.strings[0]}
        x2={this.state.strings[this.state.strings.length-1]}
        className={classnames(
          this.props.classes.fret,
          {[this.props.classes.zeroFret]: fret===0}
        )}
        key={fret}
      />
    );
  }

  fretsJSX = _ => {
    const {min, max} = this.state.fretsToDisplay;
    return (
      <g>
        {R.map(this.fretJSX, R.range(min, max+1))}
      </g>
    );
  }

  notesJSX = _ => {
    const {notes, classes} = this.props;
    const {strings, frets} = this.state;
    const stringReducer = (acc, [string, notes]) => R.concat(
      acc,
      R.map(this.noteJSX(string), notes),
    );
    return R.reduce(stringReducer, [], R.toPairs(this.props.notes));
  }

  textLabel = (x, y, string, note) => {
    const {notes, classes} = this.props;
    const {fretOfNote, yForFret} = this.state.positioningUtils;
    return (
      <BackedText
        fontSize={this.state.fontSize}
        key={`${string}${fretOfNote(note)}`}
        x={x}
        y={y}
        className={classes.noteLabel}
        style={{
          fontSize: this.state.fontSize,
        }}
      >
        {R.prop('label', note) || fretOfNote(note)}
      </BackedText>
    );
  }

  noteJSX = R.curry((string, note) => {
    const {strings, frets} = this.state;
    const {notes, classes} = this.props;
    const {
      fretOfNote,
      labelPositionForNote
    } = this.state.positioningUtils;
    const x = strings[string],
          y = labelPositionForNote(note);
    console.log(
      string,
      note,
      this.state.positioningUtils.yOfFretOfNote(note),
      this.state.positioningUtils.yOfFretAboveNote(note),
      labelPositionForNote(note)
    );

    const key = R.concat([string], [fretOfNote(note)]);
    const labelJSX = this.props.labelRenderer ?
          this.props.labelRenderer(x, y, string, note):
          this.textLabel(x, y, string, note);
    return this.withKey(
      R.concat([string], [fretOfNote(note)]),
      labelJSX
    );
  })

  withKey = (key, component) => React.cloneElement(component, {
    key: key
  })

  noteCircleJSX = (string, note) => {
    const {strings, frets} = this.state;
    const {notes, classes} = this.props;
    const {yForFret, yOfFretOfNote, labelPositionForNote} = this.state.positioningUtils;
    return (
      <cirle
        xmlns="http://www.w3.org/2000/svg"
        cx={strings[string]}
        cy={labelPositionForNote(note)}
        className={classes.noteCircle}
      />
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

const styles = theme => ({
  root: {
  },
  strings: {
    strokeWidth: STROKE_WIDTH+'rem',
    stroke: "#000",
    fill: "none"
  },
  fret: {
    strokeWidth: STROKE_WIDTH+'rem',
    stroke: "#000",
    fill: "none"
  },
  zeroFret: {
    strokeWidth: `${2*STROKE_WIDTH}rem`,
  },
  background: {
    fill: "#fff"
  },
  noteCircle: {
    r: "0.02rem",
    stroke: "#000",
  },
  noteLabel:{
    fontSize: '0.01',//'rem',
    color: "#000",
  }
});

export default withStyles(styles)(FretBoard);
