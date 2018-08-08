import React, { Component } from 'react';
import logo from './logo.svg';
import TabBar from '../TabBar/TabBar.jsx';
import Scraper from '../Scraper/Scraper.jsx';
import { withStyles } from '@material-ui/core/styles';

const barWidth = 15;
const styles = theme => ({
  tabBar: {
    width: `${barWidth}rem`,
    display:"inline-block"
  },
  page: {
    maxWidth: `${4*barWidth}rem`,
    borderStyle: 'solid',
    margin:"5%",
    padding:"5%"
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bars: [0,1,2,3,4,5,6,7]
    };

    console.log(this);
  }

  barClicked = (bar, string, xPos) => {
    console.log(bar, string, xPos);

  }

  render() {
    const {classes} = this.props;

    return (
      <div>
        <header>
          <h1>tab-builder</h1>
        </header>
        <Scraper/>
        <div className={classes.page}>
          {
            this.state.bars.map(
              (bar, i) => (<TabBar
                              onClick={this.barClicked}
                              barNumber={i}
                              bar={this.state.bars[i]}
                              key={i}/>)
            )
          }
      </div>
        </div>
    );
  }
}

export default withStyles(styles)(App);
