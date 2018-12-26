import React from 'react';
import {GlobalContext} from './GlobalContextProvider.jsx';

export default function withGlobalContext(Component) {
  return (props) => (
    <GlobalContext.Consumer>
      {globalContext => (
        <Component
          {...props}
          globalContext={globalContext}
        />
      )}
    </GlobalContext.Consumer>
  );
}
