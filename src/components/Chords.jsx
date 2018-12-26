import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import classnames from 'classnames';
import FretBoard from './FretBoard.jsx';

class Chords extends React.PureComponent {

  static propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  };

  static defaultProps = {
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
          [{fret:0},],
          [{fret:'X'}],
          [{fret:10}],
          [{fret:2}],
          [{fret:5}],
          [{fret:3}]
        ]
      ]
    };
  }

  render() {
    const {classes} = this.props;
    return (
      <div
        style={this.props.style}
        className={classnames(
          this.props.className,
          classes.root,
        )}
      >
        {this.state.chords.map(
          (notes, i) => (
            <FretBoard
              key={i}
              className={this.props.classes.chord}
              notes={notes}
            />
          )
        )}
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    display: 'flex',
    width: '100%',
    flexWrap: 'wrap',
  },
  chord: {
    width: '60rem'
  }
});

export default withStyles(styles, { withTheme: true })(Chords);

