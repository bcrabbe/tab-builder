import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import classnames from 'classnames';
import Scalometer from './Scalometer.jsx';

class Scales extends React.PureComponent {

  static propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  };

  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.state = {
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
        <Scalometer
          className={classes.scale}
          root='E'
          scale={[0, 3, 5, 6, 7, 10]}
          tuning="EADGBE"
        />
        <Scalometer
          className={classes.scale}
          root='D'
          scale={[0, 3, 5, 6, 7, 10]}
          tuning="DADFAD"
        />
        <Scalometer
          className={classes.scale}
          root='G'
          scale={[0, 3, 5, 6, 7, 10]}
          tuning="DGDGBD"
        />
        <Scalometer
          className={classes.scale}
          root='G'
          scale={[0, 3, 5, 6, 7, 10]}
          tuning="EADGBE"
        />
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    width: '100%',
  }
});

export default withStyles(styles, {withTheme: true})(Scales);
