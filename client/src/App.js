import React, { useState } from 'react';
import { Router } from '@reach/router';
import AppContext from './AppContext';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


import NewAuthor from './views/NewAuthor';
import Authors from './views/Authors';

const App = () => {
  const [context, setContext] = useState(null);

  return (
    <div className="App">
      <AppContext.Provider value={{ context, setContext }}>
        <Router>
          <Authors path='/' />
          <NewAuthor path='/new' author={context} />
        </Router>
      </AppContext.Provider>
    </div>
  );
}

export default App;