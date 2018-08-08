import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ugs from 'ultimate-guitar-scraper';

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
    };
    this.display();
  }

  search = (query) => {
    fetch(this.state.serverUrl+"/search/"+query).then(
      res => res.json()
    ).then(
      res => this.setState({searchResults: res})
    ).catch(err => console.error(err));
  }

  get = (url) => {
    fetch(this.state.serverUrl+"/get/"+encodeURIComponent(url)).then(
      res => res.json()
    ).then(
      res => {
        this.setState({tab: res});
        console.log(res);
      }
    ).catch(err => console.error(err));
  }

  display = function(result, key) {
    this.hello = "display";
    console.log(this);
  }

  displayLoadButton = (url) => {
    return (
      <input type="submit"
             onClick={(e) => this.get(url)}
        value="Search tab" />
    );
  }

  displayResultInfo = (result) => Object.entries(result).map(
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

  tabDisplay = (tab)  => {
    return (
      <pre>{tab.content.text}</pre>
    );
  }

  searchControlDisplay = () => {
    return (
      <React.Fragment>
        <input value={this.state.query}
               onInput={(e) => this.setState({query: e.target.value})} />
          <input type="submit"
                 onClick={(e) => this.search(this.state.query)}
            value="Search tab" />
      </React.Fragment>
    );
  }

  backControlDisplay = () => {
    return (
      <input type="submit"
             onClick={(e) => this.setState({tab:undefined})}
        value="back to results" />
    );
  }
  
  render() {
    const {classes} = this.props;
    console.log(this.state.tab);
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
      </div>
    );
  }
}

export default withStyles(styles)(App);
