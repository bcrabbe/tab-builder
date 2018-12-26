import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { withStyles } from '@material-ui/core/styles';
import BackedText from './BackedText.jsx';
import classnames from 'classnames';

const STROKE_WIDTH = 0.0004;

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
    classes: PropTypes.object.isRequired,
    notes: PropTypes.array.isRequired,
    className: PropTypes.string,
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
    this.state.fretSpacing = this.state.frets[1] - this.state.frets[0];
    const positioningUtils = this.positioningUtils();
    this.state = {
      ...this.state,
      positioningUtils,
    };
    this.state = {
      ...this.state,
      fontSize: 0.66 * this.state.fretSpacing
    };
  }

  positioningUtils = _ => {
    const {min} = this.state.fretsToDisplay;
    const yForFret = R.flip(R.nth)(this.state.frets);
    const fretSpacing = this.state.fretSpacing;
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
      R.pipe(yOfFretOfNote, R.flip(R.subtract)(fretSpacing * 0.3)),
      R.compose(yForFret, R.dec, fretOfNote)
    );
    const labelPositionForNote = R.ifElse(
      R.pipe(fretOfNote, R.equals(0)),
      n => yOfFretAboveNote(n) + STROKE_WIDTH +
        (yOfFretOfNote(n) - yOfFretAboveNote(n)) / 2,
      n => yOfFretAboveNote(n) +
        (yOfFretOfNote(n) - yOfFretAboveNote(n)) / 2
    );
    return {
      yForFret,
      fretOfNote,
      yOfFretOfNote,
      yOfFretAboveNote,
      labelPositionForNote
    };
  }

  strings = _ => {
    const {X, padding, numberOfStrings} = this.state;
    const widthFretboard = X - padding.left - padding.right;
    const x_s = s => padding.left + s * (widthFretboard/(numberOfStrings-1));
    return R.map(x_s, R.range(0, numberOfStrings));
  }

  findFretsInNotes = _ => {
    const {notes} = this.props;
    const initAcc = {
      min: 24,
      max: 0
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
    return {
      min: min <= 2 ? 0 : min - 2,
      max: max + 1
    };
  }

  fretPositions = _ => {
    const {Y, padding, fretsToDisplay} = this.state;
    const heightFretboard = Y - padding.top - padding.bottom;
    const numberOfFrets = fretsToDisplay.max - fretsToDisplay.min + 1;
    const yForFret = f => padding.top +
          (f-fretsToDisplay.min) *
          (heightFretboard/(numberOfFrets-1));
    return R.map(yForFret, R.range(0, fretsToDisplay.max+1));
  }

  stringsJSX = _ => {
    const {fretsToDisplay:{min, max}, fretSpacing} = this.state;
//    const lineWidth =  (STROKE_WIDTH * this.state.fontSize) * 600;
    const stringJSX = string => (
      <line
        y2={this.state.frets[min] - (fretSpacing/8)}
        y1={this.state.frets[max] + (fretSpacing/8)}
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
        y1={this.state.frets[fret]}
        y2={this.state.frets[fret]}
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
    const stringReducer = (acc, [string, notes]) => R.concat(
      acc,
      R.map(this.noteJSX(string), notes),
    );
    return R.reduce(stringReducer, [], R.toPairs(this.props.notes));
  }

  textLabel = (x, y, string, note) => {
    const {classes} = this.props;
    const {positioningUtils:{fretOfNote}, fontSize} = this.state;
    return (
      <BackedText
        fontSize={fontSize}
        key={`${string}${fretOfNote(note)}`}
        x={x}
        y={y}
        backgroundColor={this.props.theme.palette.page}
        className={classes.noteLabel}
        style={{
          fontSize: fontSize,
        }}
      >
        {R.prop('label', note) || fretOfNote(note)}
      </BackedText>
    );
  }

  noteJSX = R.curry((string, note) => {
    const {
      strings,
      positioningUtils:{fretOfNote, labelPositionForNote}
    } = this.state;
    const x = strings[string],
          y = labelPositionForNote(note);
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
    const {strings} = this.state;
    const {classes} = this.props;
    const {labelPositionForNote} = this.state.positioningUtils;
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
    const {X, Y} = this.state;
    const canvasCoords = {
      x: 0,
      y: 0,
      width: X,
      height: Y
    };
    return (
      <svg
        className={classnames(this.props.className, classes.root)}
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
    strokeWidth: STROKE_WIDTH + 'rem',
    stroke: "#000",
    fill: "none"
  },
  fret: {
    strokeWidth: STROKE_WIDTH + 'rem',
    stroke: "#000",
    fill: "none"
  },
  zeroFret: {
    strokeWidth: `${2 * STROKE_WIDTH}rem`,
  },
  background: {
    fill: "rgba(0,0,0,0)"
  },
  noteCircle: {
    r: "0.02rem",
    stroke: "#000",
  },
  noteLabel: {
    fontSize: '0.01',//'rem',
    color: "#000",
  }
});

export default withStyles(styles, {withTheme:true})(FretBoard);
