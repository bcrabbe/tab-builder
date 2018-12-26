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
    console.log(this.props.theme);
    return (
      <div className={classes.root}>
        <AppBar color= 'primary' postition='static' className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
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
    backgroundColor: theme.palette.background.dark
  },
  toolbarSpacer: theme.mixins.toolbar,
  content: {
    width: '100%',
    backgroundColor: theme.palette.background.light,
    minHeight: '100vh',
    height: '100%'
  },
  subHeading: {
    color: theme.palette.primary.contrastText,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    textDecoration: 'none',
    paddingBottom: theme.spacing.padding * theme.spacing.paddingScale * 2,
    paddingTop: theme.spacing.padding * theme.spacing.paddingScale * 2,
  },
  appBar: {
    backgroundColor: theme.palette.primary.dark,
    boxShadow: 'none',
    overflowY: 'visible',
    height: 'calc(6%)'

  },
  toolbar: {
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    height: 'auto',
    justifyContent: 'space-between',
    margin: 'auto',
    borderLeft: `${theme.genericBorder()}`,
    borderRight: `${theme.genericBorder()}`,
    borderBottom: `${theme.genericBorder()}`,
    boxShadow: theme.shadows[theme.defaultShadow],
    width: theme.spacing.pageWidth,
  }
});

export default withStyles(styles, { withTheme: true })(PersistentLayout);
