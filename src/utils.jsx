//import React from 'react';
import ReactDOM from "react-dom";

/**
 * Uses canvas.measureText to compute and return the width
 * of the given text of given font in pixels.
 *
 * @param {String} text The text to be rendered.
 * @param {String} font The css font descriptor that text is
 * to be rendered with (e.g. "bold 14px verdana").
 */
export const measureText = text => {
  // re-use canvas object for better performance
  const canvas = this.canvas || (this.canvas = document.createElement("canvas"));
  const context = canvas.getContext("2d");
  const metrics = context.measureText(text);
  return metrics;
}

export function restOfHeightInElement(el) {
  let availableHeight = el.clientHeight;
  let prevChildMarginBottom = 0;
  Array.from(el.children).forEach((child, i, arr) => {
    if(i!==arr.length-1){
      availableHeight -= child.offsetHeight;
    }
    const style = getComputedStyle(child);
    availableHeight -= prevChildMarginBottom > parseFloat(style.marginTop) ?
      prevChildMarginBottom : parseFloat(style.marginTop);
    prevChildMarginBottom = parseFloat(style.marginBottom);
  });
  return availableHeight - prevChildMarginBottom;
}

//unTested:
export function restOfWidthInElement(el) {
  console.log(el);
  let availableWidth = el.clientWidth;
  let prevChildMarginRight = 0;
  Array.from(el.children).forEach(
    (child, i, arr) => {
      if(i!==arr.length-1){
        availableWidth -= child.offsetWidth;
      }
      const style = getComputedStyle(child);
      availableWidth -= prevChildMarginRight > parseFloat(style.marginTop) ?
        prevChildMarginRight : parseFloat(style.marginTop);
      prevChildMarginRight = parseFloat(style.marginBottom);
    }
  );
  return availableWidth - prevChildMarginRight;
}

//untested:
export function heightOfElement(el) {
  if(!el) return 0;
  console.log(el);
  let height = el.offsetHeight;
  const style = getComputedStyle(el);
  if(style.marginTop) height += parseFloat(style.marginTop);
  if(style.marginBottom) height += parseFloat(style.marginBottom);
  console.log(height);
  return height;
}

//untested:
export const measureElement = element => {
  const DOMNode = ReactDOM.findDOMNode(element);
  return {
    width: DOMNode.offsetWidth,
    height: DOMNode.offsetHeight,
  };
}
