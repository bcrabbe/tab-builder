import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const styles = theme => ({
  root: {
  },
  stroke: {
    stroke: 'white !important',
    strokeWidth: '0.009em !important'
  },

});

class StrokedText extends React.PureComponent {


  static propTypes = {
    text: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
  };

  render() {
    const{text, key, classes} = this.props;
    console.log(text);
    const strokedText = R.assocPath(
      ['props', 'className'],
      classNames(
        R.path(['props', 'className'], text),
        classes.stroke
      ),
      text
    );
    return (
      <React.Fragment
        className={classNames(this.props.className, classes.root)}
        key={key}
        >
        {strokedText}
        {text}
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(StrokedText);
