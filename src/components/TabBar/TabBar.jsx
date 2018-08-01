import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    display: 'block',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  divider: {
    margin: '10px',
  },
  textField: {
    flexGrow:1,
    margin: '20px',

  }});

class TabBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      stringPositions: this.initStrings(0.1)
    };
    debugger;
  }

  initStrings = (padding) => {
    const string = new Array();
    string[6] = {
      x1: 0,
      x2: 1,
      y:  padding
    };
    for(let s=5; s>0; --s) {
      console.log(s);
      const i = 6-s;
      string[s] = {
        x1: 0,
        x2: 1,
        y: string[6].y + i*((1-2*padding)/5)
      };
    }
    return string;
  }

  render() {
    return (
      <div className="TabBar">
        <svg viewBox="0 0 200 350" xmlns="http://www.w3.org/2000/svg">
          <g>
            <title>background</title>
            <rect fill="#fff" id="canvas_background" height="100%" width="100%" y="-1" x="-1"/>
            <g display="none" overflow="visible" y="0" x="0" height="100%" width="100%" id="canvasGrid">
              <rect fill="url(#gridpattern)" strokeWidth="0" y="0" x="0" height="100%" width="100%"/>2
            </g>
          </g>
          <g id="fretBoardSvg">
            <title>strings</title>
            {
              this.state.stringPositions.map((string, number) => {
                if(number>0){
                    <line id={`str${number}`} y2={string[number.y]} y1={string[number.y]}
                            x1={string[number.x1]} x2={string[number.x2]}
                            strokeWidth="0.5%" stroke="#000" fill="non"/>
                      }
              })
            }

            <title> horizontal</title>
            <line id="fret0"
                  y2$="[[_topFretY]]" y1$="[[_topFretY]]"
                  x2$="[[_leftStringX]]" x1$="[[_rightStringX]]"
                  strokeWidth="0.5%" stroke="#000" fill="none"/>
            <line id="bottomFret"
                  y2$="[[_bottomFretY]]" y1$="[[_bottomFretY]]"
                  x2$="[[_leftStringX]]" x1$="[[_rightStringX]]"
                  strokeWidth="0.5%" stroke="#000" fill="none"/>
          </g>
        </svg>
      </div>
    );
  }
}

TabBar.defaultProps = {
  lineWidth:1
}

export default  withStyles(styles, { withTheme: true })(TabBar);
