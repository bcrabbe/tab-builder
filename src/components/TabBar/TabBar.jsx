import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

const scale = 0.5;

const styles = theme => ({

});

class TabBar extends Component {


  constructor(props) {
    super(props);
    this.state = {
      stringPositions: this.initStrings(0.1)
    };

    console.log(this.state.stringPositions);
    console.log(this);
  }

  initStrings = (padding) => {
    const string = new Array();
    string[5] = {
      x1: 0,
      x2: 1,
      y:  padding
    };
    for(let s=0; s<6; ++s) {
      console.log(s);
      string[s] = {
        x1: 0,
        x2: 1,
        y: string[5].y + s*((1-2*padding)/5)
      };
    }
    return string;
  }

  render() {
    const {classes} = this.props;
    const width = 15;
    return (
      <div style={{
             width: `${width}rem`,
             height:  `${scale*width}rem`,
             display:"inline-block"

           }}>
        <svg viewBox="0 0 1 1" xmlns="http://www.w3.org/2000/svg">
          <g>
            <title>background</title>
            <rect fill="#fff" id="canvas_background" height="100%" width="100%" y="0" x="0"/>
            <g display="none" overflow="visible" y="0" x="0" height="100%" width="100%" id="canvasGrid">
              <rect fill="url(#gridpattern)" strokeWidth="0" y="0" x="0" height="100%" width="100%"/>2
            </g>
          </g>
          <g id="fretBoardSvg">
            <title>strings</title>
            {
              this.state.stringPositions.map((string, number) => {
                return (<line key={`str${number}`} y2={string.y} y1={string.y}
                                x1={string.x1} x2={string.x2}
                                strokeWidth="0.01" stroke="#333" fill="non"/>);
              })
            }
        <line y2={this.state.stringPositions[0].y} y1={this.state.stringPositions[5].y}
      x1={1} x2={1}
      strokeWidth="0.01" stroke="#333" fill="non"/>
          </g>
        </svg>
      </div>
    );
  }
}

TabBar.defaultProps = {
  lineWidth:1
}

export default  withStyles(styles)(TabBar);
