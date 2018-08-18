import React, { Component } from 'react';

const styles = theme => ({

});

class FretBoard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      minFret: 24,
      maxFret: 1,
    };

  }

  componentDidMount() {

  }

  drawChord = (chord) => {q
    for(var string in chord) {
      if(chord.hasOwnProperty(string)) {
        chord[string].forEach(note => {
          var fret = note.fret;
          if(fret==="X") {
            this.markStringNotPlayed(string);
          } else {
            this.drawNote(string, fret, note.label);
          }
        });
      }
    }
  }

  drawNote(string, fret, label){
    var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    var cx = parseFloat(this.$[string].getAttribute('x1'))+"%";
    circle.setAttribute('cx', cx);
    var cy;
    if(fret===0) {
      cy = parseFloat(this.$.fret0.getAttribute('y1')) - 3 + '%'
    } else {
      var fretAbove = this.shadowRoot.querySelector("#fret"+(fret-1));
      var fretBelow = this.shadowRoot.querySelector("#fret"+(fret));
      cy = (parseFloat(fretAbove.getAttribute('y1')) +
            (parseFloat(fretBelow.getAttribute('y1')) -
             parseFloat(fretAbove.getAttribute('y1')))/2) + "%";
    }
    circle.setAttribute('cy', cy);
    circle.setAttribute('stroke', '#000');
    circle.setAttribute('stroke-width', "0.5%");
    circle.setAttribute('fill', '#fff');
    circle.setAttribute('r', "3.5%");
    //circle.setAttribute('fill-opacity', "0");
    this.$.fretBoardSvg.appendChild(circle);
    if(label){
      this._drawLabel(label, cx, cy);
    }
  }

  _drawLabel(label, cx, cy) {
    var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    if(label.length===1) {
      text.setAttribute('x', parseFloat(cx) - 2 + "%");
    } else if(label.length===2) {
      text.setAttribute('x', parseFloat(cx) - 4 + "%");
    }
    text.setAttribute('y', parseFloat(cy) + 1.3 + "%");
    text.setAttribute('fill', '#000');
    text.setAttribute('font-size',"95%");
    text.textContent = label;
    this.$.fretBoardSvg.appendChild(text);
  }

  markStringNotPlayed(string) {
    var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', parseFloat(this.$[string].getAttribute('x1')) -
                      1.4 + '%');
    text.setAttribute('y', parseFloat(this.$.fret0.getAttribute('y1')) -
                      3 + '%');//adjust for width of text
      text.setAttribute('fill', '#000');
    text.textContent = "X";
    this.$.fretBoardSvg.appendChild(text);
  }

  drawFretBoard() {
    const {minFret, maxFret} = this.findNumberOfFrets(this.props.chord);
    this.minFret = minFret;
    this.maxFret = maxFret;
    this.setStringsX(minFret, maxFret);
    if(minFret<=2) {
      this._drawZeroFret();
    } else {
      --minFret;
      --minFret;
      this._labelFretNumber(minFret+2,
                            ((2/(maxFret-minFret+1)) *
                             (parseFloat(this._bottomFretY)-parseFloat(this._topFretY))+
                             parseFloat(this._topFretY) + '%'));
    }
    for(var fret=minFret+1; fret<=maxFret; ++fret) {
      var newFret = this.$.bottomFret.cloneNode(false);
      newFret.setAttribute("id", "fret"+fret);
      var yPos = ((fret-minFret)/(maxFret-minFret+1)) *
          (parseFloat(this._bottomFretY)-parseFloat(this._topFretY))+
          parseFloat(this._topFretY) + '%';
      newFret.setAttribute("y1", yPos);
      newFret.setAttribute("y2", yPos);
      this.$.fretBoardSvg.insertBefore(newFret, this.$.bottomFret);
      if([5,7,9,12].includes(fret)){
        this._labelFretNumber(fret, yPos);
      }
    }
  }

  setStringsX(minFret, maxFret) {
    if(maxFret >= 11 && minFret <= 12) {
      this.setState({leftStringX: "15%"});
      this.setState({rightStringX: "85%"});
    } else {
      this.setState({leftStringX: "10%"});
      this.setState({rightStringX: "90%"});
    }
    for(let stringNum=5; stringNum>1; --stringNum) {
      var xPos = this.computeStringPosX(stringNum);
      this.$["str" + stringNum].setAttribute("x1",xPos);
      this.$["str" + stringNum].setAttribute("x2",xPos) ;
    }
  }

  _labelFretNumber(fret, yPos) {
    var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    var xPos;
    if(fret <10) {
      xPos =parseFloat(this.$.fret0.getAttribute('x1')) +
        5.4 + '%';
    } else {
      xPos = parseFloat(this.$.fret0.getAttribute('x1')) +
        5 + '%';
    }
    text.setAttribute('x',xPos);
    text.setAttribute('y', yPos);//adjust for width of text
    text.setAttribute('fill', '#000');
    text.textContent = fret;
    this.$.fretBoardSvg.appendChild(text);
  }

  _drawZeroFret() {
    this.$.fret0.setAttribute("stroke-width", "1.5%");
  }

  findNumberOfFrets(chord) {
    let minFret=24, maxFret=1;
    for (var string in chord) {
      if (chord.hasOwnProperty(string)) {
        chord[string].forEach(note => {
          if(note.fret!=="X") {
            maxFret = note.fret > maxFret ?
              note.fret : maxFret;
            minFret = note.fret < minFret ?
              note.fret : minFret;
          }
        });
      }
    }
    return {minFret, maxFret};
  }

  computeStringPosX(stringNumber) {
    return (6-stringNumber) *
      ((parseFloat(this._rightStringX) -
        parseFloat(this._leftStringX))/5) +
      parseFloat(this._leftStringX) +
      '%';
  }

  static get properties() {
    return {
      /**
       * Object detailing the frets played on each string of the guitar.
       * eg
       *  ```
       * chord = {
       *  str6: [{fret: "X"}],
       *  str5: [{fret: 0}],
       *  str4: [{fret: 2}],
       *  str3: [{fret: 2}],
       *  str2: [{fret: 2}],
       *  str1: [{fret: 0}],
       * }
       *```
       * @type {!Object<string, Array<Object<string, (number|string)>>>}
       */
      chord: {
        type: Object
      },
      _minFret: {
        type: Number
      },
      _maxFret: {
        type: Number
      },
      _topFretY: {
        type: String,
        value: "10%"
      },
      _bottomFretY: {
        type: String,
        value: "95%"
      },
      _leftStringX: {
        type: String,
        value: "10%"
      },
      _rightStringX: {
        type: String,
        value: "90%"
      }
    };
  }
}

render() {
  const {classes} = this.props;
  const fretboardJsx = this.drawFretBoard();
    this.drawChord(this.chord);
  //consolelog(this.state.barWidth);
  return (
    <div>
      <svg viewBox="0 0 200 350" xmlns="http://www.w3.org/2000/svg">
        <g>
          <title>background</title>
          <rect fill="#fff" id="canvas_background" height="100%" width="100%" y="-1" x="-1"/>
          <g display="none" overflow="visible" y="0" x="0" height="100%" width="100%" id="canvasGrid">
            <rect fill="url(#gridpattern)" stroke-width="0" y="0" x="0" height="100%" width="100%"/>2
          </g>
        </g>
        <g id="fretBoardSvg">
          <title>vertical</title>
          <line id="str6" y1$="[[_topFretY]]" y2$="[[_bottomFretY]]"
                x2$="[[_leftStringX]]" x1$="[[_leftStringX]]"
                stroke-width="0.5%" stroke="#000"/>
          <line id="str5" y1$="[[_topFretY]]" y2$="[[_bottomFretY]]"
                stroke-width="0.5%" stroke="#000" fill="none"/>
          <line id="str4" y2$="[[_bottomFretY]]" y1$="[[_topFretY]]"
                stroke-width="0.5%" stroke="#000" fill="none"/>
          <line id="str3" y2$="[[_topFretY]]" y1$="[[_bottomFretY]]"
                stroke-width="0.5%" stroke="#000" fill="none"/>
          <line id="str2" y2$="[[_topFretY]]" y1$="[[_bottomFretY]]"
                stroke-width="0.5%" stroke="#000" fill="none"/>
          <line id="str1" y2$="[[_topFretY]]" y1$="[[_bottomFretY]]"
                x1$="[[_rightStringX]]" x2$="[[_rightStringX]]"
                stroke-width="0.5%" stroke="#000" fill="none"/>
          <title> horizontal</title>
          <line id="fret0"
                y2$="[[_topFretY]]" y1$="[[_topFretY]]"
                x2$="[[_leftStringX]]" x1$="[[_rightStringX]]"
                stroke-width="0.5%" stroke="#000" fill="none"/>
          <line id="bottomFret"
                y2$="[[_bottomFretY]]" y1$="[[_bottomFretY]]"
                x2$="[[_leftStringX]]" x1$="[[_rightStringX]]"
                stroke-width="0.5%" stroke="#000" fill="none"/>
        </g>
      </svg>
    </div>
  );
}
}

export default withStyles(styles)(FretBoard);
