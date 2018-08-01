import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TabBar from '../TabBar/TabBar.jsx';
import { withStyles } from '@material-ui/core/styles';

const barWidth = 15;
const styles = theme => ({

  tabBar: {
    width: `${barWidth}rem`,
  },
  page: {
    width: `${4*barWidth}rem`
  }
});
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: [0,1,2,3,4,5,6,7]
    };

    console.log(this);
  }

  render() {
    const {classes} = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {console.log(this.props.classes)}
        <div style={{
               width: `${4*barWidth}rem`,
               height: "100%"
             }} className={this.props.classes.page}>
          {this.state.tab.map((bar) => (<TabBar className={classes.tabBar}/>))}
      </div>
        </div>
    );
  }
}

export default withStyles(styles)(App);
