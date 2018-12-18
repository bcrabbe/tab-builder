import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import classnames from 'classnames';
import { Switch, Route } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';
import {Link} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Typography from '@material-ui/core/Typography';
import Theme from './Theme.jsx';
import PersistentLayout from './PersistentLayout.jsx';
import Page from './Page.jsx';
import FretBoard from './FretBoard.jsx';
import Scales from './Scales.jsx';
import Tabs from './Tabs.jsx';
import NotFound from './NotFound.jsx';
import Home from './Home.jsx';
import Chords from './Chords.jsx';

class App extends React.Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
  }

  static defaultProps = {

  }

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const {classes, className} = this.props;
    //consolelog(this.state.barWidth);
    return (
      <MuiThemeProvider theme={Theme}>
        <CssBaseline />
        <HashRouter>
          <PersistentLayout>
            <Switch>
              <Route path="/scales" render={_ => (
                <Page>
                  <Scales/>
                </Page>
              )}/>
              <Route path="/tabs" render={_ => (
                <Page>
                  <Tabs/>
                </Page>
              )}/>
              <Route path="/chords" render={_ => (
                <Page>
                  <Chords/>
                </Page>
              )}/>
              <Route path="/" render={_ => (
                <Page>
                  <Home/>
                </Page>
              )}/>
              <Route path="/" render={_ => (
                <Page>
                  <NotFound/>
                </Page>
              )}/>
            </Switch>
          </PersistentLayout>
        </HashRouter>
      </MuiThemeProvider>
    );
  }
}

const styles = theme => ({
  tabBar: {
    display:"inline-block"
  },
  page: {
    borderStyle: 'solid',
    margin:"5%",
    padding:"5%",
    display: "inline-block" ,
  },
  chord: {
    width: "20rem",
    margin: 40
  },
  scale: {
    width: "45%"
  }
});

export default withStyles(styles)(App);
