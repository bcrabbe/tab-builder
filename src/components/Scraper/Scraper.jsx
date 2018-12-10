import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TabDisplay from '../TabDisplay.jsx';
import Parser from './parser.js';

const styles = theme => ({
  root: {
    margin: 20,
    borderStyle: "solid",
    padding: 20
  },
  resultCard :{
    margin: 20,
    borderStyle: "solid",
    padding: 20
  },
  tabDisplay: {
    margin: 20,
    borderStyle: "solid",
    padding: 20
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serverUrl: "http://localhost:8080",
      query: "",
      searchResults: [],
      tab: undefined,
      parser: new Parser(),
      format: false,
    };
  }

  search = query => {
    fetch(this.state.serverUrl+"/search/"+query).then(
      res => res.json()
    ).then(
      res => this.setState({searchResults: res})
    ).catch(err => console.error(err));
  }

  get = url => {
    fetch(this.state.serverUrl+"/get/"+encodeURIComponent(url)).then(
      res => res.json()
    ).then(
      res => {
        this.setState({tab: res});
        console.log(JSON.stringify(res));
        this.state.parser.parse(res.content.text);
      }
    ).catch(err => console.error(err));
  }

  displayLoadButton = url => {
    return (
      <input type="submit"
             onClick={(e) => this.get(url)}
        value="Load it up" />
    );
  }

  displayResultInfo = result => Object.entries(result).map(
    ([field, value]) => (<p key={field}>{field}: {value}</p>)
  )

  resultDisplay = (result, key) => (
    <div
      className={this.props.classes.resultCard}
      key={key}>
      {this.displayResultInfo(result)}
      {this.displayLoadButton(result.url)}
    </div>
  )

  resultsDisplay = (searchResults) => searchResults.map(
    (result, ind) => this.resultDisplay(result, ind)
  )

  tabFormatToggle = _ => (
    <label>
      format
      <input
        type="checkbox"
        onChange={
          e => this.setState(prevState => ({format: !prevState.format}))
        }
      />
    </label>
  )

  tabDisplay = tab => {
    return (
      <div className={this.props.classes.tabDisplay}>
        {this.tabFormatToggle()}
        {this.state.format ?
            this.formattedTabDisplay(tab) :
            this.rawTabDisplay(tab)
        }
      </div>
    );
  }

  formattedTabDisplay = tab => {
    const parsedTab = this.state.parser.parse(tab.content.text);
    console.log(this.state.parser);
    return (
      <TabDisplay tab={parsedTab}/>
    );
  }

  rawTabDisplay = tab => {
    return (
      <div>
        <h3>Raw</h3>
        <pre>{tab.content.text}</pre>
      </div>
    );
  }

  searchControlDisplay = _ => {
    return (
      <React.Fragment>
        <input
          value={this.state.query}
          onInput={(e) => this.setState({query: e.target.value})}
        />
        <input
          type="submit"
          onClick={(e) => this.search(this.state.query)}
          value="Search tab"
        />
      </React.Fragment>
    );
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

  parserTestButton = _ => {
    return (
      <input
        type="submit"
        onClick={this.parserTestButtonOnClick}
        value="hereComestheblues test"
      />
    );
  }

  parserTestButtonOnClick = e => {
    const {testTab} = this.state.parser.test2();
    this.setState({tab:testTab});
  }

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <h3>Scraper</h3>
        <div>
          {
            !this.state.tab ? this.searchControlDisplay() :
              this.backControlDisplay()
          }
        </div>
        <div>
          {
            this.state.tab ? this.tabDisplay(this.state.tab) :
              this.resultsDisplay(this.state.searchResults)
          }
        </div>
        {this.parserTestButton()}
      </div>
    );
  }
}

export default withStyles(styles)(App);
