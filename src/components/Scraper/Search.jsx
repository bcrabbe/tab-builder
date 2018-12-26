import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import classnames from 'classnames';
import Button from  '@material-ui/core/Button';
import TextField from  '@material-ui/core/TextField';
import withGlobalContext from '../withGlobalContext.jsx';

class Search extends React.PureComponent {

  static propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    globalContext: PropTypes.object.isRequired
  }

  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.searchTerm !== this.state.searchTerm) {
      this.requestOnTimeout();
    }
  }

  timer = null
  waitOnChange = 1000

  requestOnTimeout = _ => {
    if(this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(
      this.search,
      this.waitOnChange
    );
  }

  search = _ => {
    console.log(`searching ${this.state.searchTerm}`);
    const searchUrl = this.props.globalContext.urls.tabSearch;
    const url = `${searchUrl}/search/${this.state.searchTerm}`;
    fetch(url).then(
      res => res.json()
    ).then(
      res => this.props.updateResults(res)
    ).catch(this.props.globalContext.onError(url, this.search));
  }

  inputChange = event => {
    const value = event.target.value;
    this.setState(R.assoc('searchTerm', value));
  }

  render() {
    const {classes} = this.props;
    return (
      <div
        style={this.props.style}
        className={classnames(
          this.props.className,
          classes.root,
        )}
      >
        <TextField
          autoFocus
          fullWidth
          placeholder="Search Ultimate Guitar"
          value={this.state.searchTerm}
          variant="outlined"
          margin='normal'
          onChange={this.inputChange}
        />
        <Button
          variant='outlined'
          margin='dense'
          fullWidth
        >
          Search
        </Button>
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    width: '100%',
  }
});

export default withStyles(
  styles,
  {withTheme: true}
)(withGlobalContext(Search));
