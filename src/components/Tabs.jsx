import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import classNames from 'classnames';
import Scraper from './Scraper/Scraper.jsx';

class Tabs extends React.PureComponent {

  static propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  };

  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {classes} = this.props;
    return (
      <div
        style={this.props.style}
        className={classNames(
          this.props.className,
          classes.root,
        )}
      >
        <Scraper/>
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    width: '100%',
  }
});

export default withStyles(styles, {withTheme: true})(Tabs);
