import fs from 'fs';
import testTab from './testRaw.json';


export default class Parser {

  constructor(tab) {
    this.numberOfStrings = 6;
  }

  parse(tab) {
    this.rawTab = tab;
    console.log(tab);
    const lines = this.getLines(tab);
    console.log(lines);
    const textBars = this.getBars(lines);
    console.log(textBars);
    const barTabs = this.textBarsToTabBars(textBars);
    console.log(barTabs);
    return barTabs;
  }

  textBarsToTabBars = (textBars) => {
    return textBars.map(textBar => this.textBarToTabBar(textBar));
  }

  textBarToTabBar = (textBar) => {
    const tabBar = [];
    for(let s=0; s<this.numberOfStrings; ++s) {
      const string = textBar[s];
      tabBar[s] = [];
      let i=0;
      while(i<string.length && i!==-1){
        if(string[i]!=='-') {
          const note = extractNote(string, i);
          const x = i/string.length;
          tabBar[s].push({note, x});
          i = string.indexOf('-', i+1);
        } else {
          ++i;
        }
      }
    }
    return tabBar;

    function extractNote(string, i){
      let note = string[i];
      if(!isNaN(string[i+1])){
        note.concat(string[i+1]);
      } else if(string[i+1]==="h" || string[i+1]==="p" || string[i+1]==="/" ){
        note = note.concat(string[i+1]);
        note = note.concat(extractNote(string, i+2));
      }
      return note;
    }
  }



  getBars = (lines) => {
    const bars = [];
    for(let i = 0; i<lines.length; ++i){
      const potentialBar = lines.slice(i, i+6);
      if(this.isBar(potentialBar)) {
        console.log(potentialBar);
        const stave = this.sliceToBars(potentialBar);
        stave.forEach(bar => bars.push(bar));
//        bars.push(this.sliceToBars(potentialBar));
      }
    }
    return bars;
  }

  sliceToBars = (barGroup) => {
    const start = this.offsetOfNextBar(barGroup);
    const end = this.offsetOfNextBar(barGroup,start+1);
    const bars = [];
    for(let start = this.offsetOfNextBar(barGroup),
            end = this.offsetOfNextBar(barGroup,start+1);
        end!==-1 && start!==-1 && end!==start;
        start = end, end = this.offsetOfNextBar(barGroup,start+1)){
      if(end-start >1){
        bars.push(this.sliceLines(barGroup, start+1, end));
      }
    }
    return bars;
  }

  sliceLines = (lines, fromIndex, toIndex) => {
    return lines.map(line => line.substring(fromIndex, toIndex));
  }


  /**
   *(barGroup[, fromIndex])
   *
   */
  offsetOfNextBar = (barGroup, fromIndex) => {
    const offset = fromIndex ? fromIndex : 0;
    return barGroup[0].substring(offset).indexOf("|") + offset;
  }

  /**
   * A array of length nStrings containing lines represtenting each string on the
   * instrument.
   * @typedef [Line[nStrings]] Bar
   */
  /**
   * A line of text
   * @typedef String Line
   */

  /**
   * returns true if lines look likely to contain music
   * @param {Bar} set of lines to test.
   * @return Boolean
   */
  isBar = (potentialBar) => {
    return potentialBar.every((line) => line[0] === "|");
  }

  isBarStart
  getLines = (rawText) => {
    return rawText.split('\r\n');
  }

  test2() {
    const test = new Parser();
    return {testTab, parsed:test.parse(testTab.content.text)};
  }

  static testFile(file) {
    console.log(fs);
    fs.open(`${file}.txt`, 'r', (err, fd) => {
      if (err) {
        console.log(err);
      }

      fs.close(fd, (err) => {
        if (err) throw err;
      });
    });
  }

}

//3`47h
