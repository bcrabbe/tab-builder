import React from 'react';
//import PropTypes from 'prop-types';
import * as R from 'ramda';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import FretBoard from './FretBoard.jsx';

const getNotes = root => {
  const notes = ['A','Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab'];
  const rootInd = notes.indexOf(root);
  return rotate(rootInd, notes);
};

const rotate = (rotateBy, list) => {
  const {length} = list;
  return R.addIndex(R.map)(
    (item, index) => list[Math.abs((index + rotateBy) % length)],
    list
  );
};

const Scalometer = props => {
  const {className, classes, root, tuning, scale} = props;
  const strings = R.addIndex(R.map) (
    (noteAt0, stringIndex) => {
      const notesForString = getNotes(noteAt0);
      const fretOfRoot = notesForString.indexOf(root);
      console.log("string",  stringIndex);
      return R.reduce(
        (acc, pos) => {
          const fret = (fretOfRoot + pos) % 12;
          console.log(pos, fret, notesForString[fret]);
          let labels = [{
            fret,
            label: notesForString[fret % 12]
          }];
          if(fret === 0) {
            labels = R.append({
              fret: 12,
              label: notesForString[fret % 12]
            }, labels);
          }
          return R.concat(labels, acc);
        },
        [],
        scale
      );
    },
    tuning
  );
  console.log(strings);
  return (
    <FretBoard
      className={classnames(className, classes.root)}
      classes={classes}
      notes={strings}
    />
  );
};

const styles = theme => ({
  root: {
  }
});

export default withStyles(styles)(Scalometer);
