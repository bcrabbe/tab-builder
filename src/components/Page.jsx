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
    width: theme.spacing.pageWidth,
    marginTop: theme.spacing.pageMarginTop,
    marginTBottom: theme.spacing.pageMarginBottom,
    backgroundColor: theme.palette.page,
    height: '100%',
    border: '1px solid #000',
    boxShadow: theme.shadows[theme.defaultShadow],
    margin: 'auto'
  }
});

export default withStyles(styles, { withTheme: true })(Page);
