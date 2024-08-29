import React from 'react';
import WindowWidthProvider from '../components/contexts/window';

const App = ({ Component, pageProps }) => (
  <WindowWidthProvider>
    <Component {...pageProps} />
  </WindowWidthProvider>
);

export default App;
