import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import FretBoard from './FretBoard.jsx';

const getNotes = root => {
  const notes = ['A','Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab'];
  const rootInd = notes.indexOf(root);
  return rotate(rootInd, notes);
};


const rotate = R.curry((rotateBy, list) => {
  const {length} = list;
  return R.addIndex(R.map)(
    (item, index) => list[Math.abs((index + rotateBy) % length)],
    list
  );
});

const getIntervals = scale => R.addIndex(R.map)(
  (n, i) => i===0 ? 0 : n - scale[i-1],
  scale
)
;
const Scalometer = props => {
  const {className, classes, root, tuning, scale} = props;
  const notes = getNotes(root);
  const notesInScale = R.map(
    i => notes[i % notes.length],
    scale
  );
  const intervals = getIntervals(scale);
  const strings = R.addIndex(R.map)(
    (noteAt0, stringIndex) => {
      const offset = notes.indexOf(noteAt0);
      const notesForString = getNotes(noteAt0);
      const fretOfRoot = notesForString.indexOf(root);
      return R.map(
        pos => {
          const fret = (fretOfRoot + pos) % 12;
          return {
            fret,
            label: notesForString[fret]
          };
        },
        scale
      );
    },
    tuning
  );
  return (
    <FretBoard
      notes={strings}
      classes={classes}
      className={classnames(className, classes.root)}
    />
  );
};

const styles = theme => ({
  root: {
  }
});

export default withStyles(styles)(Scalometer);
