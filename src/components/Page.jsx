import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import classNames from 'classnames';

class Page extends React.PureComponent {

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
        className={classNames(
          this.props.className,
          classes.root,
        )}
      >
        {this.props.children}
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    width: '82.5vw',
    height: '100%',
    border: '1px solid #000',
    margin: 'auto'
  }
});

export default withStyles(styles, { withTheme: true })(Page);
