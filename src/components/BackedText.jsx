import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import {measureText} from '../utils.jsx';

class BackedText extends React.PureComponent {

  static propTypes = {
    classes: PropTypes.object.isRequired,
    strokeWidth: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
    backgroundColor: PropTypes.string,
    children: PropTypes.any,
  }

  static defaultProps = {
    backgroundColor: '#fff',
    children: '',
  }

  state = {

  }

  componentDidMount() {
    this.setState(R.assoc('textWidth', measureText(this.props.children).width));
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.text !== prevProps.text) {
      this.setState({textWidth: measureText(this.props.children).width});
    }
  }

  render() {
    const {key, backgroundColor, children, ...propsToPass} = this.props;
    const width = this.props.children.toString().length *
          0.85 *
          this.props.fontSize;
    const rounding = this.props.fontSize*0.3;
    return (
      <React.Fragment
        key={key}
      >
        <rect
          rx={rounding} ry={rounding}
          className={this.props.classes.background}
          fill={this.props.backgroundColor}
          x={this.props.x - (width / 2)}
          y={this.props.y - (this.props.fontSize / 2)}
          width={width}
          height={this.props.fontSize}
        />
        <text
          xmlns="http://www.w3.org/2000/svg"
          textAnchor="middle"
          {...propsToPass}
          y={this.props.y + (this.props.fontSize / 3)}
        >
          {this.props.children}
        </text>
      </React.Fragment>
    );
  }
}

const styles = theme => ({
  root: {
    stroke: 'white',
    strokeWidth: '0.007em',
  },
  background: {
    borderRadius: 40,
    stroke: '1px solid black'
  }
});

export default withStyles(styles, {withTheme: true})(BackedText);
