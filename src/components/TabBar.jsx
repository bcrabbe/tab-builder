import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import * as R from 'ramda';
const scale = 5;
let width = 7;

class TabBar extends Component {

  static defaultProps = {
    lineWidth: 1
  }

  constructor(props) {
    super(props);
    this.state = {
      stringPositions: this.initStrings(0.1),
      hoveredString: undefined
    };
    this.rootElem = React.createRef();
    this.svgRef = React.createRef();
    this.onClick = this.onClick.bind(this);
    this.onHover = this.onHover.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
  }

  initStrings = padding => {
    return R.map(
      s => ({
        x1: 0,
        x2: 1,
        y: padding + s * ((1 - 2 * padding) / 5)
      }),
      R.range(0, 6)
    );
  }

  onClick = evt => this.props.onClick(
    this.props.barNumber,
    this.nearestStringToMouse(evt),
    this.xPositionOfEvt(evt)
  )

  onHover = evt => {
    const string = this.nearestStringToMouse(evt);
    if(this.state.hoveredString!==string) {
      this.setState({
        hoveredString: string
      });
    }
  }

  xPositionOfEvt = evt => {
    const {left} = this.svgRef.current.getBoundingClientRect();
    return (evt.clientX - left)/this.svgRef.current.clientWidth;
  }

  nearestStringToMouse = evt => {
    const {// left,
         top} = this.svgRef.current.getBoundingClientRect();
//    var x = (evt.clientX - left)/this.svgRef.current.clientWidth;
    const y = (evt.clientY - top)/this.svgRef.current.clientHeight;
    return this.stringClosestToY(y);
  }

  stringClosestToY = y => {
    const strings = this.state.stringPositions;
    if(y < strings[0].y){
      return 0;
    }
    for(let s = 0; s < 5; ++s) {
      const sY = strings[s].y;
      const s1Y = strings[s+1].y;
      if (y > sY && !(y > s1Y)){
        const topOrBot = this.closestBetweenTwo(y, sY, s1Y);
        return s+topOrBot;
      }
    }
    return 5;
  }

  closestBetweenTwo = (y, sY, s1Y) => {
    const midPoint = sY + ((s1Y - sY) / 2);
    if (y > midPoint){
      return 1;
    } else {
      return 0;
    }
  }

  mouseLeave(){
    this.setState({hoveredString:undefined});
  }

  text = (text, x, y, size) => (
    <React.Fragment>
      <text
        fontSize={size}
        textAnchor="start"
        x={x} y={y}
        style={{
          stroke: "white",
          strokeWidth: "0.3em"
        }}
      >
        {text}
      </text>
      <text
        fontSize={size}
        textAnchor="start"
        x={x} y={y}
        style={{
          fill: "black"
        }}
      >
        {text}
      </text>
    </React.Fragment>
  )

  notesDisplay = _ => {
    const{bar} = this.props;
    const notesForString = (notes, strNum) => R.map(this.noteJSX(strNum), notes);
    const notesJSX = R.addIndex(R.map)(notesForString, bar);
    return notesJSX;
  }

  noteJSX = string => ({note, x}) => {
    const height = 0.07;
    //      const width = note.length * 0.7 * height;
    return this.text(
      note,
      x,
      this.state.stringPositions[string].y + height/3,
      height
    );
  }

  render() {
    const {classes} = this.props;
    return (
      <div
        className={this.props.className || classes.root}
        ref={this.rootElem}
        style={this.props.style}
      >
        <svg
          onClick={this.onClick}
          onMouseOver={this.onHover}
          onMouseMove={this.onHover}
          onMouseLeave={this.mouseLeave}
          ref={this.svgRef}
          viewBox={`0 0 1 1`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <title>background</title>
            <rect
              fillOpacity="0"
              id="canvas_background"
              width="100%" height="100%"
              x="0" y="0"
            />
            <g
              display="none"
              overflow="visible"
              x="0" y="0"
              width="100%" height="100%"
              id="canvasGrid"
            >
              <rect
                fill="url(#gridpattern)"
                strokeWidth="0"
                x="0" y="0"
                width="100%" height="100%"
              />
            </g>
          </g>
          <g id="fretBoardSvg">
            <title>strings</title>
            {this.state.stringPositions.map(
              (string, number) => (
                <line
                  key={`str${number}`}
                  x1={string.x1} x2={string.x2}
                  y2={string.y} y1={string.y}
                  strokeWidth="0.01"
                  stroke={
                    this.state.hoveredString===number ? '#F66' : '#000'
                  }
                  fill="non"
                />
              )
            )}
            <line
              y1={this.state.stringPositions[5].y}
              y2={this.state.stringPositions[0].y}
              x1={1} x2={1}
              strokeWidth="0.01"
              stroke="#333"
              fill="non"
            />
          </g>
          <g>
            <title>notes</title>
            {this.notesDisplay()}
          </g>
        </svg>
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    width: `${scale*width}rem`,
    display:"inline-block"
  }
});

export default  withStyles(styles)(TabBar);
