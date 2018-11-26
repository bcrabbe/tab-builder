import React, { Component } from 'react';
import TabBar from './TabBar.jsx';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/lab/Slider';

class TabDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      barWidth: 15
    };
    console.log(props);
  }

  changeWidth = (e, value) => {
    this.setState({barWidth: value});
  }

  sizeSlider = _ => {
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
    //consolelog(this.state.barWidth);
    return (
      <div>
          <div>
            {this.sizeSlider()}
          </div>
          {
            this.props.tab.map(
              (bar, i) => (
                <TabBar
                  barNumber={i}
                  style={{
                    width: this.state.barWidth +"rem"
                  }}
                  width={this.state.barWidth}
                  bar={bar}
                  key={i}/>)
            )
          }
      </div>
    );
  }
}

const styles = theme => ({
  page: {
    maxWidth: `${4*15}rem`,
    borderStyle: 'solid',
    margin:"5%",
    padding:"5%",
    display: "inline-block" ,
  }
});

export default withStyles(styles)(TabDisplay);
