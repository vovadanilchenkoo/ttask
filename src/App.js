import React from 'react';
import './App.sass';

import data from './data.json'
import PropertiesList from './components/PropertiesList/PropertiesList'

function App() {
  return (
    <div className='App'>
      {/* TODO: rename "data" */}
      <PropertiesList data={data} />
    </div>
  );
}

export default App;
