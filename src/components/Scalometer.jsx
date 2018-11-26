import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import FretBoard from './FretBoard.jsx';

const getNotes = root => {
  const notes = ['A','Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab'];
  const rootInd = notes.indexOf(root);
  return rotate(rootInd, notes);
};


const rotate = R.curry((rotateBy, list) => {
  const {length} = list;
  return R.addIndex(R.map)(
    (item, index) => list[Math.abs((index+rotateBy)%length)],
    list
  );
});

const getIntervals = scale => R.addIndex(R.map)(
  (n, i) => i===0 ? 0 : n - scale[i-1],
  scale
);

const Scalometer = (props) => {
  const {classes, root, tuning, scale} = props;
  console.log(props);
  const notes = getNotes(root);
//  console.log(notes);
  const notesInScale = R.map(
    i => notes[i%notes.length],
    scale
  );
//  console.log(notesInScale);
  const intervals = getIntervals(scale);
  const strings = R.addIndex(R.map)(
    (noteAt0, stringIndex) => {
      const offset = notes.indexOf(noteAt0);
      const notesForString = getNotes(noteAt0);
      console.log(notesForString);
      const fretOfRoot = notesForString.indexOf(root);
      return R.map(
        pos => ({fret: ((fretOfRoot + pos)%12)}),
        scale
      );
    },
    tuning
  );
  return (
    <FretBoard
      labelRenderer={
        (x, y, string, note) => (
          <cirle
            xmlns="http://www.w3.org/2000/svg"
            cx={x}
            cy={y}
            r={0.1}
            className={classes.noteCircle}
          />
        )
      }
      notes={strings}
    />
  );
};

const styles = theme => ({
  root: {
  },
  noteCircle: {
    backgroundColor: 'black',
    border: '1px solid black'

  }
});

export default withStyles(styles)(Scalometer);
