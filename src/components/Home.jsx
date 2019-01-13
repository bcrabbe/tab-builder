import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import classnames from 'classnames';
import {NavLink} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

class Home extends React.PureComponent {

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
        {R.map(route => (
          <NavLink
            className={classnames(
              classes.link,
            )}to={`/${route}`}
          >
            <Typography
              className={classes.route}
              variant='h4'
            >
              {route}
            </Typography>
          </NavLink>
        ), ["tabs", "scales", "chords"])
        }
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    width: '100%'
  },
  link: {
    textDecoration: 'none',
  },
  route: {
    marginLeft: theme.spacing.margin*theme.spacing.marginScale,
    marginBottom: theme.spacing.margin*theme.spacing.marginScale,
    marginTop: theme.spacing.margin*theme.spacing.marginScale
  }
});

export default withStyles(styles, {withTheme: true})(Home);
