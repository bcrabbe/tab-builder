import React, { Component } from 'react';
import * as R from 'ramda';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Typography } from '@material-ui/core';
import Search from './Search.jsx';
import Results from './Results.jsx';
import Tab from './Tab.jsx';
import Parser from './parser.js';
import testTab from './testRaw.json';

class Scraper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serverUrl: "http://localhost:8080",
      query: "",
      searchResults: [],
      tab: undefined,
      pastedTab: testTab.content.text
    };
  }

  get = url => {
    fetch(
      `${this.state.serverUrl}/get/${encodeURIComponent(url)}`
    ).then(
      res => res.json()
    ).then(
      res => {
        this.setState({tab: res});
        console.log(JSON.stringify(res));
        this.state.parser.parse(res.content.text);
      }
    ).catch(err => console.warn(err));
  }

  backControlDisplay = _ => {
    return (
      <input
        type="submit"
        onClick={(e) => this.setState({tab:undefined})}
        value="back to results"
      />
    );
  }

  updateState = R.curry((path, value) => this.setState(
    R.assocPath(path, value)
  ))

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <Typography
          variant={this.props.theme.typography.pageTitleVariant}
        >
          Tabs
        </Typography>
        { !this.state.tab ? (
          <React.Fragment>
            {/* <Search */}
            {/*   updateResults={this.updateState(['searchResults'])} */}
            {/* /> */}
            {/* <Results */}
            {/*   get={this.get} */}
            {/*   results={this.state.searchResults} */}
            {/* /> */}
              <TextField
                  label="paste here"
                  value={this.state.pastedTab}
                  multiline
                  onChange={e => this.updateState(['pastedTab'], e.target.value)}
              />
              <input
                  type="submit"
                  onClick={(e) => this.setState(({ pastedTab }) => ({tab: { content: { text: pastedTab }}}))}
                  value="parse"
              />
          </React.Fragment>
        ) : (
          <Tab
            tab={this.state.tab}
          />
        )}
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    margin: theme.spacing.margin,
    padding: theme.spacing.padding,
  },

  tabDisplay: {
  }
});

export default withStyles(styles, {withTheme: true})(Scraper);
