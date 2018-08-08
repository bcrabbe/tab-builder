import React, { Component } from 'react';
import logo from './logo.svg';
import TabBar from '../TabBar/TabBar.jsx';
import Scraper from '../Scraper/Scraper.jsx';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/lab/Slider';


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
    padding:"5%",
    display: "inline-block" ,
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bars: [0,1,2,3,4,5,6,7],
      barWidth: 15
    };

    console.log(this);
  }

  barClicked = (bar, string, xPos) => {
    console.log(bar, string, xPos);

  }

  changeWidth = (e, value) => {
    this.setState({barWidth: value});
  }

  slider = () => {
    return (
      <Slider
        style={{
          width: '10rem'
        }}
        value={this.state.barWidth}
        aria-labelledby="label"
        onChange={this.changeWidth} />
    );
  }


  render() {
    const {classes} = this.props;
    console.log(this.state.barWidth);
    return (
      <div>
        <header>
          <h1>tab-builder</h1>
        </header>
        <Scraper/>
        <div className={classes.page}>
          <div>
            {this.slider()}
          </div>
          {
            this.state.bars.map(
              (bar, i) => (<TabBar
                              onClick={this.barClicked}
                              barNumber={i}
                              style={{
                                width: this.state.barWidth
                              }}
                              width={this.state.barWidth}
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
