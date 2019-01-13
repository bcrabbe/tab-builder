import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import classnames from 'classnames';

class Results extends React.PureComponent {

  static propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    results: PropTypes.array,
  }

  static defaultProps = {
    results: []
  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  displayLoadButton = (url) => (
    <input
      type="submit"
      onClick={(e) => this.props.get(url)}
      value="Load it up"
    />
  )

  displayResultInfo = (result) => R.map(
    ([field, value]) => <p key={field}> {`${field}: ${value}`}</p>,
    R.toPairs(result)
  )

  render() {
    const {classes} = this.props;
    console.log(this.props);
    return (
      <div
        style={this.props.style}
        className={classnames(
          this.props.className,
          classes.root,
        )}
      >
        {R.addIndex(R.map)((result, key) => (
          <div
            className={this.props.classes.resultCard}
            key={key}>
            {this.displayResultInfo(result)}
            {this.displayLoadButton(result.url)}
          </div>
        ), this.props.results)}
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    width: '100%',
  },
  resultCard: {
    border: theme.genericBorder(),
    margin: theme.spacing.margin,
    borderRadius: theme.shape.borderRadius
  },
});

export default withStyles(styles, {withTheme: true})(Results);
