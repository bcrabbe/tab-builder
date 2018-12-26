import React, {PureComponent} from "react";
import PropTypes from 'prop-types';
import * as R from 'ramda';
export const GlobalContext = React.createContext();

export default class GlobalContextProvider extends PureComponent {
  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  static defaultProps = {
  }

  constructor(props) {
    super(props);
    console.log(process.env);
    this.state = {};
    this.state.env = {
      ...process.env,
      ...window.runtimeConfig
    };
    this.state.urls = {
      tabSearch: this.state.env.REACT_APP_TAB_SEARCH_URL
    };
    this.state.onError = this.onError;
    console.log('global: ', this.state);
    if (process.env.NODE_ENV !== 'production') {
      // const {whyDidYouUpdate} = require('why-did-you-update');
      // whyDidYouUpdate(React);
    }
  }

  onError = R.curry((url, fun, err) => {
    console.warn('Cant connect to  ', url);
  })

  render() {
    return (
      <GlobalContext.Provider value={this.state}>
        {this.props.children}
      </GlobalContext.Provider>
    );
  }
}
