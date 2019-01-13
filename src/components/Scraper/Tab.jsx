import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import classnames from 'classnames';
import TabDisplay from '../TabDisplay.jsx';
import Parser from './parser.js';

class Tab extends React.PureComponent {

  static propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    tab: PropTypes.object,
  }

  static defaultProps = {
    tab: undefined
  }

  constructor(props) {
    super(props);
    this.state = {
      parser: new Parser(),
      format: false,
    };
  }


  tabFormatToggle = _ => (
    <label>
      format
      <input
        type="checkbox"
        onChange={
          e => this.setState(prevState => ({format: !prevState.format}))
        }
      />
    </label>
  )

  tabDisplay = tab => {
    return (
      <div className={this.props.classes.tabDisplay}>
        {this.tabFormatToggle()}
        {this.state.format ?
            this.formattedTabDisplay(tab) :
            this.rawTabDisplay(tab)
        }
      </div>
    );
  }

  formattedTabDisplay = tab => {
    const parsedTab = this.state.parser.parse(tab.content.text);
    console.log(this.state.parser);
    return (
      <TabDisplay tab={parsedTab}/>
    );
  }

  rawTabDisplay = tab => {
    return (
      <div>
        <h3>Raw</h3>
        <pre>{tab.content.text}</pre>
      </div>
    );
  }

  render() {
    const {classes} = this.props;
    return !this.props.tab ? null : (
      <div
        style={this.props.style}
        className={classnames(
          this.props.className,
          classes.root,
        )}
      >
        {this.tabDisplay(this.props.tab)}
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    width: '100%',
  }
});

export default withStyles(styles, {withTheme: true})(Tab);
