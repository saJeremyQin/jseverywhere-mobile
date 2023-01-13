import * as React from 'react';
import RootNavigator from './screens';


const Main = () => {
  // wrap our app in the ApolloProvider higher-order component
  return (
    // <ApolloProvider client={client}>
      <RootNavigator />
    // </ApolloProvider>
    
  );
};

export default Main;
