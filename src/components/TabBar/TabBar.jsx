import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
//x = scale*y
const scale = 2;
let width = 7;
const styles = theme => ({
  root: {
    width: `${scale*width}rem`,
    display:"inline-block"
  }
});

class TabBar extends Component {


  constructor(props) {
    super(props);
    this.state = {
      stringPositions: this.initStrings(0.1),
      hoveredString: undefined
    };
    this.rootElem = React.createRef();
    this.svgRef = React.createRef();
    //consolelog(this.state.stringPositions);
    this.onClick = this.onClick.bind(this);
    this.onHover = this.onHover.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
  }

  initStrings = (padding) => {
    const string = new Array();
    string[5] = {
      x1: 0,
      x2: 1,
      y:  padding
    };
    for(let s=0; s<6; ++s) {
      //consolelog(s);
      string[s] = {
        x1: 0,
        x2: 1,
        y: string[5].y + s*((1-2*padding)/5)
      };
    }
    return string;
  }

  onClick(evt){
    this.props.onClick(this.props.barNumber,
                       this.nearestStringToMouse(evt),
                       this.xPositionOfEvt(evt));
  }

  onHover(evt){
    const string = this.nearestStringToMouse(evt);
    if(this.state.hoveredString!==string) {
      this.setState({
        hoveredString: string
      });
    }
  }

  xPositionOfEvt = (evt) => {
    var e = evt.target;
    var dim = this.svgRef.current.getBoundingClientRect();
    return (evt.clientX - dim.left)/this.svgRef.current.clientWidth;
  }

  nearestStringToMouse = (evt) => {
    var e = evt.target;
    var dim = this.svgRef.current.getBoundingClientRect();
    var x = (evt.clientX - dim.left)/this.svgRef.current.clientWidth;
    var y = (evt.clientY - dim.top)/this.svgRef.current.clientHeight;
    // console.log(this.props.barNumber);
    //    console.log("x: "+x+" y:"+y);
    return this.stringClosestToY(y);
  }

  stringClosestToY = (y) => {
    const strings = this.state.stringPositions;
    if (y<strings[0].y){
      return 0;
    }
    for(let s=0; s<5; ++s) {
      const sY = strings[s].y;
      const s1Y = strings[s+1].y;
      if (y>sY && !(y>s1Y)){
        const topOrBot = this.closestBetweenTwo(y,sY,s1Y);
        return s+topOrBot;
      }
    }
    return 5;
  }

  closestBetweenTwo = (y, sY, s1Y) => {
    const midPoint = sY + ((s1Y-sY)/2);
    if (y>midPoint){
      return 1;
    } else {
      return 0;
    }
  }

  mouseLeave(){
    this.setState({hoveredString:undefined});
  }

  render() {
    const {classes} = this.props;

    return (
      <div className={this.props.className || classes.root}
           ref={this.rootElem}
           style={this.props.style}>
        <svg
          onClick={this.onClick}
          onMouseOver={this.onHover}
          onMouseMove={this.onHover}
          onMouseLeave={this.mouseLeave}
          ref={this.svgRef}
          viewBox={`0 0 1 1`} xmlns="http://www.w3.org/2000/svg">
          <g>
            <title>background</title>
            <rect fill="#fff" id="canvas_background"
                  height="100%" width="100%" y="0" x="0"/>
            <g display="none" overflow="visible" y="0" x="0"
               height="100%" width="100%" id="canvasGrid">
              <rect fill="url(#gridpattern)" strokeWidth="0"
                    y="0" x="0" height="100%" width="100%"/>
            </g>
          </g>
          <g id="fretBoardSvg">
            <title>strings</title>
            {

              this.state.stringPositions.map(
                (string, number) =>
                  <line
                      key={`str${number}`} y2={string.y} y1={string.y}
                      x1={string.x1} x2={string.x2}
                      strokeWidth="0.01"
                      stroke={
                        this.state.hoveredString===number ? '#F66' : '#000'
                      }
                      fill="non"/>)
            }
        <line y2={this.state.stringPositions[0].y}
              y1={this.state.stringPositions[5].y}
              x1={1} x2={1} strokeWidth="0.01" stroke="#333" fill="non"/>
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
