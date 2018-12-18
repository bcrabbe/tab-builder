import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {Link} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
//import classNames from 'classnames';
//import * as R from 'ramda';

class PersistentLayout extends React.Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    menus: PropTypes.array
  }

  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
      username: null
    };
  }

  render() {
    const {classes} = this.props;
    console.log(this.props.children);
    return (
      <div className={classes.root}>
        <AppBar color= 'primary' postition='static' className={classes.appBar}>
          <Toolbar className={classes.flexContainer}>
            <Link to='/'>
              <Typography
                variant='h4'
                className={classes.subHeading}
              >
                {"< tab-builder >"}
              </Typography>
            </Link>
          </Toolbar>
        </AppBar>
        <main className={classes.content}>
          <div className={classes.toolbarSpacer}/>
          {this.props.children}
        </main>
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
    zIndex: 1,
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  toolbarSpacer: theme.mixins.toolbar,
  content: {
    width: '100%',
    backgroundColor: theme.palette.secondary.dark,
    minHeight: '100vh',
    height: '100%'
  },
  subHeading: {
    color: theme.palette.secondary.light,
    marginLeft: 3*theme.spacing.margin,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    textDecoration: 'none'
  },
  flexContainer: {
    display: 'flex',
    justifyContent: 'space-between'

  }
});

export default withStyles(styles, { withTheme: true })(PersistentLayout);
