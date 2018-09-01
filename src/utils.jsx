export default utils = {
  textWithBg: function(text, x, y, size) {
    return (
        <React.Fragment>
        <text fontSize={size}
    textAnchor="start"
    x={x} y={y}
    style={{
      stroke: "white",
      strokeWidth: "0.3em"
    }}>
      {text}
          </text>
          <text fontSize={size}
                textAnchor="start"
                x={x} y={y}
                style={{
                  fill: "black"
                }}>
            {text}
          </text>
        </React.Fragment>
      );
    }
